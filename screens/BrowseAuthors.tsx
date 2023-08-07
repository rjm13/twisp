import React, {useState, useEffect, useContext} from 'react';
import { 
    View,
    Text,
    StyleSheet, 
    Dimensions, 
    Image, 
    TouchableWithoutFeedback, 
    FlatList, 
    RefreshControl, 
    TouchableOpacity,
    Platform
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Searchbar } from 'react-native-paper';

import {LinearGradient} from 'expo-linear-gradient';
import { AppContext } from '../AppContext';

import { API, graphqlOperation, Storage } from "aws-amplify";
import { creatorsByType } from '../src/graphql/queries';

import {useRoute} from '@react-navigation/native'


const BrowseAuthor = ({navigation} : any) => {

    const { userFollowing } = useContext(AppContext);
    const { setUserFollowing } = useContext(AppContext);

    const [ users, setUsers ] = useState([]);

    const [user, setUser] = useState()

    const [didUpdate, setDidUpdate] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const [searchQ, setSearchQ] = useState('');

    const [following, setFollowing] = useState([]);

    const [nextToken, setNextToken] = useState(null)

    //route params from the StoriesScreen to specifiy the genre
    const route = useRoute();
    const {searchParam} = route.params

    useEffect(() => {
        setSearchQ(searchParam)
    }, [searchParam])

    //refresh function, does not work yet
    const onRefresh = () => {
        setIsFetching(true);
        setUsers([]);
        setNextToken(null)
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

          //array of authors that show from search results
    const [AuthorArray, setAuthorArray] = useState([]);
    const [authorToken, setAuthorToken] = useState(null);

    //fetch authors
    useEffect(() => {

        let arr = []
  
        let search = searchQ ? searchQ.toLowerCase() : null
  
        if (searchParam !== '') {
            const fetchAuthors = async () => {
                const authorResults = await API.graphql(graphqlOperation(
                    creatorsByType, {
                      authorToken,
                      type: "Author",
                      filter: {
                        penName: {
                          contains: search
                        }
                      }
                    }
                 
                ))
  
                setAuthorToken(authorResults.data.creatorsByType.nextToken)
  
                console.log(authorResults.data.creatorsByType)
  
                for (let i = 0; i < authorResults.data.creatorsByType.items.length; i++) {
                  arr.push(authorResults.data.creatorsByType.items[i])
                }
  
                if (authorResults.data.creatorsByType.nextToken) {
                  fetchAuthors();
                  return;
                }
                if (authorResults.data.creatorsByType.nextToken === null) {
                  setAuthorArray(arr)
                }
            }
            fetchAuthors();
        }
    },[didUpdate, searchQ])

      //search bar
      function SearchBar () {

        const [searchQuery, setSearchQuery] = useState(searchQ);
      
        const onChangeSearch = query  => setSearchQuery(query);
      
        return (
          <View>
            <Searchbar
              placeholder={'Search authors'}
              placeholderTextColor='#000000a5'
              onChangeText={onChangeSearch}
              value={searchQuery}
              iconColor='#000000a5'
              onIconPress={() => {setSearchQ(searchQuery); setNextToken(null); setAuthorArray([]); setDidUpdate(!didUpdate);}}
              onSubmitEditing={() => {setSearchQ(searchQuery); setNextToken(null); setAuthorArray([]); setDidUpdate(!didUpdate);}}
              style={{
                height: 40,
                marginLeft: 40,
                borderRadius: 8,
                backgroundColor: '#e0e0e0',
                width: Dimensions.get('window').width - 100,
              }}
              inputStyle={{fontSize: 14, alignItems: 'center', backgroundColor: 'transparent', alignSelf: 'center', height: 40 }}
            />
          </View>
        );
      };

    //title item for the flatlist that displays the authors the user following
    const Item = ({ numAuthored, penName, imageUri, id, bio } : any) => {

        const [imageU, setImageU] = useState()
        
        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri);
                setImageU(response);
            }
            fetchImage()
        }, [])

        //on item render, determine if the user is following them or not
       const [isFollowing, setIsFollowing] = useState(false)
        
        //list the following connections that contain the current user and the selected author to determine if there is a following connection
        useEffect(() => {
            const fetchInfo = async () => {

            if (userFollowing.includes(id)) {
                setIsFollowing(true)
            };    
            }
            fetchInfo();
        }, [])
        
        return (
            <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('CreatorScreen', {userID: id})}>
                        <View style={{ flexDirection: 'row'}}>
                            <Image 
                                source={ imageUri ? { uri: imageU} : require('../assets/blankprofile.png')}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'gray'
                                }}
                            />
                        
                            <View style={{ marginHorizontal: 10, width: '78%'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={styles.name}>
                                        {penName}
                                    </Text> 
                                    {isFollowing === true ? (
                                        <FontAwesome5 
                                            name='check-double'
                                            size={12}
                                            color='cyan'
                                            style={{ marginRight: 0}}
                                        />
                                    ) : null}
                                </View>
                                
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='book-open'
                                        size={12}
                                        color='#ffffffa5'
                                        style={{ marginRight: 5}}
                                    />
                                    <Text style={styles.userId}>
                                        {numAuthored === null ? 0 : numAuthored}
                                    </Text> 
                                </View> 
                            </View>
                        </View>
                    </TouchableWithoutFeedback>    
                </View>    
    
                <View style={{marginTop: 10, marginHorizontal: 5}}>
                    <Text style={{color: "#fff", fontSize: 12, }}>
                        {bio}
                    </Text>
                </View>
               
            </View>
        );
    }
    
    const renderItem = ({ item } : any) => {

        return (
            <Item 
                name={item.name}
                id={item.id}
                penName={item.penName}
                imageUri={item.imageUri}
                bio={item.bio}
                numAuthored={item.numAuthored}
            />
        )   
    }
    
    return (

    <View >
        <LinearGradient colors={['#363636', 'black', 'black']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View>
                <View style={{ width: Dimensions.get('window').width, flexDirection: 'row', alignItems: 'center', marginTop: 60, marginHorizontal: 20}}>
                    <TouchableWithoutFeedback onPress={ () => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                  
                    <SearchBar />

                </View>
          </View>
                <View style={{ alignItems: 'center', marginTop: 20, height: '84%'}}>
                    <FlatList
                        style={{ width: '100%' }}
                        data={AuthorArray}
                        extraData={AuthorArray}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        initialNumToRender={20}
                        maxToRenderPerBatch={20}
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={() => {
                            return (
                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: '#fff'}}>
                                        There is nothing here. Check your internet connection.
                                    </Text>
                                </View>
                            )
                        }}
                        ListFooterComponent={() => {
                            return (
                                <View style={{ height:  150, alignItems: 'center', marginTop: 40}}>
                                    <TouchableOpacity onPress={() => setDidUpdate(!didUpdate)}>
                                        <Text style={{color: '#fff'}}>
                                            {nextToken ? 'Load More' : null}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>

        </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width, 
     },
     tile: {
         backgroundColor: '#383838a5',
         marginHorizontal: 20,
         marginVertical: 10,
         padding: 20,
         borderRadius: 15,
     },
     name: {
         fontSize: 16,
         fontWeight: 'bold',
         color: '#fff',
         textTransform: 'capitalize'
     },
     userId: {
         fontSize: 12,
         color: '#ffffffa5',
         marginRight: 15,
         marginLeft: 5,
     },
     popupblock: {
         marginTop: 10,
     },
     paragraph: {
         color: '#ffffffa5'
     },
     playbutton: {
         borderWidth: 0.3,
         paddingHorizontal: 15,
         paddingVertical: 3,
         borderRadius: 15,
         borderColor: '#fff',
         color: '#fff',
     },
     time: {
         fontSize: 16,
         fontWeight: 'normal',
         color: '#ffffffa5',
     },
     category: {
         fontSize: 12,
         color: 'cyan',
         fontStyle: 'italic',
         marginVertical: 3,
 
     },
});

export default BrowseAuthor;