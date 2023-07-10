import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import 'expo-dev-client'; 

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import Linking from 'expo-linking'

//import Purchases from 'react-native-purchases';
import TrackPlayer, {Capability, AppKilledPlaybackBehavior} from 'react-native-track-player';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

import Amplify from '@aws-amplify/core';
import config from './src/aws-exports';
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

  // useEffect(() => {
  //   const connectRevenueCat = async () => {
  //     Purchases.setDebugLogsEnabled(true)
  //     if (Platform.OS === 'android') {
  //       console.log('entrou 3')
  //       Purchases.setup('goog_wSkOaqDFxXdkMqDferfIVDqSIuv')
  //     }
  //     if (Platform.OS === 'ios') {
  //       console.log('entrou 3')
  //       Purchases.setup('appl_kWcWMJjdDmIvLdsnnGavdbkSevg')
  //     }
  //   }
  //   connectRevenueCat()
  // }, [])

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
          Capability.Stop,
        ],
        // notificationCapabilities: [
        //   Capability.Play,
        //   Capability.Pause,
        // ],
        //progressUpdateEventInterval: 2,
        //icon: require('./../imgs/ic_logo_notification.png')
      });
      //await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    };
    SetupService();
  })

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

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
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
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
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

  const [isRootScreen, setIsRootScreen] = useState<boolean>(false);

  const [nsfwOn, setNSFWOn] = useState<boolean>(false);

  const [ADon, setADon] = useState<boolean>(false);

  const [progUpdate, setProgUpdate] = useState<boolean>(false);

  const [deepLink, setDeepLink] = useState(null);

  const [premium, setPremium] = useState<boolean>(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
     
      <SafeAreaProvider>
        <AppContext.Provider value={{
          storyID,
          setStoryID: (id: string) => setStoryID(id),
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
          setUserPins: (val: []) => setUserRates(val),
          userRates,
          setUserRates: (val: []) => setUserFinished(val),
          userFinished,
          setUserFinished: (val: []) => setUserFinished(val),

        }}>
            <Navigation colorScheme='dark'/>
            <StatusBar style='light' backgroundColor='#0000004D'/>
            <AudioTrackPlayer />
          </AppContext.Provider>
      </SafeAreaProvider>

    );
  }
}