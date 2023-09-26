import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    Text, 
    FlatList,  
} from 'react-native';


import { AppContext } from '../../AppContext';
import HorzStoryTile from '../HorzStoryTile';

import { storiesByDate } from '../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';


const NewList = () => {

    const { nsfwOn } = useContext(AppContext);

    //fetch the stories for a specific genre for promoted carousel      
    const [stories, setStories] = useState([]);

    useEffect(() => {

        let arr = [];

        let count = 0;

        const fetchStorys = async (nextToken : any) => {
                
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            storiesByDate, {
                                type: 'Story',
                                sortDirection: 'DESC',
                                filter: {
                                    hidden: {
                                        eq: false
                                    },
                                    approved: {
                                        eq: true
                                    },
                                    imageUri: {
                                        attributeExists: true
                                    },
                                    nsfw: {
                                        ne: nsfwOn === true ? true : null
                                    }
                                }
                            } 
                        )
                    )

                    for (let i = 0; i < response.data.storiesByDate.items.length; i++ ) {
                        if (count < 10) {
                            arr.push(response.data.storiesByDate.items[i])
                            count++
                        }
                    }

                    if (count < 10 && response.data.storiesByDate.nextToken) {
                        fetchStorys(response.data.storiesByDate.nextToken);
                    }

                    if (count === 10) {
                        setStories(arr);
                    }

                    if (count < 10 && response.data.storiesByDate.nextToken === null) {
                        setStories(arr);
                    }

                    
                } catch (e) {
                    console.log(e);}
        }

        fetchStorys(null);

    },[])


    const renderItem = ({ item }: any) => {

        let icon = ''
        let genreName = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
        }
        
        return (
        <HorzStoryTile 
        title={item.title}
        imageUri={item.imageUri}
        genreName={genreName}
        icon={icon}
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
                    Brand New
                </Text>
            </View>
            <FlatList
                data={stories}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                maxToRenderPerBatch={8}
                ListFooterComponent={
                    <View style={{width: 60}}/>
                }
            />
        </View>

    );
}

export default NewList;