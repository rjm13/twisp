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
import { updateCreatorProfile } from '../src/graphql/mutations';
import { getCreatorProfile } from '../src/graphql/queries';

import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import ImageCompress from '../components/functions/CompressImage'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import uuid from 'react-native-uuid';

import useStyles from '../styles';


const EditAuthorProfile = ({navigation} : any) => {

    const styles = useStyles();

    const [updateSocialType, setUpdateSocialType] = useState('')

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
        const fetchCreatorProfile = async () => {

            try {
                const userData = await API.graphql(graphqlOperation(
                    getCreatorProfile, {id: User}
                ))

                if (userData) {
                    setUser(userData.data.getCreatorProfile);
                    let imageresponse = await Storage.get(userData.data.getCreatorProfile.imageUri)
                    setImageU(imageresponse)
                }

            } catch (e) {
                console.log(e);
            }
        }
        fetchCreatorProfile();
      }, [update])

//PhotoModal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

//BioModal
    const [visible5, setVisible5] = useState(false);
    const showBioModal = () => setVisible5(true);
    const hideBioModal = () => setVisible5(false);

//pseudonym Modal
    const [visible7, setVisible7] = useState(false);
    const showPseudModal = () => setVisible7(true);
    const hidePseudModal = () => setVisible7(false);

//pseudonym Modal
    const [visible8, setVisible8] = useState(false);
    const showSocialModal = () => setVisible8(true);
    const hideSocialModal = () => setVisible8(false);

//Attribute states
    const [ Bio, setBio ] = useState('');
    const [image, setImage] = useState('');
    const [Pseudonym, setPseudonym] = useState('');
    const [instagramText, setInstagramText] = useState('')
    const [facebookText, setFacebookText] = useState('')
    const [tiktokText, setTiktokText] = useState('')
    const [redditText, setRedditText] = useState('')
    const [youtubeText, setYoutubeText] = useState('')
    const [deviantText, setDeviantText] = useState('')
    const [emailText, setEmailText] = useState('')
    const [websiteText, setWebsiteText] = useState('')


    //instagram Modal
    const [visible10, setVisible10] = useState(false);
     //faceook Modal
     const [visible11, setVisible11] = useState(false);
      //tiktok Modal
    const [visible12, setVisible12] = useState(false);
     //reddit Modal
     const [visible13, setVisible13] = useState(false);
      //youtube Modal
    const [visible14, setVisible14] = useState(false);
     //deviantart Modal
     const [visible15, setVisible15] = useState(false);
      //email Modal
    const [visible16, setVisible16] = useState(false);
     //website Modal
     const [visible17, setVisible17] = useState(false);






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
                updateCreatorProfile, { input: updatedUser }
                ))
            console.log(result);

        setIsUploading(false);
        hideModal();
    };

//update the author's pseudonym
    const handleUpdatePseudonym = async () => {

        setIsUploading(true);

        if ( Pseudonym.length !== 0 ) {

            const updatedUser = { id: user?.id, penName: Pseudonym.toLowerCase() }

            let result = await API.graphql(graphqlOperation(
                updateCreatorProfile, { input: updatedUser }
            
                ))
            console.log(result);

        setIsUploading(false);
        hidePseudModal();
        }
    }

