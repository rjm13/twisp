import React, {useState, useEffect, useContext} from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback, 
    ImageBackground,
    TouchableOpacity 
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Carousel from 'react-native-reanimated-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import { storiesByUpdated, getUser } from '../../src/graphql/queries';
import { deletePinnedStory, createPinnedStory } from '../../src/graphql/mutations';
import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';

import { AppContext } from '../../AppContext';
//import PinStory from '../functions/PinStory';
//import unPinStory from '../functions/UnPinStory';
import TimeConversion from '../functions/TimeConversion';


const ForYouCarousel = () => {

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
            getUser, {id: userInfo.attributes.sub}
        ))
    
        const getThePins = async () => {
            for (let i = 0; i < getPin.data.getUser.Pinned.items.length; i++) {
                if (getPin.data.getUser.Pinned.items[i].storyID === storyID) {
                    let deleteConnection = await API.graphql(graphqlOperation(
                        deletePinnedStory, {input: {"id": getPin.data.getUser.Pinned.items[i].id}}
                    ))
                    console.log(deleteConnection)
                }
    
                // if (getPin.data.getUser.Pinned.nextToken) {
                //     setNextToken(getPin.data.getUser.Pinned.nextToken);
                //     getThePins();
                //     return;
                // }
            }
    
                const index = userPins.indexOf(storyID);
    
                const x = userPins.splice(index, 1);
    
                setUserPins(x)
        }
        getThePins(); 
    }

    //global context for nsfw filter
    const { nsfwOn } = useContext(AppContext);

    //data for the flatlist. 
    const [Storys, setStorys] = useState([]);

    //carousel tile
    const Item = ({title, genreName, icon, summary, imageUri, author, narrator, time, id, color} : any) => {

        const [imageU, setImageU] = useState('');
        
        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri);
                setImageU(response);
            }
            fetchImage()
        }, [])

        //navigation hook
        const navigation = useNavigation();

        //set the gloabal context for the storyID
        const { setStoryID } = useContext(AppContext);
        const onPlay = () => {setStoryID(id);}

        //determine to show the extra story info or not
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
                        imageStyle={{borderRadius: 15}}
                    >
                    <View 
                        style={{ 
                            backgroundColor: '#000000BF',
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15,
                            borderTopRightRadius: isVisible === true ? 15 : 0,
                            borderTopLeftRadius: isVisible === true ? 15 : 0,
                            width: '100%',
                            height: isVisible === true ? 280 : undefined,
                            padding: 10, 
                            justifyContent: 'space-between'
                    }}>
                        <TouchableWithoutFeedback onPress={onShow}>
                            <View>
                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={styles.title}>
                                                {title}
                                            </Text> 
                                            <Text style={{fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
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

    //get the data for the flatlist. Must have: image, not be hidden, be approved, not after dark
    useEffect( () => {

        const RandomStories = []

        const fetchStorys = async () => {
            try {
                const response = await API.graphql(
                    graphqlOperation(
                        
                        storiesByUpdated, {
                            type: 'Story',
                            sortDirection: 'DESC',
                            filter: {
                                // approved: {
                                //     eq: 'approved'
                                // },
                                hidden: {
                                    eq: false
                                },
                                imageUri: {
                                    attributeExists: true
                                },
                                // genreID: {
                                //     ne: '1108a619-1c0e-4064-8fce-41f1f6262070'
                                // },
                                // nsfw: {
                                //     ne: nsfwOn === true ? true : null
                                // }
                                // ratingAvg: {
                                //     gt: 6
                                // },
                                // numListens: {
                                //     gt: 100
                                // }
                            }
                        }
                    )
                )

                if (response) {
                    let randomarr = []
                    for (let i = 0; i < 10; i++) {
                        let x = Math.floor(Math.random() * response.data.storiesByUpdated.items.length)
                        if (randomarr.includes(x) === false) {
                            randomarr.push(x)
                            RandomStories.push(response.data.storiesByUpdated.items[x])
                        }
                        
                    }
                }


                setStorys(RandomStories);
            } catch (e) {
                console.log(e);
            }
        }
        fetchStorys();
    },[])

    const renderItem = ({ item }: any) => {

        let icon = ''
        let genreName = ''
        let primary = ''

        if (item?.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.color
        }
        
        return (
        <Item 
          title={item?.title}
          imageUri={item?.imageUri}
          genreName={genreName}
          icon={icon}
          primary={primary}
          audioUri={item?.audioUri}
          summary={item?.summary}
          author={item?.author}
          narrator={item?.narrator}
          narratorID={item?.narratorID}
          artistID={item?.artistID}
          time={item?.time}
          id={item?.id}
          userID={item?.userID}
          
        />
      );}

    return (
        <SafeAreaView style={{alignItems: 'center'}}>
            <Carousel
                data={Storys}
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
        color: '#fff',
      },
      button: {
        fontSize: 12,
        color: '#fff',
      },
      buttonbox:
      {
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

    },
    popupblock: {
        marginTop: 0,
        justifyContent: 'space-between',
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

export default ForYouCarousel;