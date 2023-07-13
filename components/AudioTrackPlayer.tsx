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
    SafeAreaView
} from 'react-native';

//import PreStoryAd from './PreStoryAd';
import * as Device from 'expo-device';

//import {AdMobRewarded,setTestDeviceIDAsync} from 'expo-ads-admob';

import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {graphqlOperation, API, Storage, Auth} from 'aws-amplify';
import { getStory, getUser } from '../src/graphql/queries';
import { deletePinnedStory, createFinishedStory, updateStory, createInProgressStory, updateInProgressStory, deleteInProgressStory } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';
import * as RootNavigation from '../navigation/RootNavigation';
import ShareStory from './functions/ShareStory';

import TrackPlayer, {State, useProgress, Capability, usePlaybackState} from 'react-native-track-player';
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

    //pin to playlist functions
    const [nextToken, setNextToken] = useState()

    const { userPins } = useContext(AppContext);
    const { setUserPins } = useContext(AppContext);

    const { userFinished } = useContext(AppContext);
    const { setUserFinished } = useContext(AppContext);

//get the global page state for the audio player
    const { isRootScreen } = useContext(AppContext);

//get context for storyID
    const { premium } = useContext(AppContext);
    const { setPremium } = useContext(AppContext);

//get context for storyID
    const { storyID } = useContext(AppContext);
    const { setStoryID } = useContext(AppContext);

    //get context for storyID
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
useEffect(() => {
    setInProgressID(null);
}, [storyID])

useEffect(() => {
    //if (premium === true) {
        setComplete(true)
    //}
}, [storyID])

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
    const [imageU, setImageU] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        if (isPlaying === true) {
            const DoStuff = async () => {
                setPosition(0);
                setInitialPosition(0);
                setIsPlaying(false);
                ProgressCheck()
                await TrackPlayer.reset()
            }
            DoStuff()
        }
    }, [storyID])

//fetch the story and user attributes and audioUri from the s3 bucket
    useEffect(() => {

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
                        artist: storyData.data.getStory.author,
                        artwork: imageresponse, // Load artwork from the network
                        duration: storyData.data.getStory.time // Duration in seconds
                    }]);
                    let trackObject = await TrackPlayer.getQueue();
                    console.log('slide length is')
                    console.log(trackObject[0].duration)
                    
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

            for (let i = 0; i < UserData.data.getUser.Rated.items.length; i++) {
                if (UserData.data.getUser.Rated.items[i].storyID === storyID) {
                    setIsRated(true);
                }
            }

            for (let i = 0; i < UserData.data.getUser.Finished.items.length; i++) {
                if (UserData.data.getUser.Finished.items[i].storyID === storyID) {
                    setIsFinished(true);
                }
            }
            for (let i = 0; i < UserData.data.getUser.inProgressStories.items.length; i++) {
                if (UserData.data.getUser.inProgressStories.items[i].storyID === storyID) {
                    setInProgressID(UserData.data.getUser.inProgressStories.items[i].id);
                    setPosition(UserData.data.getUser.inProgressStories.items[i].time);
                    setInitialPosition(UserData.data.getUser.inProgressStories.items[i].time);
                    return;
                }
            }
        }

        if (isPlaying === true) {
            setPosition(0);
            setIsPlaying(false);
            ProgressCheck()
            fetchStory();
            fetchUser();
        } else {
            fetchStory();
            fetchUser();
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
        setPosition(0);
        setInitialPosition(0)
        setIsPlaying(false);
        setComplete(false);
        await TrackPlayer.reset()
    }

