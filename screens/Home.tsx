import React, { useEffect, useState, useContext, useRef } from 'react';
import { 
    ScrollView, 
    TouchableWithoutFeedback,
    View,
    Text,
    AppState
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'expo-linear-gradient';
import * as Linking from 'expo-linking'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import useStyles from '../styles';
import { AppContext } from '../AppContext';
import Trending from '../components/lists/Trending';
import ShortSweet from '../components/lists/ShortSweet';
import ForYouCarousel from '../components/lists/ForYouCarousel';
import ForYouGenre from '../components/lists/ForYouGenre';
import NewList from '../components/lists/NewList';

import { Auth, graphqlOperation, API } from 'aws-amplify';
import {getUser, listGenres, listFinishedStories} from '../src/graphql/queries';
import {deleteFinishedStory} from '../src/graphql/mutations';

import BackgroundTimer from 'react-native-background-timer';


const HomeScreen = ({navigation} : any) => {

    //deep link global context for sharing a story
    const { deepLink, refreshApp } = useContext(AppContext);
    const { setDeepLink, setRefreshApp } = useContext(AppContext);

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            console.log('app is in the foreground')
            //setRefreshApp(!refreshApp)
            console.log(refreshApp)
          }
    
          appState.current = nextAppState;
          setAppStateVisible(appState.current);
          console.log('AppState', appState.current);
        });
    
        return () => {
          subscription.remove();
        };
      }, []);

      useEffect(() => {
        if (appStateVisible === 'active') {
            console.log('app changed')
            console.log(appState)
            //setRefreshApp(!refreshApp)
        }

      }, [appStateVisible])

    const styles = useStyles();

    //set from the user object, the top genres selected by the user
    const [TopThree, setTopThree] = useState([])

      //if the app opens from a shared link, direct the user to that story screen
    useEffect(() => {

        if (deepLink) {

            let response = Linking.parse(deepLink)

            navigation.navigate('StoryScreen', {storyID: response?.queryParams?.id})
            //await Linking.openURL(deepLink)
            setDeepLink(null)
            
        }
       
    } , [deepLink])

    //fetch the top 3 genres for the user
    useEffect(() => {

        const fetchGenres = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            const User = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))
            
            if (User.data.getUser.topthree.length === 3) {
                setTopThree(User.data.getUser.topthree)
            } else {
                const Genres = await API.graphql(graphqlOperation(
                    listGenres, {filter: {
                        genre: {
                            ne: 'after dark'
                        },
                    }}
                ))
                setTopThree([Genres.data.listGenres.items[0], Genres.data.listGenres.items[1],Genres.data.listGenres.items[2]])
            }
        }
        fetchGenres();

    }, [])

    const welcomeText = [
        "Curiouser, curious",
        "Relax. Have a listen",
        "Greetings, Traveler",
        "Enjoy your storytime",
        "Down the rabbit hole"
    ]

    const [text, setText] = useState('')

    useEffect(() => {

        let txt = welcomeText[getRandomInt(welcomeText.length)]

        function getRandomInt(max : any) {
                return Math.floor(Math.random() * max);
            }

        setText(txt)
        
    }, [])

    // BackgroundTimer.runBackgroundTimer(() => { 
    //         //setRefreshApp(!refreshApp)
    //         let rando =  Math.random()
    //         console.log(rando)
    // }, 100000);

    

    return (
        <LinearGradient colors={['#13192Ca5', '#161616', '#000000']} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <ScrollView style={{ }} showsVerticalScrollIndicator={false}> 
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: getStatusBarHeight() + 20, marginBottom: 10, marginHorizontal: 20}}>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={{color: '#fff', fontSize: 24, marginTop: 4, fontWeight: '600' }}>
                            {text}
                        </Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen')}>
                        <View style={{ backgroundColor: 'transparent', padding: 30, margin: -30, justifyContent: 'center'}}>
                            <FontAwesome
                                name='user'
                                size={20}
                                color='#fff'  
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View >
                    <ForYouCarousel />
                </View>
            
                <View>
                    <Trending/>
                </View>

                <View>
                    <ShortSweet/>
                </View>

                <View>
                    <NewList />
                </View> 

                {TopThree.length === 3 ? (
                    <View>
                        <ForYouGenre genreid={TopThree[0]}/>
                        <ForYouGenre genreid={TopThree[1]}/>
                        <ForYouGenre genreid={TopThree[2]}/>
                    </View>
                ) : null}
                
                <View style={{height: 100}} />
            </ScrollView>
        </LinearGradient>
    );
}

export default HomeScreen;