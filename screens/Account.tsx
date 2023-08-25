import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    Text,
    TouchableWithoutFeedback, 
    TouchableOpacity,  
    TextInput,
    ActivityIndicator,
    Dimensions,
    Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import {CognitoIdentityProvider} from '@aws-sdk/client-cognito-identity-provider';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';
import useStyles from '../styles';
//import Purchases from 'react-native-purchases';

const AccountScreen = ({navigation} : any) => {

    const styles = useStyles();

    const { premium } = useContext(AppContext);
    const { setPremium } = useContext(AppContext);

//Attribute states
    const [ Name, setName ] = useState('');
    const [ Email, setEmail ] = useState('');
    const [ confirmCode, setConfirmCode] = useState('');
    const [ Password, setPassword] = useState('');
    const [ oldPassword, setOldPassword] = useState('');

    const [passVisible, setPassVisible] = useState(true);
    const [oldPassVisible, setOldPassVisible] = useState(true);

    //uploading state
    const [isUploading, setIsUploading ] = useState(false);

//update the users name
const handleUpdateName = async () => {

    setIsUploading(true);

    if ( Name.length !== 0 ) {

        const updatedUser = { id: user?.id, name: Name }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
            ))
        console.log(result);

    setIsUploading(false);
    hideNameModal();
    }
}

//the current authenticated user object
    const [user, setUser] = useState()
    const [authUser, setAuthUser] = useState()

//determines if the user object updated. If it did, pull the info
    const [update, didUpdate] = useState(false);

//when didUpdate is called, pull the user attributes from AWS
    useEffect(() => {
        const fetchUser = async () => {
        
            const userInfo = await Auth.currentAuthenticatedUser();

            //console.log(userInfo.signInUserSession.idToken.payload["cognito:groups"])

            setAuthUser(userInfo);

            if (!userInfo) {return;}

            try {
                const userData = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub}
                ))

                if (userData) {
                    setUser(userData.data.getUser);
                }

            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();
    }, [update])


//NameModal
    const [visible, setVisible] = useState(false);
    const showNameModal = () => setVisible(true);
    const hideNameModal = () => setVisible(false);

//EmailModal
    const [visible4, setVisible4] = useState(false);
    const showEmailModal = () => setVisible4(true);
    const hideEmailModal = () => setVisible4(false);

//DeleteAccountModal
    const [visible3, setVisible3] = useState(false);
    const showDeleteAccountModal = () => setVisible3(true);
    const hideDeleteAccountModal = () => setVisible3(false);

//PassModal
    const [visible6, setVisible6] = useState(false);
    const showPassModal = () => setVisible6(true);
    const hidePassModal = () => setVisible6(false);


//SignOutModal
    const [visible2, setVisible2] = useState(false);
    const showSignOutModal = () => setVisible2(true);
    const hideSignOutModal = () => setVisible2(false);

//update the users email address as a user attribute in cognito
    const handleUpdateEmail = async () => {

        setIsUploading(true);

        if ( Email.length !== 0 ) {

            let emailaddress = Email.replace(/ /g,'')
            
            const userInfo = await Auth.currentAuthenticatedUser();

            if (userInfo) {
                let result = await Auth.updateUserAttributes(userInfo, {'email': emailaddress})
                console.log(result);
            } else {
                alert('Error: Please enter a different email or try again later.')
            }
        }
        didUpdate(!update);
        setIsUploading(false);
    }

//update the users password
    const handleUpdatePassword = async () => {

        setIsUploading(true);
        const userInfo = await Auth.currentAuthenticatedUser();

        let result = await Auth.changePassword(userInfo, oldPassword, Password);
        console.log(result); // SUCCESS  
        setIsUploading(false); 
        hidePassModal();
    }

//verify with a confirmation code
    const handleConfirmCode = async () => {

        setIsUploading(true);

        let result = await Auth.verifyCurrentUserAttributeSubmit(
            'email',
            confirmCode,
            );
        console.log(result); // SUCCESS  

        setIsUploading(false);
        hideEmailModal();
    }

