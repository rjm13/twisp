import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    ImageBackground, 
    ScrollView, 
    TouchableOpacity, 
    Animated,
    TouchableWithoutFeedback,
    FlatList,
    Image,
    TextInput,
    ActivityIndicator,
    Platform,
    KeyboardAvoidingView,
    Modal
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from 'react-native-uuid';

import * as Animatable from 'react-native-animatable';
import { formatRelative, parseISO } from "date-fns";
import ShareStory from '../components/functions/ShareStory';
import useStyles from '../styles';

import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';

import { 
    getStory, 
    getUser, 
    ratingsByUser, 
    commentsByStory, 
    eroticStoryTagsByStoryId, 
    pinnedStoriesByUser,
    listReactionTypes
} from '../src/graphql/queries';

import { 
    createComment, 
    createRating, 
    updateRating, 
    updateStory, 
    deletePinnedStory, 
    createPinnedStory,
    createReaction
} from '../src/graphql/mutations';

import { AppContext } from '../AppContext';


const StoryScreen  = ({navigation} : any) => {

//const styles = useStyles();

//recieve story ID as props
    const route = useRoute();
    const {storyID, update} = route.params;

    const { userPins, userRates, userFinished } = useContext(AppContext);
    const { setUserPins, setUserRates, setIsRootScreen, setStoryID } = useContext(AppContext);

//updates the screen after a new rating is made
    const [didUpdate, setDidUpdate] = useState(false);

    const [nextToken, setNextToken] = useState()
   

    const PinStory = async ({storyID} : any) => {
    
        let userInfo = await Auth.currentAuthenticatedUser();
    
        let pins = userPins
    
        let createPin = await API.graphql(graphqlOperation(
            createPinnedStory, {input: {
                userID: userInfo.attributes.sub, 
                storyID: storyID,
                type: "PinnedStory",
                createdAt: new Date(),
            }}
        ))
        console.log(createPin)
    
        pins.push(storyID);
        setUserPins(pins)
    
    }

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
    
//ref to scroll to comment section
    const scrollRef = useRef();
    const [viewPosition, setViewPosition] = useState(0);

//focus to the comment box
    const focus = useRef(null)

//anchor to comments section
    const scrollToView = () => {
        scrollRef.current?.scrollTo({y: viewPosition + 1400, animated: true});
        focus.current.focus()
    }

//refreshes the screen to show a new comment
    const [commentUpdated, setCommentUpdated] = useState(false);

//use storyID to retrieve Story from AWS
    const [Story, setStory] = useState(
        {
            type: '',
            title: '',
            imageUri: '',
            audioUri: '',
            author: '',
            narrator: '',
            artist: '',
            time: 0,
            summary: '',
            description: '',
            nsfw: false,
            numComments: 0,
            ratingAvg: 0,
            ratingAmt: 0,
            genre: {
                genre: '',
                icon: '',
                color: '#000',
            },
            hidden: false,
            status: false,
            numListens: 0,
            approved: true,
            seriesPart: 1,
            premium: false,
        }
    );


    useEffect(() => {
        setIsRootScreen(true)
    },[])

//set global state context to the storyID to play the story
    const onPlay = () => {setStoryID(storyID);}

//get the story attributes using the storyID
    useEffect(() => {

        const fetchStory = async () => {

            if (!storyID) {
                navigation.goBack(); setIsRootScreen(false)
            }
            
            let tagarr = []

            try {

                const storyData = await API.graphql(graphqlOperation(getStory, {nextToken, id: storyID}))

                if (storyData.data.getStory.genre.genre === 'after dark') {
                    const afterDarkTags = await API.graphql(graphqlOperation(
                        eroticStoryTagsByStoryId, {storyId: storyID}
                    ))

                    for(let i = 0; i < afterDarkTags.data.eroticStoryTagsByStoryId.items.length; i++) {
                        tagarr.push({id: afterDarkTags.data.eroticStoryTagsByStoryId.items[i].eroticTag.id, tagName: afterDarkTags.data.eroticStoryTagsByStoryId.items[i].eroticTag.tagName})
                    } 

                    setTags(tagarr)

                } else {
                    for(let i = 0; i < storyData.data.getStory.tags.items.length; i++) {
                        tagarr.push({id: storyData.data.getStory.tags.items[i].tag.id, tagName: storyData.data.getStory.tags.items[i].tag.tagName})
                    } 
                    setTags(tagarr)
                }

                if (storyData) {
                    setStory(storyData.data.getStory);
                    let response = await Storage.get(storyData.data.getStory.imageUri);
                    setImageU(response);
                }

                const storyComments = await API.graphql(graphqlOperation(
                    commentsByStory, {
                        nextToken, 
                        sortDirection: 'DESC',
                        storyID: storyID
                }))


                setCommentList(storyComments.data.commentsByStory.items)

            } catch (e) {
                console.log('comment error', e);
            }}
        fetchStory();
    }, [storyID, commentUpdated, didUpdate])

    const [imageU, setImageU] = useState('https://static.vecteezy.com/system/resources/thumbnails/010/282/085/small/black-background-studio-blank-black-and-gray-background-studio-backdrop-wallpaper-inside-room-abstract-dark-gray-gradient-spotlight-floor-texture-background-free-photo.jpg')

    //on render, determine if the story in alraedy pinned or not
    useEffect(() => {
            if (userPins.includes(storyID) === true) {
                setQd(true)
            } else {
                setQd(false)
            }
    }, [storyID])
        

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

//scrolling annimation
    const animation = useRef(new Animated.Value(0)).current;

    const animatedColor = animation.interpolate({
        inputRange: [0, 500],
        outputRange: ['transparent', '#171717'],
        extrapolate: 'clamp',
        });

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 500],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

