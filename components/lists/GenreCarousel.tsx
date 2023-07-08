import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    Dimensions, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    ImageBackground, 
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import Carousel from 'react-native-reanimated-carousel';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { AppContext } from '../../AppContext';
//import PinStory from '../functions/PinStory';
//import unPinStory from '../functions/UnPinStory';
import TimeConversion from '../functions/TimeConversion';

import { listStories, getUser } from '../../src/graphql/queries';
import { deletePinnedStory, createPinnedStory } from '../../src/graphql/mutations';
import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';


const GenreCarousel = ({genreid} : any) => {

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

    const { nsfwOn } = useContext(AppContext);

    //update list state
    const [didUpdate, setDidUpdate] = useState(false);


//fetch the stories for a specific genre for promoted carousel      
    const [carouselStories, setCarouselStories] = useState([]);

    useEffect(() => {

        let RandomStories = []

        const fetchStorys = async () => {
                
            if (genreid) {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listStories, {
                                
                                filter: {
                                    genreID: {
                                        eq: genreid
                                    },
                                    hidden: {
                                        eq: false
                                    },
                                    // approved: {
                                    //     eq: 'approved'
                                    // },
                                    nsfw: {
                                        ne: nsfwOn === true ? true : null
                                    },
                                    imageUri: {
                                        attributeExists: true
                                    }
                                }
                            } 
                        )
                    )
                    if (response) {
                        let randomarr = []
                        for (let i = 0; i < 10; i++) {
                            let x = Math.floor(Math.random() * response.data.listStories.items.length)
                            if (randomarr.includes(x) === false) {
                                randomarr.push(x)
                                RandomStories.push(response.data.listStories.items[x])
                            }
                            
                        }
                    }
                    setCarouselStories(RandomStories);
                } catch (e) {
                    console.log(e);}
            }
        }

        fetchStorys();

    },[didUpdate])

//item for the flatlist carousel
    const Item = ({ title, genreName, icon, summary, imageUri, author, narrator, time, id} : any) => {

        const [imageU, setImageU] = useState()
        
        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri);
                setImageU(response);
            }
            fetchImage()
        }, [])

        const navigation = useNavigation();

        //set the gloabal context for the storyID
        const { setStoryID } = useContext(AppContext);

        const onPlay = () => {
            setStoryID(id);
        }

        const [isVisible, setIsVisible] = useState(false);
        
        const onShow = () => {
            if ( isVisible === false ) {
                setIsVisible(true);
            }
            if ( isVisible === true ) {
                setIsVisible(false);
            }  
        };

    //queueing the item
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

        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', alignSelf: 'center', top: 80, backgroundColor: 'transparent'}}>
                    <FontAwesome5 
                        name={icon}
                        color='#ffffff'
                        size={50}
                    />
                </View>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
                <ImageBackground
                    source={{uri: imageU}}
                    style={{backgroundColor: '#ffffffa5', width: '100%', height: 280, justifyContent: 'flex-end', borderRadius: 15}}
                    imageStyle={{
                        borderRadius: 15,
                        
                    }}
                >
                    <View style={{ 
                        backgroundColor: '#000000B5',
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        borderTopRightRadius: isVisible === true ? 15 : 0,
                        borderTopLeftRadius: isVisible === true ? 15 : 0,
                        width: '100%',
                        padding: 10, 
                    }}
                    >
                        <TouchableWithoutFeedback onPress={onShow}>
                            <View>
                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={styles.title}>
                                                {title}
                                            </Text> 
                                            <Text style={[styles.category]}>
                                                {genreName}
                                            </Text>
                                        </View>
                                        
                                    </View>
                                    
                                    
                                    <View>
                                        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                            <FontAwesome5 
                                                name='book-open'
                                                size={12}
                                                color='#ffffffa5'
                                            />
                                                <Text style={styles.userId}>
                                                    {author}
                                                </Text>  
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
                            </View>
                        </TouchableWithoutFeedback>


                        <View>
                            { isVisible ? (
                                <View style={styles.popupblock}>
                                    <View style={{ marginTop: 20, marginBottom: 10 }}> 
                                        <Text style={styles.paragraph}>
                                            {summary}
                                        </Text>
                                    </View>
                        <View> 
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, marginHorizontal: 0, flexDirection: 'row',  }}>
                                        <TouchableOpacity onPress={onPlay}>
                                            <View style={{ 
                                                flexDirection: 'row', 
                                                alignItems: 'center', 
                                                borderRadius: 30,
                                                paddingVertical: 2,
                                                paddingHorizontal: 8,
                                                backgroundColor: '#ffffff4D',
                                                borderColor: '#ffffffCC',
                                                }}>
                                                    <FontAwesome5 
                                                        name='play'
                                                        color='#ffffff'
                                                        size={10}
                                                        style={{marginRight: 8}}
                                                    />
                                                    <Text style={{
                                                        fontSize: 14,
                                                        fontWeight: 'normal',
                                                        color: '#ffffffCC',
                                                    
                                                    }}>
                                                        {TimeConversion(time)}
                                                    </Text> 
                                            </View>
                                        </TouchableOpacity>
                                        
                                        <AntDesign
                                            name={isQ ? 'pushpin' : 'pushpino'}
                                            size={22}
                                            color={isQ ? 'cyan' : 'white'}
                                            onPress={onQPress}
                                        />
                                    
                                </View>

                            
                                    </View>
                            </View>

                            ) : false } 
                        </View>

                    </View>

                </ImageBackground>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    const renderItem = ({ item }: any) => {

        if (item === undefined) {
            return
        }

        let icon = ''
        let genreName = ''
        let primary = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.color
        }
        
        return (
        <Item 
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
          id={item.id}
          //liked={item.liked}
          //rating={item.rating}
        />
      );}

    return (

        <SafeAreaView style={{}}>

            <Carousel
                data={carouselStories}
                renderItem={renderItem}
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').width*0.8}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                pagingEnabled={true}
                snapEnabled={true}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 70,
                    parallaxAdjacentItemScale: 0.8,
                }}
                style={{
                    width: Dimensions.get('window').width,
                 }}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 0,
        width: Dimensions.get('window').width*0.9,
        alignSelf: 'center',
      },
    rowcontainer: {
        
    },
    header: {
        flexDirection: 'row', 
        paddingHorizontal: 0, 
        paddingTop: 20, 
        justifyContent: 'space-between',
        borderTopWidth: 0.3,
        borderColor: 'gray',

    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      flexWrap: 'wrap',
      width: 275, 
    },
    listheader: {
        fontSize: 18,
        //fontWeight: 'bold',
        color: '#fff',
      },
      button: {
        fontSize: 12,
        //fontWeight: 'bold',
        color: '#fff',
      },
      buttonbox:
      {
        //margin: 20,
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingVertical: 4,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      userId: {
        fontSize: 12,
        color: '#ffffffE6',
        marginRight: 15,
        marginLeft: 5,
        textTransform: 'capitalize'
    },
    category: {
        fontSize: 14,
        color: '#ffffffa5',
        textTransform: 'capitalize'
        //fontStyle: 'italic',
        //marginVertical: 3,

    },
    popupblock: {
        marginTop: 0,
        justifyContent: 'space-between',
        //height: 180,
    },
    paragraph: {
        color: '#ffffffE6',
        fontSize: 13
    },
    playbutton: {
        borderWidth: 0.3,
        paddingHorizontal: 15,
        paddingVertical: 0,
        borderRadius: 15,
        borderColor: '#fff',
        color: '#fff',
    },
    time: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffffCC',
        marginLeft: 3,
    },
    

});

export default GenreCarousel;