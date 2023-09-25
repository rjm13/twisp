import React from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Linking,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import useStyles from '../styles';


const AboutScreen = ({navigation} : any) => {

    const styles = useStyles();

    const pkg = require('../package.json');

    const appVersion = pkg.version;

    return (
        <View>
            
            <LinearGradient colors={['#363636a5', '#363636a5', 'black']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}> 
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
                        About
                    </Text>
                </View>
                
                <ScrollView style={{ height: '86%'}}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                        <View style={{width: '75%'}}>
                            <Text style={[styles.paragraph, {fontSize: 16}]}>
                                Version
                            </Text>
                            <Text style={styles.subtext}>
                                {appVersion}
                            </Text>
                        </View>
                    </View>

                    <TouchableWithoutFeedback onPress={() => Linking.openURL('http://www.blipstories.com/terms')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Terms and Conditions
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('PrivacyPolicy')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Privacy Policy
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => Linking.openURL('http://www.blipstories.com/faq')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                FAQ
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                color='#fff'
                                size={15}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => Linking.openURL('mailto:blipsupport@blipstories.com') }>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ color: '#fff', fontSize: 16}}>
                                Contact Us
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                            
                        </View>
                    </TouchableWithoutFeedback>
                    
                </ScrollView>  
            </LinearGradient>
            <StatusBar style="light" />
        </View>
    );
}

export default AboutScreen;