//convert time to string
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(Story?.time / 60000);
        let seconds = Math.floor((Story?.time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

//tag item
      const [Tags, setTags] = useState([])

    
      const Tag = ({id, tag}: any) => {
        return (
          <View style={{marginTop: 14}}>
            <TouchableWithoutFeedback 
                onPress={() => Story?.genre.genre === 'after dark' ? (navigation.navigate('AfterDarkTagSearch', {mainTag: id, tagName: tag})) : (navigation.navigate('TagSearchScreen', {mainTag: id, tagName: tag}))}>
                <View style={Story?.genre.genre === 'after dark' ? styles.tagbox : styles.tagbox}>
                    <Text style={Story?.genre.genre === 'after dark' ? styles.erotictagtext : styles.tagtext}>
                        #{tag}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
          </View>
        )
      }
    
      const renderTag = ({ item } : any) => (
    
        <Tag 
            id={item.id}
            tag={item.tagName}
        />
      );

//queueing the item state when pressed
    const [isQ, setQd] = useState(false);
        
    const onQPress = () => {
        if ( isQ === false ) {
            setQd(true);
            PinStory({storyID: storyID})
        }
        if ( isQ === true ) {
            setQd(false);
            unPinStory({storyID: storyID});
        }  
    };


//Ratings Modal
    const [visible, setVisible] = useState(false);
    const showRatingModal = () => setVisible(true);
    const hideRatingModal = () => setVisible(false);

//Flag Modal
    // const [visibleFlag, setVisibleFlag] = useState(false);
    // const showFlagModal = () => setVisibleFlag(true);
    // const hideFlagModal = () => setVisibleFlag(false);


//rating functions

    //check if the story is rated or not
    const [isRated, setIsRated] = useState(false);

    //the rating average
    const [ratingNum, setRatingNum] = useState(null);

    //the rating average
    const [ratingOldNum, setRatingOldNum] = useState(0);

    //the rating id for the AWS
    const [ratingID, setRatingID] = useState();

    //updating state
    const [isUpdating, setIsUpdating] = useState(false);

    //see spoilers states to see comments
    const [seeSpoilers, setSeeSpoilers] = useState(false)

    //submitting a new rating to AWS
    const SubmitRating = async () => {

        setIsUpdating(true);

        let userInfo = await Auth.currentAuthenticatedUser();

        const reactionid = uuid.v4().toString();
        const ratingid = uuid.v4().toString();        

        let arr = userRates

        if (isRated === true) {
            await API.graphql(graphqlOperation(
                updateRating, {input: {
                    id: ratingID,
                    rating: ratingNum,
                    reaction: userReaction,
                }}
            ))

            let newRating =  Math.floor(
                ((ratingNum + ((Story?.ratingAvg/10) * Story?.ratingAmt) - ratingOldNum)/(Story?.ratingAmt))*10)

            await API.graphql(graphqlOperation(
                updateStory, {input: {
                    id: storyID, ratingAvg: newRating}}
            ))

        } else {
            const response = await API.graphql(graphqlOperation(
                createRating, {input: {
                    id: ratingid,
                    userID: userInfo.attributes.sub, 
                    storyID: storyID,
                    rating: ratingNum,
                    type: 'Rating',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    reactionTypeID: userReaction,
                }}
            ))

            console.log(response)

            if (response) {

                let numerator = (Story.ratingAvg/10) * Story.ratingAmt

                let denominator = Story.ratingAmt + 1

               let newRating =  Math.floor(((ratingNum + (numerator))/(denominator))*10)

                await API.graphql(graphqlOperation(
                    updateStory, {input: {
                        id: storyID, ratingAvg: newRating, ratingAmt: Story.ratingAmt + 1}}
                ))          
                arr.push(storyID) 
            }
        }

        if (comment.length > 0) {
            try {
                const response = await API.graphql(
                    graphqlOperation(createComment, { input: 
                        {
                            type: 'Comment',
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            storyID: storyID,
                            content: comment,
                            userID: userInfo.attributes.sub,
                            approved: false,
                            ratingID: ratingID ? ratingID : ratingid,
                        }
                }))

                if (response) {
                    await API.graphql(
                        graphqlOperation(updateStory, { input: 
                            {
                                id: storyID,
                                updatedAt: new Date(),
                                numComments: Story?.numComments + 1,
                            }
                    }))
                }

                
            } catch (e) {
                console.error(e);
            }
                
            setComment('');
            setCommentUpdated(!commentUpdated)
            //SendPush();
        }

        setUserRates(arr)
        hideRatingModal();
        setIsUpdating(false);
        setDidUpdate(!didUpdate)
    }

//if item is finished state
    const [isFinished, setIsFinished] = useState(false);

//report states
    const [offensiveContent, setOffensiveContent] = useState(false);
    const [poorQuality, setPoorQuality] = useState(false);
    const [poorNarrator, setPoorNarrator] = useState(false);
    const [noPlay, setNoPlay] = useState(false);
    const [other, setOther] = useState(false);

//report the story
    const [isReported, setIsReported] = useState(false);

    //const [flags, setFlags] = useState([])

    const ReportStory = async () => {

        let flags = [];

        if (offensiveContent) {flags.push('OffensiveContent')};
        if (poorQuality) {flags.push('PoorQuality')};
        if (poorNarrator) {flags.push('PoorNarrator')};
        if (noPlay) {flags.push('NoPlay')};
        if (other) {flags.push('Other')};

        try {

            let userInfo = await Auth.currentAuthenticatedUser();

            await API.graphql(graphqlOperation(
                createFlag, {input: {
                    storyID: storyID,
                    userID: userInfo.attributes.sub,
                    flagTypes: flags,
                    Status: 'active',
                }}
          ))
        } catch (e) {
            console.log(e)
        }
        setIsReported(true);
        //hideFlagModal();

    }

    //comment item
    const Item = ({content, createdAt, userName, userImageUri, reaction, icon, rating}: any) => {

        const [imageU, setImageU] = useState('https://static.vecteezy.com/system/resources/thumbnails/010/282/085/small/black-background-studio-blank-black-and-gray-background-studio-backdrop-wallpaper-inside-room-abstract-dark-gray-gradient-spotlight-floor-texture-background-free-photo.jpg');

        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(userImageUri)
                if (response) {
                    setImageU(response)
                }

            }
            fetchImage();
        }, [])

        return (
            <View style={{ marginVertical: 10, backgroundColor: '#132F35', borderRadius: 15}}>
    
                <View style={{ margin: 10, flexDirection: 'row'}}>
                    <View>
                       <Image 
                                source={ userImageUri ? { uri: imageU} : require('../assets/blankprofile.png')}
                                style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'lightgray'}}
                        /> 
                    </View>
                    <View>
                        <View style={{width: Dimensions.get('window').width*0.6, justifyContent: 'space-between', marginHorizontal: 20, alignSelf: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold', textTransform: 'capitalize'}}>
                                {userName}
                            </Text>
                            <Text style={{color: '#ffffffa5', fontSize: 12, textTransform: 'capitalize'}}>
                                {formatRelative(parseISO(createdAt), new Date())}
                            </Text>
                        </View>

                        <View style={{marginTop: 10, width: Dimensions.get('window').width*0.6, marginHorizontal: 20, alignSelf: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            {rating ? (
                                <View style={{backgroundColor: '#000000a5',paddingVertical: 2, marginRight: 10, paddingHorizontal: 8, borderWidth: 0.5, borderColor: '#000000a5', borderRadius: 10, overflow: 'hidden', flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome 
                                        name='star'
                                        color='gold'
                                        size={14}
                                        style={{marginRight: 10}}
                                    />
                                    <Text style={{fontSize: 14, color: '#ffffffa5', fontWeight: 'bold', textTransform: 'capitalize'}}>
                                        {rating}
                                    </Text>
                                </View>
                            ) : null}
                            
                            {reaction ? (
                                <View style={{backgroundColor: '#000000a5', paddingVertical: 2, paddingHorizontal: 8, borderWidth: 0.5, borderColor: '#000000a5', borderRadius: 10, overflow: 'hidden', flexDirection: 'row', alignItems: 'center'}}>
                                    <MaterialCommunityIcons 
                                        name='emoticon-cool-outline'
                                        color='#ffffffa5'
                                        size={18}
                                        style={{marginRight: 10}}
                                    />
                                    <Text style={{textTransform: 'lowercase', fontSize: 14, color: '#ffffffa5', fontWeight: '400'}}>
                                        Felt {reaction}
                                    </Text>
                                </View>
                            ) : null}
                            
                        </View>
                    </View>
                    
                    
                </View>
    
                <View>
                    <Text style={{ color: '#ffffff', marginBottom: 20, marginTop: 10, marginHorizontal: 20}}>
                        {content}
                    </Text>
                </View>
            </View>
        );
    }
    
    const [commentList, setCommentList ] = useState([]);
    
    
    const [user, setUser] = useState();
    const [userImage, setUserImage] = useState('https://static.vecteezy.com/system/resources/thumbnails/010/282/085/small/black-background-studio-blank-black-and-gray-background-studio-backdrop-wallpaper-inside-room-abstract-dark-gray-gradient-spotlight-floor-texture-background-free-photo.jpg')
   
//fetch the user info
    useEffect(() => {
        const fetchUser = async () => {

            //get the use id
            const userInfo = await Auth.currentAuthenticatedUser(
                { bypassCache: true }
                );

            //get the user information
            const userData = await API.graphql(
                graphqlOperation(
                getUser, { id: userInfo.attributes.sub}
            ))

            setUser(userData.data.getUser);
            const UserImage = await Storage.get(userData.data.getUser.imageUri)

            setUserImage(UserImage)
            //check if its pinned
            if (userPins.includes(storyID) === true) {
                setQd(true)
            }


            //check if its been listened to or not
            if (userFinished.includes(storyID) === true) {
                setIsFinished(true);
            }
            
            
        }
    fetchUser();
    
    }, [update])

//fetch the ratings info
    useEffect(() => {

           //check if it's rated
           if (userRates.includes(storyID) === true) {
            setIsRated(true);
            
            const getTheRatings = async (nextRatingToken : any) => {

                const userInfo = await Auth.currentAuthenticatedUser();

                const userRatingData = await API.graphql(graphqlOperation(
                    ratingsByUser,{ 
                        nextRatingToken,
                        userID: userInfo.attributes.sub}))

                for (let i = 0; i < userRatingData.data.ratingsByUser.items.length; i++) {
                    if (userRatingData.data.ratingsByUser.items[i].storyID === storyID ) {
                        setRatingID(userRatingData.data.ratingsByUser.items[i].id);
                        setRatingNum(userRatingData.data.ratingsByUser.items[i].rating);
                        setUserReaction(userRatingData.data.ratingsByUser.items[i].reactionTypeID)
                        setRatingOldNum(userRatingData.data.ratingsByUser.items[i].rating);
                    }
                    
                }
                if (userRatingData.data.ratingsByUser.nextToken) {
                    //setNextToken(userRatingData.data.ratingsByUser.nextToken)
                    getTheRatings(userRatingData.data.ratingsByUser.nextToken);
                    //return;
                }
            }

            getTheRatings(null)
        }
    }, [didUpdate])


//check if the story is finished but not rated
    useEffect(() => {
        if (isRated === false && isFinished === true ) {
            showRatingModal();
        } else {
            hideRatingModal();
        }
    }, [isRated, isFinished])
        
    const renderItem = ({ item } : any) => {


        return (
            <Item 
                //id={item.id}
                content={item.content}
                createdAt={item.createdAt}
                userName={item.user && item.user.name}
                userImageUri={item.user && item.user.imageUri}
                rating={item.rating && item.rating.rating}
                reaction={item.rating && item.rating.reactionType.reaction}
                icon={item.rating && item.rating.reactionType.icon}
            />
        )}
        
    const [comment, setComment] = useState('');
    
    const handlePostComment = async () => {

        const poster = await Auth.currentAuthenticatedUser()

        if (comment.length > 0) {
            try {
                const response = await API.graphql(
                    graphqlOperation(createComment, { input: 
                        {
                            type: 'Comment',
                            createdAt: new Date(),
                            storyID: storyID,
                            content: comment,
                            userID: poster.attributes.sub,
                            approved: false,
                        }
                }))

                if (response) {
                    await API.graphql(
                        graphqlOperation(updateStory, { input: 
                            {
                                id: storyID,
                                updatedAt: new Date(),
                                numComments: Story?.numComments + 1,
                            }
                    }))
                }

                
            } catch (e) {
                console.error(e);
            }
                
            setComment('');
            setCommentUpdated(!commentUpdated)
            //SendPush();
        }
    }

    const [reactions, setReactions] = useState([
        {
        id: '1',
        reaction: 'huh',
        icon: 'trash'
        }
    ]);

    useEffect(() => {
        const fetchReactions = async () => {

            const response = await API.graphql(
                graphqlOperation(listReactionTypes))

            console.log('response is', response)

            if (response) {
                setReactions(response.data.listReactionTypes.items)
            }

        }
        
        fetchReactions();

    }, [])

    const [userReaction, setUserReaction] = useState(null)

    const ReactionItem = ({id, icon, reaction} : any) => {

        const [pickedReaction, setPickedReaction] = useState(false);

        const handleReaction = () => {
            if (userReaction === id) {
                setUserReaction(null)
            } else {
               setUserReaction(id) 
            }
            setPickedReaction(!pickedReaction); 
        }

        useEffect(() => {
            if (userReaction === id) {
                setPickedReaction(true)
            } else {
                setPickedReaction(false)
            }
        }, [userReaction])

        

        return (
            <TouchableWithoutFeedback onPress={() => handleReaction()}>    
                <View key={id} style={{margin: 10, borderWidth: 1, borderRadius: 15, overflow: 'hidden', borderColor: pickedReaction === true ? '#00ffff' : '#fff',  backgroundColor: pickedReaction === true ? '#00ffff33' : 'transparent', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: Dimensions.get('window').width*0.25, height: Dimensions.get('window').width*0.28}}>
                    
                        <View style={{ padding: 10, marginVertical: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons 
                                name={icon}
                                size={40}
                                color='#fff'
                                style={{marginBottom: 10}}
                            />
                            <Text style={{
                                color: '#fff',
                                fontWeight: '500',
                                fontSize: 12,
                                textTransform: 'capitalize',
                            }}>
                                {reaction}
                            </Text>
                        </View>
                
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const renderReactionItem = ({item} : any) => {
        return (
            <ReactionItem 
                id={item.id}
                icon={item.icon}
                reaction={item.reaction}
            />
        )
    }

    return (
            <View style={styles.container}>
{/* Rate the story modal */}
                    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={() => {setVisible(!visible);}}>             
                        {/* <TouchableOpacity onPress={hideRatingModal} style={{ }}> */}
                            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#000000'}}>

                                <View style={{alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: '#000000'}}>
                                    <View style={{width: Dimensions.get('window').width}}>
                                        <AntDesign 
                                            name='close'
                                            size={22}
                                            color='#fff'
                                            style={{paddingVertical: 40, paddingHorizontal: 20}}
                                            onPress={() => setVisible(false)}
                                        />
                                    </View>

                                    <View style={{marginBottom: 10, paddingVertical: 10, alignItems: 'center',  backgroundColor: '#171717a5', width: Dimensions.get('window').width-20, alignSelf: 'center'}}>
                                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 26, fontWeight: '600'}}>
                                            {Story?.title}
                                        </Text>
                                    </View>

                                    <View style={{marginVertical: 20, paddingVertical: 10, alignItems: 'center',  backgroundColor: '#171717a5', width: Dimensions.get('window').width-20, alignSelf: 'center' }}>
                                        <Text style={{margin: 20, fontSize: 20, fontWeight: '600', color: '#fff'}}>
                                            How did you like the story?
                                        </Text>
                                        <Text style={{margin: 20, textAlign: 'center', fontSize: 28, color: '#fff'}}>
                                            {ratingNum}/10
                                        </Text>
                                        <View style={{marginBottom: 20, flexDirection: 'row'}}>
                                            <FontAwesome onPress={() => setRatingNum(1)} style={{marginHorizontal: 4 }} name={ratingNum < 1 ? 'star-o' : 'star'} size={22} color={ratingNum < 1 ? 'white' : 'gold'}/>
                                            <FontAwesome onPress={() => setRatingNum(2)} style={{marginHorizontal: 4 }} name={ratingNum < 2 ? 'star-o' : 'star'} size={22} color={ratingNum < 2 ? 'white' : 'gold'}/>
                                            <FontAwesome onPress={() => setRatingNum(3)} style={{marginHorizontal: 4 }} name={ratingNum < 3 ? 'star-o' : 'star'} size={22} color={ratingNum < 3 ? 'white' : 'gold'}/>
                                            <FontAwesome onPress={() => setRatingNum(4)} style={{marginHorizontal: 4 }} name={ratingNum < 4 ? 'star-o' : 'star'} size={22} color={ratingNum < 4 ? 'white' : 'gold'}/>
                                            <FontAwesome onPress={() => setRatingNum(5)} style={{marginHorizontal: 4 }} name={ratingNum < 5 ? 'star-o' : 'star'} size={22} color={ratingNum < 5 ? 'white' : 'gold'}/>
                                            <FontAwesome onPress={() => setRatingNum(6)} style={{marginHorizontal: 4 }} name={ratingNum < 6 ? 'star-o' : 'star'} size={22} color={ratingNum < 6 ? 'white' : 'gold'}/>
                                            <FontAwesome onPress={() => setRatingNum(7)} style={{marginHorizontal: 4 }} name={ratingNum < 7 ? 'star-o' : 'star'} size={22} color={ratingNum < 7 ? 'white' : 'gold'}/>
                                            <FontAwesome onPress={() => setRatingNum(8)} style={{marginHorizontal: 4 }} name={ratingNum < 8 ? 'star-o' : 'star'} size={22} color={ratingNum < 8 ? 'white' : 'gold'}/>
                                            <FontAwesome onPress={() => setRatingNum(9)} style={{marginHorizontal: 4 }} name={ratingNum < 9 ? 'star-o' : 'star'} size={22} color={ratingNum < 9 ? 'white' : 'gold'}/>
                                            <FontAwesome onPress={() => setRatingNum(10)} style={{marginHorizontal: 4 }} name={ratingNum < 10 ? 'star-o' : 'star'} size={22} color={ratingNum < 10 ? 'white' : 'gold'}/>                                
                                        </View>
                                    </View>
                                    
                                    <View style={{marginVertical: 20, paddingVertical: 10, alignItems: 'center',  justifyContent: 'center', backgroundColor: '#171717a5', width: Dimensions.get('window').width-20, alignSelf: 'center' }}>
                                        <FlatList 
                                            data={reactions}
                                            renderItem={renderReactionItem}
                                            numColumns={3}
                                            style={{alignSelf: 'center', marginTop: 20, width: Dimensions.get('window').width, backgroundColor: 'transparent',  marginBottom: 20}}
                                            columnWrapperStyle={{ flex: 1, justifyContent: "space-around" , marginHorizontal: 10}}
                                            keyExtractor={(item) => item.id}
                                            scrollEnabled={false}
                                            ListHeaderComponent={() => {return (
                                                <View style={{alignSelf: 'center', marginVertical: 20}}>
                                                    <Text style={{color: '#fff', fontSize: 20, fontWeight: '600'}}>
                                                        How do you feel?
                                                    </Text>
                                                </View>
                                            )}}
                                        />
                                    </View>
                                    

                                    <KeyboardAvoidingView
                                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                                        //style={{flex: 1}}
                                    >
                                        <View style={{backgroundColor: '#171717', padding: 20, marginVertical: 30, borderRadius: 15, }}>
                                            <View style={{ flexDirection: 'row', }}>
                                            <TextInput 
                                                placeholder='Leave a comment'
                                                placeholderTextColor='#ffFFFFa5'
                                                style={{
                                                    color: '#ffffff',
                                                    fontSize: 14,
                                                    marginLeft: 0,
                                                    marginRight: 30,    
                                                    width: Dimensions.get('window').width*0.7,
                                                    //alignSelf: 'center',
                                                    height: 120,
                                                    textAlignVertical: 'top'
                                                }}
                                                maxLength={250}
                                                multiline={true}
                                                numberOfLines={10}
                                                onChangeText={comment => setComment(comment)}
                                                value={comment}
                                                ref={focus}
                                            />
                                                </View>
                                            </View>
                                        </KeyboardAvoidingView>


                                    {isUpdating === true ? (
                                        <ActivityIndicator size='large' color='cyan '/>
                                    ) :
                                    <TouchableOpacity onPress={() => ratingNum && userReaction ? SubmitRating() : alert('Please select both a rating and a reaction')}>
                                        <View style={{marginTop: 40, paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                                <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                                    Submit
                                                </Text>
                                        </View>
                                    </TouchableOpacity>
                                    }
                                    <View style={{height: 100}}/>

                                </View>
                                
                            </ScrollView>
                        {/* </TouchableOpacity> */}
                    </Modal>

{/* flag this story modal */}
                    {/* <Modal visible={visibleFlag} onDismiss={hideFlagModal} contentContainerStyle={containerStyleFlag}>
                        <View style={{alignItems: 'center'}}>
                            {isReported === false ? (
                            <View style={{}}>
                                <Text style={{margin: 20, fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                                    Report this Story
                                </Text>

                                <TouchableWithoutFeedback onPress={() => setOffensiveContent(!offensiveContent)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={offensiveContent === true ? 'check-square-o' : 'square-o'}
                                            color={offensiveContent === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Offensive Content
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setPoorQuality(!poorQuality)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={poorQuality === true ? 'check-square-o' : 'square-o'}
                                            color={poorQuality === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Poor Audio Quality
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setPoorNarrator(!poorNarrator)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={poorNarrator === true ? 'check-square-o' : 'square-o'}
                                            color={poorNarrator === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Poor Narration
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setNoPlay(!noPlay)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={noPlay === true ? 'check-square-o' : 'square-o'}
                                            color={noPlay === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Could Not Play
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setOther(!other)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={other === true ? 'check-square-o' : 'square-o'}
                                            color={other === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Other
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>
                                
                                
                            </View>
                            ) : null}

                            {isReported ? (
                                <View style={{marginVertical: 40}}>
                                <Text style={{textAlign: 'center', color: '#fff'}}>
                                    Thank you for reporting this story. It will be placed under review.
                                </Text>
                                
                                </View>
                            ) : (
                                <TouchableOpacity onPress={ReportStory}>
                                    <View style={{marginTop: 40, paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                            <Text style={{color: '#000000', fontSize: 16}}>
                                                Report
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            
                            
                        </View>
                    </Modal> */}
                

                <ImageBackground 
                    source={{uri: imageU}}
                    style={{  backgroundColor: '#171717', width: Dimensions.get('window').width, height: 330,  position: 'absolute'  }}
                >
                    {Story?.imageUri ? (null) : (
                        <View style={{ alignSelf: 'center', marginTop: 140}}>
                            <FontAwesome5 
                                name={Story?.genre?.icon}
                                color='#ffffffa5'
                                size={50}
                            />
                        </View>
                    )}
                     
                </ImageBackground>

                <Animated.View style={{ alignItems: 'center', backgroundColor: animatedColor, flexDirection: 'row', paddingTop: 40, paddingBottom: 20, width: Dimensions.get('window').width, justifyContent: 'space-between'}}>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => {navigation.goBack(); setIsRootScreen(false)}}>
                            <View style={ [styles.button, {backgroundColor: '#171717a5', flexDirection: 'row'}]}>
                                <AntDesign 
                                    name='close'
                                    size={22}
                                    color='#fff'
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <Animated.Text numberOfLines={1} style={{ width: '80%', marginRight: -30, fontSize: 18, color: '#fff', fontWeight: 'bold', opacity: animatedOpacity}}>
                            {Story?.title}
                        </Animated.Text>
                    </View>

                    <TouchableOpacity onPress={onPlay}>
                        <Animated.View style={{marginRight: 20,  height: 30, width: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00ffff', borderRadius: 15, opacity: animatedOpacity}}>
                            <FontAwesome5 
                                name='play'
                                size={16}
                                color='#171717'
                                style={{marginLeft: 2}}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                    
                </Animated.View>

                <Animatable.View animation='bounceInUp' style={{}}>
                    <ScrollView 
                        style={{}}
                        ref={scrollRef}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: animation } } }],
                            { useNativeDriver: false })}
                        scrollEventThrottle={1}
                        showsVerticalScrollIndicator={false}
                    >
                        
                        <View style={{ height: 220, backgroundColor: 'transparent', alignItems: 'flex-start'}}>
                            {Story?.imageUri ? (
                                <View style={{width: Dimensions.get('window').width - 20, marginTop: 186, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('CreatorScreen', {userID: Story?.illustratorID, creatorType: 'Illustrator'})}>
                                        <View style={{alignItems: 'center', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#171717a5', flexDirection: 'row'}}>
                                            <FontAwesome5 
                                                name='palette'
                                                size={14}
                                                color='#fff'
                                                style={{marginRight: 10}}
                                            />
                                            <Text style={{color: '#fff', textTransform: 'capitalize'}}>
                                                {Story?.artist}
                                            </Text>
                                        </View> 
                                    </TouchableOpacity>
                                    <View>
                                        {Story?.nsfw === true ? (
                                            <Text style={{color: 'red', borderRadius: 15, overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#171717', }}>
                                                Explicit
                                            </Text>
                                        ) : null}
                                    </View>
                                </View>
                            ) : null}
                        </View>
                        <LinearGradient 
                            colors={['#202020', '#171717', '#000', '#000']}
                            style={{ overflow: 'hidden', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 0}}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View style={{}}>
                                <View style={{ margin: 20, alignItems: 'center'}}>
                                    <Text style={[styles.name, {textAlign: 'center'}]}>
                                        {Story?.title}
                                    </Text>

                                    <View style={{ width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => navigation.navigate('CreatorScreen', {userID: Story?.creatorID, creatorType: 'Author'})}>
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
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => navigation.navigate('CreatorScreen', {userID: Story?.narratorID, creatorType: 'Narrator'})}>
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
                                        </TouchableOpacity>
                                    </View>

                                <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={ styles.icon}>
                                            <AntDesign 
                                                name={isQ ? 'pushpin' : 'pushpino'}
                                                size={20}
                                                color={isQ ? 'cyan' : 'white'}
                                                onPress={onQPress}
                                                style={{ }}
                                            />
                                        </View>
                                        <View style={ styles.icon}>
                                            <FontAwesome 
                                                name='commenting-o'
                                                size={20}
                                                color='white'
                                                onPress={scrollToView}
                                                style={{ }}
                                            />
                                        </View>
                                        <View style={ styles.icon}>
                                            <FontAwesome 
                                                name='share'
                                                size={20}
                                                color='white'
                                                onPress={() => ShareStory({id: Story?.id, title: Story?.title})}
                                                style={{ }}
                                            />
                                        </View>
                                    </View>

                                    <TouchableWithoutFeedback onPress={showRatingModal}>
                                        <View style={{justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{textAlign: 'center', color: '#e0e0e0a5', fontSize: 12}}>
                                                ({Story?.ratingAmt})
                                            </Text>
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
                                    </TouchableWithoutFeedback>
                                    
                                </View>

                                <View>
                                    <Text style={{textAlign: 'center', color: '#fff', fontSize: 14, marginTop: 32, marginBottom: 16}}>
                                        {Story?.summary}
                                    </Text>
                                </View>

                                <View style={{height: 80}}>

                                    <FlatList
                                        data={Tags}
                                        extraData={Tags}
                                        renderItem={renderTag}
                                        horizontal={true}
                                        style={{width:  Dimensions.get('window').width, backgroundColor: 'transparent', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}
                                        keyExtractor={(item) => item.id}
                                        initialNumToRender={8}
                                        showsHorizontalScrollIndicator={false}
                                        maxToRenderPerBatch={8}
                                        showsVerticalScrollIndicator={false}
                                        ListHeaderComponent={() => {
                                            return (
                                                <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                                    <FontAwesome5 
                                                        name={Story?.genre?.icon}
                                                        size={13}
                                                        color='#ffffffa5'
                                                        style={{marginRight: 6}}
                                                    />
                                                    <Text style={{fontSize: 15, textTransform: 'capitalize', textAlign: 'center', color: Story?.genre?.color}}>
                                                        {Story?.genre?.genre}
                                                    </Text>
                                                </View>
                                            )
                                        }}
                                        ListEmptyComponent={() => {
                                            return (
                                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                    
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                
                                {/* {Story?.promptID ? (
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('PromptsHome', {promptID: Story?.promptID})}>
                                        <View style={{backgroundColor: '#3B4B80a5', borderRadius: 15, marginBottom: 20}}>
                                            <Text numberOfLines={5} style={{color: '#fff', padding: 10}}>
                                                {Story?.prompt?.prompt}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                ) : null} */}
                                
                                
                                <View>
                                    <TouchableOpacity onPress={onPlay}>
                                        <View style={{paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                                <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                                    Play
                                                </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Text style={{color: '#ffffff', fontSize: 18}}>
                                        {millisToMinutesAndSeconds()}
                                    </Text>
                                </View>

                                <View style={{marginVertical: 20, marginHorizontal: 4, flex: 1 }}>
                                    <Text style={{color: '#fff', flexWrap: 'wrap', marginBottom: 10}}>
                                        {Story?.description}
                                    </Text>
                                </View> 

                                <View style={{width: '100%', marginTop: 20}} >
                                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                                                Discussion
                                            </Text>
                                            <Text style={{color: '#fff', marginLeft: 10}}>
                                                ({Story?.numComments})
                                            </Text>
                                        </View>
                                        
                                        {/* <FontAwesome 
                                            name='flag'
                                            size={20}
                                            color='gray'
                                            onPress={showFlagModal}
                                        /> */}
                                    </View>
                                    
                                    <View onLayout={e => setViewPosition(e.nativeEvent.layout.y)}>
                                        {/* <Comments storyId={Story?.id} /> */}
                                        <KeyboardAvoidingView
                                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                                            style={{flex: 1}}
                                        >
                                            <View style={{backgroundColor: '#171717', padding: 20, marginVertical: 10, borderRadius: 15, }}>
                                                <View style={{ flexDirection: 'row', }}>
                                                    <Image 
                                                        source={ user?.imageUri ? { uri: userImage} : require('../assets/blankprofile.png')}
                                                        style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'gray'}}
                                                    />
                                                <TextInput 
                                                    placeholder='Leave a comment'
                                                    placeholderTextColor='#ffFFFFa5'
                                                    style={{
                                                        color: '#ffffff',
                                                        fontSize: 14,
                                                        marginLeft: 20,
                                                        marginRight: 30,    
                                                        width: '75%',
                                                        alignSelf: 'center'
                                                    }}
                                                    maxLength={250}
                                                    multiline={true}
                                                    numberOfLines={2}
                                                    onChangeText={comment => setComment(comment)}
                                                    value={comment}
                                                    ref={focus}
                                                />
                                            </View>
                                                {comment.length > 0 ? (
                                                    <View>
                                                        <View style={{marginTop: 20, alignSelf: 'center', width: '70%', height: 1, borderWidth: 0.5, borderColor: '#ffffffa5'}}>
                                                        </View>
                                                        <TouchableOpacity onPress={handlePostComment}>
                                                            <View style={{ marginTop: 20, alignItems: 'center'}}>
                                                                <Text style={{overflow: 'hidden', backgroundColor: 'cyan', width: 80, padding: 5, borderRadius: 13, color: '#000', borderWidth: 0.5, borderColor: '#00ffff', textAlign: 'center'}}>
                                                                    Post
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : null}
                                        </View>
                                        </KeyboardAvoidingView>

                                        {seeSpoilers === true ? (
                                            <View>
                                                <FlatList 
                                                    data={commentList}
                                                    renderItem={renderItem}
                                                    keyExtractor={item => item.id}
                                                    showsVerticalScrollIndicator={false}
                                                    scrollEnabled={false}
                                                    extraData={commentList}
                                                    initialNumToRender={10}
                                                    maxToRenderPerBatch={20}
                                                    ListFooterComponent={ () => {
                                                        return (
                                                            <View style={{height:  Platform.OS === 'ios' ? 500 : 300}}>
                                                            </View>
                                                        );
                                                    }}
                                                />
                                            </View>
                                        ) : (
                                            <TouchableOpacity onPress={() => setSeeSpoilers(true)}>
                                                <View style={{alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: 'red'}}>
                                                    <Text style={{color: '#fff', fontSize: 16}}>
                                                        Spoiler Warning!
                                                    </Text>
                                                    <Text style={{color: '#fff', fontSize: 16}}>
                                                        Tap to view comments.
                                                    </Text>
                                                </View>
                                                <View style={{height:  Platform.OS === 'ios' ? 500 : 300}}>
                                                </View>
                                            </TouchableOpacity>
                                            
                                        )}
                                        
                                        
                                    </View>
                                </View>

                            </View>
                        </View>
                    </LinearGradient> 
                </ScrollView>
            </Animatable.View>
            <StatusBar style='light' backgroundColor='#0000004D' />
            </View>
    );
}

const styles = StyleSheet.create ({
    container: {
    },
    name: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    username: {
        color: '#ffffffCC',
        fontSize: 14,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    footer: {
        marginVertical: 0,
    },
    highlight: { 
        marginHorizontal: -10,
        color: '#ffffffCC',
        fontSize: 14,
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 50,
        width: 36,
        height: 36,
        marginHorizontal: 10,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginRight: 30,
    },
    tagbox: {
        marginRight: 10   
      },
      tagtext: {
        color: 'cyan',
        fontSize: 14,
        backgroundColor: '#1A4851a5',
        borderColor: '#00ffffa5',
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 14,
        overflow: 'hidden'
    },
    erotictagtext: {
        color: 'magenta',
        fontSize: 14,
        backgroundColor: '#3C1A41a5',
        borderColor: '#ff00ffa5',
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 13,
        textTransform: 'lowercase',
        overflow: 'hidden',
        marginBottom: 1
      },
   
});

export default StoryScreen;