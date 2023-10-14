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
import FireRating from '../FireRating';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AnimatedGradient, {presetColors} from '../functions/AnimatedGradient';

import { AppContext } from '../../AppContext';
import TimeConversion from '../functions/TimeConversion';

import { storiesByGenre, pinnedStoriesByUserByStory } from '../../src/graphql/queries';
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

        let arr = userPins;
    
        let userInfo = await Auth.currentAuthenticatedUser();
    
        const getThePins = async () => {


            let getPin = await API.graphql(graphqlOperation(
                pinnedStoriesByUserByStory, {
                    userID: userInfo.attributes.sub,
                    storyID: {
                        eq: storyID
                    }
                }
            ))

            if (getPin.data.pinnedStoriesByUserByStory.items) {
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

    //update list state
    const [didUpdate, setDidUpdate] = useState(false);

    const LoadingItem = () => {
        return (
            <View style={{
                width: Dimensions.get('window').width-40,
                height: Dimensions.get('window').height*0.4,
                borderRadius: 15,
                margin: 10,
                alignSelf: 'center'
            }}>
                <AnimatedGradient customColors={presetColors.loading} speed={2000} />
            </View>
        )
    }


//fetch the stories for a specific genre for promoted carousel      
    const [carouselStories, setCarouselStories] = useState([]);

    useEffect(() => {

        let count = 0

        let RandomStories = []

        let finalRandom = []

        const fetchStorys = async (nextToken : any) => {
                
            if (genreid) {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            storiesByGenre, {
                                nextToken,
                                genreID: genreid,
                                filter: {
                                    hidden: {
                                        eq: false
                                    },
                                    approved: {
                                        eq: true
                                    },
                                    imageUri: {
                                        attributeExists: true
                                    }
                                }
                            } 
                        )
                    )

                    console.log('number of stories initial is', response.data.storiesByGenre.items.length)
                   
                    if (response) {

                        let leng = 0

                        let arr = Array.from(Array(response.data.storiesByGenre.items.length).keys())
    
                        for (let i = 0; i < response.data.storiesByGenre.items.length; i++) {

                            leng = response.data.storiesByGenre.items.length
                            let x = arr[Math.floor(Math.random()*arr.length)];
                            const index = arr.indexOf(x);
                            arr.splice(index, 1);

                            if (count < 10) {
                                RandomStories.push(response.data.storiesByGenre.items[x])
                                count++
                            }
                        }

                        console.log('count is', count)

                        if (count === 10) {
                            //let random = [...RandomStories]
                            // let arrcount = Array.from(Array(count).keys())
                            // for (let i = 0; i < count; i++) {
                            //     let x = arrcount[Math.floor(Math.random()*arrcount.length)];
                            //     finalRandom.push(RandomStories[x])
                            //     const index = arrcount.indexOf(x);
                            //     arrcount.splice(index, 1);
                            // }   
                            setCarouselStories(RandomStories);   
                        }

                        if (count < 10 && response.data.storiesByGenre.nextToken) {  
                            fetchStorys(response.data.storiesByGenre.nextToken)
                        }

                        if (count < 10 && response.data.storiesByGenre.nextToken === null) {
                            //let random = [...RandomStories]
                            // let arrcount = Array.from(Array(count).keys())
                            // for (let i = 0; i < count; i++) {
                            //     let x = arrcount[Math.floor(Math.random()*arrcount.length)];
                            //     finalRandom.push(RandomStories[x])
                            //     const index = arrcount.indexOf(x);
                            //     arrcount.splice(index, 1);
                            // }  
                            setCarouselStories(RandomStories);   
                        }
                         
                    }


                } catch (e) {
                    console.log(e);}
            }
        }

        fetchStorys(null);

    },[genreid])

//item for the flatlist carousel
    const Item = ({ title, genreName, primary, icon, summary, imageUri, author, narrator, time, id, numComments, numListens, ratingAvg, ratingAmt} : any) => {

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
                    {imageU !== '' ? (
                        <ImageBackground
                            source={{uri: imageU}}
                            style={{backgroundColor: '#171717', width: Dimensions.get('window').width*0.9, height: Dimensions.get('window').height*0.40, justifyContent: 'flex-end', borderRadius: 15}}
                            imageStyle={{borderRadius: 15}}
                        >
                    
                    <View 
                        style={{ 
                            backgroundColor: '#000000BF',
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15,
                            borderTopRightRadius: isVisible === true ? 15 : 0,
                            borderTopLeftRadius: isVisible === true ? 15 : 0,
                            width: Dimensions.get('window').width*0.9,
                            height: isVisible === true ? Dimensions.get('window').height*0.40 : undefined,
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
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'row', marginTop: 0, alignItems: 'center'}}>
                                            <FontAwesome5 
                                                name='book-open'
                                                size={11}
                                                color='#ffffffa5'
                                            />
                                            <Text style={[styles.userId, {fontSize: 13, color: '#ffffffa5'}]}>
                                                {author}
                                            </Text>  
                                            <FontAwesome5 
                                                name='book-reader'
                                                size={11}
                                                color='#ffffffa5'
                                            />
                                            <Text style={[styles.userId, {fontSize: 13, color: '#ffffffa5'}]}>
                                                {narrator}
                                            </Text> 
                                        </View>
                                    </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                                                <Text style={{fontSize: 13, color: primary, textTransform: 'capitalize'}}>
                                                    {genreName}
                                                </Text>
                                                <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                                                    <FontAwesome 
                                                        name='comment'
                                                        color='#ffffffa5'
                                                        size={13}
                                                    />
                                                    <Text style={{marginLeft: 4, fontSize: 13, color: '#ffffffa5', textTransform: 'capitalize'}}>
                                                        {numComments ? numComments : 0}
                                                    </Text>
                                                </View>
                                                <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                                                    <FontAwesome5 
                                                        name='headphones'
                                                        color='#ffffffa5'
                                                        size={13}
                                                    />
                                                    <Text style={{marginLeft: 4, fontSize: 13, color: '#ffffffa5', textTransform: 'capitalize'}}>
                                                        {numListens ? numListens : 0}
                                                    </Text>
                                                </View>
                                                
                                                <FireRating ratingAvg={ratingAvg} fontSize={13} iconSize={14} />
                                        </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <View>
                            { isVisible ? (
                                <View style={styles.popupblock}>
                                    <View style={{ marginTop: 20, marginBottom: 10 }}> 
                                        <Text style={[styles.paragraph, {fontSize: 14}]}>
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
                    ) : (
                        <LoadingItem />
                    )}
                        
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
          ratingAvg={item.ratingAvg}
          ratingAmt={item.ratingAmt}
          numListens={item.numlistens}
          numComments={item.numComments}
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
                height={Dimensions.get('window').height*0.4}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                pagingEnabled={true}
                snapEnabled={true}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 1,
                    parallaxScrollingOffset: 100,
                    parallaxAdjacentItemScale: 0.8,
                }}
                style={{
                    width: Dimensions.get('window').width,
                    marginVertical: 20
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
      fontWeight: '600',
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