import React, {useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    TouchableWithoutFeedback
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {Auth} from '@aws-amplify/auth'
import Feather from 'react-native-vector-icons/Feather';

import useStyles from '../../styles';

const ForgotPassword = ({navigation, route} : {navigation : any, route : any}) => {

    const styles = useStyles();

    const {email} = route.params

    const [newPassVis, setNewPassVis] = useState(false);

    const [conPassVis, setConPassVis] = useState(false);

    const [updatePass, setUpdatePass] = useState({
        username: email,
        code: '',
        password: '',
        confirmPass: '',
    })

    const handleResetPassword = async () => {
        const {username, code, password, confirmPass} = updatePass;

        if(password === confirmPass) {

        try {
            console.log(username, code, password);
            let result = await Auth.forgotPasswordSubmit(username, code, password)

            console.log(result);

            if(result) {
                navigation.navigate('SignIn');
            }
        } catch (e) {
            console.log(Error);
        }} else {
            alert('Passwords do not match')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, {justifyContent: 'center'}]}>
                <LinearGradient
                    colors={['#000', '#000']}
                    //style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >

                    <View style={{ margin: 20}}>
                        <Text style={{marginHorizontal: 20, color: '#fff', textAlign: 'center', marginBottom: 40, fontSize: 12}}>
                            Please check your email for the confirmation code to reset your password.
                        </Text>
                        <View style={{}}>
                            <Text style={[styles.title, {marginHorizontal: 0, marginTop: 10, marginBottom: 4}]}>
                                Confirmation Code
                            </Text>
                            <View style={styles.inputfield}>
                                <TextInput 
                                    placeholder='Check email for code'
                                    placeholderTextColor='#ffffffa5'
                                    style={[styles.textInputTitle, {width: '80%'}]}
                                    maxLength={40}
                                    autoCapitalize='none'
                                    onChangeText={val => setUpdatePass({...updatePass, code: val})}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginBottom: 0, marginHorizontal: 20}}>
                        <View>
                            <Text style={[styles.title, {marginHorizontal: 0, marginTop: 40, marginBottom: 4}]}>
                                New Password
                            </Text>
                            <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                                <TextInput 
                                    placeholder='...'
                                    placeholderTextColor='#ffffffa5'
                                    style={[styles.textInputTitle, {width: '80%'}]}
                                    maxLength={30}
                                    autoCapitalize='none'
                                    secureTextEntry={newPassVis === true ? false : true}
                                    onChangeText={val => setUpdatePass({...updatePass, password: val})}
                                />
                                <Feather 
                                    name={newPassVis === true ? 'eye' : 'eye-off'}
                                    color='#fff'
                                    size={18}
                                    style={{marginRight: 10, alignSelf: 'center'}}
                                    onPress={() => setNewPassVis(!newPassVis)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginBottom: 60, marginHorizontal: 20}}>
                        <View>
                            <Text style={[styles.title, {marginHorizontal: 0, marginTop: 40, marginBottom: 4}]}>
                                Confirm New Password
                            </Text>
                            <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                                <TextInput 
                                    placeholder='...'
                                    placeholderTextColor='#ffffffa5'
                                    style={[styles.textInputTitle, {width: '80%'}]}
                                    maxLength={30}
                                    autoCapitalize='none'
                                    secureTextEntry={conPassVis === true ? false : true}
                                    onChangeText={val => setUpdatePass({...updatePass, confirmPass: val})}
                                />
                                <Feather 
                                    name={conPassVis === true ? 'eye' : 'eye-off'}
                                    color='#fff'
                                    size={18}
                                    style={{marginRight: 10, alignSelf: 'center'}}
                                    onPress={() => setConPassVis(!conPassVis)}
                                />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleResetPassword}>
                        <View style={[styles.buttonlayout, {alignSelf: 'center'}]}>
                            <Text style={[styles.buttontext, {width: Dimensions.get('window').width*0.5}]}>
                                Reset Password
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack() }>
                        <Text style={{fontSize: 14, color: '#fff', alignSelf: 'center', margin: 20}}>
                            Go Back
                        </Text>
                    </TouchableOpacity>

                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default ForgotPassword;