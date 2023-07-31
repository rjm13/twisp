import React, {useState, useEffect, useRef, useContext} from 'react';
import { 
    StyleSheet, 
    Text, 
    Image, 
    TouchableOpacity, 
    View, 
    TextInput, 
    Platform, 
    ActivityIndicator, 
    TouchableWithoutFeedback, 
    ScrollView,
    Dimensions,
    Linking,
    Modal
}
from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import ImageCompress from '../components/functions/CompressImage'
import uuid from 'react-native-uuid';

import useStyles from '../styles';
import { AppContext } from '../AppContext'

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createStory, createStoryTag, createTag, createGenreTag, createMessage  } from '../src/graphql/mutations';
import { listTags, getUser, listGenres, listGenreTags } from '../src/graphql/queries';



const UploadAudio = ({navigation} : any) => { 

    const { 
        expoPushToken
    } = useContext(AppContext);
    
    const styles = useStyles();

    //text data input state holders. Will be sent to aws
    const [data, setData] = useState({
        createdAt: '',
        updatedAt: '',
        title: '',
        imageUri: '',
        audioUri: '',
        publisherID: '',
        author: '',
        narrator: '',
        artist: '',
        time: 0,
        summary: '',
        description: '',
        genreID: '',
        genre: '',
        nsfw: false,
        ratingAmt: 0,
        hidden: false,
        status: false,
        approved: false,
        numListens: 0,
    });

    //set state for the number authored so that upon upload can increase it by +1
    const [numAuthored, setNumAuthored] = useState(0)

    //get the user in order to prefill the author's name
    useEffect(() => {
        const fetchUser = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            try {
            const userData = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))
                if (userData) {
                    setData({...data, publisherID: userData.data.getUser.id});
                    setNumAuthored(userData.data.getUser.numAuthored);
            }

            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();
    }, [])

//temp states for the image and audio uris
    const [localImageUri, setLocalImageUri] = useState('');
    const [localAudioUri, setLocalAudioUri] = useState('');

//progress of upload
    const [progressText, setProgressText] = useState(0);

//upload audio object to graphql database
    const [isPublishing, setIsPublishing] = useState(false);

//determine where the image is coming from, locally or otherwise
    const [isLocalImage, setIsLocalImage] = useState(false);

//determine where the audio is coming from, locally or otherwise
    const [isLocalAudio, setIsLocalAudio] = useState(false);

    const ListAllGenreTags = async (extag: any) => {

        const Search = async (nextToken : any) => {

            const response = await API.graphql(graphqlOperation(
                listGenreTags, {
                    nextToken,
                    filter: {
                        tagId: {
                            eq: extag
                        },
                        genreId: {
                            eq: data.genreID
                        }
                    }
                }
            ))

            if (response.data.listGenreTags.items.length === 1) {
                return ('exists');
            } 
            
            if (response.data.listGenreTags.nextToken) {
                let nextToken = response.data.listGenreTags.nextToken
                Search(nextToken)
            }
            
        }

        let s = await Search(null);

        if (s === 'exists') {
            return
        }
        else {
            await API.graphql(graphqlOperation(
                createGenreTag, {input: {tagId: extag, genreId: data.genreID}}
            )) 
        }
    }

    const ListAllTags =  (tagCheck : any) => {

        const Search = async (nextToken : any) => {
                    
            const response = await API.graphql(graphqlOperation(
                listTags,{
                nextToken,
                filter: {
                    tagName: {eq: tagCheck}}
                }
            ))

            if (response.data.listTags.items.length === 1) {
                return (response.data.listTags.items[0].id)
            }

            if (response.data.listTags.nextToken) {
                let nextToken = response.data.listTags.nextToken
                Search(nextToken)
            } 
        }

        return (Search (null));
    }

    //request permission to access camera roll
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const SendPush = async () => {

        const message = {
            to: expoPushToken,
            sound: "default",
            title: "You have a new story pending your approval.",
            body: "For Today",
            data: {someData: "goes here"},
        }
      
      await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Accept-encoding": "gzip, deflate",
              "Content-Type": "application/json",
          },
          body: JSON.stringify(message)
      });
      }