//unpin a story
    const unPinStory = async ({storyID} : any) => {
        
        let userInfo = await Auth.currentAuthenticatedUser();

        let getPin = await API.graphql(graphqlOperation(
            getUser, {nextToken, id: userInfo.attributes.sub}
        ))

        const getThePins = async () => {
            for (let i = 0; i < getPin.data.getUser.Pinned.items.length; i++) {
                if (getPin.data.getUser.Pinned.items[i].storyID === storyID) {
                    let deleteConnection = await API.graphql(graphqlOperation(
                        deletePinnedStory, {input: {"id": getPin.data.getUser.Pinned.items[i].id}}
                    ))
                    console.log(deleteConnection)
                }

                if (getPin.data.getUser.Pinned.nextToken) {
                    setNextToken(getPin.data.getUser.Pinned.nextToken);
                    getThePins();
                    return;
                }
            }

                const index = userPins.indexOf(storyID);

                const x = userPins.splice(index, 1);

                setUserPins(x)
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
const AddToHistory = async () => {
    
    //check if the story is already in the history
    let userInfo = await Auth.currentAuthenticatedUser();

    //if item is not in history then...
    if (isFinished === false) {
        //create the history object
        await API.graphql(graphqlOperation(
                createFinishedStory, {input: {
                    userID: userInfo.attributes.sub, 
                    storyID: storyID, 
                    type: 'FinishedStory', 
                    createdAt: new Date(),
                    genreID: Story?.genreID,
                    nsfw: Story?.nsfw
                }}
            ))

        await API.graphql(graphqlOperation(
            updateStory, {input: {id: storyID, numListens: Story?.numListens + 1}}
        ))

        setUserFinished(userFinished.push(storyID))

        //unpin the story, if pinned
        unPinStory(storyID);

        //delete the inProgress story, if it exists
        await API.graphql(graphqlOperation(
            deleteInProgressStory, {input: {
                id: inProgressID
            }}
        ))

        setProgUpdate(!progUpdate);

        setInProgressID(null);

        //navigate to the story page and open the ratings modal, if not already rated
            RootNavigation.navigate('StoryScreen', { storyID: storyID, update: Math.random() });
            onClose();
    } else {
        await API.graphql(graphqlOperation(
            updateStory, {input: {id: storyID, numListens: Story?.numListens + 1}}
        ))
        //delete the inProgress story, if it exists
        await API.graphql(graphqlOperation(
            deleteInProgressStory, {input: {
                id: inProgressID
            }}
        ))

        setProgUpdate(!progUpdate);

          //unpin the story, if pinned
          unPinStory(storyID);

        setInProgressID(null);
        RootNavigation.navigate('StoryScreen', { storyID: storyID, update: Math.random() });
        onClose();
    }
    
   
}

//add the story as in progress
const AddProgress = async () => {
    let userInfo = await Auth.currentAuthenticatedUser();

    if (storyID !== null) {
        let response = await API.graphql(graphqlOperation(
            createInProgressStory, {input: {
                userID: userInfo.attributes.sub,
                storyID: storyID,
                createdAt: new Date(),
                updatedAt: new Date(),
                time: position
            }}
        ))
        setInProgressID(response.data.createInProgressStory.id)
    }    
}

//update the story that is in progress
const UpdateProgress = async () => {
    if (position !== 0) {
        await API.graphql(graphqlOperation(
            updateInProgressStory, {input: {
                id: inProgressID,
                time: position,
            }}
        ))
    }
    
    
}

//check if a progress story for this user already exists
const ProgressCheck = () => {
    if (inProgressID === null) {
        AddProgress()
    } else {
        UpdateProgress()
    }
    setProgUpdate(!progUpdate)
}
    

//slider functions
    function SetPosition(value) {
        setPosition(value)
    }

    async function StoryPosition (value) { 
       TrackPlayer.seekTo(Math.round(value)/1000);
        setPosition(value);
    }

    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(position / 60000);
        let seconds = ((position % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

    function convertToTime () {
        let minutes = Math.floor(slideLength / 60000);
        let seconds = Math.floor((slideLength % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }  

    const playbackState = usePlaybackState();
    //const ifPlaying = playbackState === State.Playing;

    useEffect(() => {
    if (playbackState === 2) {
        setIsPlaying(true)
    } else if (playbackState === 3) {
        setIsPlaying(false)
    } else if (playbackState === State.Playing) {
        setIsPlaying(true)
    } else {
        setIsPlaying(false)
    }
    }, [playbackState]);

//audio play and pause control
    async function PlayPause() {

        if (complete === false) {
            return;
        }

        if (isPlaying === false && complete === true) {
            TrackPlayer.play();
            TrackPlayer.seekTo(position/1000);
            //const positiontrack = await TrackPlayer.getDuration();
            //setSlideLength(positiontrack*1000);
            ProgressCheck();
        }
        if (isPlaying === true && complete === true) {
            TrackPlayer.pause();  
            ProgressCheck();
        }    
    }

    useInterval(() => {
        if (isPlaying === true && position < slideLength) {
        setPosition(position + 1000);
        }
        if (isPlaying === true && position >= slideLength) {
            setPosition(0);
            setIsPlaying(false);
            AddToHistory();
            console.log('added to history')
        }
      }, 1000);
    
    if (!Story) {
        return null;
    }


    return (
    
    <SafeAreaView>
        <View style={{}}>
            <View style={{
                flex: 1,
                height: isExpanded === true ? SCREEN_WIDTH*0.75 : 0, 
                width: isExpanded === true ? SCREEN_WIDTH : 0, 
                position: 'absolute', 
                bottom: Platform.OS === 'android' ? SCREEN_HEIGHT + 30 : SCREEN_HEIGHT - getStatusBarHeight() + 20,
                }}>
                <ImageBackground
                resizeMode='cover'
                    style={{
                        //flex: 1,
                        width: isExpanded === false ? SCREEN_WIDTH : 0,
                        height: isExpanded === false ? (SCREEN_WIDTH*0.75) : 0,
                        backgroundColor: '#363636',
                        
                    }}
                    source={{uri: imageU}}
                >
                </ImageBackground>
            </View>

            <View
                style={[
                    //animatedHeight, 
                    {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        overflow: 'hidden',
                        bottom: isRootScreen === true || isExpanded === false ? 0 : 55 ,
                        //zIndex: 10,
                        height: isExpanded === false ? (Platform.OS === 'ios' ? SCREEN_HEIGHT  : SCREEN_HEIGHT ) : 60,
                    },
                ]}>
                    <LinearGradient 
                        colors={[isExpanded ? '#165C5C' : '#3B6980', isExpanded ? '#165C5C' : '#0E3F3F', isExpanded ? '#165C5C' : '#000', isExpanded ? '#165C5C' : '#000', isExpanded ? '#165C5C' : 'transparent' ]}
                        style={{ flex: 1}}
                        locations={[0.0, 0.2, 0.4, 0.65, 0.9]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <View style={{ height: isExpanded === false ? 0 : 60, flexDirection: 'row', alignItems: 'center', 
                            //marginTop: isExpanded ? 0 : (Platform.OS === 'ios' ? 80 : 160)
                        }}>
                            { isExpanded === true ? (
                                <TouchableWithoutFeedback onPress={onChangeHandler}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    
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
                        <View style={{ justifyContent: 'space-around', marginBottom: 50, height: '100%', backgroundColor: 'transparent', paddingTop: 60}}>
                            
                            <View>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, paddingBottom: 100, marginTop: Platform.OS === 'android' ? -20 : 0}}>
                                    {Story.imageUri ? (null) : (
                                        <View style={{ position: 'absolute', left: Dimensions.get('window').width/2 - 40, top: 80, backgroundColor: 'transparent'}}>
                                            <FontAwesome5 
                                                name={Story?.genre?.icon}
                                                color='#ffffffa5'
                                                size={50}
                                            />
                                        </View>
                                    )}
                                        <View>
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
                                        <View>
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
                                    {Platform.OS === 'android' || 'ios' ? (
                                        <View style={{ height: 110, marginTop: 20, marginHorizontal: -20 }}>
                                        <Text style={[styles.highlight, {textAlign: 'center'}]}>
                                            {Story?.summary}
                                        </Text>
                                    </View>
                                    ) : null}
                                    
                                </View>
                            </View>
                            
                            <View style={{}}>
                                <TouchableOpacity onPress={PlayPause}>
                                    <View style={{alignSelf: 'center' }}>
                                        <FontAwesome5 
                                            name={isPlaying === true ? 'pause' : 'play'}
                                            color='#ffffffCC'
                                            size={50}
                                        />
                                    </View>
                                </TouchableOpacity>
                                
                                
                                    <View style={{ marginTop: 20, width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',}}>
                                        <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                            {millisToMinutesAndSeconds()}
                                        </Text>
                                        <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                            {convertToTime()}
                                        </Text>
                                    </View>

                                    <View style={{ alignItems: 'center', marginTop: Platform.OS === 'ios' ? 20 : 0}}>
                                        <Slider
                                            style={{width: 320, height: 10}}
                                            minimumTrackTintColor="cyan"
                                            maximumTrackTintColor="#ffffffa5"
                                            thumbTintColor='#fff'
                                            //tapToSeek={true}
                                            value={initialposition}
                                            step={1000}

                                            minimumValue={0}
                                            maximumValue={slideLength} //function set to the length of the audio file
                                            onValueChange={SetPosition} //function: when slider changes, slider value = SetPosition
                                            onSlidingComplete={StoryPosition}
                                        />
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