//update the users bio text
    const handleUpdateBio = async () => {

        setIsUploading(true);

        if ( Bio.length !== 0 ) {

            const updatedUser = { id: user.id, bio: Bio }

            let result = await API.graphql(graphqlOperation(
                updateCreatorProfile, { input: updatedUser }
            ))

        console.log(result);
        
        setIsUploading(false);
        hideBioModal();
        didUpdate(!update);
    }
    }

    const SubmitUpdateInstagram = async () => {
        try {
           const updateSocial = await API.graphql(graphqlOperation(
            updateCreatorProfile, {input: {
                id: user.id, 
                instagram: instagramText.toLowerCase(),
            }}
            ))
            if (updateSocial) {
                setVisible10(false)
            }
           console.log(updateSocial)  
        } catch (e) {
            console.log(e)
        }
    } 

    const SubmitUpdateFacebook = async () => {
        try {
           const updateSocial = await API.graphql(graphqlOperation(
            updateCreatorProfile, {input: {
                id: user.id, 
                facebook: facebookText.toLowerCase(),
            }}
            ))
            if (updateSocial) {
                setVisible11(false)
            }
           console.log(updateSocial)  
        } catch (e) {
            console.log(e)
        }
    } 

    const SubmitUpdateTikTok = async () => {
        try {
            const updateSocial = await API.graphql(graphqlOperation(
             updateCreatorProfile, {input: {
                 id: user.id, 
                 tikTok: tiktokText.toLowerCase(),
             }}
             ))
             if (updateSocial) {
                 setVisible12(false)
             }
            console.log(updateSocial)  
         } catch (e) {
             console.log(e)
         }
    
    } 
    
    const SubmitUpdateReddit = async () => {
        try {
            const updateSocial = await API.graphql(graphqlOperation(
             updateCreatorProfile, {input: {
                 id: user.id, 
                 reddit: redditText.toLowerCase(),
             }}
             ))
             if (updateSocial) {
                 setVisible13(false)
             }
            console.log(updateSocial)  
         } catch (e) {
             console.log(e)
         }
    } 

    const SubmitUpdateYouTube = async () => {
        try {
            const updateSocial = await API.graphql(graphqlOperation(
             updateCreatorProfile, {input: {
                 id: user.id, 
                 youTube: youtubeText.toLowerCase(),
             }}
             ))
             if (updateSocial) {
                 setVisible14(false)
             }
            console.log(updateSocial)  
         } catch (e) {
             console.log(e)
         }
    } 

    const SubmitUpdateDeviantArt = async () => {
        try {
            const updateSocial = await API.graphql(graphqlOperation(
             updateCreatorProfile, {input: {
                 id: user.id, 
                 deviantArt: deviantText.toLowerCase(),
             }}
             ))
             if (updateSocial) {
                 setVisible15(false)
             }
            console.log(updateSocial)  
         } catch (e) {
             console.log(e)
         }
    } 

    const SubmitUpdateEmail = async () => {
        try {
            const updateSocial = await API.graphql(graphqlOperation(
             updateCreatorProfile, {input: {
                 id: user.id, 
                 email: emailText.toLowerCase(),
             }}
             ))
             if (updateSocial) {
                 setVisible16(false)
             }
            console.log(updateSocial)  
         } catch (e) {
             console.log(e)
         }
    } 

    const SubmitUpdateWebsite = async () => {
        try {
            const updateSocial = await API.graphql(graphqlOperation(
             updateCreatorProfile, {input: {
                 id: user.id, 
                 website: websiteText.toLowerCase(),
             }}
             ))
             if (updateSocial) {
                 setVisible17(false)
             }
            console.log(updateSocial)  
         } catch (e) {
             console.log(e)
         }
    } 

