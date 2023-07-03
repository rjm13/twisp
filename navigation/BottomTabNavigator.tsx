import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useContext} from "react";
import {Platform} from 'react-native';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import EditProfileScreen from '../screens/EditProfile';
import NotificationSetting from '../screens/Settings';

import History from '../screens/History';
import Following from '../screens/Following';
import AboutScreen from '../screens/About';
import AccountScreen from '../screens/Account';
import Inbox from '../screens/Inbox';
import ViewMessage from '../screens/ViewMessage';

// import PendingStories from '../screens/PendingStories';
// import FlaggedStories from '../screens/FlaggedStories';
// import NewComments from '../screens/NewComments';
// import PendingPrompts from '../screens/PendingPrompts';
// import AdminUpload from '../screens/AdminUploadAudio';

// import PublishingMainScreen from '../screens/PublishingMain';
// import PublisherSetupScreen from '../screens/PublisherSetup';
// import PublisherScreen from '../screens/Publisher';
// import BecomeSomething from '../screens/BecomeSomething';
// import MyStories from '../screens/MyStories';
// import UploadAudio from '../screens/UploadAudio';

//import SavedPrompts from '../screens/SavedPrompts';
import InProgress from '../screens/InProgress';


import Terms from '../screens/Terms';


import StoriesScreen from '../screens/Discover';
import PlaylistScreen from '../screens/Playlists';
import BrowseAuthor from '../screens/BrowseAuthors';

import GenreHome from '../screens/GenreHome';
import SearchScreen from '../screens/Search';
import TagSearchStack from '../screens/TagSearch';
//import UserScreenStack from '../screens/UserScreen';
import BrowseGenre from '../screens/BrowseGenre';
import ViewGenreTags from '../screens/ViewGenreTags';
//import PromptsHome from '../screens/PromptsHome';

import PremiumHome from '../screens/PremiumHome';

import { AppContext } from '../AppContext';


import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  const { premium } = useContext(AppContext);
  const { setPremium } = useContext(AppContext);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ 
          tabBarActiveTintColor: '#fff',
          tabBarStyle: {
            //backgroundColor: '#000',
            height: 55,
            paddingBottom: Platform.OS === 'ios' ? 14 : 4
        }
          }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home-sharp" color={color}/>,
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name="Stories"
        component={StoriesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="library-sharp" color={color} />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Playlist"
        component={PlaylistNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="disc" color={color} />,
          headerShown: false,
        }}
      />
      {premium === false ? (
        <BottomTab.Screen
          name="Premium"
          component={PremiumNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
            headerShown: false,
          }}
        />
      ) : null
         }
       
      
      
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={25} style={{ marginBottom: -8 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Following"
        component={Following}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="Terms" 
        component={Terms} 
        options={{ headerShown: false }} 
      />
      <HomeStack.Screen 
        name="GenreHome" 
        component={GenreHome} 
        options={{ headerShown: false }} 
      />
      <HomeStack.Screen 
        name="BrowseGenre" 
        component={BrowseGenre} 
        options={{ headerShown: false }} 
      />
      <HomeStack.Screen 
        name="Inbox" 
        component={Inbox} 
        options={{ headerShown: false }} 
      />
      <HomeStack.Screen 
        name="ViewMessage" 
        component={ViewMessage} 
        options={{ headerShown: false }} 
      />
       <HomeStack.Screen 
        name="InProgress" 
        component={InProgress} 
        options={{ headerShown: false }} 
      />
      

    </HomeStack.Navigator>
  );
}

const StoriesStack = createStackNavigator<TabTwoParamList>();

function StoriesNavigator() {
  return (
    <StoriesStack.Navigator>
      <StoriesStack.Screen
        name="StoriesScreen"
        component={StoriesScreen}
        options={{ headerShown: false }}
      />
      <StoriesStack.Screen
        name="BrowseAuthor"
        component={BrowseAuthor}
        options={{ headerShown: false }}
      />
      <StoriesStack.Screen
        name="GenreHome"
        component={GenreHome}
        options={{ headerShown: false }}
      />
      <StoriesStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <StoriesStack.Screen
        name="TagSearchStack"
        component={TagSearchStack}
        options={{ headerShown: false }}
      />
      {/* <StoriesStack.Screen
        name="UserScreenStack"
        component={UserScreenStack}
        options={{ headerShown: false }}
      /> */}
      <StoriesStack.Screen
        name="BrowseGenre"
        component={BrowseGenre}
        options={{ headerShown: false }}
      />
      <StoriesStack.Screen 
        name="ViewGenreTags" 
        component={ViewGenreTags} 
        options={{ headerShown: false }} 
      />
    </StoriesStack.Navigator>
  );
}

const PlaylistStack = createStackNavigator<TabThreeParamList>();

function PlaylistNavigator() {
  return (
    <PlaylistStack.Navigator>
      <PlaylistStack.Screen
        name="PlaylistScreen"
        component={PlaylistScreen}
        options={{ headerShown: false }}
      />
    </PlaylistStack.Navigator>
  );
}

const PremiumStack = createStackNavigator<TabFourParamList>();

function PremiumNavigator() {
  return (
    <PremiumStack.Navigator>
      <PremiumStack.Screen
        name="PremiumHome"
        component={PremiumHome}
        options={{ headerShown: false }}
      />
    </PremiumStack.Navigator>
  );
}