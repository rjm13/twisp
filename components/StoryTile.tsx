import React, {useState, useContext, useEffect} from 'react';

import {
    View, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    StyleSheet
} from'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { pinnedStoriesByUserByStory } from '../src/graphql/queries';

import {useNavigation} from '@react-navigation/native';
import ShareStory from '../components/functions/ShareStory';
import { deletePinnedStory, createPinnedStory } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';
import TimeConversion from './functions/TimeConversion';

const StoryTile = ({
    title, 
    genreName, 
    summary, 
    imageUri, 
    nsfw, 
    audioUri, 
    author, 
    narrator, 
    time, 
    id,
    ratingAvg,
    ratingAmt,
    icon,
    numComments,
    numListens,
} : any) => {

    const [nextToken, setNextToken] = useState()
    const { userPins } = useContext(AppContext);
    const { setUserPins } = useContext(AppContext);

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
    
    
        const getThePins = async () => {


            let getPin = await API.graphql(graphqlOperation(
                pinnedStoriesByUserByStory, {
                    nextToken, 
                    userID: userInfo.attributes.sub,
                    storyID: storyID
                }
            ))

            if (getPin.data.pinnedStoriesByUserByStory.items[0]) {
                let deleteConnection = await API.graphql(graphqlOperation(
                    deletePinnedStory, {input: {"id": getPin.data.pinnedStoriesByUserByStory.items[0].id}}
                ))
                console.log(deleteConnection)
            }

            const index = arr.indexOf(storyID);

            arr.splice(index, 1); 
        }
        
        getThePins(); 
        setUserPins(arr)
    }
        
//temporary signed image uri
    const [imageU, setImageU] = useState('')
      
//push the s3 image key to get the signed uri
    useEffect(() => {
        const fetchImage = async () => {
            let response = await Storage.get(imageUri);
            setImageU(response);
        }
        fetchImage()
    }, [])    

//navigation hook
    const navigation = useNavigation();

//expanding list item
    const [isVisible, setIsVisible] = useState(false);

//liking the item state
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

//queueing the item state when pressed
const [isQ, setQd] = useState(false);
        
const onQPress = () => {
    if ( isQ === false ) {
        setQd(true);
        PinStory({storyID: id})
    }
    if ( isQ === true ) {
        setQd(false);
        unPinStory({storyID: id});
    }  
};

//on render, determine if the story in alraedy pinned or not
useEffect(() => {
    if (userPins.includes(id) === true) {
        setQd(true)
    }
}, [])

