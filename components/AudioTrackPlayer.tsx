import React, {useState, useEffect, useRef, useContext} from 'react';

import {
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    ImageBackground, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Platform,
    SafeAreaView,
    AppState
} from 'react-native';

//import PreStoryAd from './PreStoryAd';
import * as Device from 'expo-device';

//import {AdMobRewarded,setTestDeviceIDAsync} from 'expo-ads-admob';

import {Slider} from '@miblanchard/react-native-slider';
import { LinearGradient } from 'expo-linear-gradient';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {graphqlOperation, API, Storage, Auth} from 'aws-amplify';

import { 
    getStory, 
    getUser, 
    finishedStoriesByUserByStory,
    pinnedStoriesByUserByStory ,
    inProgressStoriesByUserByStory,
} from '../src/graphql/queries';

import { 
    deletePinnedStory, 
    createFinishedStory, 
    updateStory, 
    createInProgressStory, 
    updateInProgressStory, 
    deleteInProgressStory 
} from '../src/graphql/mutations';

import { AppContext } from '../AppContext';
import * as RootNavigation from '../navigation/RootNavigation';
import ShareStory from './functions/ShareStory';

import TrackPlayer, {State, Event, useProgress, Capability, usePlaybackState, useTrackPlayerEvents} from 'react-native-track-player';
import { ConsoleLogger } from '@aws-amplify/core';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

//custom hook for setting the time on the slider
    function useInterval(callback, delay) {
        const savedCallback = useRef();
        
        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        
        // Set up the interval.
        useEffect(() => {
            let id = setInterval(() => {
            savedCallback.current();
            }, delay);
            return () => clearInterval(id);
        }, [delay]);
    }


const AudioPlayer  = () => {

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
            //console.log(refreshApp)
          }
    
          appState.current = nextAppState;
          setAppStateVisible(appState.current);
          console.log('AppState', appState.current);
        });
    
        return () => {
          subscription.remove();
        };
      }, []);

    const { userPins } = useContext(AppContext);
    const { setUserPins } = useContext(AppContext);

    const { userFinished } = useContext(AppContext);
    const { setUserFinished, setRefreshPins } = useContext(AppContext);

//get the global page state for the audio player
    const { isRootScreen } = useContext(AppContext);

    const { premium } = useContext(AppContext);

    const { storyID } = useContext(AppContext);
    const { setStoryID } = useContext(AppContext);

    const { progUpdate } = useContext(AppContext);
    const { setProgUpdate } = useContext(AppContext);

//inprogress story id
    const [inProgressID, setInProgressID] = useState(null)

//minimize the player with animations
    const [isExpanded, setIsExpanded] = useState(false);

//load the ad
    const [complete, setComplete] = useState(false);

    // useEffect(() => {
    //     //if (premium === false && storyID !== null) {
    //     //PreStoryAd();

    //     const PreStoryAdv = async () => {

    //         const testID = Platform.select({
    //             // https://developers.google.com/admob/ios/test-ads
    //             ios: 'ca-app-pub-3940256099942544/1712485313',
    //             // https://developers.google.com/admob/android/test-ads
    //             android: 'ca-app-pub-3940256099942544/5224354917',
    //         });
        
    //         const productionID = Platform.select({
    //             // https://developers.google.com/admob/ios/test-ads
    //             ios: 'ca-app-pub-8042132670790474/5004534539',
    //             // https://developers.google.com/admob/android/test-ads
    //             //android: 'ca-app-pub-8042132670790474/6243811623',
    //             android: 'ca-app-pub-8042132670790474/6243811623'
    //         });
    //         // Is a real device and running in production.
    //         const adUnitID = Device.isDevice && !__DEV__ ? productionID : testID;

    //         AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', () => {
    //             console.log('FailedToLoad');
    //             setComplete(true);
    //           }
    //           );
              
    //           AdMobRewarded.addEventListener('rewardedVideoDidFailToPresent', () => {
    //             console.log('FailedToLoad');
    //             setComplete(true);
    //           }
    //           );
              
    //           AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
    //             console.log('Closed');
    //             setComplete(true);
    //             });

    //         // Display a rewarded ad
    //         await AdMobRewarded.setAdUnitID(adUnitID); // Test ID, Replace with your-admob-unit-id
    //         await AdMobRewarded.requestAdAsync();
    //         await AdMobRewarded.showAdAsync();


    //     }

    //     if (premium === false && storyID !== null) {
    //         PreStoryAdv();
    //     }
       
    // }, [storyID])


