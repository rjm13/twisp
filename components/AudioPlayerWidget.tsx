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

import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {graphqlOperation, API, Storage, Auth} from 'aws-amplify';
import { getStory, getUser, pinnedStoriesByUser } from '../src/graphql/queries';
import { deletePinnedStory, createFinishedStory, updateStory, createInProgressStory, updateInProgressStory, deleteInProgressStory } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';
import * as RootNavigation from '../navigation/RootNavigation';
//import ShareStory from './functions/ShareStory';

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


useEffect(() => {
    if (premium === false && storyID !== null) {
       //PreStoryAd(); 
    }
}, [storyID])


//set the progress story ID
useEffect(() => {
    setInProgressID(null);
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
            setPosition(0);
            setIsPlaying(false);
            ProgressCheck()
        }
    }, [storyID])

//fetch the story attributes and audioUri from the s3 bucket
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
                    setPosition(0);
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
                // console.log(UserData.data.getUser.Rated.items[i].storyID)
                // console.log(storyID)
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
                    setPosition(UserData.data.getUser.inProgressStories.items[i].time)
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
    const [sound, setSound] = useState();

    const [isPlaying, setIsPlaying] = useState(false);

    const [position, setPosition] = useState(0); //position in milliseconds

    const [slideLength, setSlideLength] = useState(0); //slide length

    const onClose = () => {
        setStoryID(null);
        setStory(null);
        setPosition(0);
        setIsPlaying(false);
        ProgressCheck();
    }

//unpin a story
const unPinStory = async ({storyID} : any) => {

    let arr = userPins;

    let userInfo = await Auth.currentAuthenticatedUser();


    const getThePins = async (nextToken: any) => {


        let getPin = await API.graphql(graphqlOperation(
            pinnedStoriesByUser, {nextToken, userID: userInfo.attributes.sub}
        ))

        for (let i = 0; i < getPin.data.pinnedStoriesByUser.items.length; i++) {
            if (getPin.data.pinnedStoriesByUser.items[i].storyID === storyID) {
                let deleteConnection = await API.graphql(graphqlOperation(
                    deletePinnedStory, {input: {"id": getPin.data.pinnedStoriesByUser.items[i].id}}
                ))
                console.log(deleteConnection)
            }

            const index = arr.indexOf(storyID);

            arr.splice(index, 1);

        }

        if (getPin.data.pinnedStoriesByUser.nextToken) {
            //setNextToken(getPin.data.pinnedStoriesByUser.nextToken);
            getThePins(getPin.data.pinnedStoriesByUser.nextToken);
            return;
        }     
    }
    
    getThePins(null); 
    setUserPins(arr)
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

        //unpin the story, if pinned
        unPinStory();

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

        setInProgressID(null);
        RootNavigation.navigate('StoryScreen', { storyID: storyID, update: Math.random() });
        onClose();
    }
    
   
}

//add the story as in progress
const AddProgress = async () => {
    let userInfo = await Auth.currentAuthenticatedUser();

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

//update the story that is in progress
const UpdateProgress = async () => {
    await API.graphql(graphqlOperation(
        updateInProgressStory, {input: {
            id: inProgressID,
            time: position,
        }}
    ))
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
        await sound.setPositionAsync(value);
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

//audio play and pause control
    async function PlayPause() {

        console.log('Loading Sound');
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: false,
            playThroughEarpieceAndroid: false,
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            
          });
          console.log(AudioUri)
        const { sound } = await Audio.Sound.createAsync(
            
            {uri: AudioUri},
            //require('../assets/zelda.mp3'),
            {
                shouldPlay: true,
                rate: 1.0,
                shouldCorrectPitch: false,
                volume: 1.0,
                isMuted: false,
                isLooping: false,
            },
        );
        setSound(sound);

        let time = await sound.getStatusAsync();
        setSlideLength(time.durationMillis);

        if (isPlaying === false) {
            console.log('Playing Sound');
            await sound.playAsync(); 
            setIsPlaying(true);
            await sound.setPositionAsync(position);
            ProgressCheck();
        }
        if (isPlaying === true) {
            await sound.pauseAsync();
            setIsPlaying (false);     
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
        }
      }, 1000);
    
    useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
        }
            
        : undefined;
    }, [sound, storyID]);

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
                                                <Text style={[ { color: Story?.genre?.PrimaryColor, fontSize: 16, textTransform: 'capitalize' }]}>
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
                                            value={position}
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