//render the page
    return ( 
    <View style={styles.container } >

{/* //Update penName  */}
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

{/* //Update insta handle  */}
        <Modal animationType="slide" transparent={true} visible={visible10} onRequestClose={() => {setVisible10(!visible10);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible10(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                
                        <Image 
                            style={{height: 60, width: 60}}
                            source={require('../assets/social/instagram.png')}
                        /> 
           
                        <Text style={{marginVertical: 20, textTransform: 'capitalize', color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600'}}>
                            Update Instagram link
                        </Text>

                        <View style={[styles.inputfield, {backgroundColor: '#121212a5', height: 100}]}>
                            <TextInput
                                placeholder={user?.instagram}
                                placeholderTextColor='gray'
                                multiline={true}
                                style={[styles.paragraph, {flexWrap: 'wrap', fontSize: 16, marginLeft: 10, textTransform: 'lowercase', width: Dimensions.get('window').width - 120}]}
                                onChangeText={val => setInstagramText(val)}
                            />
                        </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={() => SubmitUpdateInstagram()}>
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

{/* //Update facebook handle  */}
        <Modal animationType="slide" transparent={true} visible={visible11} onRequestClose={() => {setVisible11(!visible11);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible11(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                
                        <Image 
                            style={{height: 60, width: 60}}
                            source={require('../assets/social/facebook.png')}
                        /> 
           
                        <Text style={{marginVertical: 20, textTransform: 'capitalize', color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600'}}>
                            Update Facebook link
                        </Text>

                        <View style={[styles.inputfield, {backgroundColor: '#121212a5', height: 100}]}>
                            <TextInput
                                placeholder={user?.facebook}
                                placeholderTextColor='gray'
                                multiline={true}
                                style={[styles.paragraph, {flexWrap: 'wrap', fontSize: 16, marginLeft: 10, textTransform: 'lowercase', width: Dimensions.get('window').width - 120}]}
                                onChangeText={val => setFacebookText(val)}
                            />
                        </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={() => SubmitUpdateFacebook()}>
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

{/* //Update tiktok handle  */}
        <Modal animationType="slide" transparent={true} visible={visible12} onRequestClose={() => {setVisible12(!visible12);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible12(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                
                        <Image 
                            style={{height: 60, width: 60}}
                            source={require('../assets/social/tiktok.png')}
                        /> 
           
                        <Text style={{marginVertical: 20, color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600'}}>
                            Update TikTok Link
                        </Text>

                        <View style={[styles.inputfield, {backgroundColor: '#121212a5', height: 100}]}>
                            <TextInput
                                placeholder={user?.tikTok}
                                placeholderTextColor='gray'
                                multiline={true}
                                style={[styles.paragraph, {flexWrap: 'wrap', fontSize: 16, marginLeft: 10, textTransform: 'lowercase', width: Dimensions.get('window').width - 120}]}
                                onChangeText={val => setTiktokText(val)}
                            />
                        </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={() => SubmitUpdateTikTok()}>
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

 {/* //Update reddit handle  */}
        <Modal animationType="slide" transparent={true} visible={visible13} onRequestClose={() => {setVisible13(!visible13);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible13(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                
                        <Image 
                            style={{height: 60, width: 60}}
                            source={require('../assets/social/reddit.png')}
                        /> 
           
                        <Text style={{marginVertical: 20, color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600'}}>
                            Update Reddit Link
                        </Text>

                        <View style={[styles.inputfield, {backgroundColor: '#121212a5', height: 100}]}>
                            <TextInput
                                placeholder={user?.reddit}
                                placeholderTextColor='gray'
                                multiline={true}
                                style={[styles.paragraph, {flexWrap: 'wrap', fontSize: 16, marginLeft: 10, textTransform: 'lowercase', width: Dimensions.get('window').width - 120}]}
                                onChangeText={val => setRedditText(val)}
                            />
                        </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={() => SubmitUpdateReddit()}>
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

{/* //Update youtube handle  */}
         <Modal animationType="slide" transparent={true} visible={visible14} onRequestClose={() => {setVisible14(!visible14);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible14(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                
                        <Image 
                            style={{height: 60, width: 60}}
                            source={require('../assets/social/youtube.png')}
                        /> 
           
                        <Text style={{marginVertical: 20, color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600'}}>
                            Update YouTube Link
                        </Text>

                        <View style={[styles.inputfield, {backgroundColor: '#121212a5', height: 100}]}>
                            <TextInput
                                placeholder={user?.youTube}
                                placeholderTextColor='gray'
                                multiline={true}
                                style={[styles.paragraph, {flexWrap: 'wrap', fontSize: 16, marginLeft: 10, textTransform: 'lowercase', width: Dimensions.get('window').width - 120}]}
                                onChangeText={val => setYoutubeText(val)}
                            />
                        </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={() => SubmitUpdateYouTube()}>
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

{/* //Update deviant art handle  */}
        <Modal animationType="slide" transparent={true} visible={visible15} onRequestClose={() => {setVisible15(!visible15);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible15(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                
                        <Image 
                            style={{height: 60, width: 60}}
                            source={require('../assets/social/deviantart.png')}
                        /> 
           
                        <Text style={{marginVertical: 20, color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600'}}>
                            Update DeviantArt Link
                        </Text>

                        <View style={[styles.inputfield, {backgroundColor: '#121212a5', height: 100}]}>
                            <TextInput
                                placeholder={user?.deviantArt}
                                placeholderTextColor='gray'
                                multiline={true}
                                style={[styles.paragraph, {flexWrap: 'wrap', fontSize: 16, marginLeft: 10, textTransform: 'lowercase', width: Dimensions.get('window').width - 120}]}
                                onChangeText={val => setDeviantText(val)}
                            />
                        </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={() => SubmitUpdateDeviantArt()}>
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

{/* //Update email handle  */}
        <Modal animationType="slide" transparent={true} visible={visible16} onRequestClose={() => {setVisible16(!visible16);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible16(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                
                        <Image 
                            style={{height: 60, width: 60}}
                            source={require('../assets/social/email.png')}
                        /> 
           
                        <Text style={{marginVertical: 20, color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600'}}>
                            Update Email
                        </Text>

                        <View style={[styles.inputfield, {backgroundColor: '#121212a5', height: 100}]}>
                            <TextInput
                                placeholder={user?.email}
                                placeholderTextColor='gray'
                                multiline={true}
                                style={[styles.paragraph, {flexWrap: 'wrap', fontSize: 16, marginLeft: 10, textTransform: 'lowercase', width: Dimensions.get('window').width - 120}]}
                                onChangeText={val => setEmailText(val)}
                            />
                        </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={() => SubmitUpdateEmail()}>
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

{/* //Update website handle  */}
        <Modal animationType="slide" transparent={true} visible={visible17} onRequestClose={() => {setVisible17(!visible17);}}>            
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; setVisible17(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',backgroundColor: '#000', height: Dimensions.get('window').height, justifyContent: 'center'}}>
                    
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                
                        <Image 
                            style={{height: 60, width: 60}}
                            source={require('../assets/social/website.png')}
                        /> 
           
                        <Text style={{marginVertical: 20, color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600'}}>
                            Update Website
                        </Text>

                        <View style={[styles.inputfield, {backgroundColor: '#121212a5', height: 100}]}>
                            <TextInput
                                placeholder={user?.website}
                                placeholderTextColor='gray'
                                multiline={true}
                                style={[styles.paragraph, {flexWrap: 'wrap', fontSize: 16, marginLeft: 10, textTransform: 'lowercase', width: Dimensions.get('window').width - 120}]}
                                onChangeText={val => setWebsiteText(val)}
                            />
                        </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity
                            onPress={() => SubmitUpdateWebsite()}>
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
            <ScrollView>
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
                        Edit Author Profile
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={showModal}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignSelf: 'center', alignItems: "center", width: '100%', paddingHorizontal: 20,}}>
                        <Text style={ [styles.subtitle, {fontSize: 16}] }>
                            Photo
                        </Text>
                        <Image 
                            source={user?.imageUri ? { uri: imageU} : require('../assets/blankprofile.png')} 
                            style={{ width: 60,height: 60, borderRadius: 50, margin: 16,}} 
                        />
                    </View>
                </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={showPseudModal}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
                            <View>
                                <Text style={styles.subtitle}>
                                    Name
                                </Text>
                                <Text style={[styles.infotext, {textTransform: 'capitalize'}]}>
                                    {user?.penName}
                                </Text>
                            </View>
                            
                        </View>
                    </TouchableWithoutFeedback>      
                
                <View>
                        <Text style={[styles.subtitle, {marginTop: 20, marginLeft: 20}]}>
                        About Me
                    </Text>
                    
                    <TouchableWithoutFeedback onPress={showBioModal}>
                        <View style={{   backgroundColor: '#121212a5', padding: 10, width: '90%', alignSelf: 'center', borderRadius: 15, marginVertical: 10,}}> 
                            <Text style={{fontSize: 14, color: '#ffffffa5', padding: 10}}>
                                {user?.bio || 'Say something about yourself'}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View>
                    {/* <Text style={[styles.title, {margin: 20}]}>
                        Social Handles
                    </Text> */}

                    <View style={{margin: 20}}>
                        <Text style={styles.subtitle}>
                            Instagram
                        </Text>
                        <TouchableOpacity onPress={() => {setUpdateSocialType('instagram'); setVisible10(true)}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Image 
                                    style={{height: 40, width: 40, marginRight: 6}}
                                    source={require('../assets/social/instagram.png')}
                                />
                                <View style={[{backgroundColor: 'transparent', height: 40, marginLeft: 10, width: '80%', flexDirection: 'row', alignItems: 'center'}]}>
                                    <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}>
                                        {user?.instagram}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> 
                    
                    

                    <View style={{margin: 20}}>
                        <Text style={styles.subtitle}>
                            Facebook
                        </Text>
                        <TouchableOpacity onPress={() => {setUpdateSocialType('facebook'); setVisible11(true)}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Image 
                                    style={{height: 40, width: 40, marginRight: 6}}
                                    source={require('../assets/social/facebook.png')}
                                />
                                <View style={[{backgroundColor: 'transparent', height: 40, marginLeft: 10, width: '80%', flexDirection: 'row', alignItems: 'center'}]}>
                                    <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}>
                                        {user?.facebook}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> 

                    <View style={{margin: 20}}>
                        <Text style={styles.subtitle}>
                            TikTok
                        </Text>
                        <TouchableOpacity onPress={() => {setUpdateSocialType('tikTok'); setVisible12(true)}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Image 
                                    style={{height: 40, width: 40, marginRight: 6}}
                                    source={require('../assets/social/tiktok.png')}
                                />
                                <View style={[{backgroundColor: 'transparent', height: 40, marginLeft: 10, width: '80%', flexDirection: 'row', alignItems: 'center'}]}>
                                    <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}>
                                        {user?.tikTok}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> 

                    <View style={{margin: 20}}>
                        <Text style={styles.subtitle}>
                            Reddit
                        </Text>
                        <TouchableOpacity onPress={() => {setUpdateSocialType('reddit'); setVisible13(true)}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Image 
                                    style={{height: 40, width: 40, marginRight: 6}}
                                    source={require('../assets/social/reddit.png')}
                                />
                                <View style={[{backgroundColor: 'transparent', height: 40, marginLeft: 10, width: '80%', flexDirection: 'row', alignItems: 'center'}]}>
                                    <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}>
                                        {user?.reddit}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> 

                    <View style={{margin: 20}}>
                        <Text style={styles.subtitle}>
                            YouTube
                        </Text>
                        <TouchableOpacity onPress={() => {setUpdateSocialType('youTube'); setVisible14(true)}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Image 
                                    style={{height: 40, width: 40, marginRight: 6}}
                                    source={require('../assets/social/youtube.png')}
                                />
                                <View style={[{backgroundColor: 'transparent', height: 40, marginLeft: 10, width: '80%', flexDirection: 'row', alignItems: 'center'}]}>
                                    <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}>
                                        {user?.youTube}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> 

                    <View style={{margin: 20}}>
                        <Text style={styles.subtitle}>
                            DeviantArt
                        </Text>
                        <TouchableOpacity onPress={() => {setUpdateSocialType('deviantart'); setVisible15(true)}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Image 
                                    style={{height: 40, width: 40, marginRight: 6}}
                                    source={require('../assets/social/deviantart.png')}
                                />
                                <View style={[{backgroundColor: 'transparent', height: 40, marginLeft: 10, width: '80%', flexDirection: 'row', alignItems: 'center'}]}>
                                    <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}>
                                        {user?.deviantArt}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> 

                    <View style={{margin: 20}}>
                        <Text style={styles.subtitle}>
                            Email
                        </Text>
                        <TouchableOpacity onPress={() => {setUpdateSocialType('email'); setVisible16(true)}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Image 
                                    style={{height: 40, width: 40, marginRight: 6}}
                                    source={require('../assets/social/email.png')}
                                />
                                <View style={[{backgroundColor: 'transparent', height: 40, marginLeft: 10, width: '80%', flexDirection: 'row', alignItems: 'center'}]}>
                                    <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}>
                                        {user?.email}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> 

                    <View style={{margin: 20}}>
                        <Text style={styles.subtitle}>
                            Website
                        </Text>
                        <TouchableOpacity onPress={() => {setUpdateSocialType('website'); setVisible17(true)}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Image 
                                    style={{height: 40, width: 40, marginRight: 6}}
                                    source={require('../assets/social/website.png')}
                                />
                                <View style={[{backgroundColor: 'transparent', height: 40, marginLeft: 10, width: '80%', flexDirection: 'row', alignItems: 'center'}]}>
                                    <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}>
                                        {user?.website}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View> 

                </View>

                <View style={{height: 100}}/>
            </ScrollView>
            <StatusBar style="light" />
        </View> 
);}

export default EditAuthorProfile;