//PRIMARY FUNCTION for uploading all of the story data to the s3 bucket and app sync API
//There are 4 different functions depending on if a file must be uploaded to the s3 bucket or not
    const PublishStory = async () => {

        setIsPublishing(true);

        try {
            let userInfo = await Auth.currentAuthenticatedUser();

            const responseImage = await fetch(localImageUri);
            const blobImage = await responseImage.blob();
            const filenameImage = uuid.v4().toString();
            const s3ResponseImage = await Storage.put(filenameImage, blobImage);
            
            const responseAudio = await fetch(localAudioUri);
            const blob = await responseAudio.blob();
            const filename = uuid.v4().toString();
            //let extension = "audio/" + localAudioUri.split('.').pop()
            const s3ResponseAudio = await Storage.put(filename, blob, {
                progressCallback(uploadProgress) {
                    setProgressText(
                        Math.round((uploadProgress.loaded / uploadProgress.total) * 100)
                    );
                },
                contentType: 'audio/mp3'
            })
        let result = await API.graphql(
            graphqlOperation(createStory, { input: 
                {
                    title: data.title,
                    summary: data.summary,
                    description: data.description,
                    genreID: data.genreID,
                    author: data.author,
                    narrator: data.narrator,
                    artist: data.artist,
                    time: data.time,
                    approved: false,
                    hidden: false,
                    status: false,
                    imageUri: s3ResponseImage.key,
                    audioUri: s3ResponseAudio.key,
                    publisherID: data.publisherID,
                    nsfw: data.genre === 'after dark' ? true : data.nsfw,
                    ratingAvg: 0,
                    ratingAmt: 0,
                    type: 'PendingStory',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
        }))

            //if the user has added tags for this story
            if (TagsArray.length > 0) {
                //then for each tag, check to see if it already exists
                for (let i = 0; i < TagsArray.length; i++) {
                    let tagCheck = TagsArray[i].name.toLowerCase().replace(/ /g, '')

                    let extag = await ListAllTags(tagCheck);

                    //if the tag exists, create a StoryTag with the tagID and storyID
                    if (extag !== undefined) {
                        await API.graphql(graphqlOperation(
                            createStoryTag, {input: {tagId: extag, storyId: result.data.createStory.id, }}
                        ))

                        ListAllGenreTags(extag);
                        
                    //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                    } else if (extag === undefined) {
                        let newTag = await API.graphql(graphqlOperation(
                            createTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase().replace(/ /g, ''), count: 0}}
                        ))

                        if (newTag) {
                            await API.graphql(graphqlOperation(
                                createStoryTag, {input: {tagId: newTag.data.createTag.id, storyId: result.data.createStory.id}}
                            ))
                            await API.graphql(graphqlOperation(
                                createGenreTag, {input: {tagId: newTag.data.createTag.id, genreId: data.genreID}}
                            ))
                        }
                    }
                }
            }

        // await API.graphql(
        //     graphqlOperation(updateUser, { input: {
        //         id: userInfo.attributes.sub,
        //         numAuthored: numAuthored + 1
        //     }
        // }));

        await API.graphql(graphqlOperation(
            createMessage, {
                input: {
                    type: 'Message',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    receiverID: userInfo.attributes.sub,
                    content: 'Your story, ' + data.title + ' is under review.\n\nIt may take up to 48 hours for approval. You will be notified when your story goes live.',
                    title: 'Thank you for submitting your story!',
                    subtitle: null,
                    isReadByReceiver: false,
                    status: 'noreply',
                }
            }
        ));

        await SendPush();

        setIsPublishing(false);
        navigation.goBack();

        //console.log(result);
            } catch (e) {
                alert('Connection error. Please try again.')
                setIsPublishing(false);
                console.error(e);
        }
    }

//audio picker
    const [audioName, setAudioName] = useState('');

    const pickAudio = async () => {
        let result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: false,
        });

        console.log(result);

        if (result.size < 80000000) {

        setLocalAudioUri(result.uri);
        setAudioName(result.name);
        let { sound } = await Audio.Sound.createAsync(
            {uri: result.uri},
            {shouldPlay: false}
        );
        let duration = await sound.getStatusAsync();
        setData({...data, time: duration.durationMillis});
        setIsLocalAudio(true);
        //console.log(duration);
        } else {
            alert ('This file exeeds our size limit for upload. Please select an audio file that is less than 80MB.')
        }
    };

