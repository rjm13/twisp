import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    ScrollView, 
    TouchableWithoutFeedback,  
    Image,
    Dimensions
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser } from '../src/graphql/queries';

import { AppContext } from '../AppContext';

const ProfileScreen = ({navigation} : any) => {

    const { userFollowing } = useContext(AppContext);

    //the current authenticated user
    const [user, setUser] = useState();
    const [imageU, setImageU] = useState();

    const [newMessages, setNewMessages] = useState(0);

    //on render, set the current user and get the list of followers an author has
    useEffect(() => {
      const fetchUser = async () => {

        let count = 0

        const userInfo = await Auth.currentAuthenticatedUser();
          if (!userInfo) {
            return;
          }
        try {
            const userData = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))

            if (userData) {
                setUser(userData.data.getUser);
                let imageresponse = await Storage.get(userData.data.getUser.imageUri)
                setImageU(imageresponse)
            }

            for (let i = 0; i < userData.data.getUser.messageRec.items.length; i++) {
                if (userData.data.getUser.messageRec.items[i].isReadByReceiver === false ) {
                    count++
                }
            }

            setNewMessages(count)

        } catch (e) {
          console.log(e);
        }
      }
      fetchUser();
    }, [])

    

    // useEffect(() => {
    //     const GetMessages = async () => {

    //         let userInfo = await Auth.currentAuthenticatedUser();

    //         let response = await API.graphql(graphqlOperation(
    //             listMessages, {
    //                 filter: {
    //                     or: [
    //                        {
    //                             userID: {
    //                                 eq: userInfo.attributes.sub
    //                             }, 
    //                             isReadbyUser: {
    //                                 eq: false,
    //                             }
    //                         },
    //                         {
    //                             otherUserID: {
    //                                 eq: userInfo.attributes.sub
    //                             },
    //                             isReadByOtherUser: {
    //                                 eq: false
    //                             }
    //                         },
    //                     ]
                        
    //                 }
    //             }
    //         ))
    //         setNewMessages(response.data.listMessages.items.length);
    //     }
    //     GetMessages();
    // }, [])

    return (
        <View style={styles.container}>
            
            <LinearGradient
                colors={['#363636a5', '#171717a5', 'black']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{height: Dimensions.get('window').height}}
            >
                
                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.header}>
                        Hello, {user?.name ? user?.name : 'Listener'}!
                    </Text>
                </View>
                
                <ScrollView style={{ height: '86%'}} showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={ user?.imageUri ? { uri: imageU} : require('../assets/blankprofile.png')}
                            style={{
                                width: 120,
                                height: 120,
                                backgroundColor: '#363636',
                                borderRadius: 60,
                                marginTop: 20,
                            }}
                        />
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Following')}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{ alignItems: 'center', margin: 20}}>
                                    <Text style={{ color: 'cyan', opacity: .5}}>
                                        {user?.numFolowing}
                                    </Text>
                                    <Text style={{ color: '#ffffffa5', fontWeight: 'bold'}}>
                                        Following
                                    </Text>
                                </View>

                                {user?.isPublisher === true ? (
                                    <View style={{ alignItems: 'center', margin: 20}}>
                                        <Text style={{ color: 'cyan', opacity: .5}}>
                                            {user?.numFollowers}
                                        </Text>
                                        <Text style={{ color: '#ffffffa5', fontWeight: 'bold'}}>
                                            Followers
                                        </Text>
                                    </View>
                                ) : null}
                                
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('AccountScreen')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Account
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback 
                        onPress={ () => navigation.navigate( user?.isPublisher === true  ? 'Publisher' : 'Publishing', {update: null})}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, paddingVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Publishing
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('Inbox')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Inbox
                                </Text>
                                {newMessages > 0 ? (
                                    <Text style={{fontWeight: 'bold', paddingTop: 1, paddingHorizontal: 8, backgroundColor: '#00ffffa5', borderRadius: 10, marginLeft: 10, overflow: 'hidden'}}>
                                        {newMessages}
                                    </Text>
                                   ) : null}
                            </View>
                            
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('EditProfileScreen', {user: user})}>
                        <View style={styles.tile}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Public Profile
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('InProgress')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, paddingVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                In Progress
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('History')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, paddingVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                History
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    {/* <TouchableWithoutFeedback onPress={ () => navigation.navigate('SavedPrompts')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, paddingVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Saved Prompts
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback> */}

                    

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('NotificationSetting')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Settings
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => navigation.navigate('AboutScreen')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                About
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ height: 180}}> 
                    </View>
                    
                </ScrollView>  
            </LinearGradient>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
        textTransform: 'capitalize'
    },
    tile: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 40, 
        marginVertical: 20
    }
});

export default ProfileScreen;