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

import useStyles from '../../styles';

import { LinearGradient } from 'expo-linear-gradient';
import { Auth } from 'aws-amplify';

const ForgotPassword = ({navigation} : any) => {

    const styles = useStyles();

    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            await Auth.forgotPassword(
                email.replace(/ /g, ''),
            )
            .then(navigation.navigate('ForgotPasswordCon', {email: email.replace(/ /g, '')}))

        } catch {
            alert('Error. Please try again.')
        }
      }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <LinearGradient
                colors={['#00ffffa5','#000', '#000']}
                style={[styles.container, {justifyContent: 'center'}]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ margin: 20}}>
                    <View>
                        <Text style={[styles.title, {marginTop: 10, marginBottom: 4}]}>
                            Email
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={40}
                                onChangeText={val => setEmail(val)}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleForgotPassword}>
                    <View style={styles.buttonlayout}>
                        <Text style={styles.buttontext}>
                            Send Reset Code
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack() }>
                    <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center', marginTop: 30}}>
                        Go Back
                    </Text>
                </TouchableOpacity>

            </LinearGradient>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default ForgotPassword;