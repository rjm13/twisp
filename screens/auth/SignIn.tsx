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
    Platform,
    ScrollView,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';

import { AppContext } from '../../AppContext';
import useStyles from '../../styles';

import { Auth, API, graphqlOperation, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { getUser } from '../../src/graphql/queries';

const SignIn = ({navigation} : any) => {

    const styles = useStyles();

    const [isErr, setIsErr] = useState(false);

    const [err, setErr] = useState('Error signing in.');

    const [signingIn, setSigningIn] = useState(false);

//listener for google sign in
    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload: { event, data }}) => {
          switch (event) {
            case "signIn":
                console.log('this guy logged in', data)
                if (data.username.startsWith('google')) {
                    navigation.navigate('Redirect', {trigger: Math.random()});
                    setSigningIn(false)
                }
                if (data.username.startsWith('signinwithapple')) {
                    navigation.navigate('Redirect', {trigger: Math.random()});
                    setSigningIn(false)
                }
                
              break;
            //   case 'cognitoHostedUI':
            //     getUser().then(userData => setUser(userData));
            //     break;
            case "signOut":
              Auth.signOut();
              navigation.navigate('Redirect', {trigger: Math.random()});
              break;
              case 'signIn_failure':
              case 'cognitoHostedUI_failure':
                console.log('Sign in failure', data);
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
            

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={[styles.container, {justifyContent: 'center', height: Dimensions.get('window').height}]}>
            
                {/* <View style={{ margin: 20}}>
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
                </View> */}

        {signingIn === true ? (
                <ActivityIndicator size="small" color='cyan'/>
                ) : (

            <View style={{justifyContent: 'space-between', height: '100%', paddingVertical: 60}}>
                <View style={{alignItems: 'center'}}>
                    <Image 
                        source={require('../../assets/twisp-bw-small.png')}
                        style={{width: Dimensions.get('window').height*0.1, height: Dimensions.get('window').height*0.1, margin: 0, marginVertical: 0}}
                    />
                </View>

                <View style={{alignItems: 'center',  marginTop: 0}}>
                    <Text style={{fontWeight: '600', color: '#fff', fontSize: 26}}>
                        Welcome to Twisp
                    </Text>
                    <Text style={{fontWeight: '400', color: '#fff', fontSize: 18, marginTop: 10}}>
                        Audio Short Stories
                    </Text>
                </View>

                

                <View>
                    <TouchableOpacity onPress={() => signingIn === false ? navigation.navigate('EmailSignIn') : null}>
                        <View style={[styles.socialbuttonlayout, {marginVertical: 10, justifyContent: 'center', backgroundColor: '#00ffff'}]}>
                            <Image 
                                source={require('../../assets/twisp-b-small.png')}
                                style={{width: 20, height: 20, margin: 0, marginVertical: 5}}
                            />
                            <Text style={[styles.socialbuttontext, {width: Dimensions.get('window').width*0.62, color: '#000'}]}>
                                Continue with Email
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => signingIn === false ? signInWithGoogle() : null}>
                        <View style={[styles.socialbuttonlayout, {marginVertical: 10, justifyContent: 'center'}]}>
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
                        <View style={[styles.socialbuttonlayout, {marginVertical: 10, backgroundColor: '#000', borderWidth: 1, borderColor: '#ffffffa5', justifyContent: 'center'}]}>
                            <Image 
                                source={require('../../assets/apple-logo.png')}
                                style={{width: 30, height: 30, margin: 0}}
                            />
                            <Text style={[styles.socialbuttontext, {backgroundColor: '#000'}]}>
                                Continue with Apple
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 40}}>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:admin@martianspidermedia.com') }>
                        <View style={{ }}>
                            <Text style={[styles.paragraph, {color: '#ffffffa5', alignSelf: 'center'}]}>
                                Contact us
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Linking.openURL('https://www.blipstories.com/terms') }>
                        <View style={{ }}>
                            <Text style={[styles.paragraph, {color: '#ffffffa5', alignSelf: 'center'}]}>
                                Terms of Use
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View> 

        )}
                
            <StatusBar style='light' backgroundColor='transparent'/>
            
            </View>
        </TouchableWithoutFeedback>
    );
}

export default SignIn;