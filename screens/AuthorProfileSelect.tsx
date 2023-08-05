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
    Modal,
    Keyboard,
    TextInput,
    ActivityIndicator
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, isMonday, parseISO } from "date-fns";

import useStyles from '../styles';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { creatorProfilesByUser } from '../src/graphql/queries';
import { updateUser, createCreatorProfile } from '../src/graphql/mutations';

const AuthorProfileSelect = ({navigation} : any) => {

    const styles = useStyles();

    const [creatorProfiles, setCreatorProfiles] = useState([])

    const [didUpdate, setDidUpdate] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [createModal, setCreateModal] = useState(false)

    const [name, setName] = useState('')


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

      const CreateNewCreator = async () => {

        if (name.length > 3) {
           try {
                const userInfo = await Auth.currentAuthenticatedUser();

                const userData = await API.graphql(graphqlOperation(
                    createCreatorProfile, {input: {
                        userID: userInfo.attributes.sub,
                        penName: name, 
                    }}
                ))

                if (userData) {
                    navigation.navigate('EditAuthorProfile', {User: userData.data.createCreatorProfile.id })
                    setCreateModal(false)
                }

            } catch (e) {
                console.log(e);
                alert('Could not create profile. Please try again.')
            } 
            }
      }

    return (
                
        <View style={styles.container}>

            {/* //Update penName  */}
        <Modal animationType="slide" transparent={true} visible={createModal} onRequestClose={() => {setCreateModal(!createModal);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setCreateModal(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter a name for this profile
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput
                            placeholder='ex. Jane Doe'
                            placeholderTextColor='gray'
                            style={[styles.paragraph, {fontSize: 16, marginLeft: 10, textTransform: 'capitalize', width: Dimensions.get('window').width - 120}]}
                            maxLength={30}
                            multiline={false}
                            onChangeText={val => setName(val)}
                        />
                    </View>
                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity onPress={CreateNewCreator}>
                            <View style={styles.buttonlayout} >
                                {isLoading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                <Text style={styles.buttontext}>
                                    Create
                                </Text>  
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

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
                            
                            <Text style={[styles.title, {marginLeft: 20}]}>
                                Author Profiles
                            </Text>
                            
                        </View>
                        
                    </View>  
                </View>

                <ScrollView>  
                    <View>

                    <TouchableOpacity onPress={() => setCreateModal(true)}>
                        <View style={{marginVertical: 20, alignSelf: 'center', borderRadius: 10, width: '70%', paddingVertical: 10, borderWidth: 1, borderColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'normal', fontSize: 16, color: '#fff'}}>
                                + Create New
                            </Text>
                        </View>
                    </TouchableOpacity>
                        

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