//sign out function
    async function signOut() {
        try {
            await Auth.signOut()
            .then(() => setPremium(false))
            .then(() => navigation.replace('SignIn'))
        } catch (error) {
            console.log('error signing out: ', error);
            alert("error signing out")
        }
    }

    const [confirmDelete, setConfirmDelete] = useState(false);

    const DeleteAccount = () => {
        if (confirmDelete === true) {
            // We call currentAuthenticatedUser to get a current AccessToken
            Auth.currentAuthenticatedUser({
                bypassCache: true  // Optional, By default is false. 
            }).then((user) => {
                    
                // Create a new CognitoIdentityProvider object for your Cognito User Pool Region
                const cognitoIdentityProvider = new CognitoIdentityProvider({region: 'us-east-2'});
                    
                // Create the required request parameter
                var params = {
                AccessToken: user.signInUserSession.accessToken.jwtToken
                };
                    
                // Call the deleteUser function using a callback function
                cognitoIdentityProvider.deleteUser(params, function(err, data) {
                if (err) {
                    console.log(err);
                }
                        
                // Your code to delete user data
                    
                // Sign the user out
                Auth.signOut({ global: true }).then(
                    () => navigation.replace('SignIn')
                );
    });
  }).catch(err => console.log(err));
        }
    }



    return (
        <View>
{/* //Update name  */}
            <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={() => {setVisible(false);}}>   
                <TouchableOpacity onPress={() => {setVisible(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center',backgroundColor: '#000'}}>
                    <Text style={[styles.subtitle, {marginBottom: 20}]}>
                        Enter a new name
                    </Text>

                    <View style={styles.inputfield}>
                        <TextInput
                            placeholder={user?.name}
                            placeholderTextColor='gray'
                            style={[styles.paragraph, {fontSize: 16, marginLeft: 10, textTransform: 'capitalize', width: Dimensions.get('window').width - 120}]}
                            maxLength={30}
                            multiline={false}
                            onChangeText={val => setName(val)}
                            //defaultValue={user?.name}
                        />
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 30,}}>
                        <TouchableOpacity
                            onPress={handleUpdateName}>
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
                </TouchableOpacity>
                
            </Modal>

{/* //Update Email Address */}
            {/* <Modal animationType="slide" transparent={true} visible={visible4} onRequestClose={() => {setVisible4(!visible4);}}>  
                <TouchableOpacity onPress={() => {setVisible4(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{fontSize: 16, paddingVertical: 16, color: '#fff'}}>
                            Enter a new email
                        </Text>

                        <View style={{paddingVertical: 4, borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                            <TextInput
                                placeholder={authUser?.attributes.email}
                                placeholderTextColor='gray'
                                style={styles.nametext}
                                maxLength={40}
                                multiline={false}
                                onChangeText={val => setEmail(val)}
                            />
                        </View>
                        
                        <View style={styles.button}>
                            <TouchableOpacity onPress={handleUpdateEmail} >
                                <View style={styles.savebutton} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                    ) : 
                                        <Text style={{overflow: 'hidden', borderRadius: 13, backgroundColor: 'cyan', color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Send Code</Text>
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                        }}>
                            Enter confirmation code
                        </Text>

                        <View style={{ paddingVertical: 4, borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                            <TextInput
                                placeholder='- - - - - -'
                                placeholderTextColor='#00ffffa5'
                                style={styles.nametext}
                                maxLength={6}
                                onChangeText={val => setConfirmCode(val)}
                            />
                        </View>   

                        <View style={styles.button}>
                            <TouchableOpacity onPress={handleConfirmCode} >
                                <View style={styles.savebutton} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                    ) : 
                                        <Text style={{overflow: 'hidden', borderRadius: 13, backgroundColor: 'cyan', color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal> */}

{/* //Sign Out modal */}
            <Modal animationType="slide" transparent={true} visible={visible2} onRequestClose={() => {setVisible2(!visible2);}}>                    
                <TouchableOpacity onPress={() => {setVisible2(false)}} style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{fontSize: 16, paddingVertical: 16, color: '#fff'}}>
                            Are you sure you want to log out?
                        </Text>
                        
                        <View style={{alignItems: 'center', marginVertical: 30,}}>
                            <TouchableOpacity onPress={signOut}>
                                <View style={styles.buttonlayout} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                    ) : 
                                       <Text style={styles.buttontext}>
                                            Log Out
                                        </Text> 
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

