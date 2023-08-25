import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    Dimensions,
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    Image, 
    Animated ,
    ScrollView
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SocialBlock from '../SocialBlock';

import {useRoute} from '@react-navigation/native'

import { AppContext } from '../../AppContext';


import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';
import { getUser, getCreatorProfile, storiesByCreator, connectionsByFollower,  } from '../../src/graphql/queries';
import { createFollowConnection, deleteFollowConnection, updateUser, updateCreatorProfile} from '../../src/graphql/mutations';

import StoryTile from '../../components/StoryTile';



const CreatorProfile = ({status} : any) => {

    const { nsfwOn } = useContext(AppContext);
    const { ADon } = useContext(AppContext);

    const { setIsRootScreen } = useContext(AppContext);

    const { userFollowing } = useContext(AppContext);
    const { setUserFollowing } = useContext(AppContext);

    const navigation = useNavigation();

    const [publisher, setPublisher] = useState(true);
    const [narrator, setNarrator] = useState(false);
    const [artist, setArtist] = useState(false);

    const [followingConnID, setFollowingConnID] = useState()

    const [Storys, setStorys] = useState([]);
    const [Narrations, setNarrations] = useState([]);
    const [Arts, setArts] = useState([]);

    const [artSamples, setArtSamples] = useState([]);
    const [audioSamples, setAudioSamples] = useState([]);

    const [sampleState, setSampleState] = useState(false);

    const [User, setUser] = useState(null);

    const route = useRoute();
    const {userID, rootChange} = route.params


    useEffect( () => {

        const fetchStorys = async () => {

                let stories = []

                try {

                    let userInfo = await Auth.currentAuthenticatedUser();

                    const response = await API.graphql(
                        graphqlOperation(
                            getCreatorProfile, {id: userID }
                        )
                    )

                    const currentuser = await API.graphql(
                        graphqlOperation(
                            getUser, {id: userInfo.attributes.sub }
                        )
                    )

                    setCurrentUser(currentuser.data.getUser);
                    setUser(response.data.getCreatorProfile);
                    let responseBuk = await Storage.get(response.data.getCreatorProfile.imageUri)
                    setImageU(responseBuk);

                    const fetchStories = await API.graphql(
                        graphqlOperation(
                            storiesByCreator, {creatorID: userID }
                        )
                    )
                    
                    setStorys(fetchStories.data.storiesByCreator.items);

                    if (userFollowing.includes(userID)) {
                        
                        console.log('following', userFollowing)
                        setFollowing(true);
                        //setFollowingConnID(currentuser.data.getUser.following.items[i].id)
                    } else {
                        console.log('unfollowing', userFollowing)
                        setFollowing(false)
                    }

                    // for (let i = 0; i < currentuser.data.getUser.following.items.length; i++) {
                    //     if (currentuser.data.getUser.following.items[i].authorID === response.data.getUser.id ) {
                            
                    //     }
                    // }

                    // for (let i = 0; i < response.data.getUser.narrated.items.length; i++) {
                    //     if (response.data.getUser.narrated.items[i].hidden === false && 
                    //         response.data.getUser.narrated.items[i].approved === 'approved' &&
                    //         //response.data.getUser.narrated.items[i].genreID !== (ADon === true ? '1108a619-1c0e-4064-8fce-41f1f6262070' : null) &&
                    //         response.data.getUser.narrated.items[i].nsfw !== (nsfwOn === true ? true : null)
                    //         ) {
                    //         narrstories.push(response.data.getUser.narrated.items[i])
                    //     }
                    // }
                    // setNarrations(narrstories);

                    // for (let i = 0; i < response.data.getUser.art.items.length; i++) {
                    //     if (response.data.getUser.art.items[i].hidden === false && 
                    //         response.data.getUser.art.items[i].approved === 'approved' &&
                    //         response.data.getUser.art.items[i].genreID !== (ADon === true ? '1108a619-1c0e-4064-8fce-41f1f6262070' : null) &&
                    //         response.data.getUser.art.items[i].genreID !== (nsfwOn === true ? true : null)
                    //         ) {
                    //         artstories.push(response.data.getUser.art.items[i])
                    //     }
                    // }
                    // setArts(artstories);

                } catch (e) {
                    console.log(e);}
        }
        fetchStorys();
        
    },[])

    const renderItem = ({ item } : any) => {

        let icon = ''
        let genreName = ''
        let primary = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.color
        }

        return (

        <StoryTile 
            title={item.title}
            imageUri={item.imageUri}
            genreName={genreName}
            icon={icon}
            primary={primary}
            audioUri={item.audioUri}
            summary={item.summary}
            author={item.author}
            narrator={item.narrator}
            time={item.time}
            ratingAvg={item.ratingAvg}
            id={item.id}
            ratingAmt={item.ratingAmt}
            numComments={item.numComments}
            numListens={item.numListens}

        />
      );}

    

    const animation = useRef(new Animated.Value(0)).current;

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedOpacitySlow = animation.interpolate({
        inputRange: [0, 220],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedAppearOpacity = animation.interpolate({
        inputRange: [0, 450],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

    const animatedHeaderHeight = animation.interpolate({
        inputRange: [0, 350],
        outputRange: [450, 80],
        extrapolate: 'clamp',
        });

    const animatedColor = animation.interpolate({
        inputRange: [250, 800],
        outputRange: ['#000000', '#363636'],
        extrapolate: 'clamp',
        });

      const [currentUser, setCurrentUser] = useState(null)

      const [Following, setFollowing] = useState(false);

      const [imageU, setImageU] = useState()


    const FollowUser = async () => {

        let foll = userFollowing

        let response = await API.graphql(graphqlOperation(
            createFollowConnection, {input: {followerID: currentUser.id, creatorID: userID, authorID: User.userID}}
        ))

        await API.graphql(graphqlOperation(
            updateUser, {input: {
                id: currentUser.id, 
                numFollowing: currentUser.numFollowing ? currentUser.numFollowing + 1 : 1
            }}
        ))

        await API.graphql(graphqlOperation(
            updateCreatorProfile, {input: {
                id: User.id, 
                numFollowers: User.numFollowers ? User.numFollowers + 1 : 1
            }}
        ))

        await API.graphql(graphqlOperation(
            updateUser, {input: {
                id: User?.userID, 
                numFollowers: User.numFollowers ? User.numFollowers + 1 : 1
            }}
        ))

        foll.push(userID)

        if (response) {
            //setFollowingConnID(response.data.createFollowConnection.id)
            setUserFollowing(foll)
        }
    }

    const unFollowUser = async () => {

        let arr = userFollowing;

        const getTheFollowing = async (nextFollowToken : any) => {

            const userFollowingData = await API.graphql(graphqlOperation(
                connectionsByFollower,{ nextFollowToken, followerID: currentUser.id}))

            for (let i = 0; i < userFollowingData.data.connectionsByFollower.items.length; i++) {
                if (userFollowingData.data.connectionsByFollower.items[i].creatorID === userID) {
                    await API.graphql(graphqlOperation(
                        deleteFollowConnection, {input: {"id": userFollowingData.data.connectionsByFollower.items[i].id}}
                    ))

                    const index = arr.indexOf(userID);

                    arr.splice(index, 1)
                }
            }

            if (userFollowingData.data.connectionsByFollower.nextToken) {
                getTheFollowing(userFollowingData.data.connectionsByFollower.nextToken);
                return;
            }
        }

        getTheFollowing(null);
        setUserFollowing(arr)
    }

    function FollowButton () {
        if (Following === true) {
            unFollowUser();
            setFollowing(false);
        }
        if (Following === false) {
            FollowUser();
            setFollowing(true)
            
        }
    }

    return (

        <View style={[styles.container]}>

{/* display published stories */}
          
        <Animated.FlatList 
            data={Storys}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            //extraData={Following}
            //stickyHeaderIndices={[0]}
            //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: animation } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}    
            ListFooterComponent={ () => {
                return (
                <View style={{ height:  120}}/>
                );}
            }
            ListHeaderComponent={ () => {

                return (
                        <View>
                            <View style={{ height: 520}}/>
                        </View>
                                    
                                );
            }}
        />
            
        <Animated.View style={[ {backgroundColor: animatedColor, height: animatedHeaderHeight, width: Dimensions.get('window').width, position: 'absolute', flex: 1}]}>              
            <View style={{ flexDirection: 'row', marginTop: 60, justifyContent: 'space-between',  width: Dimensions.get('window').width -40, marginHorizontal: 20, alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                    <AntDesign 
                        name='close'
                        size={25}
                        color='#fff'
                        style={{paddingTop: 0, paddingRight: 10}}
                        onPress={() => {navigation.goBack(); rootChange ? setIsRootScreen(false) : null} }
                    />
                    <Animated.Text numberOfLines={1} style={[styles.name, { opacity: animatedAppearOpacity, width: '78%'}]}>
                        {User?.penName}
                    </Animated.Text>
                </View>

                <TouchableOpacity onPress={FollowButton}>
                    <View>
                        <Text style={{
                            color: Following === true ? '#000' : 'cyan',
                            backgroundColor: Following === true ? 'cyan' : 'transparent',
                            borderRadius: 13,
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderWidth: Following === true ? 0 : 0.5,
                            borderColor: 'cyan',
                            overflow: 'hidden'
                        }}>
                            {Following === true ? 'Following' : 'Follow'}
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

            <Animated.View style={{opacity: animatedOpacitySlow}}>
                    <View style={{ alignItems: 'center'}}>
                        {imageU !== '' ? (
                            <Image 
                                source={{ uri: imageU}}
                                style={{width: 120, height: 120, backgroundColor: '#363636',borderRadius: 60, marginTop: 20,}}
                            />
                        ) : null}
                        
                    </View>

                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                    <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold', textTransform: 'capitalize'}}>
                        {User?.penName}
                    </Text>
                </View>

                <View style={{alignSelf: 'center'}}>
                    <SocialBlock 
                        tikTok={User?.tikTok}
                        website={User?.website}
                        instagram={User?.instagram}
                        reddit={User?.reddit}
                        deviantArt={User?.deviantArt}
                        facebook={User?.facebook}
                        youTube={User?.youTube}
                        email={User?.email}
                    />
                </View>

                
            </Animated.View>

            <Animated.View style={{opacity: animatedOpacity}}>

                
                <View style={{ alignItems: 'center', marginHorizontal: 20, marginTop: 10, marginBottom: 10}}>
                    <Text style={{ color: '#ffffffa5', fontSize: 14, textAlign: 'center'}}>
                        {User?.bio}
                    </Text>         
                </View>

                <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{ paddingVertical: 10, marginVertical: 10, alignContent: 'center', flexDirection: 'row', marginBottom: 10, alignSelf: 'center'}}>                                             
                        <FontAwesome5 
                            name='book-open'
                            size={publisher ? 14 : 12}
                            color={publisher ? '#fff' : '#ffffffa5'}
                            style={{ marginHorizontal: 5, alignSelf: 'center'}}
                        />
                        <Text style={styles.userId}>
                            {User?.stories.items ? User?.stories.items.length : 0}
                        </Text> 
                    </View> 
                </View>
            </Animated.View>
        </Animated.View>
    </View>
);}

const styles = StyleSheet.create({
    container: {
       width: Dimensions.get('window').width, 
    },
    tile: {
        backgroundColor: '#363636a5',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
        borderRadius: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'capitalize'
    },
    userId: {
        fontSize: 12,
        color: '#ffffffa5',
        marginRight: 15,
        marginLeft: 5,
        textTransform: 'capitalize'
    },
    icontext: {
        fontSize: 10,
        color: '#ffffffa5',
        marginTop: 5,
    },
    popupblock: {
        marginTop: 10,
    },
    paragraph: {
        color: '#ffffffB3'
    },
    playbutton: {
        borderWidth: 0.5,
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 15,
        borderColor: '#ffffffa5',
        color: '#ffffffa5',
    },
    time: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffffa5',
        marginHorizontal: 5,
    },
    category: {
        fontSize: 14,
        color: 'gray',
        //fontStyle: 'italic',
        marginVertical: 3,
        textTransform: 'capitalize'

    },

});

export default CreatorProfile;