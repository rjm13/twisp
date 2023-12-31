import React, {useState, useEffect, useContext} from 'react';

import { 
  StyleSheet, 
  Dimensions, 
  TouchableWithoutFeedback,
  TouchableOpacity, 
  View, 
  Text, 
  Image,
  FlatList,
  ScrollView,
  ImageBackground
} 
from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LinearGradient} from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
//import useStyles from '../styles';

import { AppContext } from '../AppContext';

import { listGenres, tagsByUpdated, inProgressStoriesByUser } from '../src/graphql/queries';
import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';

import AnimatedGradient, {presetColors} from '../components/functions/AnimatedGradient';


const AudioStoryHome = ({navigation} : any) => {

  //const styles = useStyles();

  //nsfw and after dark global app context
  const { nsfwOn } = useContext(AppContext);
  const { ADon } = useContext(AppContext);
  const { progUpdate } = useContext(AppContext);

  //genre array state
  const [genres, setGenres] = useState([]);

  const LoadingItem = ({width, height, radius} : any) => {
    return (
        <View style={{
            width: width,
            height: height,
            borderRadius: radius,
            margin: 10
        }}>
            <AnimatedGradient customColors={presetColors.loading} speed={2000} />
        </View>
    )
}
    
//fetch the genres
  useEffect(() => {

    let genrearray = []

    const fetchGenres = async () => {
        
      const result = await API.graphql(graphqlOperation(listGenres))

      if (result) {
        genrearray = result.data.listGenres.items
        setGenres(genrearray.sort((a, b) => b.genre.localeCompare(a.genre)))
      }

    }

    fetchGenres();
    

  }, [])

  //genre tile item should show genre name, color, and image
  const Item = ({genre, id, color, imageUri, icon} : any) => {

    const [imageU, setImageU] = useState('');

    useEffect(() => {
      const fetchImage = async () => {
          let response = await Storage.get(imageUri)
          if (response) {
              setImageU(response)
          }

      }
      fetchImage();
  }, [])

    //state that locks the after dark tile
    const [locked, setIsLocked] = useState(false);

    useEffect(() => {
      if (ADon === true && genre === 'after dark') {
        setIsLocked(true)
      }
      if (nsfwOn === true && genre === 'after dark') {
        setIsLocked(true)
      }
    }, [nsfwOn, ADon])

    return (
      <TouchableWithoutFeedback onPress = {() => locked === false ? (genre === 'after dark' ? (navigation.navigate('AfterDarkHome', {genreID: id, genreName: genre, genreIcon: icon, genreColor: color, genreImage: imageUri})) : (navigation.navigate('GenreHome', {genreID: id, genreName: genre, genreIcon: icon, genreColor: color, genreImage: imageUri}))) : alert('Go to your settings to unlock this content.')}>
        <View style={{
          flexDirection: 'row', height: 100, overflow: 'hidden', borderRadius: 15, alignItems: 'center', marginVertical: 10, width: Dimensions.get('window').width-40, alignSelf: 'center'}}>
            {imageU ? (
              <ImageBackground
                source={{ uri: imageU}}
                style={{borderRadius: 15, width: '100%', height: '100%', position: 'absolute', backgroundColor: 'gray', right: 0}}
              />
            ) : null}

              {/* <LinearGradient 
                colors={[color, color, color, color, 'transparent']}
                locations={[0.0, 0.33, 0.66, 0.7, 1.0]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.genrebox]}
              > */}
                <View style={{justifyContent: 'center', borderRadius: 15, backgroundColor: locked === true ? '#363636a5' : 'transparent', width: '100%', height: '100%'}}>
                  <Text style={styles.genre}>
                    {genre}
                  </Text>
                  {locked === true ? (
                    <FontAwesome5 
                      name='lock'
                      size={20}
                      color='gray'
                      style={{alignSelf: 'center', position: 'absolute'}}
                    />
                  ) : null}
                  
                </View>
              {/* </LinearGradient> */}
          </View>
        </TouchableWithoutFeedback>
    );
  }
    
  const renderItem = ({ item, index } : any) => {

    return (
      <Item 
          id={item.id}
          genre={item.genre}
          color={item.color}
          imageUri={item.imageUri}
          index={index}
      />
    );
  }

  //popular tags list data set
  const [tags, setTags] = useState([])

//list the most popular tags by the order they were last updated
  useEffect(() => {

    let tagsarr = []

    const fetchTags = async () => {
      
      const result = await API.graphql(graphqlOperation(
        tagsByUpdated, {
          type: 'Tag',
          sortDirection: 'DESC',
          filter: {
            count: {
              gt: 0
            }
          }
      }))

      for (let i = 0; i < result.data.tagsByUpdated.items.length; i++) {
        if (tagsarr.length < 15) {
          tagsarr.push(result.data.tagsByUpdated.items[i])
        }
      }

      setTags(tagsarr)
    }
    fetchTags();
  }, [])

//tag item
  const Tag = ({id, tag}: any) => {
    return (
      <View style={{marginTop: 14}}>
        <TouchableOpacity onPress={() => navigation.navigate('TagSearchStack', {mainTag: id, tagName: tag})}>
            <View style={[styles.tagbox]}>
                <Text style={styles.tagtext}>
                    #{tag}
                </Text>
            </View>
        </TouchableOpacity>
      </View>
    )
  }

  //render the tag item for flatlist
  const renderTag = ({ item } : any) => (
    <Tag 
        id={item.id}
        tag={item.tagName}
    />
  );

  const [progressExists, setProgressExists] = useState(false)
  const [progressStory, setProgressStory] = useState({})
  const [imageU, setImageU] = useState('')
  const [percent, setPercent] = useState('0')
  const [timeLeft, setTimeLeft] = useState(0)

  //send context to audio player
  const { setStoryID } = useContext(AppContext);

  useEffect(() => {

    const fetchProgressStory = async () => {
      let userInfo = await Auth.currentAuthenticatedUser();
      let response = await API.graphql(graphqlOperation(
        inProgressStoriesByUser, {
          userID: userInfo.attributes.sub,
          sortDirection: 'DESC'
        }
      ))

        //console.log('inprogress', response.data.inProgressStoriesByUser.items)

      if (response.data.inProgressStoriesByUser.items.length > 0) {
        setProgressStory(response.data.inProgressStoriesByUser.items[0].story)
        let imageUri = await Storage.get(response.data.inProgressStoriesByUser.items[0].story.imageUri)
        setImageU(imageUri)
        setPercent((Math.ceil(((response.data.inProgressStoriesByUser.items[0].time)/(response.data.inProgressStoriesByUser.items[0].story.time))*100) + 10).toString())
        setTimeLeft(Math.ceil(((response.data.inProgressStoriesByUser.items[0].story.time)-(response.data.inProgressStoriesByUser.items[0].time))/60000))
        setProgressExists(true);
      }
      if (response.data.inProgressStoriesByUser.items.length === 0) {
        setProgressStory({})
        setImageU('')
        setPercent('0')
        setTimeLeft(0);
        setProgressExists(false)
      }
    }
    fetchProgressStory()
  }, [progUpdate])


//return the primary function
    return (
      <View style={{backgroundColor: '#000000'}}>
        <LinearGradient colors={['#13192Ca5', '#161616', '#000000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: getStatusBarHeight() + 20, marginBottom: 0, marginHorizontal: 20}}/ >
        
            <View style={{ marginBottom: 20, marginHorizontal: 20, alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('SearchScreen')}>
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

            {progressExists === true ? (
            <TouchableWithoutFeedback onPress={() => setStoryID(progressStory.id)}>
            <View style={{marginTop: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={[styles.header, {marginHorizontal: 20}]}>
                  Continue Listening
                </Text>
              </View>
              <View style={{margin: 20}}>
                <View style={{flexDirection: 'row', backgroundColor: '#5656564D', borderRadius: 15}}>
                  <View style={{flexDirection: 'row'}}>
                    {imageU !== '' ? (
                      <Image
                        source={{ uri: imageU}}
                        style={{width: 80, height: 80, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'gray', marginRight: 20}}
                      />
                    ) : null}
                    
                    <View style={{justifyContent: 'space-between', width: '66%', borderTopRightRadius: 15, borderBottomRightRadius: 15}}>
                      <View>
                        <Text numberOfLines={1} style={{marginTop: 4, color: '#fff', fontWeight: 'bold', fontSize: 16, width: '90%'}}>
                          {progressStory?.title}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                          <FontAwesome5 
                            name='book-open'
                            color='gray'
                            size={12}
                            style={{marginRight: 6}}
                          />
                          <Text style={{color: 'gray', textTransform: 'capitalize', fontSize: 11}}>
                            {progressStory?.author}
                          </Text>
                        </View>
                        
                      </View>
                      <View>
                        <Text style={{color: '#fff', fontSize: 11, marginTop: 4}}>
                          {timeLeft} minutes left
                        </Text>
                      <View style={{alignSelf: 'flex-start', width: percent + '%', backgroundColor: '#00ffffa5', height: 2, marginTop: 7, marginLeft: -20}}/>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            </TouchableWithoutFeedback>
            ) : null}

            <View style={{ marginHorizontal: 20, }}>
              <View>
                {genres.length > 0 && tags.length > 0 ? (
                  <FlatList 
                    data={genres}
                    renderItem={({item, index}) => renderItem({item, index})}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={genres.length}
                    contentContainerStyle={{paddingBottom: 80}}
                    ListHeaderComponent={ () => {

                        return (
                            <View style={{ marginTop: 0}}>
                                <View style={{marginTop: 10}}>
                                  <Text style={[styles.header, {marginBottom: 10}]}>
                                      Popular Tags
                                  </Text>
                                  <View>
                                    <FlatList 
                                      data={tags}
                                      renderItem={renderTag}
                                      keyExtractor={(item) => item.id}
                                      scrollEnabled={false}
                                      maxToRenderPerBatch={15}
                                      showsVerticalScrollIndicator={false}
                                      style={{flexDirection: 'row', flexWrap: 'wrap', width: Dimensions.get('window').width - 30, marginBottom: 20}}
                                    />
                                  </View>
                                </View>

                                <View style={{marginTop: 20}}>
                                  <Text style={[styles.header, {marginBottom: 10}]}>
                                      Genres
                                  </Text>
                                </View>
                                
                            </View>                           
                        );
                    }}
                    
                />
                ) : (
                  <View>
                     <View style={{ marginTop: 0}}>
                                <View style={{marginTop: 10}}>
                                  <Text style={styles.header}>
                                      Popular Tags
                                  </Text>
                                  <View>
                                  <LoadingItem width={80} height={40} radius={15}/>
                                  <LoadingItem width={80} height={40} radius={15}/>
                                  <LoadingItem width={80} height={40} radius={15}/>
                                  <LoadingItem width={80} height={40} radius={15}/>

                                  </View>
                                </View>

                                <View style={{marginTop: 20}}>
                                  <Text style={styles.header}>
                                      Genres
                                  </Text>
                                </View>
                                
                            </View> 
                    <LoadingItem width={Dimensions.get('window').width - 40} height={100} radius={15}/>
                    <LoadingItem width={Dimensions.get('window').width - 40} height={100} radius={15}/>
                    <LoadingItem width={Dimensions.get('window').width - 40} height={100} radius={15}/>
                    <LoadingItem width={Dimensions.get('window').width - 40} height={100} radius={15}/>
                    <LoadingItem width={Dimensions.get('window').width - 40} height={100} radius={15}/>
                  </View>
                  
                )

                }
                
              </View>
            </View>
            <View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
}


const styles = StyleSheet.create ({
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    textTransform: 'capitalize'
},
genre: {
    color: '#000',
    fontSize: 24,
    fontWeight: '900',
    textTransform: 'capitalize',
    paddingHorizontal: 20,
},
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
},
box: {
    height: 60,
    width: Dimensions.get('window').width - 40,
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
  },
  tagbox: {
    marginRight: 10,

  },
  tagtext: {
    color: 'cyan',
    fontSize: 14,
    backgroundColor: '#0D2429',
    borderColor: '#008080',
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
    overflow: 'hidden'
},
  genrebox: {
    height: 100,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default AudioStoryHome;