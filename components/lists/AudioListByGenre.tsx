import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    RefreshControl, 
    TouchableWithoutFeedback, 
    ActivityIndicator, 
    ScrollView,
    Modal,
    Dimensions
} from 'react-native';

import { AppContext } from '../../AppContext';

import { storiesByGenreByTitle } from '../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

import StoryTile from '../../components/StoryTile';
import useStyles from '../../styles';


const AudioStoryList = ({genreID} : any) => {

    const styles = useStyles();

    const { nsfwOn } = useContext(AppContext);

    const flatListRef = useRef();

    const ScrollToThisThing = ({letter, id}: any) => {
        flatListRef.current?.scrollTo({x: id * id, animated: true});
        setSelectedLetter(letter);
      }

    const [lengthFilter, setLengthFilter] = useState('Any Length');
    const [ratingFilter, setRatingFilter] = useState('Any Popularity');
    const [dateFilter, setDateFilter] = useState('Any Date');


    const alphabet = [{id: 1, letter: 'a'},{id: 2,letter: 'b'},{id: 3,letter: 'c'},{id: 4,letter: 'd'},{id: 5,letter: 'e'},{id: 6,letter: 'f'},{id: 7,letter: 'g'},{id: 8,letter: 'h'},{id: 9,letter: 'i'},{id: 10,letter: 'j'},{id: 11,letter: 'k'},{id: 12,letter: 'l'},{id: 13,letter: 'm'},{id: 14,letter: 'n'},{id: 15,letter: 'o'},{id: 16,letter: 'p'},{id: 17,letter: 'q'},{id: 18,letter: 'r'},{id: 19,letter: 's'},{id: 20,letter: 't'},{id: 21,letter: 'u'},{id: 22,letter: 'v'},{id: 23,letter: 'w'},{id: 24,letter: 'x'},{id: 25,letter: 'y'},{id: 26,letter: 'z'},]

    //state for the array of pinned stories for that user
    const [genreStories, setGenreStories] = useState([])

    //update trigger for fetching the pinned stories
    const [didUpdate, setDidUpdate] = useState(false);

    //the selected letter for the filter to the stories in the genre. Begins with...
    const [selectedLetter, setSelectedLetter] = useState('a')

    const [nextToken, setNextToken] = useState()

    const [startingTime, setStartingTime] = useState(0);
    const [endingTime, setEndingTime] = useState(5400000);

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

        let genresarr = [];

        let count = 0;

        setGenreStories([])

        const fetchStories = async (nextToken : any) => {

            setIsLoading(true);

            try {

                const genreData = await API.graphql(graphqlOperation(
                    storiesByGenreByTitle, {
                        nextToken,
                        genreID: genreID,
                        title: {
                                beginsWith: selectedLetter.toUpperCase()
                            },
                        filter: {
                            hidden: {
                                eq: false
                            },
                            approved: {
                                eq: true
                            },
                            nsfw: {
                                ne: nsfwOn === true ? true : null
                            },
                            time: {
                                between: [
                                    startingTime,
                                    endingTime
                                ]
                            }
                        }
                }))
                
                for(let i = 0; i < genreData.data.storiesByGenreByTitle.items.length; i++ ){
                    genresarr.push(genreData.data.storiesByGenreByTitle.items[i])
                    count++
                }

                if(count < 30 && genreData.data.storiesByGenreByTitle.nextToken) {
                    fetchStories(genreData.data.storiesByGenreByTitle.nextToken);
                }

                if (count === 30) {
                    setIsLoading(false);
                    setGenreStories(genresarr);
                }

                if (count < 30 && genreData.data.storiesByGenreByTitle.nextToken === null) {
                    setIsLoading(false);
                    setGenreStories(genresarr);
                }

            } catch (e) {
            console.log(e);
          }
        }
        fetchStories(null)
        
           
      }, [selectedLetter, didUpdate, lengthFilter])


    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

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

      const [isLoading, setIsLoading] = useState(false);

      const [visible, setVisible] = useState(false)

    return (
            <View style={{}}>
        {/* //Select length modal */}
            <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={() => {setVisible(!visible);}}>                    
                <TouchableWithoutFeedback onPress={() => {setVisible(false)}} style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000033' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000b3', height: Dimensions.get('window').height}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#101010', alignSelf: 'center', height: Dimensions.get('window').height*0.8, width: Dimensions.get('window').width*0.8 }}>
                            <Text style={{fontWeight: '700', fontSize: 20, paddingVertical: 16, color: '#fff', marginBottom: 40}}>
                                Select story length
                            </Text>
                            
                            <View style={{alignItems: 'center', marginVertical: 0}}>

                                <TouchableWithoutFeedback onPress={() => {setLengthFilter('Any Length'); setStartingTime(0); setEndingTime(5400000); setVisible(false)}}>
                                    <View style={{marginVertical: 10, alignItems: 'center', borderRadius: 8, backgroundColor: lengthFilter === 'Any Length' ? '#00ffff80' : '#202020', width: Dimensions.get('window').width*0.74}}>
                                        <Text style={{fontWeight: '500', fontSize: 20, paddingVertical: 16, color: '#fff'}}>
                                            any
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => {setLengthFilter('< 10 min'); setEndingTime(600000); setVisible(false)}}>
                                    <View style={{marginVertical: 10, alignItems: 'center', borderRadius: 8, backgroundColor: lengthFilter === '< 10 min' ? '#00ffff80' : '#202020', width: Dimensions.get('window').width*0.74}}>
                                        <Text style={{fontWeight: '500', fontSize: 20, paddingVertical: 16, color: '#fff'}}>
                                            under 10
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => {setLengthFilter('10 - 30 min'); setStartingTime(600000); setEndingTime(1800000); setVisible(false)}}>
                                    <View style={{marginVertical: 10, alignItems: 'center', borderRadius: 8, backgroundColor: lengthFilter === '10 - 30 min' ? '#00ffff80' : '#202020', width: Dimensions.get('window').width*0.74}}>
                                        <Text style={{fontWeight: '500', fontSize: 20, paddingVertical: 16, color: '#fff'}}>
                                            10 - 30
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => {setLengthFilter('30 - 60 min'); setStartingTime(1800000); setEndingTime(3600000); setVisible(false)}}>
                                    <View style={{marginVertical: 10, alignItems: 'center', borderRadius: 8, backgroundColor: lengthFilter === '10 - 60 min' ? '#00ffff80' : '#202020', width: Dimensions.get('window').width*0.74}}>
                                        <Text style={{fontWeight: '500', fontSize: 20, paddingVertical: 16, color: '#fff'}}>
                                            30 - 60
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => {setLengthFilter('60+ min'); setStartingTime(3600000); setEndingTime(5400000); setVisible(false)}}>
                                    <View style={{marginVertical: 10, alignItems: 'center', borderRadius: 8, backgroundColor: lengthFilter === '60+ min' ? '#00ffff80' : '#202020', width: Dimensions.get('window').width*0.74}}>
                                        <Text style={{fontWeight: '500', fontSize: 20, paddingVertical: 16, color: '#fff'}}>
                                            60 +
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

                <View>
                    <ScrollView style={{paddingHorizontal: 20}} horizontal={true} ref={flatListRef} showsHorizontalScrollIndicator={false}>        
                        {alphabet.map(({ id, letter } : any) => (
                                <View key={id} style={{}}>
                                    <TouchableWithoutFeedback onPress={() => {ScrollToThisThing({letter, id})}}>
                                        <View style={{ paddingHorizontal: 10, marginBottom: 20}}>
                                            <Text style={{
                                                color: selectedLetter === letter ? 'cyan' : '#fff',
                                                fontWeight: selectedLetter === letter ? 'bold' : 'normal',
                                                fontSize: selectedLetter === letter ? 20 : 17,
                                                textTransform: 'capitalize',
                                            }}>
                                                {letter}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                        ))}
                        <View style={{width: 40}} />
                    </ScrollView>

                    <View style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
                        

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{}}>
                            <TouchableWithoutFeedback onPress={() => setVisible(true)}>
                                <View style={{paddingVertical: 4, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 15, backgroundColor: lengthFilter === 'Any Length' ? '#656565' : '#00ffffb3'}}>
                                    <Text style={{color: '#000'}}>
                                    {lengthFilter}
                                    </Text> 
                                </View>
                            </TouchableWithoutFeedback>
                            
                            <TouchableWithoutFeedback>
                                <View style={{paddingVertical: 4, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 15, backgroundColor: ratingFilter === 'Any Popularity' ? '#656565' : '#00ffffb3'}}>
                                    <Text style={{color: '#000'}}>
                                    {ratingFilter}
                                    </Text> 
                                </View>
                            </TouchableWithoutFeedback>
                            
                            <TouchableWithoutFeedback>
                                <View style={{paddingVertical: 4, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 15, backgroundColor: dateFilter === 'Any Date' ? '#656565' : '#00ffffb3'}}>
                                    <Text style={{color: '#000'}}>
                                    {dateFilter}
                                    </Text> 
                                </View> 
                            </TouchableWithoutFeedback>

                            <View style={{width: 20}}/>

                        </ScrollView>


                        

                    </View>
                    
                    </View>


                <FlatList 
                    data={genreStories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}  
                    ListFooterComponent={ () => {
                        return (
                            <View style={{ height:  200}}>
                                
                            </View>
                    );}}
                    ListEmptyComponent={ () => {
                        return (
                            <View style={{ height:  70, alignItems: 'center'}}>
                                {isLoading === true ? (
                                <View style={{margin: 30}}>
                                    <ActivityIndicator size='small' color='cyan' />
                                </View>
                                ) : (
                                <Text style={{ color: 'white', margin: 20,}}>
                                    Oops! There is nothing here!
                                </Text>
                                )}
                            </View>
                    );}}
                />

            </View>

    );
}

export default AudioStoryList;