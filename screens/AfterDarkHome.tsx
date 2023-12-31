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
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { eroticaTagsByGenreId } from '../src/graphql/queries';
import {graphqlOperation, API, Storage} from 'aws-amplify';

import ForYouAfterDark from '../components/lists/ForYouAfterDark';
import GenreTrending from '../components/lists/GenreTrending';
import NewGenreStories from '../components/lists/NewGenreStories';

const AfterDarkHome = ({navigation} : any) => {

//route params from the StoriesScreen to specifiy the genre
    const route = useRoute();
    const {genreID, genreName, genreColor, genreIcon, genreImage} = route.params

//get 2 trending tags in the genre
const [trendingTags, setTrendingTags] = useState([]);

//get the tags
    useEffect(() => {

        let Tags = []

        const fetchGenre = async () => {
            
                try {

                    const res = await API.graphql(
                            graphqlOperation(
                                eroticaTagsByGenreId, {
                                    genreId: genreID
                                } 
                            )
                        )

                        for (let i = 0; i < res.data.eroticaTagsByGenreId.items.length; i++) {
                            //if (Tags[0]?.id !== res.data.eroticaTagsByGenreId.items[i].eroticTag.id && Tags[1]?.id !== res.data.eroticaTagsByGenreId.items[i].eroticTag.id && Tags[2]?.id !== res.data.eroticaTagsByGenreId.items[i].eroticTag.id && Tags.length < 4) {
                                if (res.data.eroticaTagsByGenreId.items[i].eroticTag.count > 0 && Tags.length < 4) {
                                    Tags.push(res.data.eroticaTagsByGenreId.items[i].eroticTag)
                                }
                            //}
                        }

                        
                    
                    setTrendingTags(Tags);
                } catch (e) {
                    console.log(e);}
            
        }
        fetchGenre();
    }, [genreID])


    const GenreTag = ({id, tagName} : any) => {

        // const [imageU, setImageU] = useState('')
        // const [imageU2, setImageU2] = useState('')

        // useEffect(() => {
        //     const fetchImages = async () => {
        //         let response = await API.graphql(graphqlOperation(
        //             listStoryTags, {
        //                 filter: {
        //                     tagID: {
        //                         eq: id
        //                     }
        //                 }
        //             }
        //         )) 
        //         for (let i = 0; i < response.data.listStoryTags.items.length; i++) {
        //             if (imageU === '') {
        //                 if (response.data.listStoryTags.items[i]?.story.approved === true) {
        //                     let im = await Storage.get(response.data.listStoryTags.items[i]?.story.imageUri)
        //                     setImageU(im)
        //                 }
        //             }
        //             else if (imageU2 === '') {
        //                 if (response.data.listStoryTags.items[i]?.story.approved === true) {
        //                     let im2 = await Storage.get(response.data.listStoryTags.items[i]?.story.imageUri)
        //                     setImageU2(im2)
        //                 }
        //             }
        //         }  
        //     }
        //     fetchImages()
        // }, [])

        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AfterDarkTagSearch', {mainTag: id, tagName: tagName})}>
                <View style={{marginVertical: 10, marginRight: 10}}>
                    <Text style={styles.erotictagtext}>
                        #{tagName}
                    </Text>
                    {/* <View style={{marginTop: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Image 
                            source={{uri: imageU}}
                            style={{width: 60, height: 45, borderRadius: 8}}
                        />
                        <Image 
                            source={{uri: imageU2}}
                            style={{width: 60, height: 45, borderRadius: 8}}
                        />
                    </View> */}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const renderGenreTag = ({item}: any) => {
        return (
            <GenreTag 
                id={item.id}
                tagName={item.tagName}
            />
        )
    }


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[genreColor, '#212121', '#000', '#000',]}
                style={{height: '100%'}}
                start={{ x: 1, y: 1 }}
                end={{ x: 0.5, y: 0.5 }}
            >
               
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: getStatusBarHeight() + 80}}>
                    <View style={{ marginBottom: 20, marginHorizontal: 20, alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('AfterDarkSearch')}>
                        <View style={{alignItems: 'center', paddingHorizontal: 10, borderRadius: 8, flexDirection: 'row', backgroundColor: '#e0e0e0', height: 40, width: Dimensions.get('window').width - 40}}>
                            <FontAwesome5 
                            name='search'
                            color='#000000a5'
                            size={18}
                            />
                            <Text style={{marginLeft: 20, color: '#000000a5'}}>
                            Search stories, authors, tags
                            </Text>
                        </View>
                        </TouchableWithoutFeedback>
                    </View>
                        <ForYouAfterDark genreid={genreID}/>
                    </View>

                    <View style={{marginTop: 20}}>
                        
                        <View style={{}}>
                            <FlatList 
                                data={trendingTags}
                                keyExtractor={item => item.id}
                                renderItem={renderGenreTag}
                                scrollEnabled={false}
                                numColumns={2}
                                contentContainerStyle={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, }}
                                ListHeaderComponent={() => {
                                    return (
                                        <View style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                            <View style={{marginBottom: 0, flexDirection: 'row', alignItems: 'center'}}>
                                                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18, }}>
                                                    Popular Tags in 
                                                </Text>
                                                <Text style={{ marginLeft: 6, color: '#fff', fontWeight: 'bold', fontSize: 18, textTransform: 'capitalize'}}>
                                                    {genreName}
                                                </Text>
                                            </View>
                                            <FontAwesome5 
                                                name='chevron-right'
                                                color='#fff'
                                                size={17}
                                                style={{padding: 10, }}
                                                onPress={() => navigation.navigate('ViewAfterDarkTags', {genreRoute: genreID, genreName: genreName})}
                                            />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20}}>
                        <GenreTrending genreid={genreID}/>
                    </View>

                    <View style={{ marginTop: 0}}>
                        <NewGenreStories genreid={genreID}/>
                    </View>

                    <View style={{height: 40}}>

                        

                    </View>

                </ScrollView>
                <View style={{position: 'absolute', paddingTop: getStatusBarHeight() + 20, paddingBottom: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row',  width: Dimensions.get('window').width, backgroundColor: '#000000CC'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: getStatusBarHeight() + 10}}>
                            <FontAwesome5 
                                name='chevron-left'
                                size={22}
                                color='#fff'
                                style={{padding: 30, margin: -30, paddingLeft: 50}}
                                onPress={() => navigation.goBack()}
                            /> 
                            <Text style={{fontWeight: 'bold', marginLeft: 20, fontSize: 22, color: '#fff', textTransform: 'capitalize'}}>
                                {genreName}
                            </Text>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('BrowseGenre', {genreID: genreID, genreName: genreName})}>
                                <Text style={{marginRight: 20, color: '#fff'}}>
                                    Browse
                                </Text> 
                            </TouchableWithoutFeedback>
                            
                        </View>
                    </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    gradient: {
        height: 300
    },
    tagtext: {
        color: 'cyan',
        fontSize: 14,
        backgroundColor: '#1A4851a5',
        borderColor: '#00ffffa5',
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 13,
        textTransform: 'lowercase',
        overflow: 'hidden',
        marginBottom: 1
    },
    erotictagtext: {
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
    },
});

export default AfterDarkHome;