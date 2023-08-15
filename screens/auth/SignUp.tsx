import React, {useState, useContext} from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback, 
    TextInput, 
    ActivityIndicator, 
    Keyboard
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {Auth} from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';

import useStyles from '../../styles';
import { AppContext } from '../../AppContext';

const SignUp = ({navigation} : any) => {

    const styles = useStyles();

    const [isErr, setIsErr] = useState(false);

    const [noMatch, setNoMatch] = useState(false);

    const [shortPass, setShortPass] = useState(false);

    const [userExist, setUserExist] = useState(false);

    const [seePass, setSeePass] = useState(true);

    const [seeConPass, setSeeConPass] = useState(true);

    const [signingUp, setSigningUp] = useState(false);

    const [data, setData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

const CreateUser = async () => {

    const { password, email } = data;

    let username = email.replace(/ /g, '');

    setSigningUp(true);

        try {

            const { user } = await Auth.signUp({
                username,
                password,
            });

            if (user) {
                navigation.navigate('ConfirmEmail', {username, password})
            }
        } catch (error) {
            console.log('error signing up:', error);
            error.code === 'UsernameExistsException' ? setUserExist(true) : setIsErr(true)
        }
        setSigningUp(false);
}

    const textInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ... data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val : any) => {
        setData({
            ... data,
            confirm_password: val
        });
    }

    const handleConfirmPasswordChange = (val : any) => {
        setData({
            ... data,
            password: val
        });
    }

    const handleSignUp = () => {

        const { password, confirm_password } = data;

        if (password.length < 6) {
            setNoMatch(false);
            setIsErr(false);
            setShortPass(true);
            setUserExist(false);
            return;
        }

        if (password !== confirm_password && password.length > 5) {
            setShortPass(false);
            setIsErr(false);
            setNoMatch(true);
            setUserExist(false);
            return;
        } 
        // if (data.Name.length < 3) {
        //     setShortPass(false);
        //     setIsErr(true);
        //     setNoMatch(false);
        //     setUserExist(false);
        //     return;
        // } 
        // Make sure passwords match
        if (password === confirm_password && password.length > 5) {
            setIsErr(false);
            setShortPass(false);
            setNoMatch(false);
            CreateUser()
        } else {
            setIsErr(true);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
                <View style={{ margin: 20, paddingTop: 70}}>
                    {userExist ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                                <Text style={{borderRadius: 15, backgroundColor: '#ffffffa5', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                    User already exists. Please log in.
                                </Text>
                            </View>
                        ) : null}
                    {isErr ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Text style={{borderRadius: 15, backgroundColor: '#ffffffa5', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                Error signing up. Please try again.
                            </Text>
                        </View>
                    ) : null}
                    {noMatch ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Text style={{borderRadius: 15, backgroundColor: '#ffffffa5', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                Passwords do no match. Try again.
                            </Text>
                        </View>
                    ) : null}
                    {shortPass ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Text style={{borderRadius: 15, backgroundColor: '#ffffffa5', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                Password must be at least 6 characters.
                            </Text>
                        </View>
                    ) : null}

                    <View>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={[styles.title, {marginHorizontal: 0, marginBottom: 4, marginTop: 10}]}>
                            Email
                        </Text>
                    </View>
                    <View style={styles.inputfield}>
                        <TextInput 
                            placeholder='....'
                            placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            maxLength={40}
                            onChangeText={(val) => textInputChange(val)}
                            autoCapitalize='none'
                        />
                    </View>
                </View>

                <View style={{ borderBottomWidth: 1, borderColor: '#ffffffa5', marginBottom: 10, marginTop: 20, marginHorizontal: 20}}>

            </View>

                <View>
                    <Text style={[styles.title, {marginHorizontal: 0, marginBottom: 4, marginTop: 10}]}>
                        Password
                    </Text>
                    <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <TextInput 
                            placeholder='....'
                            placeholderTextColor='#ffffffa5'
                            style={[styles.textInputTitle, {width: '80%'}]}
                            maxLength={20}
                            autoCapitalize='none'
                            secureTextEntry={seePass === true ? true : false }
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <Feather 
                            name={seePass === true ? 'eye-off' : 'eye'}
                            color='#fff'
                            size={18}
                            style={{marginRight: 10}}
                            onPress={() => setSeePass(!seePass)}
                        />
                    </View>
                </View>

                <View>
                    <Text style={[styles.title, {marginHorizontal: 0, marginBottom: 4, marginTop: 10}]}>
                        Confirm Password
                    </Text>
                    <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <TextInput 
                            placeholder='....'
                            placeholderTextColor='#ffffffa5'
                            style={[styles.textInputTitle, {width: '80%'}]}
                            maxLength={20}
                            autoCapitalize='none'
                            secureTextEntry={seeConPass === true ? true : false }
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        <Feather 
                            name={seeConPass === true ? 'eye-off' : 'eye'}
                            color='#fff'
                            size={18}
                            style={{marginRight: 10}}
                            onPress={() => setSeeConPass(!seeConPass)}
                        />
                    </View>
                </View>

            </View>

                {signingUp === true ? (
                <ActivityIndicator size="small" color='#00ffff' />
                ) : (
                    <TouchableOpacity onPress={handleSignUp}>
                        <View style={[styles.buttonlayout, {alignSelf: 'center', marginTop: 40}]}>
                            <Text style={styles.buttontext}>
                                Create Account
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => navigation.navigate('SignIn') }>
                    <Text style={[styles.paragraph, { alignSelf: 'center', marginTop: 40}]}>
                        I already have an account.
                    </Text>
                </TouchableOpacity>
            <StatusBar style={"light"} backgroundColor='transparent'/>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default SignUp;