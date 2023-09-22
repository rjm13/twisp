import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Dimensions,
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    ScrollView,
    Image,
    InteractionManager
} from 'react-native';

import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LinearGradient} from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import StoryTile from '../components/StoryTile';
import { AppContext } from '../AppContext';

import {listStories, listTags, creatorsByType } from '../src/graphql/queries';
import {graphqlOperation, API, Storage} from 'aws-amplify';

const SearchScreen = ({navigation} : any) => {

  //nsfw global app context
    const { nsfwOn } = useContext(AppContext);

  //search function states
    const [newSearch, setNewSearch] = useState();

    //search function trigger that refreshes the search results
    const [didUpdate, setDidUpdate] = useState(false);

    const [tagUpdate, setTagUpdate] = useState(null);
    

    //focus the keyboard only on initial render
    const focus = useRef(null)

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
        focus.current.focus()
      });
    }, [])

  //this is the search bar
    function SearchBar () {

        const [searchQuery, setSearchQuery] = useState('');

        const onChangeSearch = (query : any)  => setSearchQuery(query); 

        return (
          <View>
            <Searchbar
              placeholder={'Stories, authors, tags'}
              placeholderTextColor='#000000a5'
              //autoComplete={true}
              onChangeText={onChangeSearch}
              onIconPress={() => {setNewSearch(searchQuery); setSearchedStories([]); setNextToken(null); setDidUpdate(!didUpdate); }}
              onSubmitEditing={() => {setNewSearch(searchQuery); setSearchedStories([]); setNextToken(null); setDidUpdate(!didUpdate);}}
              value={searchQuery}
              ref={focus}
              maxLength={20}
              icon={() => {return(
                <FontAwesome5 
                  name='search'
                  color='#000000a5'
                  size={18}
                />)}}
              iconColor='#000000a5'
              style={{
                height: 40,
                marginLeft: 20,
                borderRadius: 8,
                backgroundColor: '#e0e0e0',
                width: Dimensions.get('window').width - 70,
              }}
              inputStyle={{fontSize: 14, alignItems: 'center', backgroundColor: 'transparent', alignSelf: 'center', height: 40 }}
            />
          </View>
        );
      };

    //primary data set of searched stories for the flatlist
    const [searchedStories, setSearchedStories] = useState([])

    //array of tags that show from search results
    const [TagsArray, setTagsArray] = useState([]);
    const [tagToken, setTagToken] = useState(null);

    //array of authors that show from search results
    const [AuthorArray, setAuthorArray] = useState([]);
    const [authorToken, setAuthorToken] = useState(null);

