import React, {useState, useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions, 
    TextInput, 
    Linking,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';

import { AppContext } from '../../AppContext';
import useStyles from '../../styles';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';


const SignIn = ({navigation} : any) => {

    const { setUserID } = useContext(AppContext);

    //const { theme } = useContext(AppContext);

    const styles = useStyles();

    const [seePass, setSeePass] = useState(false);

    const [isErr, setIsErr] = useState(false);

    const [err, setErr] = useState('Error signing in.');

    const [signingIn, setSigningIn] = useState(false);

    const [trigger, setTrigger] = useState(false);


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
                    <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                        Error signing in. Please try again.
                    </Text>
                    <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
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
            <ActivityIndicator size="small" color={theme ? Colors.dark.loadingIcon : Colors.light.loadingIcon}/>
            ) : (
                <TouchableOpacity onPress={signIn}>
                    <View style={[styles.buttonlayout, {alignSelf: 'center'}]}>
                        <Text style={[styles.buttontext]}>
                            Login
                        </Text>
                    </View>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('SignUp') }>
                <Text style={[styles.paragraph, { alignSelf: 'center', margin: 30}]}>
                    Create an account
                </Text>
            </TouchableOpacity>
        <StatusBar style={theme ? "light" : "dark"} backgroundColor='transparent'/>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default SignIn;