//set the progress story ID


// useEffect(() => {
//     setInProgressID(null);
// }, [storyID])

//this controls if the user has watched the ad or not

//determine if the user has watched the ad or not
    useEffect(() => {
        //if (premium === true) {
            setComplete(true)
        //}
    }, [storyID])

//minimize he track player
    const onChangeHandler = () => {
        if (isExpanded) {
            setIsExpanded(false);
        } else if (!isExpanded) {
            setIsExpanded(true);
        } 
    }

//use storyID to retrieve Story from AWS
    const [Story, setStory] = useState(null);
    const [AudioUri, setAudioUri] = useState('');
    const [imageU, setImageU] = useState('https://static.vecteezy.com/system/resources/thumbnails/010/282/085/small/black-background-studio-blank-black-and-gray-background-studio-backdrop-wallpaper-inside-room-abstract-dark-gray-gradient-spotlight-floor-texture-background-free-photo.jpg')
    const [user, setUser] = useState({})

    // useEffect(() => {
    //     //if (isPlaying === true) {
    //         const DoStuff = async () => {
    //             //setPosition(0);
    //             //setInitialPosition(0);
    //             //setIsPlaying(false);
    //             //ProgressCheck()
    //             //await TrackPlayer.reset()
    //         }
    //         DoStuff()
    //     //}
    // }, [storyID])

//fetch the story and user attributes and audioUri from the s3 bucket
    useEffect(() => {

        if (storyID === null) {
            return;
        }

        const fetchStory = async () => {
        
            try {
                const storyData = await API.graphql(graphqlOperation(getStory, {id: storyID}))

                if (storyData) {
                    setStory(storyData.data.getStory);
                    const response = await Storage.get(storyData.data.getStory.audioUri, {download: false, 
                        //expiration: 604800
                    });
                    const imageresponse = await Storage.get(storyData.data.getStory.imageUri)
                    setAudioUri(response);
                    setImageU(imageresponse);
                    //setPosition(0);
                    
                    await TrackPlayer.add([{
                        url: response,
                        title: storyData.data.getStory.title,
                        artist: storyData.data.getStory.creator.penName,
                        artwork: imageresponse, // Load artwork from the network
                        duration: storyData.data.getStory.time/1000 // Duration in seconds
                    }]);
                    let trackObject = await TrackPlayer.getQueue();
                    
                    setSlideLength(trackObject[0].duration);
                    
                }
            } catch (e) {
                console.log(e);
            }
        }

        const fetchUser = async () => {

            let userInfo = await Auth.currentAuthenticatedUser();

            let UserData = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))
            setUser(UserData.data.getUser)

        }

        const fetchProgress = async (nextToken : any) => {
            const userInfo = await Auth.currentAuthenticatedUser();

            const UserData = await API.graphql(graphqlOperation(
                inProgressStoriesByUserByStory, {
                    nextToken,
                    userID: userInfo.attributes.sub,
                    storyID: {
                        eq: storyID
                    }
                }
            ))

            if (UserData.data.inProgressStoriesByUserByStory.items.length > 0) {
                setInProgressID(UserData.data.inProgressStoriesByUserByStory.items[0].id);
                console.log('progress begins at ', UserData.data.inProgressStoriesByUserByStory.items[0].time/1000 )
                setInitialPosition(Math.floor(UserData.data.inProgressStoriesByUserByStory.items[0].time/1000))
                //await TrackPlayer.seekTo(UserData.data.inProgressStoriesByUserByStory.items[0].time/1000)
                //setPosition(UserData.data.inProgressStoriesByUserByStory.items[0].time);
                //setInitialPosition(UserData.data.inProgressStoriesByUserByStory.items[0].time);
            } else {
                setInProgressID(null)
            }

            if (UserData.data.inProgressStoriesByUserByStory.nextToken) {
                fetchProgress(UserData.data.inProgressStoriesByUserByStory.nextToken)
            }

        }

        const fetchFinished = async (nextToken : any) => {

            const userInfo = await Auth.currentAuthenticatedUser();

            const UserData = await API.graphql(graphqlOperation(
                finishedStoriesByUserByStory, {
                    nextToken,
                    userID: userInfo.attributes.sub,
                    storyID: {
                        eq: storyID
                    }
                }
            ))

            if (UserData.data.finishedStoriesByUserByStory.items.length > 0) {
                setIsFinished(true);
            }

            if (UserData.data.finishedStoriesByUserByStory.nextToken) {
                fetchFinished(UserData.data.finishedStoriesByUserByStory.nextToken)
            }

            if (UserData.data.finishedStoriesByUserByStory.nextToken === null && UserData.data.finishedStoriesByUserByStory.items.length === 0) {
                setIsFinished(false);
            }
        }

        if (isPlaying === true) {
            //setPosition(0);
            setIsPlaying(false);
            TrackPlayer.reset()
            ProgressCheck()
            fetchStory();
            fetchUser();
            fetchFinished(null);
            fetchProgress(null);
        } else {
            TrackPlayer.reset()
            fetchStory();
            fetchUser();
            fetchFinished(null);
            fetchProgress(null);
        }
    }, [storyID])

