import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import 'expo-dev-client'; 
import 'react-native-gesture-handler';

import { Linking } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import Purchases from 'react-native-purchases';
import TrackPlayer, {Capability, AppKilledPlaybackBehavior} from 'react-native-track-player';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import * as WebBrowser from 'expo-web-browser';

import Amplify from '@aws-amplify/core';
import config from './src/aws-exports.js';
import { Auth, Hub, Storage } from 'aws-amplify';
import { StorageChunkUpload } from 'amplify-s3-chunk-upload';
import { Credentials } from '@aws-amplify/core';

//Amplify.configure(config);

Amplify.configure({
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener,
  },
});


import { AppContext } from './AppContext';
import AudioTrackPlayer from './components/AudioTrackPlayer';

// Load StorageChunkUpload Plugin
const storagePlugin = new StorageChunkUpload({}, Credentials);
Storage.addPluggable(storagePlugin);
storagePlugin.configure(config);


async function urlOpener(url, redirectUrl) {
  //await InAppBrowser.isAvailable();
  

  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl, {
    showTitle: false,
    preferEphemeralSession: true
  });

  //WebBrowser.openBrowserAsync(url, {showTitle: true})

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

//ask for permission to track data
  useEffect(() => {
    (async () => {
      setTimeout(async () => {
        const { status } = await requestTrackingPermissionsAsync();
        if (status === 'granted') {
          console.log('Yay! I have user permission to track data');
        }
      }, 500);
    })();
  }, []);

  //revenue cat
  useEffect(() => {
    const connectRevenueCat = async () => {
      Purchases.setDebugLogsEnabled(true)
      if (Platform.OS === 'android') {
        Purchases.configure({apiKey: 'goog_ZnvczOwEEgDMwVVNvfxMKwPmFgX' })
      }
      if (Platform.OS === 'ios') {
        Purchases.configure({apiKey: 'appl_kWcWMJjdDmIvLdsnnGavdbkSevg' })
      }
    }
    connectRevenueCat()
  }, [])

//set up track player
  useEffect(() => {
    const SetupService = async () => {
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.reset();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.JumpBackward,
          Capability.JumpForward,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.JumpBackward,
          Capability.JumpForward,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.JumpBackward,
          Capability.JumpForward,
        ],
      progressUpdateEventInterval: 30,
      icon: require('./assets/twisp-bw-small.png')
      });
      //await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    };
    SetupService();
  }, [])

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        //alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })).data;
      
      console.log('expo token is', token)
      
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  const isLoadingComplete = useCachedResources();

  const [storyID, setStoryID] = useState<string|null>(null);

  const [userID, setUserID] = useState<string|null>(null);

  const [userPins, setUserPins] = useState([]);

  const [userRates, setUserRates] = useState([]);

  const [userFinished, setUserFinished] = useState([]);

  const [userFollowing, setUserFollowing] = useState([]);

  const [isRootScreen, setIsRootScreen] = useState<boolean>(false);

  const [nsfwOn, setNSFWOn] = useState<boolean>(false);

  const [ADon, setADon] = useState<boolean>(true);

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const [progUpdate, setProgUpdate] = useState<boolean>(false);

  const [refreshApp, setRefreshApp] = useState<number>(0);

  const [refreshPins, setRefreshPins] = useState<number>(0);

  const [refreshFYC, setRefreshFYC] = useState<number>(0);

  const [refreshGC, setRefreshGC] = useState<number>(0);

  const [refreshADC, setRefreshADC] = useState<number>(0);  

  const [refreshPP, setRefreshPP] = useState<number>(0);

  const [refreshFP, setRefreshFP] = useState<number>(0);

  const [deepLink, setDeepLink] = useState<string|null>(null);

  const [premium, setPremium] = useState<boolean>(false);

  const [expoPushToken, setExpoPushToken] = useState<string|null>(null);

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

//push notifications
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));


    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
     
      <SafeAreaProvider>
        <AppContext.Provider value={{
          storyID,
          setStoryID: (id: string) => setStoryID(id),
          expoPushToken,
          setExpoPushToken: (val: string | null) => setExpoPushToken(val),
          userID,
          setUserID: (user: string) => setUserID(user),
          isRootScreen,
          setIsRootScreen: (val: boolean) => setIsRootScreen(val),
          deepLink,
          setDeepLink: (link: {}) => setDeepLink(link),
          nsfwOn,
          setNSFWOn: (val: boolean) => setNSFWOn(val),
          ADon,
          setADon: (val: boolean) => setADon(val),
          progUpdate,
          setProgUpdate: (val: boolean) => setProgUpdate(val),
          refreshApp,
          setRefreshApp: (val: number) => setRefreshApp(val),
          refreshPins,
          setRefreshPins: (val: number) => setRefreshPins(val),
          refreshFYC,
          setRefreshFYC: (val: number) => setRefreshFYC(val),
          refreshGC,
          setRefreshGC: (val: number) => setRefreshGC(val),
          refreshADC,
          setRefreshADC: (val: number) => setRefreshADC(val),
          refreshPP,
          setRefreshPP: (val: number) => setRefreshPP(val),
          refreshFP,
          setRefreshFP: (val: number) => setRefreshFP(val),
          premium,
          setPremium: (val: boolean) => setPremium(val),
          userPins,
          setUserPins: (val: []) => setUserPins(val),
          userRates,
          setUserRates: (val: []) => setUserRates(val),
          userFinished,
          setUserFinished: (val: []) => setUserFinished(val),
          userFollowing,
          setUserFollowing: (val: []) => setUserFollowing(val),
          playbackSpeed,
          setPlaybackSpeed: (val: number) => setPlaybackSpeed(val),

        }}>
            <Navigation colorScheme='dark'/>
            <StatusBar style='light' backgroundColor='#0000004D'/>
            <AudioTrackPlayer />
          </AppContext.Provider>
      </SafeAreaProvider>

    );
  }
}