//image picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        //console.log(result);

        let height = result.height
        let width = result.width
        let image = result.uri


        if (!result.cancelled) {
        let im = await ImageCompress(image, {width, height})
        setLocalImageUri(im);
        //setData({...data, artistID: user.id, artistName: user.artistPseudo})
        setIsLocalImage(true);
        }
    };
  
//Modal dropdown for selecting a genre. Height of the dropdown is dependent on the number of genres
    const [Genres, setGenres] = useState([]);

    useEffect(() => {

        let genrearray = []

        const fetchGenres = async () => {
            
            const result = await API.graphql(graphqlOperation(listGenres))

            if (result) {
                genrearray = result.data.listGenres.items
                setGenres(genrearray.sort((a : any, b : any) => a.genre.localeCompare(b.genre)))
            }
        }

        fetchGenres();

    },[])

    const Genre = Genres.map((item, index) => item.genre)

    const ConvertToString = (val : any) => {
        setData({...data, genreID: Genres[val].id, genre: Genres[val].genre, nsfw: Genres[val].id === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false});
    }
  
//Preview Modal, requires terms, audio, image, author, genre, description, summary, title
      const [visible, setVisible] = useState(false);

      //Preview Modal, requires terms, audio, image, author, genre, description, summary, title
      const [visible2, setVisible2] = useState(false);

      const showModal2 = () => 

    setVisible2(true);

    const hideModal2 = () => setVisible2(false);
  
      const showModal = () => 
      
        termsAgree === true &&
        audioName !== '' &&
        data.author !== '' &&
        data.genre !== '' &&
        data.description !== '' &&
        data.summary !== '' &&
        data.title !== '' ?

      setVisible(true) : null;

      const hideModal = () => setVisible(false);
 
      
//terms state management
      const [termsAgree, setTermsAgree] = useState(false);

      const handleTerms = () => {
          if (termsAgree === true) {
            setTermsAgree(false)
          }
          if (termsAgree === false) {
              setTermsAgree(true)
          }
      }

//Tags flatlist, data, and functions

    const clear = useRef()

    const [TagsArray, setTagsArray] = useState([])

    const [tagText, setTagText] = useState('')

//add a new tag to the array, filter out spaces
    const AddToTagArray = () => {

        let Tags = []

        if (tagText.includes('#')) {
            return;
        } else {
            Tags.push(...TagsArray, {id: uuid.v4().toString(), name: tagText.replace(/ /g, '')})
            //.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')});
            setTagsArray(Tags);
            clear.current.clear();
        }
    }

//remove a tag from the tag array
    const RemoveFromTagArray = (index : any) => {

        let Tags = [...TagsArray]

        Tags.splice(index, 1);
        setTagsArray(Tags)
    }

