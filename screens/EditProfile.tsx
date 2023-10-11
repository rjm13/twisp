import React, { useEffect, useState } from 'react';
import { 
    View, 
    ScrollView,
    Text, 
    Image, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    TextInput, 
    Platform, 
    ActivityIndicator,
    Keyboard,
    Modal,
    Dimensions
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { updateUser } from '../src/graphql/mutations';
import { getUser } from '../src/graphql/queries';

import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import ImageCompress from '../components/functions/CompressImage'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import uuid from 'react-native-uuid';

import useStyles from '../styles';


const EditProfile = ({navigation} : any) => {

    const styles = useStyles();

//on render, request permission for camera roll
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

//pick the image from the camera roll
    const pickImage = async () => {
       
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        let height = result.height
        let width = result.width
        let image = result.uri
    
        if (!result.cancelled) {
            let im = await ImageCompress(image, {width, height})
            setImage(im);
        }
      };

    //set the current user's id via route params
    const route = useRoute();
    const {User} = route.params

    //the current authenticated user object
    const [user, setUser] = useState(User)

    const [imageU, setImageU] = useState('');

    //determines if the user object updated. If it did, pull the info
    const [update, didUpdate] = useState(false);

//when didUpdate is called, pull the user attributes from AWS
    useEffect(() => {
        const fetchUser = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {
                const userData = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub}
                ))

                if (userData) {
                    setUser(userData.data.getUser);
                    let imageresponse = await Storage.get(userData.data.getUser.imageUri)
                    setImageU(imageresponse)
                }

            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();
      }, [update])

//PhotoModal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    //Website Modal
    const [visible2, setVisible2] = useState(false);
    const showWebsiteModal = () => setVisible2(true);
    const hideWebsiteModal = () => setVisible2(false);

//BioModal
    const [visible5, setVisible5] = useState(false);
    const showBioModal = () => setVisible5(true);
    const hideBioModal = () => setVisible5(false);

//pseudonym Modal
    const [visible7, setVisible7] = useState(false);
    const showPseudModal = () => setVisible7(true);
    const hidePseudModal = () => setVisible7(false);

//Attribute states
    const [ Bio, setBio ] = useState('');
    const [image, setImage] = useState('');
    const [Pseudonym, setPseudonym] = useState('');
    const [website, setWebsite] = useState('');

//if true, s3 is performing an action. also used to determine if anything is updating
    const [isUploading, setIsUploading ] = useState(false);

//using the avatar key, get and update the imageuri for the user
    const PublishAvatar = async () => {

        setIsUploading(true);

        const response = await fetch(image);

            const blob = await response.blob();

            const filename =  uuid.v4().toString();

            const s3Response = await Storage.put(filename, blob);
    
            const updatedUser = { id: user.id, imageUri: s3Response.key }
    
            let result = await API.graphql(graphqlOperation(
                updateUser, { input: updatedUser }
                ))
            console.log(result);

        setIsUploading(false);
        hideModal();
    };

//update the author's pseudonym
    const handleUpdatePseudonym = async () => {

        setIsUploading(true);

        if ( Pseudonym.length !== 0 ) {

            const updatedUser = { id: user?.id, publisherName: Pseudonym.toLowerCase() }

            let result = await API.graphql(graphqlOperation(
                updateUser, { input: updatedUser }
            
                ))
            console.log(result);

        setIsUploading(false);
        hidePseudModal();
        }
    }

    //update the author's pseudonym
    const handleUpdateWebsite = async () => {

        setIsUploading(true);

        if ( website.length !== 0 ) {

            const updatedUser = { id: user?.id, website: website.toLowerCase() }

            let result = await API.graphql(graphqlOperation(
                updateUser, { input: updatedUser }
            
                ))
            console.log(result);

        setIsUploading(false);
        hideWebsiteModal();
        }
    }

//update the users bio text
    const handleUpdateBio = async () => {

        setIsUploading(true);

        if ( Bio.length !== 0 ) {

            const updatedUser = { id: user.id, bio: Bio }

            let result = await API.graphql(graphqlOperation(
                updateUser, { input: updatedUser }
            ))

        console.log(result);
        
        setIsUploading(false);
        hideBioModal();
        didUpdate(!update);
    }
    }