//audio player

    const [isPlaying, setIsPlaying] = useState(false);

    const [position, setPosition] = useState(0); //position in milliseconds

    const [initialposition, setInitialPosition] = useState(0); //position in milliseconds

    const [slideLength, setSlideLength] = useState(0); //slide length

    const onClose = async () => {
        ProgressCheck();
        setStoryID(null);
        setStory(null);
        setInitialPosition(0)
        setIsPlaying(false);
        setComplete(false);
        setInProgressID(null)
        await TrackPlayer.reset()
    }

//unpin a story
    const unPinStory = async (storyID : any) => {

        let arr = userPins;

        const getThePins = async () => {

            let userInfo = await Auth.currentAuthenticatedUser();

            console.log('story to delete', storyID)

            let getPin = await API.graphql(graphqlOperation(
                pinnedStoriesByUserByStory, {
                    userID: userInfo.attributes.sub,
                    storyID: {
                        eq: storyID
                    },
                }
            ))

            console.log(getPin.data.pinnedStoriesByUserByStory.items[0].story.title)

            if (getPin.data.pinnedStoriesByUserByStory.items[0]?.storyID === storyID) {
                let deleteConnection = await API.graphql(graphqlOperation(
                    deletePinnedStory, {input: {"id": getPin.data.pinnedStoriesByUserByStory.items[0].id}}
                ))
                console.log(deleteConnection)

                const index = arr.indexOf(storyID);

                arr.splice(index, 1); 

                setUserPins(arr)
                setRefreshPins(Math.random())
            } else {
                return
            }
        }
        
        getThePins(); 
       
    }

//rating state (if rated or not)
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

//check if the story is rated or not
    const [isRated, setIsRated] = useState(false);

    //if item is finished state
    const [isFinished, setIsFinished] = useState(false);


