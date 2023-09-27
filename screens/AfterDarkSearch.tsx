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

import StoryTile from '../components/StoryTile';
import { AppContext } from '../AppContext';

import {storiesByTitleLower, storiesByTitle, listEroticTags, creatorsByType } from '../src/graphql/queries';
import {graphqlOperation, API, Storage} from 'aws-amplify';

const AfterDarkSearch = ({navigation} : any) => {

  //nsfw global app context
    const { nsfwOn } = useContext(AppContext);
    const { ADon } = useContext(AppContext);

  //search function states
    const [newSearch, setNewSearch] = useState('');

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
              placeholder={'Search stories, tags'}
              placeholderTextColor='#000000a5'
              //autoComplete={true}
              onChangeText={onChangeSearch}
              onIconPress={() => {setNewSearch(searchQuery); setSearchedStories([]); setDidUpdate(!didUpdate); }}
              onSubmitEditing={() => {setNewSearch(searchQuery); setSearchedStories([]); setDidUpdate(!didUpdate);}}
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
                width: Dimensions.get('window').width - 80,
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

    let arr = [];

      if (newSearch !== '') {
          const fetchTags = async (nextToken : any) => {
              const tagResults = await API.graphql(graphqlOperation(
                  listEroticTags, {
                      nextToken,
                      filter: {
                          tagName: {
                              contains: search
                          },
                      }
                  }
              ))

              for (let i = 0; i < tagResults.data.listEroticTags.items.length; i++) {
                arr.push(tagResults.data.listEroticTags.items[i])
              }

              if (tagResults.data.listEroticTags.nextToken) {
                fetchTags(tagResults.data.listEroticTags.nextToken);
              }

              if (tagResults.data.listEroticTags.nextToken === null) {
                setTagsArray(arr)
              }
              
          }
          fetchTags(null);
      }
  },[didUpdate])

    //fetch authors
    useEffect(() => {

      let arr = []

      let count = 0;

      let search = newSearch ? newSearch.toLowerCase() : null

      console.log('search is', search)

          const fetchAuthors = async (nextToken : any) => {
              const authorResults = await API.graphql(graphqlOperation(
                  creatorsByType, {
                    nextToken,
                    type: "Author",
                    filter: {
                      penNameLowerCase: {
                        contains: search
                      }
                    }
                  }
               
              ))

              for (let i = 0; i < authorResults.data.creatorsByType.items.length; i++) {
                if (count < 3) {
                  arr.push(authorResults.data.creatorsByType.items[i])
                  count++
                }
              }

              if (authorResults.data.creatorsByType.nextToken && count < 3) {
                fetchAuthors(authorResults.data.creatorsByType.nextToken)
              }

              if (authorResults.data.creatorsByType.nextToken === null) {
                setAuthorArray(arr)
              }

              if (count === 3 ) {
                setAuthorArray(arr)
              }
          }
          fetchAuthors(null);
      
  },[didUpdate])

   // const [nextToken, setNextToken] = useState(null)

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

      let search = newSearch ? newSearch.toLowerCase() : ''

      let arr = [];

    const fetchStories = async (nextToken : any) => {

          if (search?.length > 1 ) {

          try {

            const searchResults = await API.graphql(graphqlOperation(
              storiesByTitle, {
                nextToken,
                type: 'EroticStory',
                titleLowerCase: {
                  beginsWith: search
                },
                filter: {
                  approved: {
                    eq: true
                  },
                  hidden: {
                    eq: false
                  },
                  nsfw: {
                    ne: nsfwOn === true ? true : null
                  },
                }
              }
            ))

              // const searchResults = await API.graphql(graphqlOperation(
              //     listStories, {
              //         nextToken,
              //         filter: {
              //           or: [
              //             {title: {
              //                 contains: newSearch
              //             },
              //             type: {
              //               eq: 'Story'
              //             },
              //             approved: {
              //                 eq: true
              //             },
              //             hidden: {
              //                 eq: false
              //             },
              //             nsfw: {
              //               ne: nsfwOn === true ? true : null
              //             }
              //           },
              //             {summary: {
              //               contains: newSearch
              //               },
              //               type: {
              //                 eq: 'Story'
              //               },
              //               approved: {
              //                   eq: true
              //               },
              //               hidden: {
              //                   eq: false
              //               },
              //               nsfw: {
              //                 ne: nsfwOn === true ? true : null
              //               }
              //           }
              //           ]
              //         }
              // }))

            for (let i = 0; i < searchResults.data.storiesByTitle.items.length; i++) {
                  arr.push(searchResults.data.storiesByTitle.items[i])
                }
              
            if (searchResults.data.storiesByTitle.nextToken) {
              fetchStories(searchResults.data.storiesByTitle.nextToken)
            }

            if (searchResults.data.storiesByTitle.nextToken === null) {
              setSearchedStories(arr);
            }
              

          } catch (e) {
          console.log(e);
        }
      } else {
        return;
      }
    }

    const fetchMoreStories = async (nextToken : any) => {
        const searchResultsTwice = await API.graphql(graphqlOperation(
          storiesByTitleLower, {
            nextToken,
            type: 'EroticStory',
            titleLowerCaseNoThe: {
              beginsWith: search
            },
            filter: {
              approved: {
                eq: true
              },
              hidden: {
                eq: false
              },
              nsfw: {
                ne: nsfwOn === true ? true : null
              },
            }
        }))

        for (let i = 0; i < searchResultsTwice.data.storiesByTitleLower.items.length; i++) {
          arr.push(searchResultsTwice.data.storiesByTitleLower.items[i])
        }

        if (searchResultsTwice.data.storiesByTitleLower.nextToken) {
          fetchMoreStories(searchResultsTwice.data.storiesByTitleLower.nextToken)
        }

        if (searchResultsTwice.data.storiesByTitleLower.nextToken === null) {
          setSearchedStories(arr);
        }
    
    }
    
    fetchStories(null); 

    if (search.startsWith('the ' || search.startsWith('a '))) {
      fetchMoreStories(null)
    }
    
    }, [didUpdate])

    const renderItem = ({ item } : any) => {
        
        let icon = ''
        let genreName = ''
        let primary = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.PrimaryColor
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
          <LinearGradient colors={['#13192Ca5', '#161616', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>

          <View style={{marginTop: 60, marginBottom: 10, marginHorizontal: 20}}>
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
                            {/* <TouchableOpacity onPress={() => setDidUpdate(!didUpdate)}>
                              <Text style={{color: '#fff'}}>
                                {nextToken ? 'Load More' : null}
                              </Text>
                            </TouchableOpacity> */}
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
                                                    <TouchableOpacity onPress={() => navigation.navigate('AfterDarkTagSearch', {mainTag: id, tagName: tagName})}>
                                                        <View style={{}}>
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
                                                            style={{height: 60, width: 60, borderRadius: 10}}
                                                          />
                                                          <View style={{marginLeft: 10}}>
                                                            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', width: Dimensions.get('window').width*0.66}}>
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
                                                            
                                                            <Text numberOfLines={3} style={{flexWrap: 'wrap', width: Dimensions.get('window').width*0.66, marginTop: 4, color: '#fff', fontSize: 12, fontWeight: '300'}}>
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

export default AfterDarkSearch;