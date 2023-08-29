import React, {useState, useContext, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions, 
    TextInput, 
    Linking,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    Platform
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';

import { AppContext } from '../../AppContext';
import useStyles from '../../styles';

import { Auth, API, graphqlOperation, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { getUser } from '../../src/graphql/queries';

const SignIn = ({navigation} : any) => {

    const { setUserID } = useContext(AppContext);

    const styles = useStyles();

    const [seePass, setSeePass] = useState(false);

    const [isErr, setIsErr] = useState(false);

    const [err, setErr] = useState('Error signing in.');

    const [signingIn, setSigningIn] = useState(false);

    const [trigger, setTrigger] = useState(false);

//listener for google sign in
    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data }}) => {
          switch (event) {
            case "signIn":
                console.log('this guy logged in', data)
                if (data.username.startsWith('google')) {
                    navigation.navigate('Redirect', {trigger: Math.random()});
                }
                if (data.username.startsWith('signinwithapple')) {
                    navigation.navigate('Redirect', {trigger: Math.random()});
                }
                setSigningIn(false)
              break;
            case "signOut":
              Auth.signOut()
              break;
            // case "customOAuthState":
            //   setCustomState(data);
          }
        });

        return unsubscribe;
    }, [])

    async function signInWithGoogle() {
        setSigningIn(true);
        try {
            await Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google
              })
        } 
        catch (error) {
            console.log('error signing in', error)
            setIsErr(true);
            setSigningIn(false);
        }
        setSigningIn(false)
    }

    async function signInWithApple() {
        setSigningIn(true);
        try {
            await Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Apple
              })
        } 
        catch (error) {
            console.log('error signing in', error)
            setIsErr(true);
            setSigningIn(false);
        }
        setSigningIn(false)
    }

    

    const CreateUser = async () => {

        const {password} = data;

        const username = data.username.replace(/ /g, '');
    
        const userInfo = await Auth.currentAuthenticatedUser(
            { bypassCache: true }
          );
    
          if (userInfo === 'The user is not authenticated') {
            return;
          }

          if (userInfo.attributes.email_verified === false) {
              await Auth.resendSignUp(username)
              .then(navigation.navigate('ConfirmEmail', {username, password}))
          }
    
          else if (userInfo) {
          //get the user from Backend with the user SUB from Auth
            const userData = await API.graphql(
              graphqlOperation(
                getUser, 
                { id: userInfo.attributes.sub,
                }
              )
            )
    
            if (userData.data.getUser) {
                setUserID(userData.data.getUser);
                setIsErr(false);
                setTrigger(!trigger);
                navigation.navigate('Redirect', {trigger: Math.random()});
                return;
            };
          }
        }

    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const handlePassword = (val : any) => {
        setData({
            ... data,
            password: val
        });
    }

    const handleUsername = (val : any) => {
        setData({
            ... data,
            username: val
        });
    }

    async function signIn() {
        setSigningIn(true);
        const {username, password} = data;
        try {
            await Auth.signIn(username.replace(/ /g, ''), password)
            .then (CreateUser)
        } 
        catch (error) {
            console.log(error.message)
            setErr(error?.message.toString())
            setIsErr(true);
            setSigningIn(false);
        }
        setSigningIn(false);
    } 
            

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, {justifyContent: 'center'}]}>
                <View style={{ margin: 20}}>
                    {isErr ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                        <Text style={{borderRadius: 15, backgroundColor: '#ffffffa5', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                            Error signing in. Please try again.
                        </Text>
                        <Text style={{borderRadius: 15, backgroundColor: '#ffffffa5', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                            {err}
                        </Text>
                    </View>
                    ) : null}
                    <View>
                        <Text style={[styles.title, {marginHorizontal: 0, marginTop: 10, marginBottom: 4}]}>
                            Email
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={40}
                                onChangeText={handleUsername}
                                autoCapitalize='none'
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.title, {marginHorizontal: 0, marginTop: 10, marginBottom: 4}]}>
                            Password
                        </Text>
                        <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={[styles.textInputTitle, {width: '80%'}]}
                                maxLength={30}
                                secureTextEntry={seePass === true ? false : true}
                                onChangeText={handlePassword}
                                autoCapitalize='none'
                            />
                            <Feather 
                                name={seePass === true ? 'eye' : 'eye-off'}
                                color='#fff'
                                size={18}
                                style={{marginRight: 10, alignSelf: 'center'}}
                                onPress={() => setSeePass(!seePass)}
                            />
                        </View>
                    </View>

                    <View style={{width: Dimensions.get('window').width - 60, alignSelf: 'center', marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row', marginTop: 30}}>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <View style={{  }}>
                                <Text style={[styles.paragraph, {alignSelf: 'center'}]}>
                                    Forgot password
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Linking.openURL('mailto:admin@martianspidermedia.com') }>
                            <View style={{ }}>
                                <Text style={[styles.paragraph, {alignSelf: 'center'}]}>
                                    Contact us
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignSelf: 'center', width: Dimensions.get('window').width - 60, borderTopWidth: 1, borderColor: '#000000a5',}}>
                        
                    </View>
                </View>

            {signingIn === true ? (
                <ActivityIndicator size="small" color='cyan'/>
                ) : (
                    <TouchableOpacity onPress={() => signingIn === false ? signIn() : null}>
                        <View style={[styles.buttonlayout, {alignSelf: 'center'}]}>
                            <Text style={[styles.buttontext, {width: Dimensions.get('window').width*0.5}]}>
                                Login
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => navigation.navigate('SignUp') }>
                    <Text style={[styles.buttontext, { alignSelf: 'center', margin: 30, color: '#fff'}]}>
                        Create an account
                    </Text>
                </TouchableOpacity>

                <View style={{marginTop: 0, alignSelf: 'center', height: 40, borderTopWidth: 1, borderColor: '#ffffffa5', width: Dimensions.get('window').width*0.5}}/>

                    <TouchableOpacity onPress={() => signingIn === false ? signInWithGoogle() : null}>
                        <View style={[styles.socialbuttonlayout]}>
                            <Image 
                                source={require('../../assets/google-logo.png')}
                                style={{width: 30, height: 30, margin: 0}}
                            />
                            <Text style={[styles.socialbuttontext]}>
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => signingIn === false ? signInWithApple() : null}>
                        <View style={[styles.socialbuttonlayout, {marginTop: 20, backgroundColor: '#000', borderWidth: 0.5, borderColor: '#fff'}]}>
                            <Image 
                                source={require('../../assets/apple-logo.png')}
                                style={{width: 30, height: 30, margin: 0}}
                            />
                            <Text style={[styles.socialbuttontext, {backgroundColor: '#000'}]}>
                                Continue with Apple
                            </Text>
                        </View>
                    </TouchableOpacity>

            <StatusBar style='light' backgroundColor='transparent'/>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default SignIn;