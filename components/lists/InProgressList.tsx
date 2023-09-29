import React, {useState, useEffect} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    FlatList, 
    Dimensions, 
    RefreshControl, 
    ActivityIndicator,
} from 'react-native';

import StoryTile from '../../components/StoryTile';

import { inProgressStoriesByUser } from '../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';


const InProgressList = () => {


//state for the array of pinned stories for that user
    const [inProgressStories, setInProgressStories] = useState([])

//update trigger for fetching the pinned stories
    const [didUpdate, setDidUpdate] = useState(false);

    const [nextToken, setNextToken] = useState()

    useEffect(() => {

        const InProgress = []

        const fetchStories = async (nextToken : any) => {

            setIsLoading(true);

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const progressData = await API.graphql(graphqlOperation(
                    inProgressStoriesByUser, {nextToken, userID: userInfo.attributes.sub}))

                if (progressData.data.inProgressStoriesByUser.items.length > 0) {
                    for (let i = 0; i < progressData.data.inProgressStoriesByUser.items.length; i++) {
                        InProgress.push(progressData.data.inProgressStoriesByUser.items[i])  
                    }    
                }

                if (progressData.data.inProgressStoriesByUser.nextToken) {
                    fetchStories(progressData.data.inProgressStoriesByUser.nextToken);
                }

                if (progressData.data.inProgressStoriesByUser.nextToken === null) {
                    setInProgressStories(InProgress);
                }
                   
                setIsLoading(false);
              
            } catch (e) {
            console.log(e);
          }
        }
           fetchStories(null); 
      }, [didUpdate])


    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

      const renderItem = ({ item }: any) => {

        let percent = Math.ceil((item.time/item.story.time)*100).toString()

        let genreName = ''
        let primary = ''

        if (item.story.genre) {
            genreName = item.story.genre.genre
            primary = item.story.genre.color
        }
        
        return (
        <View style={{}}>
           <StoryTile 
                title={item.story.title}
                imageUri={item.story.imageUri}
                genreName={genreName}
                primary={primary}
                audioUri={item.story.audioUri}
                summary={item.story.summary}
                author={item.story.author}
                narrator={item.story.narrator}
                time={item.story.time}
                id={item.story.id}
                ratingAvg={item.story.ratingAvg}
                ratingAmt={item.story.ratingAmt}
                numComments={item.story.numComments}
                numListens={item.story.numListens}
            /> 
            <View style={{width: Dimensions.get('window').width - 50, marginBottom: 20}}>
                <View style={{width:  percent +'%', height: 1, backgroundColor: '#00ffff', marginLeft: 26, marginTop: -4, alignSelf: 'flex-start'}}/>
               <View style={{marginHorizontal: 20, marginTop: 6, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'gray'}}>
                    {Math.floor((item.time/item.story.time)*100) + '%'} Complete
                </Text>
                <Text style={{color: 'gray', marginRight: -50}}>
                    {Math.floor(((item.story.time-item.time)/60)/1000)} minutes left
                </Text>
            </View>
            </View>
            
        </View>
        
      );}

      const [isLoading, setIsLoading] = useState(false);

    return (
            <View style={styles.container}>

                <FlatList 
                    data={inProgressStories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={inProgressStories}
                    maxToRenderPerBatch={20}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                            <View style={{ height:  120, alignItems: 'center'}}/>
                    );}}
                    ListHeaderComponent={ () => {
                        return (
                            <View style={{ height:  40, alignItems: 'center'}}/>
                    );}}
                    ListEmptyComponent={ () => {
                        return (
                            <View>
                                {isLoading === true ? (
                                <View style={{margin: 30}}>
                                    <ActivityIndicator size='small' color='cyan' />
                                </View>
                                ) : (
                                <View>
                                    <Text style={{ color: 'white', margin: 20, textAlign: 'center'}}>
                                        There is nothing here! Go listen to some stories!
                                    </Text>
                                    <Text style={{ color: '#ffffffa5', margin: 20, textAlign: 'center'}}>
                                        (pull to refresh)
                                    </Text>
                                </View>
                                
                                )}
                            </View>
                    );}}
                />

            </View>

    );
}

const styles = StyleSheet.create({
    container: {
       width: Dimensions.get('window').width, 
    },
    tile: {
        backgroundColor: '#363636a5',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
        borderRadius: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flexWrap: 'wrap',
        width: 225,
    },
    userId: {
        fontSize: 12,
        color: '#ffffffa5',
        marginRight: 15,
        marginLeft: 5,
    },
    icontext: {
        fontSize: 10,
        color: '#ffffffa5',
        marginTop: 5,
    },
    popupblock: {
        marginTop: 10,
    },
    paragraph: {
        color: '#ffffffB3'
    },
    playbutton: {
        borderWidth: 0.5,
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 15,
        borderColor: '#ffffffa5',
        color: '#ffffffa5',
    },
    time: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffffa5',
        marginHorizontal: 5,
    },
    category: {
        fontSize: 14,
        color: 'gray',
        //fontStyle: 'italic',
        marginVertical: 3,
        textTransform: 'capitalize'

    },

});

export default InProgressList;