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
import AnimatedGradient, {presetColors} from './functions/AnimatedGradient';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { listRatings, listFinishedStories } from '../src/graphql/queries';

import {useNavigation} from '@react-navigation/native';

import PlayButton from './PlayButton';
import FireRating from '../components/FireRating'

const HorzStoryTile = ({
    title, 
    genreName, 
    imageUri, 
    id,
    ratingAvg,
    icon,
    primary,
    numComments,
    numListens,
    time
} : any) => {

    const LoadingItem = () => {
        return (
            <View style={{
                width: 220,
                height: 180,
                borderRadius: 15,
                marginBottom: 12
            }}>
                <AnimatedGradient customColors={presetColors.loading} speed={2000} />
            </View>
        )
    }
        
//temporary signed image uri
    const [imageU, setImageU] = useState('')
      
//push the s3 image key to get the signed uri
    useEffect(() => {
        const fetchImage = async () => {
            let response = await Storage.get(imageUri, { expires: 3600 });
            setImageU(response);
        }
        fetchImage()
    }, [])    

//navigation hook
    const navigation = useNavigation();


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
            {imageU !== '' ? (
                <ImageBackground
                    source={{uri: imageU}}
                    style={{marginBottom: 12, backgroundColor: '#ffffffa5', width: 220, height: 180, justifyContent: 'space-between', borderRadius: 15}}
                    imageStyle={{borderRadius: 15,}}
                >
                    <View>
                        <PlayButton id={id} time={time}/>
                    </View>
                    <View style={{ backgroundColor: '#000000B5', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, paddingHorizontal: 10, paddingVertical: 6}}> 
                        <View style={{marginBottom: 0}}>
                            <Text style={{width: 200, color: '#fff', fontSize: 14, fontWeight: '600'}}>
                                {title}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
                                <Text style={{fontSize: 14, color: primary, textTransform: 'capitalize'}}>
                                    {genreName}
                                </Text>
                                <View style={{marginLeft: genreName ? 10 : 0, flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome 
                                        name='comment'
                                        color='#ffffffa5'
                                        size={11}
                                    />
                                    <Text style={{marginLeft: 4, fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                                        {numComments ? numComments : 0}
                                    </Text>
                                </View>
                                <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='headphones'
                                        color='#ffffffa5'
                                        size={11}
                                    />
                                    <Text style={{marginLeft: 4, fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                                        {numListens ? numListens : 0}
                                    </Text>
                                </View>
                                
                                <FireRating ratingAvg={ratingAvg} width={10} height={12} fontSize={14} iconSize={11} />

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