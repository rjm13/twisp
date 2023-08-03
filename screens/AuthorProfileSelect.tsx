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
import { creatorProfilesByUser } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';

const AuthorProfileSelect = ({navigation} : any) => {

    const [creatorProfiles, setCreatorProfiles] = useState([])

    const [didUpdate, setDidUpdate] = useState(false);


//get the current user and list their followings and followers
    useEffect(() => {
        const fetchUser = async () => {

          const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

          try {
            const userData = await API.graphql(graphqlOperation(
                creatorProfilesByUser, {userID: userInfo.attributes.sub}
            ))

            if (userData) {
                setCreatorProfiles(userData.data.creatorProfilesByUser.items);
            }

          } catch (e) {
            console.log(e);
          }
        }
        fetchUser();
      }, [didUpdate])

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
                            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
                                Author Profiles
                            </Text>
                            
                        </View>
                        
                    </View>  
                </View>

                <ScrollView>  
                    <View style={styles.container}>

                        <View>
                            {creatorProfiles.map(({ id, penName } : any) => (
                                    <View key={id} style={{}}>
                                        <TouchableWithoutFeedback onPress={() => navigation.navigate('EditAuthorProfile', {User: id})}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                                <Text style={{ color: '#fff', fontSize: 16}}>
                                                    {penName}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                            ))}
                        </View>
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

export default AuthorProfileSelect;