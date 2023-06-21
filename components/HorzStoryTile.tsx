import React, {useState, useEffect} from 'react';

import {
    View, 
    Text, 
    TouchableWithoutFeedback,
    StyleSheet,
    ImageBackground
} from'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { listRatings, listFinishedStories } from '../src/graphql/queries';

import {useNavigation} from '@react-navigation/native';

const HorzStoryTile = ({
    title, 
    genreName, 
    imageUri, 
    id,
    ratingAvg,
    icon
} : any) => {
        
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

    //determine if this user has rated this story or not. If rated, the star will appear gold
    const [isRated, setIsRated] = useState(true);

    //if item is finished state
    const [isFinished, setIsFinished] = useState(true);

    // useEffect(() => {

    //     const fetchRating = async () => {

    //         let userInfo = await Auth.currentAuthenticatedUser();

    //         let Rating = await API.graphql(graphqlOperation(
    //             listRatings, {filter: {
    //                 userID: {
    //                     eq: userInfo.attributes.sub
    //                 },
    //                 storyID: {
    //                     eq: id
    //                 }
    //             }}
    //         ))

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
    //         if (Rating.data.listRatings.items.length === 1) {
    //             setIsRated(true);
    //         } else {
    //             setIsRated(false);
    //         }

    //     }
    //     fetchRating();
    // }, [])

    return (
        <View style={styles.container}>
  
        <View style={{ position: 'absolute', left: 80, top: 40, backgroundColor: 'transparent'}}>
            <FontAwesome5 
                name={icon}
                color='#ffffff'
                size={50}
            />
        </View>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
            <ImageBackground
                source={{uri: imageU}}
                style={{marginBottom: 12, backgroundColor: '#ffffffa5', width: 200, height: 180, justifyContent: 'flex-end', borderRadius: 15}}
                imageStyle={{borderRadius: 15,}}
            >
                <View style={{ flexDirection: genreName !== null ? 'column' : 'row', justifyContent: genreName !== null ? 'flex-start' : 'space-between', backgroundColor: '#000000B5', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, paddingHorizontal: 10, paddingVertical: 6}}> 
                    <View style={{marginBottom: 0}}>
                        <Text style={{width: 140, color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
                            {title}
                        </Text>
                    </View>
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        {genreName !== null ? (
                            <View>
                                <Text style={{color: '#ffffffa5', fontSize: 12, textTransform: 'capitalize'}}>
                                {genreName}
                                </Text>
                            </View> 
                        ) : null    
                        }
                       
                        <View style={{ alignItems: 'center', flexDirection: 'row'}}>
                            <FontAwesome 
                                name={isRated === true ? 'star' : 'star-o'}
                                size={12}
                                color={isRated === true || isFinished === true ? 'gold' : 'white'}
                                style={{marginRight: 6 }}
                            />
                            <Text style={{color: '#fff', fontSize: 12}}>
                                {(ratingAvg/10).toFixed(1)}
                            </Text>
                        </View>
                        
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
        
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginLeft: 20,
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
        flexWrap: 'wrap',
        width: 225,
    },
    userId: {
        fontSize: 12,
        color: '#ffffffa5',
        marginRight: 15,
        marginLeft: 5,
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

export default HorzStoryTile;