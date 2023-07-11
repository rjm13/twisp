import React, {useState, useEffect, useContext, useLayoutEffect} from "react";
import { View, Text, ActivityIndicator, Dimensions, TouchableWithoutFeedback, Platform } from "react-native";
import { AppContext } from '../../AppContext';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import { StatusBar } from 'expo-status-bar';
//import Purchases from "react-native-purchases";


const SCREEN_WIDTH = Dimensions.get('window').width

const SCREEN_HEIGHT = Dimensions.get('window').height

const Redirect = ({route, navigation} : any) => {

    const [isLoading, setIsLoading] = useState(false);

    const [tryAgain, setTryAgain] = useState(false);

    const trigger = route.params

    const { userID } = useContext(AppContext);
    const { setUserID } = useContext(AppContext);

    const { userPins } = useContext(AppContext);
    const { setUserPins } = useContext(AppContext);

    const { userRates } = useContext(AppContext);
    const { setUserRates } = useContext(AppContext);

    const { userFinished } = useContext(AppContext);
    const { setUserFinished } = useContext(AppContext);

    const { nsfwOn } = useContext(AppContext);
    const { setNSFWOn } = useContext(AppContext);

    const { ADon } = useContext(AppContext);
    const { setADon } = useContext(AppContext);

    const { premium } = useContext(AppContext);
    const { setPremium } = useContext(AppContext);

    const [nextToken, setNextToken] = useState()

    useEffect(() => {
        //TODO check to see if the user has a premium subscription
        //if they do, do nothing, it will be taken care of on redirect screen
        //if they not subscribed and in the premium group, remove them
    
        const performMagic = async () => {
    
          const userInfo = await Auth.currentAuthenticatedUser();
    
          const ENTITLEMENT_ID = userInfo.attributes.sub
    
          //const purchaserInfo = await Purchases.getPurchaserInfo();
    
        //   if (typeof purchaserInfo.entitlements.active[0] !== "undefined") {
        //     setPremium(true);
        //   } 
        }

        performMagic();
    
      }, [])

    useEffect(() => {

        setIsLoading(true);

        const fetchUser = async () => {

            let pins = [];
            let rates = [];
            let finished = [];
            let following = [];

            try {
                const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true }).catch(err=>err)

                if (userInfo === 'The user is not authenticated') {
                    navigation.navigate('SignIn')
                }

                else {

                    // if (userInfo.signInUserSession.idToken.payload["cognito:groups"].includes('Premium') === true) {
                    //     setPremium(true)
                    //     console.log(userInfo.signInUserSession.idToken.payload["cognito:groups"])
                    // }

                    //const purchaserInfo = await Purchases.getPurchaserInfo();

                    // if (typeof purchaserInfo.entitlements.active[0] !== "undefined") {
                    //     setPremium(true);
                    //   } else {
                    //     setPremium(false)
                    //   }

                    // const date = new Date();
                    // const year = date.getFullYear();
                    // const month = date.getMonth();
                    // const day = date.getDate();
                    // const c = new Date(year - 18, month, day).toISOString();
                    // const bd3 = new Date(userInfo.attributes.birthdate).toISOString()
                
                    // if (bd3 > c) {
                    //     setNSFWOn(false);
                    //     setADon(false);
                    // } 
                    // if (bd3 < c) {
                    //     setNSFWOn(true);
                    //     setADon(true)
                    // } 

                    const userData = await API.graphql(graphqlOperation(
                        getUser,{ id: userInfo.attributes.sub}))
        
                    if (userData.data.getUser) {
                        setUserID(userData.data.getUser.id);

                        const getThePins = async () => {
                            for (let i = 0; i < userData.data.getUser.Pinned.items.length; i++) {
                                pins.push(userData.data.getUser.Pinned.items[i].storyID)
                            }
                            if (userData.data.getUser.Pinned.nextToken) {
                                setNextToken(userData.data.getUser.Pinned.nextToken)
                                getThePins();
                                return;
                            }
                            setUserPins(pins);
                        }

                        const getTheRatings = async () => {
                            for (let i = 0; i < userData.data.getUser.Rated.items.length; i++) {
                                rates.push(userData.data.getUser.Rated.items[i].storyID)
                            }
                            if (userData.data.getUser.Rated.nextToken) {
                                setNextToken(userData.data.getUser.Rated.nextToken)
                                getTheRatings();
                                return;
                            }
                            setUserRates(rates);
                        }

                        const getTheFinished = async () => {
                            for (let i = 0; i < userData.data.getUser.Finished.items.length; i++) {
                                finished.push(userData.data.getUser.Finished.items[i].storyID)
                            }
                            if (userData.data.getUser.Finished.nextToken) {
                                setNextToken(userData.data.getUser.Finished.nextToken)
                                getTheFinished();
                                return;
                            }
                            setUserFinished(finished);
                        }

                        const getTheFollowing = async () => {
                            for (let i = 0; i < userData.data.getUser.Following.items.length; i++) {
                                following.push(userData.data.getUser.Following.items[i].storyID)
                            }
                            if (userData.data.getUser.Following.nextToken) {
                                setNextToken(userData.data.getUser.Following.nextToken)
                                getTheFollowing();
                                return;
                            }
                            setUserFinished(following);
                        }

                        getThePins();
                        getTheRatings();
                        getTheFollowing();
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