//play the audio story by setting the global context to the story id
    const { setStoryID } = useContext(AppContext);
    const onPlay = () => {setStoryID(id);}

    //determine if this user has rated this story or not. If rated, the star will appear gold
    const [isRated, setIsRated] = useState(false);

    //if item is finished state
    const [isFinished, setIsFinished] = useState(false);

    // useEffect(() => {

    //     const fetchRating = async () => {

    //         let userInfo = await Auth.currentAuthenticatedUser();

    //         // let Rating = await API.graphql(graphqlOperation(
    //         //     listRatings, {filter: {
    //         //         userID: {
    //         //             eq: userInfo.attributes.sub
    //         //         },
    //         //         storyID: {
    //         //             eq: id
    //         //         }
    //         //     }}
    //         // ))

    //         let storyCheck = await API.graphql(graphqlOperation(
    //             listFinishedStories, {filter: {
    //                 userID: {
    //                     eq: userInfo.attributes.sub
    //                     },
    //                 storyID: {
    //                     eq: id
    //                 }
    //                 }
    //             }
    //         ));

    //         if (storyCheck.data.listFinishedStories.items.length === 1) {
    //             setIsFinished(true);
    //         }
    //         // if (Rating.data.listRatings.items.length === 1) {
    //         //     setIsRated(true);
    //         // } else {
    //         //     setIsRated(false);
    //         // }

    //     }
    //     fetchRating();
    // }, [])

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
                <View style={styles.tile}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{marginLeft: isVisible === true ? -10 : 0}}>
                        {imageU !== '' ? (
                            <Image 
                                source={{uri: imageU}}
                                style={{
                                    width: imageU && isVisible === false ? 70 : 0,
                                    height: imageU && isVisible === false ? 70 : 0,
                                    borderRadius: 15,
                                    marginVertical: 0,
                                    marginRight: 12,
                                    marginLeft: -6,
                                    backgroundColor: '#ffffffa5'
                                }}
                            />
                        ) : null}
                        
                        </View>
                        
                        <View style={{ width: isVisible ? Dimensions.get('window').width*0.88 : Dimensions.get('window').width*0.68}}>
                                <View style={{justifyContent: 'space-between'}}>
                                    <Text style={[styles.name, {flexWrap: 'wrap', width: '96%'}]}>
                                        {title}
                                    </Text> 

                                    <View style={{ flexDirection: 'row', width: '99%', marginTop: 0, alignItems: 'center', flexWrap: 'wrap'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <FontAwesome5 
                                                name='book-open'
                                                size={12}
                                                color='#ffffffa5'
                                            />
                                            <Text style={styles.userId}>
                                                {author}
                                            </Text>  
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <FontAwesome5 
                                                name='book-reader'
                                                size={12}
                                                color='#ffffffa5'
                                            />
                                            <Text style={styles.userId}>
                                                {narrator}
                                            </Text>  
                                        </View>
                                        
                                        
                                    </View>
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16, width: Dimensions.get('window').width-40, justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                                            {genreName}
                                        </Text>
                                    <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name='comment'
                                            color='#ffffffa5'
                                            size={12}
                                        />
                                        <Text style={{marginLeft: 4, fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                                            {numComments ? numComments : 0}
                                        </Text>
                                    </View>
                                    <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome5 
                                            name='headphones'
                                            color='#ffffffa5'
                                            size={12}
                                        />
                                        <Text style={{marginLeft: 4, fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                                            {numListens ? numListens : 0}
                                        </Text>
                                    </View>
                                    {isVisible ? null : (
                                        <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                                            <FontAwesome 
                                                name='star'
                                                color='#ffffffa5'
                                                size={12}
                                            />
                                            <Text style={{marginLeft: 4, fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                                                {(ratingAvg/10).toFixed(1)}
                                            </Text>
                                        </View>
                                    )}
                                    </View>
                                    
                                         {isVisible ? (
                                            <View style={{marginRight: 10}}>
                                            <TouchableOpacity onPress={onPlay}>
                                                <View style={{ 
                                                    flexDirection: 'row', 
                                                    alignItems: 'center', 
                                                    borderRadius: 30,
                                                    paddingVertical: 2,
                                                    paddingHorizontal: 10,
                                                    backgroundColor: '#ffffff33',
                                                    marginLeft: -10
                                                    
                                                }}>
                                                    <FontAwesome5 
                                                        name='play'
                                                        color='#ffffff'
                                                        size={10}
                                                    />
                                                    <Text style={styles.time}>
                                                        {TimeConversion(time)}
                                                    </Text> 
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        ) : null}
                                    
                                </View>
                        </View>
                        {isVisible ? (
                            <View>
                            {/* <TouchableOpacity onPress={onPlay}>
                                <View style={{ 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    borderRadius: 30,
                                    paddingVertical: 2,
                                    paddingHorizontal: 10,
                                    backgroundColor: '#ffffff33',
                                    marginLeft: -10
                                    
                                }}>
                                    <FontAwesome5 
                                        name='play'
                                        color='#ffffff'
                                        size={10}
                                    />
                                    <Text style={styles.time}>
                                        {TimeConversion(time)}
                                    </Text> 
                                </View>
                            </TouchableOpacity> */}
                        </View>
                        ) : null}
                        
                        
                    </View> 
            
            { isVisible ? (
                <View style={styles.popupblock}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                        <View style={{alignItems: 'center', width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ marginVertical: 10, alignSelf: 'flex-start', flexDirection: 'row',  }}>

                                <View style={{alignItems: 'center', marginRight: 25,}}>
                                    <AntDesign
                                        name={isQ ? 'pushpin' : 'pushpino'}
                                        size={20}
                                        color={isQ ? 'cyan' : 'white'}
                                        onPress={onQPress}
                                    />
                                </View>

                                <View style={{alignItems: 'center'}}>
                                    <FontAwesome
                                        name='share'
                                        size={20}
                                        color='white'
                                        onPress={() => ShareStory({id: id, title: title})}
                                    />
                                </View>
                            </View>

                            <View>
                                <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{color: '#ffffffa5', fontSize: 15, alignSelf: 'center'}}>
                                            ({ratingAmt})
                                        </Text>
                                       <FontAwesome
                                            //name={isRated ? 'star' : 'star-o'}
                                            name='star'
                                            size={17}
                                            //color={isRated === true || isFinished === true ? 'gold' : 'white'}
                                            color='gold'
                                            style={{paddingHorizontal: 10}}
                                        /> 
                                        
                                    </View>
                                    <Text style={{textAlign: 'center', fontSize: 17, color: '#e0e0e0'}}>
                                        {(ratingAvg/10).toFixed(1)}
                                    </Text>
                                </View>
                            </View>
                    
                        </View>  
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
                        <View>
                            <View style={{ position: 'absolute', alignSelf: 'center', top: 80}}>
                                <FontAwesome5 
                                    name={icon}
                                    color='#ffffff'
                                    size={50}
                                />
                            </View>
                            <Image 
                                source={{uri: imageU}}
                                style={{
                                    height: imageU ? 200 : 0,
                                    borderRadius: 15,
                                    marginVertical: 15,
                                    marginHorizontal: -10,
                                    backgroundColor: '#ffffffa5'
                                }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.paragraph}>
                        {summary}
                    </Text>
                </View>
            ) : false }  
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       width: Dimensions.get('window').width, 
    },
    tile: {
        backgroundColor: '#202020a5',
        marginHorizontal: 8,
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 14, 
        borderRadius: 15,
        
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flexWrap: 'wrap',
        width: 225,
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

export default StoryTile;