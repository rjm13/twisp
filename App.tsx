import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import 'expo-dev-client'; 
//import AppLoading from 'expo-app-loading';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

//import mobileAds from 'react-native-google-mobile-ads';
//import Purchases from 'react-native-purchases';
import TrackPlayer, {Capability} from 'react-native-track-player';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

import Amplify from '@aws-amplify/core';
import config from './src/aws-exports';
Amplify.configure(config);

import { AppContext } from './AppContext';

import AudioPlayerWidget from './components/AudioPlayerWidget';
import AudioTrackPlayer from './components/AudioTrackPlayer';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// async function setup() {
//   await TrackPlayer.setupPlayer({});
//   await TrackPlayer.updateOptions({
//     stopWithApp: false,
//     capabilities: [
//       TrackPlayer.CAPABILITY_PLAY,
//       TrackPlayer.CAPABILITY_PAUSE,
//       TrackPlayer.CAPABILITY_STOP,
//       TrackPlayer.CAPABILITY_SEEK_TO,
//     ],
//     compactCapabilities: [
//       TrackPlayer.CAPABILITY_PLAY,
//       TrackPlayer.CAPABILITY_PAUSE,
//     ],
//   });
// }

export default function App() {

  useEffect(() => {
    (async () => {
      //const { status } = await requestTrackingPermissionsAsync();

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


  // useEffect(() => {
  //   setup();

  //   return () => TrackPlayer.destroy();
  // }, []);

  const setUpTrackPlayer = async () => {
    try {
        console.log('attempting...')
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.reset();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    TrackPlayer.updateOptions({
      //stopWithApp: false,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        //Capability.SkipToNext,
        //Capability.SkipToPrevious,
        Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
    notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        //Capability.SkipToNext,
        //Capability.SkipToPrevious,
      ],
    });
    setUpTrackPlayer();
    //return () => TrackPlayer.destroy();
  }, []);


  const isLoadingComplete = useCachedResources();

  const [storyID, setStoryID] = useState<string|null>(null);

  const [userID, setUserID] = useState<string|null>(null);

  const [isRootScreen, setIsRootScreen] = useState<boolean|null>(null);

  const [nsfwOn, setNSFWOn] = useState<boolean|null>(false);

  const [ADon, setADon] = useState<boolean|null>(false);

  const [progUpdate, setProgUpdate] = useState<boolean>(false);

  const [deepLink, setDeepLink] = useState(null);

  const [premium, setPremium] = useState<boolean>(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


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

  // async function schedulePushNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "You've got mail! 📬",
  //       body: 'Here is the notification body',
  //       data: { data: 'goes here' },
  //     },
  //     trigger: { seconds: 2 },
  //   });
  // }

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

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
     
      <SafeAreaProvider>
        <AppContext.Provider value={{
          storyID,
          setStoryID: (id: string) => setStoryID(id),
          // userID,
          // setUserID: (id: string) => setUserID(id),
          userID,
          setUserID: (user: {}) => setUserID(user),
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

        }}>
            <Navigation colorScheme='dark'/>
            <StatusBar style='light' backgroundColor='#0000004D'/>
            {/* <AudioPlayerWidget /> */}
            <AudioTrackPlayer />
          </AppContext.Provider>
      </SafeAreaProvider>

    );
  }
}