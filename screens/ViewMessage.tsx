import React, { useEffect, useState, useRef } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableWithoutFeedback,  
    Image,
    FlatList,
    Dimensions,
    TextInput,
    Keyboard,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Modal
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { StorageAccessFramework } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
//import * as DocumentPicker from 'expo-document-picker';
//import * as Sharing from 'expo-sharing';
import * as Permissions from 'expo-permissions'
//import * as MediaLibrary from 'expo-media-library';
import { format, formatRelative, parseISO } from "date-fns";
import uuid from 'react-native-uuid';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getMessage } from '../src/graphql/queries';
import { updateMessage } from '../src/graphql/mutations';
import * as Notifications from 'expo-notifications';
import {
    AndroidImportance,
    AndroidNotificationVisibility,
    NotificationChannel,
    NotificationChannelInput,
    NotificationContentInput,
  } from "expo-notifications";

import { useRoute } from '@react-navigation/native';

const ViewMessage = ({navigation} : any) => {


    const route = useRoute();
    const { messageid } = route.params;

    const [message, setMessage] = useState({});
    const [messageDate, setMessageDate] = useState('');

    const [didMessageUpdate, setDidMessageUpdate] = useState(false);


    useEffect(() => {
        const markRead = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();
            

            let messageresponse = await API.graphql(graphqlOperation(
                getMessage, {id: messageid}
            ))
            
            setMessage(messageresponse.data.getMessage);
            setMessageDate(formatRelative(parseISO(messageresponse.data.getMessage.createdAt), new Date()))

            if (messageresponse.data.getMessage.receiverID === userInfo.attributes.sub) {
               await API.graphql(graphqlOperation(
                    updateMessage, {input: {
                        id: messageid,
                        isReadByReceiver: true,
                    }}
                ))
            }
            
        }
        markRead();
    }, [ didMessageUpdate])


    return (
        <View >
            <LinearGradient
                colors={['#202020a5', '#171717a5', 'black']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{}}
            >
                <View style={{justifyContent: 'space-between', height: Dimensions.get('window').height}}>
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 20, alignItems: 'center'}}>
                            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                <View style={{padding: 30, margin: -30}}>
                                    <FontAwesome5 
                                        name='chevron-left'
                                        color='#fff'
                                        size={20}
                                    />
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={{height: 60}}/>

                            <Text style={[styles.header, {marginLeft: 20, flexWrap: 'wrap', width: Dimensions.get('window').width*0.8}]}>
                                {message?.title}
                            </Text>

                            {/* {message?.status === 'noreply' ? null : (
                                <Image 
                                    source={{uri: imageU}}
                                    style={{height: 40, width: 40, borderRadius: 25, marginLeft: 40}}
                                />
                            )}
                            {message?.status === 'noreply' ? (
                                <Text style={[styles.header, {marginLeft: 20}]}>
                                    
                                </Text>
                            ) :
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('UserScreen', {userID: message?.user?.id === user && message?.subtitle === 'artist' ? message?.otherUser?.id : message?.user?.id === user && message?.subtitle === 'narrator' ? message?.otherUser?.id : message?.user?.id})}>
                                <Text style={styles.header}>
                                    {message?.user?.id === user && message?.subtitle === 'artist' ? message?.otherUser?.artistPseudo : message?.user?.id === user && message?.subtitle === 'narrator' ? message?.otherUser?.narratorPseudo : message?.user?.pseudonym}
                                </Text>
                            </TouchableWithoutFeedback> 
                            } */}
                            
                        </View>

                        

                    </View>

                  

                </View>

                <View style={{alignSelf: 'center', position: 'absolute', top: 120, borderRadius: 15, backgroundColor: 'transparent', padding: 20, width: Dimensions.get('window').width - 40}}>
                                                
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{width: '84%'}}>
                                    {/* <Text style={{color: '#fff', fontWeight: '700', fontSize: 20}}>
                                        {message?.title}
                                    </Text> */}
                                </View>
                            </View>
                            
                          
                                <View>
                                    <Text style={{fontSize: 16, color: '#fff', marginTop: 14}}>
                                        {message?.content}
                                    </Text>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                        <Text style={{color: '#00ffffa5', fontSize: 14, marginTop: 20, textTransform: 'capitalize'}}>
                                            {messageDate}
                                        </Text>
                                    </View>
                                    
                                </View>
                        </View>
                
                 
                
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        height: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 20,
        textTransform: 'capitalize'
    },
    tile: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 40, 
        marginVertical: 20
    },
    button: {
        alignItems: 'center',
        marginVertical: 30,
    },
   
});

export default ViewMessage;