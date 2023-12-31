import React, {useState, useEffect, useContext} from 'react';
import { 
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback, 
    ImageBackground,
    TouchableOpacity ,
    Image
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-reanimated-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import { storiesByUpdated, pinnedStoriesByUserByStory } from '../../src/graphql/queries';
import { deletePinnedStory, createPinnedStory } from '../../src/graphql/mutations';
import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';

import { AppContext } from '../../AppContext';
import TimeConversion from '../functions/TimeConversion';
import FireRating from '../FireRating';
import ShareStory from '../../components/functions/ShareStory';

import AnimatedGradient, {presetColors} from '../functions/AnimatedGradient';

const ForYouCarousel = () => {

    const { userPins, refreshPins, refreshApp } = useContext(AppContext);
    const { setUserPins, setRefreshPins } = useContext(AppContext);

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
        setUserPins(pins);
        setRefreshPins(Math.random())
    
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

            if (getPin.data.pinnedStoriesByUserByStory.items[0]?.storyID === storyID) {
                let deleteConnection = await API.graphql(graphqlOperation(
                    deletePinnedStory, {input: {"id": getPin.data.pinnedStoriesByUserByStory.items[0].id}}
                ))
                console.log(deleteConnection)

                const index = arr.indexOf(storyID);

                arr.splice(index, 1); 

                setUserPins(arr)
                setRefreshPins(Math.random())
            }
        }
        
        getThePins(); 
        
    }

    //global context for nsfw filter
    const { nsfwOn } = useContext(AppContext);

    //data for the flatlist. 
    const [Storys, setStorys] = useState([]);

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

    //carousel tile
    const Item = ({index, title, genreName, primary, icon, summary, imageUri, author, narrator, time, id, numListens, numComments, ratingAvg} : any) => {

        //on render, determine if the story in alraedy pinned or not
        useEffect(() => {
            if (userPins.includes(id) === true) {
                setQd(true)
            }
        }, [refreshPins])


        const [imageU, setImageU] = useState('');
        
        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri, { expires: 3600 });
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
                console.log('pinning')
                setQd(true);
                PinStory({storyID: id})
            }
            if ( isQ === true ) {
                console.log('unpinning')
                setQd(false);
                unPinStory({storyID: id});
            }  
        };

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
                            style={{alignSelf: 'center', backgroundColor: '#171717', width: Dimensions.get('window').width*0.9, height: Dimensions.get('window').height*0.40, justifyContent: 'flex-end', borderRadius: 15}}
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
                                    <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                                        <View style={{ marginTop: 20, marginBottom: 10 }}> 
                                            <Text style={[styles.paragraph, {fontSize: 14}]}>
                                                {summary}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                            <View> 
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, marginHorizontal: 0, flexDirection: 'row',  }}>
                                <View style={{marginLeft: 10}}>
                                            <TouchableOpacity onPress={onPlay}>
                                                <View style={{ 
                                                    flexDirection: 'row', 
                                                    alignItems: 'center', 
                                                    borderRadius: 30,
                                                    paddingVertical: 2,
                                                    paddingHorizontal: 10,
                                                    backgroundColor: '#363636a5',
                                                    marginLeft: -10,
                                                    borderWidth: 0.5,
                                                    borderColor: '#ffffffa5'
                                                    
                                                }}>
                                                    <FontAwesome5 
                                                        name='play'
                                                        color='#ffffff'
                                                        size={10}
                                                        style={{marginRight: 2}}
                                                    />
                                                    <Text style={styles.time}>
                                                        {TimeConversion(time)}
                                                    </Text> 
                                                </View>
                                            </TouchableOpacity>
                                    </View> 

                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome
                                        name='share'
                                        size={20}
                                        color='white'
                                        style={{paddingHorizontal: 10}}
                                        onPress={() => ShareStory({id: id, title: title})}
                                    />
                                    <AntDesign
                                            name={isQ ? 'pushpin' : 'pushpino'}
                                            size={22}
                                            color={isQ ? 'cyan' : 'white'}
                                            style={{paddingLeft: 10}}
                                            onPress={onQPress}
                                        />
                                </View>
                                        
                                        
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

    useEffect(() => {

        let count = 0

        let RandomStories = []

        let finalRandom = []

        const fetchStorys = async (nextToken : any) => {
                
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            storiesByUpdated, {
                                nextToken,
                                type: 'Story',
                                filter: {
                                    approved: {
                                        eq: true,
                                    },
                                    hidden: {
                                        eq: false
                                    },
                                    imageUri: {
                                        attributeExists: true
                                    },
                                    nsfw: {
                                        ne: nsfwOn === true ? true : null
                                    }
    //                             ratingAvg: {
    //                              gt: 6
    //                              },
    //                             numListens: {
    //                             gt: 100
    //                             }
                                }
                            } 
                        )
                    )

                    console.log('number of stories initial is', response.data.storiesByUpdated.items.length)
                   
                    if (response) {

                        let leng = 0

                        let arr = Array.from(Array(response.data.storiesByUpdated.items.length).keys())
    
                        for (let i = 0; i < response.data.storiesByUpdated.items.length; i++) {
                            leng = response.data.storiesByUpdated.items.length
                            let x = arr[Math.floor(Math.random()*arr.length)];
                            const index = arr.indexOf(x);
                            arr.splice(index, 1);

                            if (count < 10) {
                                RandomStories.push(response.data.storiesByUpdated.items[x])
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
                            setStorys(RandomStories);   
                        }

                        if (count < 10 && response.data.storiesByUpdated.nextToken) {  
                            fetchStorys(response.data.storiesByUpdated.nextToken)
                            return
                        }

                        if (count < 10 && response.data.storiesByUpdated.nextToken === null) {
                            //let random = [...RandomStories]
                            // let arrcount = Array.from(Array(count).keys())
                            // for (let i = 0; i < count; i++) {
                            //     let x = arrcount[Math.floor(Math.random()*arrcount.length)];
                            //     finalRandom.push(RandomStories[x])
                            //     const index = arrcount.indexOf(x);
                            //     arrcount.splice(index, 1);
                            // }  
                            setStorys(RandomStories);   
                        }
                         
                    }


                } catch (e) {
                    console.log(e);}
            
        }

        fetchStorys(null);

    },[])

    const renderItem = ({ item, index }: any) => {

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
                index={index}
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
                numListens={item?.numListens}
                numComments={item?.numComments}
                ratingAvg={item?.ratingAvg}
                />
       
      );} 
            
        

    return (
        <SafeAreaView style={{alignItems: 'center'}}>
                <Carousel
                    data={Storys}
                    renderItem={renderItem}
                    width={Dimensions.get('window').width}
                    height={Dimensions.get('window').height*0.44}
                    scrollAnimationDuration={1000}
                    //onSnapToItem={(index) => setCurrentIndex(index)}
                    pagingEnabled={true}
                    snapEnabled={true}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 1,
                        parallaxScrollingOffset: 76,
                        parallaxAdjacentItemScale: 0.8,
                    }}
                    style={{
                        width: Dimensions.get('window').width,
                        marginTop: 20,
                    
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