//fetch tags
    useEffect(() => {

      let search = newSearch ? newSearch.toLowerCase() : null

        if (newSearch !== '') {
            const fetchTags = async () => {
                const tagResults = await API.graphql(graphqlOperation(
                    listTags, {
                        tagToken,
                        filter: {
                            tagName: {
                                contains: search
                            },
                        }
                    }
                ))
                //setTagToken(tagResults.data.listTags.nextToken)
                setTagsArray(tagResults.data.listTags.items)
            }
            fetchTags();
        }
    },[didUpdate])

    //fetch authors
    useEffect(() => {

      let arr = []

      let search = newSearch ? newSearch.toLowerCase() : null

      if (newSearch !== '') {
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
  },[didUpdate])

    const [nextToken, setNextToken] = useState(null)

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

      let search = newSearch ? newSearch.toLowerCase() : null

      const fetchStories = async () => {

          if (search?.length > 2 ) {

          try {

              const searchResults = await API.graphql(graphqlOperation(
                  listStories, {
                      nextToken,
                      filter: {
                        or: [
                          {title: {
                              contains: newSearch
                          },
                          type: {
                            eq: 'Story'
                          },
                          approved: {
                              eq: true
                          },
                          hidden: {
                              eq: false
                          },
                          nsfw: {
                            ne: nsfwOn === true ? true : null
                          }
                        },
                          {summary: {
                            contains: newSearch
                            },
                            type: {
                              eq: 'Story'
                            },
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
                        ]
                      }
              }))
              
              setNextToken(searchResults.data.listStories.nextToken)
              
              setSearchedStories(searchedStories.concat(searchResults.data.listStories.items));

          } catch (e) {
          console.log(e);
        }
      } else {
        return;
      }
    }
        fetchStories(); 
    
    }, [didUpdate])

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
            numListens={item.numListens}
            numComments={item.numComments}
      />
    );}


    return (
        <View >
          <LinearGradient colors={['#13192Ca5', '#161616', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>

          <View style={{marginTop: getStatusBarHeight() + 20, marginBottom: 10, marginHorizontal: 20}}>
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
                
                <SearchBar />
                
            </View>
            <View style={{ flexDirection: 'row'}}>
            
            </View>
          </View>

            

            <View style={{ alignSelf: 'center',marginHorizontal: 0, height: '90%'}}>
              <FlatList 
                data={searchedStories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={searchedStories}
                showsVerticalScrollIndicator={false}   
                initialNumToRender={10}
                maxToRenderPerBatch={10} 
                ListFooterComponent={ () => {
                    return (
                        <View style={{ height:  150, alignItems: 'center', marginTop: 40}}>
                            <TouchableOpacity onPress={() => setDidUpdate(!didUpdate)}>
                              <Text style={{color: '#fff'}}>
                                {nextToken ? 'Load More' : null}
                              </Text>
                            </TouchableOpacity>
                        </View>
                );}}
                ListHeaderComponent={ () => {
                    return (
                        <View style={{}}>
                            {TagsArray.length > 0 ? (
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                        Tags
                                    </Text>
                                    <View>
                                        <ScrollView style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20, paddingBottom: 1}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {TagsArray.map(({ tagName, id, genreID, nsfw } : any, index) => (
                                                <View key={id} style={{marginTop: 10, marginRight: 10}}>
                                                    <TouchableOpacity onPress={() => navigation.navigate('TagSearchStack', {mainTag: id, tagName: tagName})}>
                                                        <View style={{}}>
                                                            <Text style={{color: nsfw === true ? 'red' : 'cyan',
                                                              fontSize: 14,
                                                              backgroundColor: nsfw === true ? '#371111a5' :'#1A4851a5',
                                                              borderColor: nsfw === true ? '#ff0000a5' : '#00ffffa5',
                                                              borderWidth: 0.5,
                                                              paddingHorizontal: 16,
                                                              paddingVertical: 6,
                                                              overflow: 'hidden',
                                                              borderRadius: 14}}>
                                                                #{tagName}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </ScrollView>

                                          <TouchableOpacity onPress={() => setTagUpdate(!tagUpdate)}>
                                            <View style={{alignItems: 'center', marginTop: 10}}>
                                              <Text style={{color: '#fff'}}>
                                                 {tagToken === null ? '' : 'Load More'}
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            ) : null}

                            {AuthorArray.length > 0 ? (
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                        Authors
                                    </Text>
                                    <View>
                                        <ScrollView style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20, paddingBottom: 1}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {AuthorArray.map(({ id, penName, bio, imageUri, numAuthored, type } : any, index) => {
                                              //temporary signed image uri
                                              const [imageU, setImageU] = useState('')
                                                
                                              //push the s3 image key to get the signed uri
                                                  useEffect(() => {
                                                      const fetchImage = async () => {
                                                          let response = await Storage.get(imageUri);
                                                          if (response) {
                                                            setImageU(response);
                                                          }
                                                          
                                                      }
                                                      fetchImage()
                                                  }, []) 

                                              return (
                                                <View key={id} style={{marginTop: 10, marginRight: 10, marginBottom: 20}}>
                                                    <TouchableOpacity onPress={() => navigation.navigate('CreatorScreen', {userID: id, rootChange: 'bottom', creatorType: type})}>
                                                        <View style={{flexDirection: 'row'}}>
                                                          <Image 
                                                            source={imageUri ? {uri: imageU} : require('../assets/blankprofile.png')}
                                                            style={{height: 100, width: 100, borderRadius: 10}}
                                                          />
                                                          <View style={{marginLeft: 10}}>
                                                            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', width: Dimensions.get('window').width*0.55}}>
                                                              <Text numberOfLines={1} style={{color: '#fff', fontSize: 16, fontWeight: '700', flexWrap: 'wrap'}}>
                                                                {penName}
                                                              </Text>
                                                              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 6}}>
                                                                <FontAwesome5 name='book-open' size={12} color='#ffffffa5' style={{marginLeft: 6}}/>
                                                                <Text numberOfLines={1} style={{marginLeft: 6, color: '#ffffffa5', fontSize: 12, fontWeight: '300', flexWrap: 'wrap'}}>
                                                                  {numAuthored}
                                                                </Text>
                                                              </View>
                                                              
                                                            </View>
                                                            
                                                            <Text numberOfLines={5} style={{flexWrap: 'wrap', width: Dimensions.get('window').width*0.54, marginTop: 4, color: '#fff', fontSize: 12, fontWeight: '300'}}>
                                                              {bio}
                                                            </Text>
                                                          </View>
                                                            
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            )}
                                        </ScrollView>

                                          <TouchableOpacity onPress={() => navigation.navigate('BrowseAuthor', {searchParam: newSearch})}>
                                            <View style={{alignItems: 'center', marginTop: 10}}>
                                              <Text style={{color: '#fff', fontWeight: '700'}}>
                                                 See more results
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            ) : null}
                            {searchedStories.length > 0? (
                                <Text style={{ width: Dimensions.get('window').width-40, fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                    Stories
                                </Text>
                            ) : null}
                            
                        </View>
                );}}
                ListEmptyComponent={ () => {
                    return (
                        <View style={{ height:  70}}>
                        </View>
                );}}
            />
            </View>

        </LinearGradient>
        </View>
    );
}

export default SearchScreen;