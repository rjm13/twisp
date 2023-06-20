import React, {useState} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Platform, 
    TouchableWithoutFeedback, 
    Dimensions, 
    TextInput, 
    ActivityIndicator, 
    Keyboard
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Modal, Provider, Portal} from 'react-native-paper';

import {Auth} from 'aws-amplify';

import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

const SignUp = ({navigation} : any) => {

//date time picker
        const [date, setDate] = useState(new Date());
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);

        const todaysdate = new Date();

    const onChange = (event, selectedDate) => {
        console.log('date is')
        console.log(selectedDate)
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(selectedDate);
        setData({...data, birthdate: format(selectedDate, "MM/dd/yyyy")})
    };

    const showMode = (currentMode : any) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        if (Platform.OS === 'ios') {
            showModal()
        }
    };

    const showTimepicker = () => {
        showMode('time');
    };

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
        Name: '',
        birthdate: format(date, "MM/dd/yyyy"),
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        membership: 'basic'
    });

const CreateUser = async () => {

    const { password, confirm_password, Name, email, birthdate, membership } = data;

    console.log(birthdate)

    let username = email.replace(/ /g, '');

    let name = Name.toLowerCase();

    setSigningUp(true);

        try {

            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    name,
                    birthdate,
                    //'custom:membership': membership
                },
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
                Name: val,
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

    const handleNameChange = (val : any) => {
        setData({
            ... data,
            Name: val
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
        } if (data.Name.length < 3) {
            setShortPass(false);
            setIsErr(true);
            setNoMatch(false);
            setUserExist(false);
            return;
        } 
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

        //upload modal
        const [visible, setVisible] = useState(false);
        const showModal = () => {
            setVisible(true);
        }
        const hideModal = () => setVisible(false);

    //info modal
                const [visible2, setVisible2] = useState(false);
                const showModal2 = () => {
                    setVisible2(true);
                }
                const hideModal2 = () => setVisible2(false);

        const containerStyle = {
            backgroundColor: '#363636', 
            borderRadius: 15,
            paddingVertical: 40
        };

        const [infoState, setInfoState] = useState('')

        const nameInfo = 'This is used to display your name within the app.\n\nThis name may be public. For example, if you leave a comment on a story, this is the name that will display. \n\nIt does not have to be your real name.'

        const emailInfo = 'In order to recover your password, you must have a verified email.'

        const birthInfo = 'We strive to allow artistic freedom. As a result, some of our content may not be suitable for certian ages.'

    return (
        <Provider>
            <Portal>
                <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
                <View style={{backgroundColor: 'transparent'}}>
                    <Text style={{padding: 20, color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
                        Why do we need this?
                    </Text>
                    <View style={{width: '80%', height: 1, borderWidth: 0.5, borderColor: '#00ffffa5', alignSelf: 'center'}}/>
                    <Text style={{padding: 20, color: 'white'}}>
                        {infoState}
                    </Text>
                </View>
                </Modal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View>
                        {show && (
                            <View>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode='date'
                                    is24Hour={true}
                                    display={Platform.OS === "ios" ? "spinner" : "default"}
                                    onChange={onChange}
                                />
                                <TouchableWithoutFeedback onPress={hideModal}>
                                    <Text style={{color: '#fff', alignSelf: 'center', marginTop: 20, paddingHorizontal: 20, paddingVertical: 6, overflow: 'hidden', borderRadius: 13, backgroundColor: '#008080'}}>
                                        Select
                                    </Text>
                                </TouchableWithoutFeedback>
                                
                            </View>
                        )}
                    </View>
                </Modal>
            </Portal>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#00ffffa5','#000', '#000']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ margin: 20, paddingTop: 70}}>
                    {userExist ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                                <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                    User already exists. Please log in.
                                </Text>
                            </View>
                        ) : null}
                    {isErr ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                Error signing up. Please try again.
                            </Text>
                        </View>
                    ) : null}
                    {noMatch ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                Passwords do no match. Try again.
                            </Text>
                        </View>
                    ) : null}
                    {shortPass ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                            <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                                Password must be at least 6 characters.
                            </Text>
                        </View>
                    ) : null}
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={styles.header}>
                                Name
                            </Text>
                            <TouchableOpacity onPress={
                                () => {
                                    showModal2();
                                    setInfoState(nameInfo);
                                }
                            }>
                                <FontAwesome5 
                                    name='info-circle'
                                    size={16}
                                    color='#00ffffa5'
                                    style={{marginLeft: -10,  padding: 6}}
                                />
                            </TouchableOpacity>
                            
                        </View>
                        
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='...'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={40}
                                onChangeText={(val) => handleNameChange(val)}
                            />
                        </View>
                    </View>

                    <View>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={styles.header}>
                                Email
                            </Text>
                            <TouchableOpacity onPress={
                                () => {
                                    showModal2();
                                    setInfoState(emailInfo);
                                }
                            }>
                                <FontAwesome5 
                                    name='info-circle'
                                    size={16}
                                    color='#00ffffa5'
                                    style={{marginLeft: -10,  padding: 6}}
                                />
                            </TouchableOpacity>
                            
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

                    <View style={{marginTop: 0}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={styles.header}>
                                Birth Date
                            </Text>
                            <TouchableOpacity onPress={
                                () => {
                                    showModal2();
                                    setInfoState(birthInfo);
                                }
                            }>
                                <FontAwesome5 
                                    name='info-circle'
                                    size={16}
                                    color='#00ffffa5'
                                    style={{marginLeft: -10,  padding: 6}}
                                />
                            </TouchableOpacity>
                            
                        </View>
                        <TouchableWithoutFeedback onPress={showDatepicker}>
                            <View style={styles.inputfield}>
                                <Text style={styles.textInputTitle}>
                                    {date === todaysdate ? '...' : format(date, "MMMM do, yyyy")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {Platform.OS === 'android' && show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode='date'
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                        )}
                       
                    </View>

                    <View style={{ borderBottomWidth: 1, borderColor: '#ffffffa5', marginBottom: 10, marginTop: 20, marginHorizontal: 20}}>

                    </View>

                    <View>
                        <Text style={styles.header}>
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
                        <Text style={styles.header}>
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

                <TouchableOpacity onPress={handleSignUp}>
                    <View style={styles.button}>
                        {signingUp === true ? (
                            <ActivityIndicator size="small" color="cyan"/>
                        ) : (
                            <Text style={styles.buttontext}>
                                Create Account
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignIn') }>
                    <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center', marginTop: 40}}>
                        I already have an account.
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
        </TouchableWithoutFeedback>
        </Provider>
    );
}

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'flex-start',
        //alignItems: 'center',
        flex: 1,
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 4,
        marginTop: 10,
    },
    textInputTitle: {
        color: '#fff',
        fontWeight: 'normal',
    },
    inputfield: {
        width: '90%',
        height: 40,
        backgroundColor: '#363636',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
       alignItems: 'center',
       margin: 20,
    },
    buttontext: {
        backgroundColor: 'cyan',
        borderRadius: 17,
        paddingVertical: 10,
        paddingHorizontal: 20,
        overflow: 'hidden'
    },
});

export default SignUp;