import React, {useState, useEffect, useContext} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Platform,
    Linking,
    ScrollView
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

import {graphqlOperation, API, Auth} from 'aws-amplify';
import {updateUser} from '../src/graphql/mutations';

import { AppContext } from '../AppContext';

import Purchases, { PurchasesOffering } from 'react-native-purchases';

const PremiumHome = ({navigation} : any) => {

    const [packages, setPackages] = useState<PurchasesOffering | null>(null);

    const [purchasePackage, setPurchasePackage] = useState()

    const [selection, setSelection] = useState(0);

    useEffect(() => {
        if (selection === 0) {
            return;
        }
        if (selection === 1) {
            setPurchasePackage(packages?.availablePackages[2])
        }
        if (selection === 2) {
            setPurchasePackage(packages?.availablePackages[1])
        }
        if (selection === 3) {
            setPurchasePackage(packages?.availablePackages[0])
        }
    }, [selection])


    useEffect(() => {
        const getPackages = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                const offerings = await Purchases.getOfferings();
                console.log(offerings.current)
                if (offerings.current !== null) {
                    setPackages(offerings?.current)
                    console.log(offerings?.current)
                }
                Purchases.setDebugLogsEnabled(true);
                if (Platform.OS == "android") {
                Purchases.configure({apiKey: "goog_ZnvczOwEEgDMwVVNvfxMKwPmFgX"});
                } else {
                Purchases.configure({apiKey: "appl_kWcWMJjdDmIvLdsnnGavdbkSevg"});
                }
                }
            catch (error) {
                console.log(error)
            }

        }
        getPackages();
    }, [])

    const { premium } = useContext(AppContext);
    const { setPremium } = useContext(AppContext);

    //sign out function
    async function signOut() {
        try {
            await Auth.signOut()
            .then(() => setPremium(false))
            .then(() => navigation.replace('SignIn'))
        } catch (error) {
            console.log('error signing out: ', error);
            alert("error signing out")
        }
    }

    const GetInfo = async () => {
        let userInfo = await Auth.currentAuthenticatedUser();
        console.log(userInfo.signInUserSession.idToken.payload["cognito:groups"][0])
    }

    // async function addToGroup() { 

    //     let userInfo = await Auth.currentAuthenticatedUser();

    //     let apiName = 'AdminQueries';
    //     let path = '/addUserToGroup';
    //     let myInit = {
    //         body: {
    //           "username" : userInfo.attributes.email,
    //           "groupname": "Premium"
    //         }, 
    //         headers: {
    //           'Content-Type' : 'application/json',
    //           Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
    //         } 
    //     }
    //     return await API.post(apiName, path, myInit).then(signOut)

    //   }

    const Subscribe = async () => {

        console.log(purchasePackage)

        if (selection === 0) {
            return;
        } else {

        let userInfo = await Auth.currentAuthenticatedUser();

        try {
            const ENTITLEMENT_ID = userInfo.attributes.sub

            const {customerInfo, productIdentifier} = await Purchases.purchasePackage(purchasePackage)
            
            if (typeof customerInfo.entitlements.active[0] !== 'undefined') {
                navigation.navigate('Redirect', {trigger: Math.random()})
            }
        } catch (error) {
            alert(error)
        }
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['black', '#363636a5', 'black']}
                style={{height: Dimensions.get('window').height, justifyContent: 'center'}}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View>

                    <View style={{alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginHorizontal: 20}}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 32, fontWeight: 'bold'}}>
                           Twisp Premium
                        </Text>
                    </View>

                    <View style={{marginVertical: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        
                        {/* <TouchableWithoutFeedback onPress={() => setSelection(1)}>
                            <View style={{width: selection === 1 ? '35%' : '30%', margin: 1}}>
                                <View style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', justifyContent: 'center', height: selection === 1 ? 75 : 70, backgroundColor: selection === 1 ? '#00ffff' : '#00ffffa5', }}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15, color: selection === 1 ? '#000' : '#363636a5'}}>
                                        1
                                    </Text>
                                    <Text style={{fontWeight: 'bold', fontSize: 15, color: selection === 1 ? '#000' : '#363636a5'}}>
                                        MONTH
                                    </Text>
                                </View>
                                <View style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center', height: selection === 1 ? 75 : 70, backgroundColor: selection === 1 ? '#00ffffcc' : '#00ffff73', }}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', color: selection === 1 ? '#000' : '#363636a5'}}>
                                        {packages?.availablePackages[2].product.price_string}
                                    </Text>
                                    <Text style={{fontSize: 12, fontWeight: 'bold', color: selection === 1 ? '#000000a5' : '#363636a5'}}>
                                        {packages?.availablePackages[2].product.price_string}/mo
                                    </Text>
                                </View>
                                <Text style={{color: '#fff', textAlign: 'center'}}>
                                    Student
                                </Text>
                            </View>
                        </TouchableWithoutFeedback> */}
                        
                        <TouchableWithoutFeedback onPress={() => setSelection(2)}>
                            <View style={{width: selection === 2 ? '35%' : '30%', margin: 1}}>
                                
                                <View style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', justifyContent: 'center', height: selection === 2 ? 75 : 70, backgroundColor: selection === 2 ? '#00ffff' : '#00ffffa5', }}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15, color: selection === 2 ? '#000' : '#363636a5'}}>
                                        1
                                    </Text>
                                    <Text style={{fontWeight: 'bold', fontSize: 15, color: selection === 2 ? '#000' : '#363636a5'}}>
                                        YEAR
                                    </Text>
                                </View>
                                <View style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center', height: selection === 2 ? 75 : 70, backgroundColor: selection === 2 ? '#00ffffcc' : '#00ffff73', }}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', color: selection === 2 ? '#000' : '#363636a5'}}>
                                        ${Math.ceil(parseFloat(packages?.availablePackages[1].product.price))}
                                    </Text>
                                    <Text style={{fontSize: 12, fontWeight: 'bold', color: selection === 2 ? '#000000a5' : '#363636a5'}}>
                                        $4.16/mo
                                    </Text>
                                </View>
                                <View style={{position: 'absolute', borderRadius: 10, backgroundColor: selection === 2 ? '#8F7900' : '#8F7900', width: '74%', alignSelf: 'center', marginTop: -10}}>
                                    <Text style={{textAlign: 'center', fontSize: 11, color: selection === 2 ? '#fff' : '#ffffffa5', fontWeight: "700", paddingVertical: 3}}>
                                        SAVE 16.8%
                                    </Text>
                                </View>
                                <Text style={{color: '#fff', textAlign: 'center'}}>
                                    Annually
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <TouchableWithoutFeedback onPress={() => setSelection(3)}>
                            <View style={{width: selection === 3 ? '35%' : '30%', margin: 1}}>
                                <View style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', justifyContent: 'center', height: selection === 3 ? 75 : 70, backgroundColor: selection === 3 ? '#00ffff' : '#00ffffa5', }}>
                                    <Text style={{fontWeight: 'bold', fontSize: 15, color: selection === 3 ? '#000' : '#363636a5'}}>
                                        1
                                    </Text>
                                    <Text style={{fontWeight: 'bold', fontSize: 15, color: selection === 3 ? '#000' : '#363636a5'}}>
                                        MONTH
                                    </Text>
                                </View>
                                <View style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center', height: selection === 3 ? 75 : 70, backgroundColor: selection === 3 ? '#00ffffcc' : '#00ffff73', }}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', color: selection === 3 ? '#000' : '#363636a5'}}>
                                        ${Math.ceil(parseFloat(packages?.availablePackages[0].product.price))}
                                    </Text>
                                    <Text style={{fontSize: 12, fontWeight: 'bold', color: selection === 3 ? '#000000a5' : '#363636a5'}}>
                                        ${Math.ceil(parseFloat(packages?.availablePackages[0].product.price))}/mo
                                    </Text>
                                </View>
                                <Text style={{color: '#fff', textAlign: 'center'}}>
                                    Monthly
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                        
                    </View>
                    

                    <View style={{alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginHorizontal: 30, marginBottom: 40}}>
                        {/* <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <FontAwesome5 
                                name='check'
                                size={18}
                                color='#00ffff'
                                style={{marginRight: 20, alignSelf: 'center'}}
                            />
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14}}>
                                No Ads
                            </Text>
                        </View> */}

                        <View style={{flexDirection: 'row', marginBottom: 0}}>
                            {/* <FontAwesome5 
                                name='check'
                                size={18}
                                color='#00ffff'
                                style={{marginRight: 20, alignSelf: 'center'}}
                            /> */}
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14}}>
                                Access all curated content
                            </Text>
                        </View>

                        {/* <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <FontAwesome5 
                                name='check'
                                size={18}
                                color='#00ffff'
                                style={{marginRight: 20, alignSelf: 'center'}}
                            />
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14}}>
                                Access the After Dark genre
                            </Text>
                        </View> */}

                        
                        
                    </View>

                    <TouchableOpacity 
                        style={{ backgroundColor: selection === 0 ? 'gray' : '#00ffff', borderRadius: 10, width: '80%', alignSelf: 'center'}}
                        onPress={Subscribe}
                    >
                        <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', paddingVertical: 10,}}>
                            Get Premium
                        </Text>
                    </TouchableOpacity>

                    <Text style={{color: '#ffffffa5', textAlign: 'center', fontSize: 12, marginTop: 20, marginBottom: 0, paddingHorizontal: 20}}>
                        Subscriptions renew automatically unless cancelled.
                    </Text>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL('http://www.twisp.us/terms')}>
                        <Text style={{textDecorationLine: 'underline', color: '#ffffffa5', textAlign: 'center', fontSize: 12, paddingHorizontal: 20, marginBottom: -20}}>
                            Terms and conditions
                        </Text>
                    </TouchableWithoutFeedback>

                    
                </View>
            </LinearGradient>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width,
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40,
    },
});

export default PremiumHome;