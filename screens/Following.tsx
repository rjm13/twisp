import React, {useState, useEffect} from 'react';
import { 
    View,
    Text,
    StyleSheet, 
    Dimensions, 
    Image, 
    TouchableWithoutFeedback, 
    FlatList, RefreshControl, 
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LinearGradient} from 'expo-linear-gradient';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { connectionsByFollower } from '../src/graphql/queries';

import useStyles from '../styles';


const FollowingScreen = ({navigation} : any) => {

    const styles = useStyles();

    const [ users, setUsers ] = useState([]);

    const [user, setUser] = useState({})

    const [didUpdate, setDidUpdate] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    //refresh function, does not work yet
    const onRefresh = () => {
        setIsFetching(true);
        //fetchUsers();
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

      const [nextToken, setNextToken] = useState()

//on render, get the user and then list the following connections for that user
    useEffect(() => {

        const fetchUser = async (nextToken : any) => {

            let Following = []

            const userInfo = await Auth.currentAuthenticatedUser();

                if (!userInfo) {return;}

            try {
                const userData = await API.graphql(graphqlOperation(
                    connectionsByFollower, {
                        nextToken,
                        followerID: userInfo.attributes.sub
                    }
                ))

                for (let i = 0; i < userData.data.connectionsByFollower.items.length; i++) {
                    Following.push(userData.data.connectionsByFollower.items[i].creator)  
                }
                
                if (userData.data.connectionsByFollower.nextToken) {
                    fetchUser(userData.data.connectionsByFollower.nextToken);
                }

                if (userData.data.connectionsByFollower.nextToken === null) {
                    setUsers(Following);
                }

              
            } catch (e) {
            console.log(e);
          }
        }
        fetchUser(null);
      }, [didUpdate])

    //legacy function for selected the state toggle between followers and following
    const [SelectedId, setSelectedId] = useState(1);

    //title item for the flatlist that displays the authors the user following
    const Item = ({ numAuthored, penName, imageUri, id, bio, type } : any) => {

        const [imageU, setImageU] = useState('')

        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri);
                if (response) {
                    setImageU(response)
                }
            }
            fetchImage();
        }, [])

    
        return (
            <View style={{backgroundColor: '#383838a5', marginHorizontal: 20, marginVertical: 10, padding: 20, borderRadius: 15,}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('CreatorScreen', {userID: id, status: 'publisher', rootChange: 'bottom', creatorType: type})}>
                        <View style={{ flexDirection: 'row'}}>
                            <Image 
                                source={ imageUri ? { uri: imageU} : require('../assets/blankprofile.png')}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'cyan'
                                }}
                            />
                        
                            <View style={{ marginHorizontal: 10}}>
                                <Text style={styles.paragraph}>
                                    {penName}
                                </Text> 
                                
                                
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='book-reader'
                                        size={12}
                                        color='#ffffffa5'
                                        style={{ marginRight: 5}}
                                    />
                                    <Text style={{fontSize: 12, color: '#ffffffa5', marginRight: 15, marginLeft: 5,}}>
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
    
    const renderItem = ({ item } : any) => (
    
        <Item 
            author={item}
            name={item.name}
            id={item.id}
            penName={item.penName}
            imageUri={item.imageUri}
            bio={item.bio}
            numAuthored={item.numAuthored}
            type={item.type}
        />
      );

    return (
    <View >
        <LinearGradient colors={['#363636', 'black', 'black']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 60, marginHorizontal: 20}}>
                    <TouchableWithoutFeedback onPress={ () => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'flex-end', marginHorizontal: 20,}}>
                <TouchableWithoutFeedback onPress={() => setSelectedId(1)}>
                    <Text style={{ 
                        color: SelectedId ===  1 ? '#fff' : '#ffffffa5',
                        marginHorizontal: 15, 
                        fontSize: SelectedId ===  1 ? 22 : 17,
                        fontWeight: SelectedId === 1 ? 'bold' : 'normal',
                        borderBottomColor: '#fff',
                        //borderBottomWidth: SelectedId ===  1 ? 1 : 0,
                    }}>
                        Following
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            </View>
            
          </View>
                <View style={{ alignItems: 'center', marginTop: 20, height: '86%'}}>
                    <FlatList
                        style={{ width: '100%' }}
                        data={users}
                        extraData={users}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        maxToRenderPerBatch={100}
                    initialNumToRender={100}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={onRefresh}
                            />
                        }
                        ListFooterComponent={() => {
                            return (
                                <View style={{height: 120}}/>
                            )
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: '#fff'}}>
                                        There is nothing here.
                                    </Text>
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

export default FollowingScreen;