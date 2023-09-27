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


import { eroticStoryTagsByEroticTagId } from '../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

const AfterDarkTagSearch = ({navigation} : any) => {

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
                eroticStoryTagsByEroticTagId, {
                    nextToken,
                    eroticTagId: mainTag,
                }
            ))

            for(let i = 0; i < response.data.eroticStoryTagsByEroticTagId.items.length; i++) {
                if (response.data.eroticStoryTagsByEroticTagId.items[i].story.type === 'EroticStory') {
                    if (response.data.eroticStoryTagsByEroticTagId.items[i].story.hidden === false) {
                        stories.push(response.data.eroticStoryTagsByEroticTagId.items[i].story)
                    }  
                }
                 
            }

            if (response.data.eroticStoryTagsByEroticTagId.nextToken) {
                fetchTags(response.data.eroticStoryTagsByEroticTagId.nextToken)
            }

            if (response.data.eroticStoryTagsByEroticTagId.nextToken === null) {
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
          colors={['#363636','#17171766', '#000']}
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
                    <Text style={{color: 'magenta', fontSize: 24 }}>
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
                initialNumToRender={20}
                maxToRenderPerBatch={20} 
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

export default AfterDarkTagSearch;