//convert the time to show in the modal
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(data.time / 60000);
        let seconds = Math.floor((data.time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        
    }  

  return (

        <ScrollView>
            <View style={styles.container}>

{/* confirm modal */}
            <Modal visible={visible} onDismiss={hideModal} animationType="slide" transparent={true} onRequestClose={() => {setVisible(!visible)}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20, backgroundColor: '#363636', borderRadius: 15,}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <Text style={[styles.title, {textTransform: 'capitalize'}]}>
                        {data.title}
                        </Text>   
                    </View>

                    <View>
                        <Text style={{ textTransform:'capitalize', color: '#00ffffa5', marginVertical: 5,}}>
                        {data.genre}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center'}}>
                        <FontAwesome5 
                            name='book-open'
                            size={12}
                            color='#ffffffa5'
                        />
                        <Text style={styles.userId}>
                            {data.author}
                        </Text>  
                        <FontAwesome5 
                            name='book-reader'
                            size={12}
                            color='#ffffffa5'
                        />
                        <Text style={styles.userId}>
                            {data.narrator}
                        </Text> 
                    </View>

                    <ScrollView 
                    scrollEnabled={false}
                    style={{width: Dimensions.get('window').width - 80, marginHorizontal: 0, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {TagsArray.map(({ id, name } : any) => (
                        <View key={id} style={{marginTop: 10, marginRight: 10}}>
                                <View style={{}}>
                                    <Text style={styles.tagtext}>
                                        #{name}
                                    </Text>
                                </View>
                        </View>
                    ))}
                </ScrollView>

                    <View style={{marginBottom: 10, width: Dimensions.get('window').width - 80, height: 1, backgroundColor: 'gray'}} />

                    <View>
                        <Text style={{ marginVertical: 10, color: '#ffffff', borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 20,}}>
                        {data.summary}
                        </Text>
                    </View>

                    <View>
                        <Text style={{ marginVertical: 10, color: '#ffffff', borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 20,}}>
                        {data.description}
                        </Text>
                    </View>

                    <View>
                        <Text style={{ color: '#00ffffa5', marginVertical: 10,}}>
                        {audioName}
                        </Text>
                    </View>

                    <View style={{marginVertical: 10,flexDirection: 'row', borderBottomWidth: 1, borderColor: 'gray',}}>
                        <Text style={{ marginRight: 10,  color: '#ffffffa5',  paddingBottom: 20,}}>
                        Track Length:
                        </Text>
                        <Text style={{fontWeight: 'bold', color: '#ffffff', paddingBottom: 20,}}>
                            {millisToMinutesAndSeconds()}
                        </Text>
                    </View>

                    <View>
                        <Image 
                            source={{ uri: localImageUri}}
                            resizeMode='contain'
                            style={{ 
                                marginVertical: 10,
                                height: 200,
                                borderRadius: 15,
                            }} 
                        />
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 
                                name='palette'
                                size={12}
                                color='#ffffffa5'
                            />
                            <Text style={styles.userId}>
                                {data.artistName}
                            </Text> 
                        </View>
                        
                    </View>
                    
                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 40}}>
                        {isPublishing ? (
                            <View style={{marginVertical: 40, alignContent: 'center'}}>
                                <ActivityIndicator size="large" color="cyan"/> 
                                <Text style={{fontSize: 16, textAlign: 'center', color: '#fff', marginTop: 10}}>
                                    {progressText} %
                                </Text>
                            </View>
                            
                            ) : (
                        <TouchableOpacity onPress={PublishStory} style={{marginVertical: 40}}>
                            <LinearGradient
                                colors={['cyan', 'cyan']}
                                style={{ 
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 20,
                                    width: 100,
                                    }} >
                                <Text style={{ color: 'black', fontSize: 16, textAlign: 'center'}}>
                                    Publish
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        )}   
                    </View>
                        
                </ScrollView>
            </Modal>

            <Modal visible={visible2} onDismiss={hideModal2} animationType="slide" transparent={true} onRequestClose={() => {setVisible2(!visible2);}}>
                <TouchableOpacity onPress={hideModal2} style={{backgroundColor: '#000000'}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: '#000000', height: Dimensions.get('window').height}}>
                            {Genres.map(item => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setData({...data, genre: item.genre, genreID: item.id});
                                        hideModal2();
                                    }}
                                    >
                                        <View>
                                            <Text style={{textTransform: 'capitalize', fontSize: 20, paddingHorizontal: 20, paddingVertical: 20, color: '#ffffff'}}>
                                                {item.genre}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>  
                                )})} 
                        </View>
                    </ScrollView>
                </TouchableOpacity>
                
            </Modal>

            <View style={{ width: Dimensions.get('window').width - 20, marginTop: 50, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <AntDesign 
                        name='close'
                        size={25}
                        color='#fff'
                        onPress={ () => navigation.goBack()}
                    /> 
                    <View style={{width: 1}}/>
            </View>

            <View style={{ alignItems: 'center'}}> 
                <Text style={[styles.title, {marginBottom: 50}]}>
                    Submit a Story
                </Text>

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Story Title *
                </Text>

                <View style={[styles.inputfield, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <TextInput
                        placeholder='....'
                        placeholderTextColor='#ffffffa5'
                        style={styles.textInputTitle}
                        maxLength={70}
                        multiline={true}
                        numberOfLines={2}
                        onChangeText={val => setData({...data, title: val})}
                    />
                    <FontAwesome5 
                        name='check-circle'
                        color={data.title !== '' ? 'cyan' : '#363636'}
                        size={20}
                    />
                </View>

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Author *
                </Text>

                <View style={styles.inputfield}>
                    <TextInput 
                        placeholder='....'
                        placeholderTextColor='#ffffffa5'
                        style={styles.textInputTitle}
                        maxLength={30}
                        onChangeText={val => setData({...data, author: val})}
                        autoCapitalize='words'
                    />
                </View>

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Narrator *
                </Text>
                <View style={styles.inputfield}>
                    <TextInput 
                        placeholder='....'
                        placeholderTextColor='#ffffffa5'
                        style={styles.textInputTitle}
                        maxLength={30}
                        onChangeText={val => setData({...data, narrator: val})}
                        autoCapitalize='words'
                    />
                </View>

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Cover Artist *
                </Text>
                <View style={styles.inputfield}>
                    <TextInput 
                        placeholder='....'
                        placeholderTextColor='#ffffffa5'
                        style={styles.textInputTitle}
                        maxLength={30}
                        onChangeText={val => setData({...data, artist: val})}
                        autoCapitalize='words'
                    />
                </View>

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Summary *
                </Text>
                <View style={[styles.inputfield, {height: 80}]}>
                    <TextInput
                        placeholder='Max 200 characters'
                        placeholderTextColor='#ffffffa5'
                        style={{ height: 80, color: '#fff', width: '92%' }}
                        maxLength={200}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={val => setData({...data, summary: val})}
                        textAlignVertical='top'
                    />
                    <FontAwesome5 
                        name='check-circle'
                        color={data.summary !== '' ? 'cyan' : '#363636'}
                        size={20}
                    />
                </View>

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Description *
                </Text>
                <View style={[styles.inputfield, {height: 120}]}>
                    <TextInput
                        placeholder='Max 1500 characters'
                        placeholderTextColor='#ffffffa5'
                        style={[{ height: 120, color: '#fff', width: '92%' }]}
                        maxLength={1500}
                        multiline={true}
                        numberOfLines={10}
                        textAlignVertical='top'
                        onChangeText={val => setData({...data, description: val})}
                    />
                    <FontAwesome5 
                        name='check-circle'
                        color={data.description !== '' ? 'cyan' : '#363636'}
                        size={20}
                    />
                </View>

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Genre *
                </Text>

                <TouchableOpacity onPress={showModal2}>
                    <View style={{ 
                            width: Dimensions.get('window').width - 40, 
                            marginBottom: 0, 
                            backgroundColor: '#363636',
                            marginHorizontal: 20,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            }}>
                                <Text style={{backgroundColor: 'transparent', color: '#fff', fontSize: 14, textTransform: 'capitalize',}}>
                                    {data.genre.length < 1 ? 'Select genre' : data.genre}
                                </Text>
                        
                          <FontAwesome5 
                            name='check-circle'
                            color={data.genreID !== '' ? 'cyan' : '#292929'}
                            size={20}
                            />  
                        

                    </View>
                </TouchableOpacity>

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Tags
                </Text>

                <ScrollView 
                    scrollEnabled={false}
                    style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 10}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {TagsArray.map(({ name } : any, index) => (
                        <View key={index} style={{ marginTop: 10, marginRight: 10}}>
                            <TouchableOpacity onLongPress={() => RemoveFromTagArray(index)}>
                                <View style={{}}>
                                    <Text style={styles.tagtext}>
                                        #{name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginBottom: 20, marginTop: 0, }}>
                    <TouchableWithoutFeedback>
                        <View style={{ width: Dimensions.get('window').width - 140, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636a5'}}>
                            <TextInput
                                placeholder='#'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={20}
                                multiline={false}
                                numberOfLines={1}
                                ref={clear}
                                onChangeText={val => setTagText(val)}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress={AddToTagArray}>
                        <View style={{ alignSelf: 'center', marginHorizontal: 20, padding: 0, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 6}}>
                            <FontAwesome5
                                name='chevron-up'
                                size={20}
                                color='#fff'
                            />
                            <Text style={{fontSize: 10, color: '#fff', marginLeft: 6}}>
                                ADD
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', marginBottom: 20, marginTop: 10, }}>
                    <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                        Cover Art
                    </Text>

                    <TouchableWithoutFeedback onPress={pickImage}>
                        <View style={{ marginTop: 20, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                            <Text style={{ color: '#ffffffa5'}}>
                                Select cover art
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {localImageUri !== '' ? (
                        <Image 
                            source={{uri: localImageUri}}
                            style={{alignSelf: 'center', backgroundColor: 'gray', marginVertical: 20, borderRadius: 15, width: Dimensions.get('window').width - 40, height: 200}}
                        />
                    ) : null}
                </View>

                <View style={{ width: '100%', marginBottom: 20, marginTop: 10, }}>
                    <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                        Audio *
                    </Text>

                    <TouchableWithoutFeedback onPress={pickAudio}>
                        <View style={{ marginTop: 20, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                            <Text style={{ color: '#ffffffa5'}}>
                                Select audio file
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
            
                    {audioName !== '' ? (
                        <View style={{marginTop: 20, }}>
                            <Text style={{color: 'cyan'}}>
                                {audioName}
                            </Text>
                        </View>
                    ) : null}
                </View>

                {data.nsfw === true ? (
                    <View style={{marginTop: 40, alignSelf: 'flex-start', marginLeft: 20}}>
                        <Text style={{borderColor: 'red', borderWidth: 0.5, borderRadius: 4, paddingVertical: 4, paddingHorizontal: 10, color: 'red'}}>
                            Explicit Content
                        </Text>
                    </View>
                ) : null}
                
                <TouchableWithoutFeedback onPress={
                    () => {data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? null : setData({...data, nsfw: !data.nsfw})}}
                    >
                    <View style={{ alignSelf: 'flex-start', marginTop: 40, marginHorizontal: 20, flexDirection: 'row'}}>
                        <FontAwesome5 
                            name='check-circle'
                            color={data.nsfw === true ? 'cyan' : '#363636'}
                            size={20}
                        />
                        <Text style={{ color: '#ffffffa5', fontSize: 12, marginRight: 4, marginLeft: 20, textAlign: 'left'}}>
                            This story contains graphic sexual or explicit content and is not suitable for minors.
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback onPress={handleTerms}>
                    <View style={{ margin: 20, flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <FontAwesome5 
                            name='check-circle'
                            color={termsAgree === true ? 'cyan' : '#363636'}
                            size={20}
                        />
                        <Text style={{ color: '#ffffffa5', fontSize: 12, marginRight: 4, marginLeft: 20, textAlign: 'left'}}>
                            I agree to the
                        </Text>
                        <TouchableWithoutFeedback onPress={() => Linking.openURL('http://www.blipstories.com/terms')}>
                            <Text style={{ color: '#ffffffa5', fontSize: 12, textAlign: 'left', textDecorationLine: 'underline'}}>
                                Publishing Terms and Conditions.
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
                

                    <TouchableOpacity onPress={showModal}>
                        <View style={[{
                            paddingHorizontal: 20, 
                            paddingVertical: 10,
                            marginBottom: 60, 
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            borderWidth: 0.5,
                            backgroundColor: 
                                termsAgree === true &&
                                audioName !== '' &&
                                data.author !== '' &&
                                data.genre !== '' &&
                                data.description !== '' &&
                                data.title !== ''
                                ? 'cyan' : 'transparent',
                                borderColor: 
                                    termsAgree === true &&
                                    audioName !== '' &&
                                    data.author !== '' &&
                                    data.genre !== '' &&
                                    data.description !== '' &&
                                    data.title !== ''
                                    ? 'cyan' : 'gray'
                        }]}>
                            <Text style={{ fontSize: 16, color: 
                                termsAgree === true && 
                                audioName !== '' &&
                                data.author !== '' &&
                                data.genre !== '' &&
                                data.description !== '' &&
                                data.title !== ''
                                ? '#000' : 'gray'
                            }}>
                                Preview
                            </Text>
                        </View>   
                    </TouchableOpacity>

            </View>
            </View>
            <View style={{height: 100}}/>
        </ScrollView>

);
}

const styles = StyleSheet.create({
container: {
    //alignItems: 'center',
},
title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 0,
},
inputheader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: 'flex-start'
},
inputfield: {
    width: '90%',
    backgroundColor: '#363636a5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row', 
    justifyContent: 'space-between'
    
},
textInputTitle: {
    color: '#fff',
    fontWeight: 'bold',
    width: '90%'
},
textInput: {
    color: '#fff',
    width: '92%'
},
userId: {
    fontSize: 12,
    color: '#ffffffa5',
    marginRight: 15,
    marginLeft: 5,
    textTransform: 'capitalize'
},
uploadbutton: {
    paddingHorizontal: 20, 
    paddingVertical: 10,
    marginBottom: 60, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#00ffff',
    borderWidth: 0.5,
},
timer: {
    color: '#ffffff',
    fontSize: 16,
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
});

export default UploadAudio;