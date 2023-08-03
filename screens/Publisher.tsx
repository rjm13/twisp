import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Dimensions, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Linking,
    Modal
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, isMonday, parseISO } from "date-fns";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';

const Publisher = ({navigation} : any) => {

    const [user, setUser] = useState({})

    const [isMod, setIsMod] = useState()

    const route = useRoute();
    const {update} = route.params

    const [didUpdate, setDidUpdate] = useState(false);


//get the current user and list their followings and followers
    useEffect(() => {
        const fetchUser = async () => {

          const userInfo = await Auth.currentAuthenticatedUser();

          setIsMod(userInfo)

            if (!userInfo) {return;}

          try {
            const userData = await API.graphql(graphqlOperation(
              getUser, {id: userInfo.attributes.sub}
            ))

            if (userData) {
                setUser(userData.data.getUser);
                if(userData.data.getUser.isPublisher === true) {setIsPublisher(true);}
            }

          } catch (e) {
            console.log(e);
          }
        }
        fetchUser();
      }, [didUpdate, update])

      const [isPublisher, setIsPublisher] = useState(false);

      const [statusRoute, setStatusRoute] = useState('');


    return (
                
        <View style={styles.container}>

            <LinearGradient
                colors={['black', '#363636a5', 'black']}
                style={{height: Dimensions.get('window').height,justifyContent: 'space-between'}}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{marginHorizontal: 20, marginTop: 50, marginBottom: 20}}>
                    <View style={{ alignItems:'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen')}>
                                <View style={{padding: 30, margin: -30}}>
                                    <FontAwesome5 
                                        name='chevron-left'
                                        color="#fff"
                                        size={20}
                                        style={{alignSelf: 'center'}}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            
                            <Text style={styles.header}>
                                Publisher Home
                            </Text>
                            
                        </View>

                        {isMod?.signInUserSession?.idToken.payload["cognito:groups"].includes('mods') === true ? (
                            <FontAwesome5 
                                name='toilet-paper'
                                color='#fff'
                                size={17}
                                style={{padding: 20, margin: -20}}
                                onPress={() => navigation.navigate('ModSection')}
                            /> 
                        ) : null}  
                        
                    </View>  
                </View>

                <ScrollView>  
                    <View style={styles.container}>
                        {isPublisher === true ? (
                            <View>
                                <TouchableWithoutFeedback >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                        <Text style={{ color: '#fff', fontSize: 16}}>
                                            Followers
                                        </Text>
                                        <Text style={styles.textcounter}>
                                            {user?.followers.items.length}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            
                            
                            <TouchableWithoutFeedback onPress={ () => navigation.navigate('MyStories')}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                    <Text style={{ color: '#fff', fontSize: 16}}>
                                        Published Stories
                                    </Text>
                                    <Text style={styles.textcounter}>
                                        {user?.authored?.items.length}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        ) : null}

    {/* line break */}
                        <View style={{marginVertical: 20, alignSelf: 'center', width: '80%', height: 1, borderColor: '#fff', borderWidth: 0.5}}>
                        </View>

                        {isPublisher === true ? (
                            <View>
                                <TouchableWithoutFeedback onPress={() => {navigation.navigate('UploadAudio')}}>
                                    <View style={[styles.button, {backgroundColor: 'cyan'}]}>
                                        <Text style={styles.buttontext}>
                                            Publish a Story
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ) : null}
                        
                    </View>

                    <View style={{marginVertical: 40, marginBottom: 120}}>
                        <TouchableWithoutFeedback onPress={() => Linking.openURL('http://www.blipstories.com/terms')}>
                            <View style={{ justifyContent: 'center', marginHorizontal: 40, marginVertical: 20}}>
                                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14}}>
                                    Terms and Conditions
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>

            </LinearGradient>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        width: Dimensions.get('window').width,
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40,
    },
    textcounter: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: 'bold'
    }, button: {
        marginVertical: 10, 
        alignSelf: 'center', 
        width: '80%', 
        height: 60, 
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttontext: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default Publisher;