//add the story to the history list when finished by creating a new history item
    const AddToHistory = async (storytoaddID : any) => {
        
        //check if the story is already in the history
        let userInfo = await Auth.currentAuthenticatedUser();

        let arr = userFinished;

        //if item is not in history then...
        if (isFinished === false) {
            console.log('is finished', isFinished)
            //create the history object
            await API.graphql(graphqlOperation(
                    createFinishedStory, {input: {
                        userID: userInfo.attributes.sub, 
                        storyID: storytoaddID, 
                        type: 'FinishedStory', 
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        genreID: Story?.genreID,
                    }}
                ))

            const upda = await API.graphql(graphqlOperation(
                updateStory, {input: {id: storytoaddID, numListens: Story?.numListens + 1}}
            ))

            console.log(upda)

            console.log('added to history')

            arr.push(storytoaddID)

            setUserFinished(arr)

            //unpin the story, if pinned
            unPinStory(storytoaddID);

            //delete the inProgress story, if it exists
            if (inProgressID !== null) {
                const deleteprog = await API.graphql(graphqlOperation(
                    deleteInProgressStory, {input: {
                        id: inProgressID
                    }}
                ))
                console.log('deleted', deleteprog)
                setProgUpdate(!progUpdate);
                setInProgressID(null);
            }

            //navigate to the story page and open the ratings modal, if not already rated
                RootNavigation.navigate('StoryScreen', { storyID: storyID, update: Math.random() });
                setStoryID(null);
                setStory(null);
                setInitialPosition(0)
                //setIsPlaying(false);
                setComplete(false);
                //setInProgressID(null)
                await TrackPlayer.reset()
        } else {
            console.log('its finished', isFinished)
            const upda = await API.graphql(graphqlOperation(
                updateStory, {input: {id: storytoaddID, numListens: Story?.numListens + 1}}
            ))

            console.log('story is', upda)
            //delete the inProgress story, if it exists

            if (inProgressID !== null) {
                const deleteprog = await API.graphql(graphqlOperation(
                    deleteInProgressStory, {input: {
                        id: inProgressID
                    }}
                ))
                console.log('deleted', deleteprog)
                setProgUpdate(!progUpdate);
                setInProgressID(null);
            }

            console.log('got this far')

            //unpin the story, if pinned
            unPinStory(storytoaddID);

            
            RootNavigation.navigate('StoryScreen', { storyID: storytoaddID, update: Math.random() });
            setStoryID(null);
            setStory(null);
            setInitialPosition(0)
            //setIsPlaying(false);
            setComplete(false);
            //setInProgressID(null)
            await TrackPlayer.reset()
        }
        
    
    }

//add the story as in progress
    const AddProgress = async () => {
        let userInfo = await Auth.currentAuthenticatedUser();

        if (storyID !== null && playbackProgress.position !== 0 && Story?.approved === true) {
            let time = Math.floor(playbackProgress.position*1000)
            console.log('time is', time)
            let response = await API.graphql(graphqlOperation(
                createInProgressStory, {input: {
                    userID: userInfo.attributes.sub,
                    storyID: storyID,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    time: time
                }}
            ))
            console.log('created new progress story')
            setInProgressID(response.data.createInProgressStory.id)
            setProgUpdate(!progUpdate)
        }    
    }

//update the story that is in progress
    const UpdateProgress = async () => {
        if (playbackProgress.position !== 0) {
            if (inProgressID === null) {
                return
            }
            let time = Math.floor(playbackProgress.position*1000)
            console.log('updated time is', time)
            await API.graphql(graphqlOperation(
                updateInProgressStory, {input: {
                    id: inProgressID,
                    time: time,
                }}
            ))
            console.log('updated progress to ', time)
            setProgUpdate(!progUpdate)
        }
    }

//check if a progress story for this user already exists
    const ProgressCheck = () => {
        console.log('progress check id is', inProgressID)
        if (inProgressID === null) {
            console.log('add progress')
            AddProgress()
        } else {
            console.log('update progress')
            UpdateProgress()
        }
        //setProgUpdate(!progUpdate)
    }
    
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(playbackProgress.position / 60);
        let seconds = Math.floor((playbackProgress.position % 60));
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

    function convertToTime () {
        let minutes = Math.floor(slideLength / 60);
        let seconds = Math.floor((slideLength % 60));
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }  

    const playbackState = usePlaybackState();
    //const ifPlaying = playbackState === State.Playing;

    useEffect(() => {
        console.log('playbackState is', playbackState)
        if (playbackState === State.Playing) {
            setIsPlaying(true)
        } else {
            setIsPlaying(false)
        }
    }, [playbackState]);

    useEffect(() => {
        const domorestuff = async () => {
            if (initialposition !== 0 && playbackState === State.Ready) {
                await TrackPlayer.seekTo(initialposition)
                setInitialPosition(0)
            }
        }
        
        domorestuff()
    }, [playbackState])

