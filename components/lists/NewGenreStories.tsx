import React, {useState, useEffect, useContext} from 'react';
import { 
    View,
    Text, 
    FlatList, 
} from 'react-native';

import { AppContext } from '../../AppContext';
import HorzStoryTile from '../HorzStoryTile';

import { storiesByGenre } from '../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';


const NewGenreStories = ({genreid} : any) => {

    const { nsfwOn } = useContext(AppContext);

//fetch the stories for a specific genre for promoted carousel      
    const [tagStories, setTagStories] = useState([]);

    useEffect(() => {

        let arr = [];

        let count = 0;

        const fetchStorys = async (nextToken : any) => {
                
            if (genreid) {
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            storiesByGenre, {
                                nextToken,
                                genreID: genreid,
                                sortDirection: 'DESC',
                                filter: {
                                    approved: {
                                        eq: true
                                    },
                                    hidden: {
                                        eq: false
                                    },
                                    nsfw: {
                                        ne: nsfwOn === true ? true : null
                                    }
                                }
                            } 
                        )
                    )

                    for (let i = 0; i < response.data.storiesByGenre.items.length; i++) {
                        if (count < 10) {
                            arr.push(response.data.storiesByGenre.items[i])
                            count++
                        }
                    }

                    if (count < 10 && response.data.storiesByGenre.nextToken) {
                        fetchStorys(response.data.storiesByGenre.nextToken)
                    }

                    if (count === 10) {
                        setTagStories(response.data.storiesByGenre.items.splice(0,9));
                    }

                    if (count < 10 && response.data.storiesByGenre.nextToken === null) {
                        setTagStories(response.data.storiesByGenre.items.splice(0,9));
                    }


                    
                } catch (e) {
                    console.log(e);}
            }
        }

        fetchStorys(null);

    },[genreid])


    const renderItem = ({ item }: any) => {

        let icon = ''
        let genreName = ''
        let primary = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.color
        }
        
        return (
        <HorzStoryTile 
          title={item.title}
          imageUri={item.imageUri}
          genreName={null}
          icon={icon}
          primary={primary}
          audioUri={item.audioUri}
          summary={item.summary}
          author={item.author}
          narrator={item.narrator}
          time={item.time}
          id={item.id}
          ratingAvg={item.ratingAvg}
          numComments={item.numComments}
          numListens={item.numListens}
        />
      );}

    return (

        <View>
            <View style={{marginBottom: 0, marginLeft: 20}}>
                <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                    Recently Added
                </Text>
            </View>
            <FlatList
                data={tagStories}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={
                    <View style={{width: 60}}>
                    </View>
                }
            />
        </View>

    );
}

export default NewGenreStories;