//render the page
    return ( 
    <View style={styles.container } >

{/* //Update pseudonym  */}
        <Modal animationType="slide" transparent={true} visible={visible7} onRequestClose={() => {setVisible7(!visible7);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible7(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter a new publisher name
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput
                            placeholder={user?.pseudonym}
                            placeholderTextColor='gray'
                            style={[styles.paragraph, {fontSize: 16, marginLeft: 10, textTransform: 'capitalize', width: Dimensions.get('window').width - 120}]}
                            maxLength={20}
                            multiline={false}
                            onChangeText={val => setPseudonym(val)}
                        />
                    </View>
                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={handleUpdatePseudonym}>
                            <View style={styles.buttonlayout} >
                                {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                <Text style={styles.buttontext}>
                                    Submit
                                </Text>  
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

{/* //Update pseudonym  */}
        <Modal animationType="slide" transparent={true} visible={visible2} onRequestClose={() => {setVisible2(!visible2);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible2(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter a new publisher website
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput
                            placeholder={user?.website}
                            placeholderTextColor='gray'
                            style={[styles.paragraph, {fontSize: 16, marginLeft: 10, textTransform: 'capitalize', width: Dimensions.get('window').width - 120}]}
                            maxLength={20}
                            multiline={false}
                            onChangeText={val => setPseudonym(val)}
                        />
                    </View>
                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={handleUpdateWebsite}>
                            <View style={styles.buttonlayout} >
                                {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                <Text style={styles.buttontext}>
                                    Submit
                                </Text>  
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

{/* //Update about me blurb */}
        <Modal animationType="slide" transparent={true} visible={visible5} onRequestClose={() => {setVisible5(!visible5);}}>                
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible5(false)}} style={{ alignItems: 'center',  }}>
                <View style={{ alignItems: 'center',  height: Dimensions.get('window').height, backgroundColor: '#000', justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff'
                    }}>
                        Update Bio
                    </Text>
                    <View style={{ marginTop: 10, borderWidth: 0.2, borderColor: '#363636a5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <View style={[styles.inputfield, {height: 200}]}>                            
                            <TextInput 
                                placeholder={user?.bio || 'Say something about yourself'}
                                placeholderTextColor='#ffFFFFa5'
                                style={[styles.paragraph, {fontSize: 16, marginLeft: 10, textTransform: 'capitalize', width: Dimensions.get('window').width - 120}]}
                                maxLength={250}
                                multiline={true}
                                numberOfLines={10}
                                textAlignVertical='top'
                                onChangeText={val => setBio(val)}
                                defaultValue={user?.bio || ''}
                            />
                        </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableWithoutFeedback
                            onPress={handleUpdateBio}>
                            <View style={styles.buttonlayout} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <Text style={styles.buttontext}>
                                        Submit
                                    </Text> 
                                } 
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

{/* //Update Image modal */}
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={() => {setVisible(!visible);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible(false)}} style={{ }}>
                <View style={{ height: Dimensions.get('window').height, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={pickImage}>
                    <Image 
                        source={{ uri: image || imageU}} 
                        style={{width: 120, height: 120, borderRadius: 60, margin: 16, backgroundColor: 'gray'}} 
                    />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Select a new profile image
                    </Text>
                        <View style={{alignItems: 'center', marginVertical: 30}}>
                            <View style={styles.buttonlayout} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <TouchableOpacity onPress={PublishAvatar}>
                                        <Text style={styles.buttontext}>
                                            Submit
                                        </Text> 
                                    </TouchableOpacity> 
                                }   
                            </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

{/* primary visible content */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{  alignItems: 'center', flexDirection: 'row', marginTop: 50, marginBottom: 20, marginHorizontal: 20,}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    
                    <Text style={[styles.h1, {marginHorizontal: 40, marginVertical: 20,}]}>
                        Edit Profile
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={showModal}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignSelf: 'center', alignItems: "center", width: '100%', paddingHorizontal: 20,}}>
                        <Text style={ [styles.paragraph, {fontSize: 16}] }>
                            Photo
                        </Text>
                        <Image 
                            source={user?.imageUri ? { uri: imageU} : require('../assets/blankprofile.png')} 
                            style={{ width: 60,height: 60, borderRadius: 50, margin: 16,}} 
                        />
                    </View>
                </TouchableWithoutFeedback>

                {user?.isPublisher === true ? (
                    <TouchableWithoutFeedback onPress={showPseudModal}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
                            <View>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Publisher Name
                                </Text>
                                <Text style={[styles.infotext, {textTransform: 'capitalize'}]}>
                                    {user?.publisherName}
                                </Text>
                            </View>
                            
                        </View>
                    </TouchableWithoutFeedback>    
                    ) : null}

                {user?.isPublisher === true ? (
                    <TouchableWithoutFeedback onPress={showWebsiteModal}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
                            <View>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Publisher Website
                                </Text>
                                <Text style={[styles.infotext, {textTransform: 'capitalize'}]}>
                                    {user?.website}
                                </Text>
                            </View>
                            
                        </View>
                    </TouchableWithoutFeedback>    
                ) : null}

                {user?.isPublisher === true ? (
                <View>
                    <Text style={{ marginTop: 20, marginLeft: 20, color: '#fff', fontSize: 16}}>
                        Publisher Bio
                    </Text>
                    
                    <TouchableWithoutFeedback onPress={showBioModal}>
                        <View style={{   backgroundColor: '#363636a5', padding: 10, width: '90%', alignSelf: 'center', borderRadius: 15, marginVertical: 10,}}> 
                            <Text style={{fontSize: 14, color: '#ffffffa5', padding: 10}}>
                                {user?.bio || 'Say something about yourself'}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                ) : null}
                <View style={{height: 100}}/>
            </ScrollView>
            <StatusBar style="light" />
        </View> 
);}

export default EditProfile;