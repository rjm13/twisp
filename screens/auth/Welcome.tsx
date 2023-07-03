import React, { useEffect, useState, useContext} from 'react';
import {
    View, 
    Text, 
    Dimensions, 
    TouchableOpacity, 
    Platform, 
    TouchableWithoutFeedback,
    StyleSheet,
    Modal
} from 'react-native';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMessage } from '../../src/graphql/mutations';
//import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import { AppContext } from '../../AppContext';


const Welcome = ({navigation} : any) => {

    const { nsfwOn } = useContext(AppContext);
    const { setNSFWOn } = useContext(AppContext);

    const { ADon } = useContext(AppContext);
    const { setADon } = useContext(AppContext);

    const [isSet, setIsSet] = useState(false)

    const SCREEN_HEIGHT = Dimensions.get('window').height

    useEffect(() => {
        const sendMessage = async () => {

            const userInfo = await Auth.currentAuthenticatedUser()

            await API.graphql(graphqlOperation(
                createMessage, {
                    input: {
                    type: 'Message',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userID: userInfo.attributes.sub,
                    otherUserID: null,
                    content: 'Welcome to Twisp!\n\nYour home for audio short stories.\n\Twisp curates stories, but also allows publishers to share their own.\n\nWe hope you enjoy using Twisp! Happy listening!',
                    title: 'Welcome to Twisp!',
                    subtitle: null,
                    isReadbyUser: false,
                    isReadByOtherUser: true,
                    docID: null,
                    request: null,
                    status: 'noreply'
                    }
                }
            ))

        }
        sendMessage();
    }, [])

                    //upload modal
                    const [visible, setVisible] = useState(false);
                    const showModal = () => {
                        setVisible(true);
                    }
                    const hideModal = () => setVisible(false);
            
                    const containerStyle = {
                        backgroundColor: '#363636', 
                        borderRadius: 15,
                        paddingVertical: 40
                    };
        
                    //date time picker
                const [date, setDate] = useState(new Date());
                const [mode, setMode] = useState('date');
                const [show, setShow] = useState(false);
        
                const todaysdate = new Date();
        
            const onChange = async (event, selectedDate) => {
                const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })
                const currentDate = selectedDate || date;
                setShow(Platform.OS === 'ios');
                setDate(currentDate);
                await Auth.updateUserAttributes(userInfo, {
                    'birthdate': format(currentDate, "MM/dd/yyyy")
                  }).then(() => setIsSet(true))
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

            const Next = async () => {

                const userInfo = await Auth.currentAuthenticatedUser()

                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                const c = new Date(year - 18, month, day).toISOString();
                const bd3 = new Date(userInfo.attributes.birthdate).toISOString()

                if (bd3 > c) {
                    setNSFWOn(false);
                    setADon(false);
                    navigation.navigate('SplashCarousel')
                } 
                if (bd3 < c) {
                    setNSFWOn(true);
                    setADon(true)
                    navigation.navigate('SplashCarousel')
                } 
            }
    
    return (
                
        <View style={{justifyContent: 'space-between', height: SCREEN_HEIGHT}}>
            <Modal 
                onDismiss={hideModal}
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                    <View style={{ backgroundColor: '#363636', padding: 20, margin: 20, borderRadius: 15, alignItems: 'center'}}>
                        {show && (
                            <View>
                                {/* <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode='date'
                                    is24Hour={true}
                                    display={Platform.OS === "ios" ? "spinner" : "default"}
                                    onChange={onChange}
                                /> */}
                                <TouchableWithoutFeedback onPress={hideModal}>
                                    <Text style={{color: '#fff', alignSelf: 'center', marginTop: 20, paddingHorizontal: 20, paddingVertical: 6, overflow: 'hidden', borderRadius: 13, backgroundColor: '#008080'}}>
                                        Select
                                    </Text>
                                </TouchableWithoutFeedback>
                                
                            </View>
                        )}
                    </View>
                </Modal>
            <View style={{marginTop: 100, alignItems: 'center'}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontSize: 22, fontWeight: 'bold'}}>
                        Welcome to Twisp!
                    </Text>
                    <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
                        Your home for audio short stories
                    </Text>

                    <Text style={{color: '#fff', textAlign: 'center', marginTop: 40, marginHorizontal: 20}}>
                        Twisp curates stories, but also allows authors to share their own.
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        
                    </View>
                    
                    <Text style={{color: '#fff', textAlign: 'center', marginTop: 20, marginHorizontal: 20}}>
                        To get started, head over to the publishing tab under the profile screen.
                    </Text>
                </View>
                {/* <View>
                <View style={{borderBottomWidth: 0.5, borderColor: '#fff', marginVertical: 40, width: '60%'}}/>
                <Text style={{color: '#fff', textAlign: 'center', marginTop: 0, marginHorizontal: 20, fontWeight: 'bold', fontSize: 17}}>
                    Please select your birthdate to continue.
                </Text>
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
                </View> */}
            </View> 

{/* FOOTER */}
            <View style={{height: '10%'}}>
                <TouchableOpacity onPress={() => navigation.navigate('SplashCarousel')}>
                    <Text style={{overflow: 'hidden', alignSelf: 'center', backgroundColor: 'cyan', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 13, textAlign: 'center'}}>
                        Next
                    </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
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
        marginTop: 20
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

export default Welcome;