{/* //delete account modal */}
            <Modal animationType="slide" transparent={true} visible={visible3} onRequestClose={() => {setVisible3(!visible3);}}>       
                <TouchableOpacity onPress={() => {setVisible3(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{color: 'red', fontWeight: 'bold', fontSize: 17, textAlign: 'center'}}>
                            THIS ACTION CANNOT BE UNDONE
                        </Text>
                        <Text style={{
                            fontSize: 17,
                            paddingVertical: 16,
                            color: '#fff',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                            Are you sure you want to delete your account?
                        </Text>

                        <Text style={{color: '#fff', textAlign: 'center', fontSize: 13}}>
                            Once confirmed, your account cannot be recovered. All stories and images will remain on the app. All subscriptions cannot be recovered. For additional information, please contact support.
                        </Text>
                        
                        <View style={{alignItems: 'center', marginVertical: 30}}>
                            <TouchableOpacity onLongPress={DeleteAccount} onPress={() => setConfirmDelete(true)}>
                                <View style={{justifyContent: 'center', alignItems: 'center',}} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                    ) : 
                                        (<View>
                                        <Text style={{overflow: 'hidden', borderRadius: 13, backgroundColor: confirmDelete === true ? 'cyan' : 'gray', color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>{confirmDelete === true ? 'Delete Account' : 'Confirm Delete'}</Text> 
                                        {
                                            confirmDelete === true ? (
                                                <Text style={{fontSize: 12, color: '#fff', marginTop: 10}}>
                                                    (press and hold to delete)
                                                </Text>
                                            ) : null
                                        }
                                        </View>)
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

{/* //Reset password modal */}
            <Modal animationType="slide" transparent={true} visible={visible6} onRequestClose={() => {setVisible6(!visible6);}}>      
                <TouchableOpacity onPress={() => {setVisible6(false)}} style={{ height: Dimensions.get('window').height, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={[styles.subtitle, {marginBottom: 20}]}>
                            Enter new password
                        </Text>

                        <View style={[styles.inputfield, {flexDirection: 'row', alignItems: 'center'}]}>
                            <TextInput
                                placeholder=''
                                placeholderTextColor='#00ffffa5'
                                style={[styles.paragraph, {fontSize: 16, marginLeft: 10, textTransform: 'capitalize', width: Dimensions.get('window').width - 120}]}
                                maxLength={18}
                                onChangeText={val => setPassword(val)}
                                secureTextEntry={passVisible === true ? true : false}
                            />
                            <FontAwesome5 
                                name={passVisible === true ? 'eye-slash' : 'eye'}
                                color='#fff'
                                size={14}
                                onPress={() => setPassVisible(!passVisible)}
                            />
                        </View>
                        <Text style={[styles.subtitle, {marginVertical: 20}]}>
                            Enter old password
                        </Text>

                        <View style={[styles.inputfield, {flexDirection: 'row', alignItems: 'center'}]}>
                            <TextInput
                                placeholder=''
                                placeholderTextColor='gray'
                                style={[styles.paragraph, {flexDirection: 'row', fontSize: 16, marginLeft: 10, textTransform: 'capitalize', width: Dimensions.get('window').width - 120}]}
                                maxLength={18}
                                onChangeText={val => setOldPassword(val)}
                                secureTextEntry={oldPassVisible === true ? true : false}
                            />
                            <FontAwesome5 
                                name={oldPassVisible === true ? 'eye-slash' : 'eye'}
                                color='#fff'
                                size={14}
                                onPress={() => setOldPassVisible(!oldPassVisible)}
                            />
                        </View>

                        <View style={{alignItems: 'center', marginVertical: 30,}}>
                            <TouchableOpacity onPress={handleUpdatePassword}>
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
                </TouchableOpacity>
            </Modal>
            
            <LinearGradient colors={['#363636a5', '#171717a5', 'black']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{padding: 30, margin:-30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    
                    
                    <Text style={[styles.h1, {marginHorizontal: 40, marginVertical: 20,}]}>
                        Account
                    </Text>
                </View>
                
                <View style={{height: Dimensions.get('window').height, justifyContent: 'space-between'}}>
                    <View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
                            <View style={{ width: '75%'}}>
                                <Text style={styles.subtitle}>
                                    Plan
                                </Text>
                                <Text style={[styles.infotext, {textTransform: 'capitalize'}]}>
                                {/* {authUser?.signInUserSession.idToken.payload["cognito:groups"][0]} */}
                                    {premium === true ? 'Premium' : 'Basic'}
                                </Text>
                            </View>
                        </View>

                        <TouchableWithoutFeedback onPress={showNameModal}>
                            <View style={styles.accountcontainer }> 
                                <Text style={ styles.subtitle }>Name</Text>
                                <Text style={ [styles.infotext, {textTransform: 'capitalize'}] }>{user?.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={showEmailModal}>
                            <View style={styles.accountcontainer }> 
                                <Text style={ styles.subtitle }>Email</Text>
                                <Text style={ styles.infotext }>{authUser?.attributes.email}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={showPassModal}>
                            <View style={styles.accountcontainer }>
                                <Text style={ styles.subtitle }>Reset Password</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={showSignOutModal}>
                            <View style={styles.accountcontainer }>
                                <Text style={ styles.subtitle }>Log Out</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

                    <View style={{marginBottom: 100}}>
                        <TouchableWithoutFeedback onPress={showDeleteAccountModal}>
                            <View style={styles.accountcontainer }>
                                <Text style={{ fontSize: 16, marginVertical: 20, color: '#ffffffa5', }}>Delete Account</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                
                            </View>
                        </TouchableWithoutFeedback> 
                    </View>
                </View>  
            </LinearGradient>
            <StatusBar style="light" />
        </View>
        
    );
}

export default AccountScreen;