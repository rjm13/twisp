import React, {useState, useEffect} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableWithoutFeedback, 
    ScrollView,
    FlatList,
    Dimensions,
} from 'react-native';

import {useRoute} from '@react-navigation/native'

import {LinearGradient} from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { eroticaTagsByGenreId } from '../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

const ViewAfterDarkTags = ({navigation} : any) => {

//route params from the StoriesScreen to specifiy the genre
    const route = useRoute();
    const {genreRoute, genreName} = route.params

    const [tags, setTags] = useState([])

    useEffect(() => {

        let tagsarr = []

        const fetchTags = async (nextToken : any) => {
            let response = await API.graphql(graphqlOperation(
                eroticaTagsByGenreId, {
                        nextToken,
                        genreId: genreRoute
                }
            ))

            for (let i = 0; i < response.data.eroticaTagsByGenreId.items.length; i++) {
                if (response.data.eroticaTagsByGenreId.items[i].eroticTag.count > 0) {
                    tagsarr.push(response.data.eroticaTagsByGenreId.items[i].eroticTag)
                }
                
            }

            if (response.data.eroticaTagsByGenreId.nextToken) {
                fetchTags(response.data.eroticaTagsByGenreId.nextToken)
            }

            if (response.data.eroticaTagsByGenreId.nextToken === null) {
                setTags(tagsarr)
            }
        }
        fetchTags(null);
    }, [])

  

    

    const Item = ({id, tagName, index} : any) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AfterDarkTagSearch', {mainTag: id, tagName: tagName})}>
               <View style={{margin: 8}}>
                    <Text style={{
                        color: 'magenta',
                        fontSize: 14,
                        backgroundColor: '#3C1A41a5',
                        borderColor: '#ff00ffa5',
                        borderWidth: 0.5,
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        borderRadius: 13,
                        textTransform: 'lowercase',
                        overflow: 'hidden',
                        marginBottom: 1
                        }}>
                        #{tagName}
                    </Text>
                </View> 
            </TouchableWithoutFeedback>
            
        )
    }

    const renderItem = ({item, index} : any) => {
        return (
            <Item 
                id={item.id}
                tagName={item.tagName}
                index={index}
            />
        )
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#212121', '#000', '#000',]}
                style={{height: '100%'}}
                start={{ x: 1, y: 1 }}
                end={{ x: 0.5, y: 0.5 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 
                                name='chevron-left'
                                size={22}
                                color='#fff'
                                style={{padding: 30}}
                                onPress={() => navigation.goBack()}
                            /> 
                            <Text style={{fontWeight: 'bold', fontSize: 22, color: '#fff', textTransform: 'capitalize'}}>
                                {genreName} Tags
                            </Text>
                        </View>
                    </View>

                    <View>
                        <FlatList 
                            data={tags}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            maxToRenderPerBatch={100}
                    initialNumToRender={100}
                            contentContainerStyle={{ flexWrap: 'wrap',width: Dimensions.get('window').width}}
                            horizontal={true}
                            ListFooterComponent={() => {
                                return (
                                    <View style ={{height: 100}}/>
                                )
                            }}
                        />
                    </View>

                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
});

export default ViewAfterDarkTags;