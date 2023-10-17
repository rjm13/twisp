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

const EmailSignIn = ({navigation} : any) => {

    const { setUserID } = useContext(AppContext);

    const styles = useStyles();

    const [seePass, setSeePass] = useState(false);

    const [isErr, setIsErr] = useState(false);

    const [err, setErr] = useState('Error signing in.');

    const [signingIn, setSigningIn] = useState(false);

    

    const CreateUser = async () => {

        const {password} = data;

        const username = data.username.replace(/ /g, '');
    
        const userInfo = await Auth.currentAuthenticatedUser(
            { bypassCache: true }
          );
    
          if (userInfo === 'The user is not authenticated') {
            setSigningIn(false);
            return;
          }

          if (userInfo.attributes.email_verified === false) {
              await Auth.resendSignUp(username)
              .then(navigation.navigate('ConfirmEmail', {username, password}))
              setSigningIn(false);
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
                navigation.navigate('Redirect', {trigger: Math.random()});
                
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
            //setSigningIn(false);
        } 
        catch (error) {
            console.log(error.message)
            setErr(error?.message.toString())
            setIsErr(true);
            setSigningIn(false);
        }
        //setSigningIn(false);
    } 
            

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={[styles.container, {justifyContent: 'center', height: Dimensions.get('window').height}]}>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.container, {justifyContent: 'center', height: Dimensions.get('window').height}]}>

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

            <View>
                <TouchableOpacity onPress={() => signingIn === false ? signIn() : null}>
                    <View style={[styles.socialbuttonlayout, {justifyContent: 'center', backgroundColor: '#00ffff'}]}>
                        <Text style={[styles.socialbuttontext, {width: Dimensions.get('window').width*0.62, color: '#000'}]}>
                            Sign In
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => signingIn === false ? navigation.navigate('SignUp') : null}>
                    <View style={[styles.socialbuttonlayout, {borderColor: '#fff', borderWidth: 1, justifyContent: 'center', marginVertical: 16, backgroundColor: 'transparent'}]}>
                        <Text style={[styles.socialbuttontext, {width: Dimensions.get('window').width*0.62, color: '#fff'}]}>
                            Creare an account
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.buttontext, { fontWeight: '400', alignSelf: 'center', margin: 30, color: '#fff'}]}>
                        Use a different method
                    </Text>
                </TouchableOpacity>
            </View> 
        )}

            <StatusBar style='light' backgroundColor='transparent'/>
            </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default EmailSignIn;