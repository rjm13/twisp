import React, { useEffect, useState, useContext } from 'react';
import { 
    StyleSheet, 
    ScrollView, 
    TouchableWithoutFeedback,
    View,
    Dimensions
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'expo-linear-gradient';
import Linking from 'expo-linking'

import useStyles from '../styles';
import { AppContext } from '../AppContext';
import Trending from '../components/lists/Trending';
import ShortSweet from '../components/lists/ShortSweet';
import ForYouCarousel from '../components/lists/ForYouCarousel';
import ForYouGenre from '../components/lists/ForYouGenre';
import NewList from '../components/lists/NewList';

import { Auth, graphqlOperation, API } from 'aws-amplify';
import {getUser, listGenres} from '../src/graphql/queries';


const HomeScreen = ({navigation} : any) => {

    const styles = useStyles();

    //deep link global context for sharing a story
    const { deepLink } = useContext(AppContext);
    const { setDeepLink } = useContext(AppContext);

    //set from the user object, the top genres selected by the user
    const [TopThree, setTopThree] = useState([])

    //set the listener to open a shared a story on app start up
    // useEffect(() => {

    //     async function getInitialURL(params : any) {
    
    //         if(!params) return;
        
    //         const initialURL = await Linking.getInitialURL();
            
    //         if (initialURL)  {
    //             let response = Linking.parse(initialURL)
    //             setDeepLink(response)
    //         }
    //         if (params) {
    //             let response = Linking.parse(params)
                    
    //             setDeepLink(response)
    //         }
    //     }
    
    //     // listen for new url events coming from Expo
    //     Linking.addEventListener('url', event => {getInitialURL(event.url);});
    
    //     return (() => {Linking.removeEventListener('url', event => {getInitialURL(event.url);});})

    //   }, [])

      //if the app opens from a shared link, direct the user to that story screen
    useEffect(() => {

        if (deepLink?.queryParams?.id) {
            navigation.navigate('StoryScreen', {storyID: deepLink?.queryParams.id})
        }
        else {
            return
        }
       
    } , [deepLink])

    //fetch the top 3 genres for the user
    useEffect(() => {

        const fetchGenres = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            const User = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))
            
            if (User.data.getUser.topthree.length === 3) {
                setTopThree(User.data.getUser.topthree)
            } else {
                const Genres = await API.graphql(graphqlOperation(
                    listGenres, {filter: {
                        genre: {
                            ne: 'after dark'
                        },
                    }}
                ))
                setTopThree([Genres.data.listGenres.items[0], Genres.data.listGenres.items[1],Genres.data.listGenres.items[2]])
            }
        }
        fetchGenres();

    }, [])

    return (
        <LinearGradient colors={['#13192Ca5', '#161616', '#000000']} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <ScrollView style={{ }} showsVerticalScrollIndicator={false}> 
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 60, marginBottom: 10, marginHorizontal: 20}}>
                    <View style={{ flexDirection: 'row'}}>
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen')}>
                        <View style={{ backgroundColor: 'transparent', padding: 30, margin: -30, justifyContent: 'center'}}>
                            <FontAwesome
                                name='user'
                                size={20}
                                color='#fff'  
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View>
                    <ForYouCarousel />
                </View>
            
                <View>
                    <Trending/>
                </View>

                <View>
                    <ShortSweet/>
                </View>

                <View>
                    <NewList />
                </View> 

                {TopThree.length === 3 ? (
                    <View>
                        <ForYouGenre genreid={TopThree[0]}/>
                        <ForYouGenre genreid={TopThree[1]}/>
                        <ForYouGenre genreid={TopThree[2]}/>
                    </View>
                ) : null}
                
                <View style={{height: 100}} />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
       height: Dimensions.get('window').height
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
    pageheader: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      marginHorizontal: 0,
  },
});

export default HomeScreen;