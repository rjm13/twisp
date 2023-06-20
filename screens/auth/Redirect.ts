import React, {useState, useEffect, useContext, useLayoutEffect} from "react";
import { View, Text, ActivityIndicator, Dimensions, TouchableWithoutFeedback, Platform } from "react-native";
import { AppContext } from '../../AppContext';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { StatusBar } from 'expo-status-bar';
import Purchases from "react-native-purchases";


const SCREEN_WIDTH = Dimensions.get('window').width

const SCREEN_HEIGHT = Dimensions.get('window').height

const Redirect = ({route, navigation} : any) => {

    const [isLoading, setIsLoading] = useState(false);

    const [tryAgain, setTryAgain] = useState(false);

    const trigger = route.params

    const { userID } = useContext(AppContext);
    const { setUserID } = useContext(AppContext);

    const { nsfwOn } = useContext(AppContext);
    const { setNSFWOn } = useContext(AppContext);

    const { ADon } = useContext(AppContext);
    const { setADon } = useContext(AppContext);

    const { premium } = useContext(AppContext);
    const { setPremium } = useContext(AppContext);

    useEffect(() => {
        //TODO check to see if the user has a premium subscription
        //if they do, do nothing, it will be taken care of on redirect screen
        //if they not subscribed and in the premium group, remove them
    
        const performMagic = async () => {
    
          const userInfo = await Auth.currentAuthenticatedUser();
    
          const ENTITLEMENT_ID = userInfo.attributes.sub
    
          const purchaserInfo = await Purchases.getPurchaserInfo();
    
          if (typeof purchaserInfo.entitlements.active[0] !== "undefined") {
            setPremium(true);
          } 
        }

        performMagic();
    
      }, [])



    useEffect(() => {

        setIsLoading(true);

        const fetchUser = async () => {

            try {
                const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true }).catch(err=>err)

                console.log(userInfo)

                if (userInfo === 'The user is not authenticated') {
                    navigation.navigate('SignIn')
                }

                else {

                    // if (userInfo.signInUserSession.idToken.payload["cognito:groups"].includes('Premium') === true) {
                    //     setPremium(true)
                    //     console.log(userInfo.signInUserSession.idToken.payload["cognito:groups"])
                    // }

                    const purchaserInfo = await Purchases.getPurchaserInfo();

                    if (typeof purchaserInfo.entitlements.active[0] !== "undefined") {
                        setPremium(true);
                      } else {
                        setPremium(false)
                      }

                    const date = new Date();
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const day = date.getDate();
                    const c = new Date(year - 18, month, day).toISOString();
                    const bd3 = new Date(userInfo.attributes.birthdate).toISOString()
                
                    if (bd3 > c) {
                        setNSFWOn(false);
                        setADon(false);
                    } 
                    if (bd3 < c) {
                        setNSFWOn(true);
                        setADon(true)
                    } 

                    const userData = await API.graphql(graphqlOperation(
                        getUser,{ id: userInfo.attributes.sub}))

    
                    console.log(userData.data.getUser)
        
                    if (userData.data.getUser) {
                        setUserID(userData.data.getUser);
                        navigation.reset({
                            //index: 0,
                            routes: [{ name: 'Root' }],
                        });
                    
                    } else {
                        setUserID(null);
                        navigation.reset({
                            //index: 0,
                            routes: [{ name: 'SignIn' }],
                        });
                    }
                }
            } catch {
                setIsLoading(false);
            }
        }
        fetchUser();
        
    }, [trigger, tryAgain])


    return (
        <View style={{alignContent: 'center', justifyContent: 'center', width: SCREEN_WIDTH, height: SCREEN_HEIGHT + 30, backgroundColor: '#000000'}}>
            {isLoading === true ? (
                <ActivityIndicator size="large" color="cyan" />
            ) : (
                <View>
                    <Text style={{color: '#fff'}}>
                        Error logging in. Please check your internet connection.
                    </Text>
                    <TouchableWithoutFeedback onPress={() => setTryAgain(!tryAgain)}>
                       <View style={{margin: 20, padding: 20}}>
                            <Text style={{fontSize: 14, color: 'cyan'}}>
                                Try Again
                            </Text>
                        </View> 
                    </TouchableWithoutFeedback>
                    
                </View>
            )}
            
            <StatusBar style='light' backgroundColor="transparent"/>
        </View>
        
    );
}

export default Redirect;