import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    FlatList, 
    Dimensions, 
    TouchableWithoutFeedback, 
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LinearGradient} from 'expo-linear-gradient';

import { useRoute } from '@react-navigation/native';

import { AppContext } from '../AppContext';
import StoryTile from '../components/StoryTile';


import { storyTagsByTagId } from '../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

const TagSearchScreen = ({navigation} : any) => {

//set the position of the audio player if the screen is full page
    const { nsfwOn } = useContext(AppContext);
    const { ADon } = useContext(AppContext);

    const route = useRoute();
    const {mainTag, tagName} = route.params

    //primary data set of searched stories for the flatlist
    const [searchedStories, setSearchedStories] = useState([])

    //on render, get the user and then list the following connections for that user. Using listStoryTags produces

    useEffect(() => {

        let stories = []

        const fetchTags = async (nextToken : any) => {
            let response = await API.graphql(graphqlOperation(
                storyTagsByTagId, {
                    nextToken,
                    tagId: mainTag,
                }
            ))
       
            for(let i = 0; i < response.data.storyTagsByTagId.items.length; i++) {
                if (response.data.storyTagsByTagId.items[i].story.type === 'Story') {
                   if (response.data.storyTagsByTagId.items[i].story.hidden === false) {
                        if (nsfwOn === false) {
                            if (ADon === false) {
                                stories.push(response.data.storyTagsByTagId.items[i].story)
                            } else {
                                stories.push(response.data.storyTagsByTagId.items[i].story)
                            }
                            
                        }
                        if (nsfwOn === true && response.data.storyTagsByTagId.items[i].story.nsfw === false) {
                            stories.push(response.data.storyTagsByTagId.items[i].story)
                        }  
                    } 
                }
                   
            }

            if (response.data.storyTagsByTagId.nextToken) {
                fetchTags(response.data.storyTagsByTagId.nextToken)
            }

            if (response.data.storyTagsByTagId.nextToken === null) {
                setSearchedStories(stories)
            }

        }
        fetchTags(null)
    }, [])


    const renderItem = ({ item } : any) => {
        
        let icon = ''
        let genreName = ''
        let primary = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.color
        }

        return (

      <StoryTile 
            title={item.title}
            imageUri={item.imageUri}
            genreName={genreName}
            icon={icon}
            primary={primary}
            audioUri={item.audioUri}
            summary={item.summary}
            author={item.author}
            narrator={item.narrator}
            time={item.time}
            id={item.id}
            ratingAvg={item.ratingAvg}
            ratingAmt={item.ratingAmt}
            numComments={item.numComments}
            numListens={item.numListens}
      />
    );}


    return (
        <View >
          <LinearGradient
          colors={['#363636','#000', '#000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{marginTop: 60, marginBottom: 10, marginHorizontal: 30}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                  <View style={{padding: 30, margin: -30}}>
                    <FontAwesome5 
                        name='chevron-left'
                        color='#fff'
                        size={20}
                    />
                  </View>
                </TouchableWithoutFeedback>
                
                <View style={{marginLeft: 40}}>
                    <Text style={{color: 'cyan', fontSize: 24 }}>
                        #{tagName}
                    </Text>
                </View>
                
            </View>
            <View style={{ flexDirection: 'row'}}>
            
            </View>
          </View>

            

            <View style={{ alignSelf: 'center',marginHorizontal: 0, height: '90%'}}>
              <FlatList 
                data={searchedStories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={searchedStories}
                showsVerticalScrollIndicator={false}   
                maxToRenderPerBatch={100}
                    initialNumToRender={100}
                ListFooterComponent={ () => {
                    return (
                        <View style={{ height:  150}}/>
                );}}
                ListHeaderComponent={ () => {
                    return (
                        <View style={{}}>
                            <Text style={{ width: Dimensions.get('window').width-40, fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                Stories
                            </Text>
                        </View>
                );}}
                ListEmptyComponent={ () => {
                    return (
                        <View style={{ height:  70, alignItems: 'center'}}>
                            <Text style={{ color: 'white', margin: 20,}}>
                                There are no stories for this tag.
                            </Text>
                        </View>
                );}}
            />
            </View>

        </LinearGradient>
        </View>
    );
}

export default TagSearchScreen;