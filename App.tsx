import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import 'expo-dev-client'; 
import 'react-native-gesture-handler';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import Purchases from 'react-native-purchases';
import TrackPlayer, {Capability, AppKilledPlaybackBehavior} from 'react-native-track-player';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

import Amplify from '@aws-amplify/core';
import config from './src/aws-exports.js';
Amplify.configure(config);

import { AppContext } from './AppContext';
import AudioTrackPlayer from './components/AudioTrackPlayer';


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
        console.log('entrou 3')
        Purchases.configure({apiKey: 'goog_ZnvczOwEEgDMwVVNvfxMKwPmFgX'})
      }
      if (Platform.OS === 'ios') {
        console.log('entrou 3')
        Purchases.configure({apiKey: 'appl_kWcWMJjdDmIvLdsnnGavdbkSevg'})
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
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.JumpBackward,
          Capability.JumpForward,
          //Capability.Stop,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.JumpBackward,
          Capability.JumpForward,
          //Capability.Stop,
        ],
      progressUpdateEventInterval: 10,
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
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })).data;
      
      console.log(token)
      
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
    //console.log(token);
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

  const [ADon, setADon] = useState<boolean>(false);

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const [progUpdate, setProgUpdate] = useState<boolean>(false);

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