//audio play and pause control
    async function PlayPause() {

        if (complete === false) {
            return;
        }

        if (isPlaying === false && complete === true) {
            //await TrackPlayer.seekTo(position/1000);
            await TrackPlayer.play();
            await TrackPlayer.removeUpcomingTracks();
            //setIsPlaying(true)
            //const positiontrack = await TrackPlayer.getDuration();
            //setSlideLength(positiontrack*1000);
            ProgressCheck();
        }
        if (isPlaying === true && complete === true && playbackProgress.position + 2 <= playbackProgress.duration) {
            await TrackPlayer.pause();  
            ProgressCheck();
        }    
    }

    const playbackProgress = useProgress()

    const [doneWithStory, setDoneWithStory] = useState(false)

    // useEffect(() => {
    //     if (position === slideLength) {
    //         AddToHistory();
    //     }
    // }, [doneWithStory])

    // useInterval(() => {
    //     // if (isPlaying === true && position < slideLength) {
    //     //     if (position + 1000 > slideLength) {
    //     //         setPosition(slideLength);
    //     //         setIsPlaying(false);
    //     //         setDoneWithStory(true);
    //     //     } else {
    //     //         setPosition(position + 1000);   
    //     //     }
            
    //     // }
    //     // if (position >= slideLength) {
    //     //     setPosition(0)
    //     //     setIsPlaying(false);
    //     //     AddToHistory();
    //     // }

    //     console.log(playbackProgress)

    //   }, 1000);

      useTrackPlayerEvents([Event.PlaybackQueueEnded], async event => {
        if (event.type === Event.PlaybackQueueEnded) {
          console.log('track ended')
          //await TrackPlayer.reset();
          //setIsPlaying(false);
          AddToHistory(storyID);
        }
      });

    // useEffect(() => {

    //     console.log('did the track end?', isPlaying, playbackState, playbackProgress)
    //     if (
    //         playbackProgress.position + 5 >= playbackProgress.duration && 
    //         playbackProgress.duration !== 0 && 
    //         isPlaying === true &&
    //         playbackState === State.Stopped
    //     ) {
    //        console.log('track ended')
    //        AddToHistory(storyID);
    //     }
    // }, [playbackState])
    
    if (!Story) {
        return null;
    }

    //slider functions
    // const SetPosition = (value : any) => {
    //     setPosition(value[0])
    // }

    const StoryPosition = async (value : any) => {
        TrackPlayer.seekTo(Math.floor(value[0]));
    }



    return (
    
    <SafeAreaView>
        <View >
            {/* the background of the track player */}
            <View style={{
                height: isExpanded === true ? SCREEN_WIDTH*0.75 : 0, 
                width: isExpanded === true ? SCREEN_WIDTH : 0, 
                position: 'absolute', 
                bottom: Platform.OS === 'android' ? SCREEN_HEIGHT + 30 : SCREEN_HEIGHT - getStatusBarHeight() + 20,
            }}>
                <ImageBackground
                    resizeMode='cover'
                    style={{
                        width: isExpanded === false ? SCREEN_WIDTH : 0,
                        height: isExpanded === false ? (SCREEN_WIDTH*0.75) : 0,
                        backgroundColor: '#363636',
                    }}
                    source={imageU.length > 1 ? {uri: imageU} : {uri: 'https://static.vecteezy.com/system/resources/thumbnails/010/282/085/small/black-background-studio-blank-black-and-gray-background-studio-backdrop-wallpaper-inside-room-abstract-dark-gray-gradient-spotlight-floor-texture-background-free-photo.jpg' }}
                >
                </ImageBackground>
            </View>

            <View style={[{   
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    overflow: 'hidden',
                    bottom: isRootScreen === true || isExpanded === false ? 0 : 55 ,
                    //zIndex: 10,
                    height: isExpanded === false ? (Platform.OS === 'ios' ? SCREEN_HEIGHT  : SCREEN_HEIGHT ) : 60,
                }]}>
                    <LinearGradient 
                        colors={[isExpanded ? '#082323' : '#082323', isExpanded ? '#082323' : '#082323', isExpanded ? '#082323' : '#000', isExpanded ? '#082323' : '#000', isExpanded ? '#082323' : 'transparent' ]}
                        style={{ }}
                        locations={[0.0, 0.2, 0.4, 0.65, 0.9]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <View style={{ height: isExpanded === false ? 0 : 60, flexDirection: 'row', alignItems: 'center', 
                            //marginTop: isExpanded ? 0 : (Platform.OS === 'ios' ? 80 : 160)
                        }}>
                            { isExpanded === true ? (
                                <TouchableWithoutFeedback onPress={onChangeHandler}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                opacity: isExpanded ? 1 : 0,
                                                fontSize: 18,
                                                paddingLeft: 20,
                                                color: '#fff',
                                                width: '75%'
                                        }}>
                                            {Story?.title}
                                        </Text>
                                    
                                        <TouchableOpacity onPress={PlayPause}>
                                            <View style={{opacity: isExpanded ? 1 : 0, }}>
                                                <FontAwesome5 
                                                    name={isPlaying === true ? 'pause' : 'play'}
                                                    color='#ffffffCC'
                                                    size={20}
                                                    style={{ paddingHorizontal: 40,}}
                                                />
                                        </View>
                                        </TouchableOpacity>
                                        
                                    </View> 
                                </TouchableWithoutFeedback>
                            ) : null } 
                        </View>
                        
    {/* Expanded View elements */}
                <View
                    style={{
                        marginTop: 0, 
                        opacity: 1,
                        justifyContent:'flex-end',
                    }}>
                    { isExpanded === false ? (
                        <View style={{ justifyContent: 'space-around', marginBottom: 0, height: Dimensions.get('window').height, backgroundColor: 'transparent', paddingTop: 0}}>
                            
                            <View>
                                {/* these are the action buttons */}
                                <View style={{height: Dimensions.get('window').height*0.3, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingBottom: 0, marginTop: 10 }}>
                                    {Story.imageUri ? (null) : (
                                        <View style={{ position: 'absolute', left: Dimensions.get('window').width/2 - 40, top: 0, backgroundColor: 'transparent'}}>
                                            <FontAwesome5 
                                                name={Story?.genre?.icon}
                                                color='#ffffffa5'
                                                size={50}
                                            />
                                        </View>
                                    )}
                                        <View style={{marginTop: Platform.OS === 'ios' ? 20 : 0}}>
                                            <TouchableOpacity onPress={onClose}>
                                                <View style={ [styles.button, {left: -20}]}>
                                                    <AntDesign 
                                                        name='close'
                                                        size={22}
                                                        color='#fff'
                                                    />
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={onChangeHandler}>
                                                <View style={ [styles.button, {left: -20}]}>
                                                    <FontAwesome5 
                                                        name='chevron-down'
                                                        size={22}
                                                        color='#fff'
                                                    />
                                                </View>
                                            </TouchableOpacity> 
                                        </View>
                                        <View style={{marginTop: Platform.OS === 'ios' ? 20 : 0}}>
                                            <View style={ [styles.button, {right: -20}]}>
                                                <FontAwesome 
                                                    name='commenting-o'
                                                    size={22}
                                                    color='#fff'
                                                    onPress={() => {RootNavigation.navigate('StoryScreen', { storyID: storyID, path: 'commenting' });
                                                        onChangeHandler();}
                                                    }
                                                    style={{ }}
                                                />
                                            </View>
                            
                                            <View style={ [styles.button, {right: -20}]}>
                                                <FontAwesome 
                                                    name='share'
                                                    size={22}
                                                    color='white'
                                                    onPress={() => ShareStory({id: Story?.id, title: Story?.title})}
                                                    style={{ }}
                                                />
                                            </View>
                                        </View>  
                                    </View>
                                </View>

                                {/* this is the body */}
                                <View style={{height: Dimensions.get('window').height*0.4}}>
                                    <TouchableWithoutFeedback 
                                    onPress={
                                        () => {RootNavigation.navigate('StoryScreen', { storyID: storyID });
                                        onChangeHandler();}
                                    }>
                                    <View style={{ alignItems: 'center',  marginHorizontal: 40, marginVertical: 20, }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#fff', textAlign: 'center' }}>
                                            {Story?.title}
                                        </Text>

                                        <View style={{ width: Dimensions.get('window').width - 40, flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-open'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.author}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-reader'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.narrator}
                                                </Text>
                                            </View>
                                    </View>
                                    </View>  
                                    </TouchableWithoutFeedback>

                                    <View style={{ alignItems: 'center', marginHorizontal: 20}}>
                                        <View style={{marginTop: -10,}}>
                                            <View style={[{flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width - 80}]}>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <FontAwesome5 
                                                        name={Story?.genre?.icon}
                                                        color='#ffffffa5'
                                                        size={15}
                                                        style={{marginRight: 10}}
                                                    />
                                                    <Text style={[ { color: Story?.genre?.color, fontSize: 16, textTransform: 'capitalize' }]}>
                                                        {Story?.genre?.genre} 
                                                    </Text>
                                                </View>
                                                
                                                <View style={{justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                                                    <FontAwesome 
                                                        name={isRated === true ? 'star' : 'star-o'}
                                                        size={17}
                                                        color={isRated === true || isFinished === true ? 'gold' : 'white'}
                                                        onPress={onLikePress}
                                                        style={{marginHorizontal: 6 }}
                                                    />
                                                    <Text style={{textAlign: 'center', color: '#e0e0e0', fontSize: 17}}>
                                                        {(Story?.ratingAvg/10).toFixed(1)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        {Platform.OS === 'android' ? (
                                            <View style={{ height: 110, marginTop: 20, marginHorizontal: -20 }}>
                                            <Text style={[styles.highlight, {textAlign: 'center'}]}>
                                                {Story?.summary}
                                            </Text>
                                        </View>
                                        ) : null}
                                        
                                    </View>
                                </View>

                                {/* this is the track player */}
                                <View style={{height: Dimensions.get('window').height*0.3, justifyContent: 'center'}}>
                                    <View style={{width: Dimensions.get('window').width, justifyContent: 'space-around', alignSelf: 'center' , flexDirection: 'row', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={async () => {
                                            if (playbackProgress.position - 30 > 0 ){
                                                await TrackPlayer.seekTo(Math.round(playbackProgress.position - 30));
                                            } else {
                                                await TrackPlayer.seekTo(0);
                                            }
                                            
                                            }}>
                                                <Feather 
                                                    name='chevrons-left'
                                                    color='#ffffffCC'
                                                    size={50}
                                                />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={PlayPause}>
                                                <FontAwesome5 
                                                    name={isPlaying === true ? 'pause' : 'play'}
                                                    color='#ffffffCC'
                                                    size={50}
                                                />
                                            
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={async() => { 
                                            if (playbackProgress.position + 30 < playbackProgress.duration ){
                                                await TrackPlayer.seekTo(Math.round(playbackProgress.position + 30));
                                            } else {
                                                await TrackPlayer.seekTo(playbackProgress.duration);
                                            }
                                            }}>
                                                <Feather 
                                                    name='chevrons-right'
                                                    color='#ffffffCC'
                                                    size={50}
                                                />
                                        </TouchableOpacity>
                                    </View>   
                                    
                                    
                                        <View style={{ marginTop: 20, width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',}}>
                                            <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                                {millisToMinutesAndSeconds()}
                                            </Text>
                                            <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                                {convertToTime()}
                                            </Text>
                                        </View>

                                            <View style={{alignItems: 'center', marginTop: Platform.OS === 'ios' ? 20 : 0}}>
                                    
                                            <Slider
                                                containerStyle={{width: '84%', height: 20}}
                                                disabled={false}
                                                minimumTrackTintColor="cyan"
                                                maximumTrackTintColor="#ffffffa5"
                                                thumbTintColor='#fff'
                                                value={playbackProgress.position}
                                                step={1}
                                                minimumValue={0}
                                                maximumValue={slideLength} //function set to the length of the audio file
                                                onSlidingComplete={(value) => StoryPosition(value)}
                                            />
                                        
                                        </View>
                                        
                                </View>
                            </View>
                            
                            
                        </View>
                    ) : null } 
                    
                </View>
            </LinearGradient>
            </View>
        </View>
    </SafeAreaView>
    );
}


const styles = StyleSheet.create ({
    container: {
        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#363636a5',
        borderRadius: 50,
        width: 36,
        height: 36,
        margin: 10,
    },
    username: {
        color: '#ffffffCC',
        fontSize: 16,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    highlight: { 
        color: '#ffffffCC',
        fontSize: 14,
        borderRadius: 15,
        padding: 10,
        //backgroundColor: '#363636CC',
    },
   
});

export default AudioPlayer;
