import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState, useEffect, useRef, useContext} from 'react';
import { ColorSchemeName, Appearance } from 'react-native';
import { AppContext } from '../AppContext';

//set storyID to null or move to home stack
//import SimpleAudioPlayer from '../screens/SimpleAudioPlayer';

//show over top
import StoryScreen from '../screens/Story';
import UploadAudio from '../screens/UploadAudio';
import TagSearchScreen from '../screens/TagSearch';
import RedirectScreen from '../screens/auth/Redirect';
import SignUpScreen from '../screens/auth/SignUp';
import SignInScreen from '../screens/auth/SignIn';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import ForgotPasswordConScreen from '../screens/auth/ForgotPasswordConfirm';
import ConfirmEmailScreen from '../screens/auth/ConfirmEmail';
import SplashCarousel from '../screens/auth/SplashCarousel';
import Welcome from '../screens/auth/Welcome';

import { navigationRef } from './RootNavigation';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation(
  { colorScheme }: { colorScheme: ColorSchemeName }
  ) {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}
      >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, 
    }} initialRouteName="Redirect">
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ForgotPasswordCon" component={ForgotPasswordConScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
      <Stack.Screen name="Redirect" component={RedirectScreen} />
      <Stack.Screen name="TagSearchScreen" component={TagSearchScreen} />
      <Stack.Screen name="SplashCarousel" component={SplashCarousel} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="UploadAudio" component={UploadAudio} />
    </Stack.Navigator>
  );
}