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
    Modal,
    FlatList
}
from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import ImageCompress from '../components/functions/CompressImage'
import uuid from 'react-native-uuid';
import * as Progress from 'react-native-progress';

import useStyles from '../styles';
import { AppContext } from '../AppContext'

import TimeConversion from '../components/functions/TimeConversion';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { 
    createStory, 
    createContributor, 
    updateStory, 
    createStoryTag, 
    createEroticStoryTag, 
    createTag, 
    createEroticTag, 
    createGenreTag, 
    createMessage, 
    createEroticaTag, 
    createSeries  
} from '../src/graphql/mutations';

import { 
    eroticTagsByName,
    tagsByName, 
    getUser, 
    listGenres,  
    creatorProfilesByUser, 
    seriesByCreator, 
    storiesByCreator, 
    genreTagsByTagId,
    eroticaTagsByEroticTagId
} from '../src/graphql/queries';



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
        titleLowerCase: '',
        titleLowerCaseNoThe: '',
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
        creatorID: '',
        illustratorID: '',
        narratorID: '',
        seriesID: null,
        seriesPart: 1,
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

    const [genreTags, setGenreTags] = useState([])


//select the series state
    const [series, setSeries] = useState('');

    const ListAllGenreTags = async (extag: any) => {

        let gtags = [...genreTags];

        const Search = async (nextToken : any) => {

            console.log('here is')

            const response = await API.graphql(graphqlOperation(
                genreTagsByTagId, {
                    nextToken,
                    tagId: {
                        eq: extag
                    },
                    filter: {
                        genreId: {
                            eq: data.genreID
                        }
                    }
                }
            ))

            console.log('genretag is', response)

            if (response.data.listGenreTags.items.length > 0) {
                gtags.push(response.data.listGenreTags.items[0])
                return ('exists');
            } 
            
            if (response.data.listGenreTags.nextToken && response.data.listGenreTags.items.length === 0) {
                Search(response.data.listGenreTags.nextToken)
            }
            
        }

        let s = await Search(null);

        if (s === 'exists') {
            setGenreTags(gtags)
            return
        }
        else {
            const newgt = await API.graphql(graphqlOperation(
                createGenreTag, {input: {tagId: extag, genreId: data.genreID}}
            )) 
            gtags.push(newgt.data.createGenreTag.items[0])
            setGenreTags(gtags)
        }
    }

    const ListAllTags =  (tagCheck : any) => {

        const Search = async (nextToken : any) => {
                    
            const response = await API.graphql(graphqlOperation(
                tagsByName, {
                    nextToken,
                    tagName: tagCheck
                }
            ))

            if (response.data.tagsByName.items.length > 0) {
                return (response.data.tagsByName.items[0].id)
            }

            if (response.data.tagsByName.nextToken && response.data.tagsByName.items.length === 0) {
                let nextToken = response.data.tagsByName.nextToken
                Search(nextToken)
            } 
        }

        return (Search (null));
    }

    const ListAllEroticTags =  (tagCheck : any) => {

        const Search = async (nextToken : any) => {
                    
            const response = await API.graphql(graphqlOperation(
                eroticTagsByName,{
                nextToken,
                tagName: tagCheck
                }
            ))

            if (response.data.eroticTagsByName.items.length > 0) {
                return (response.data.eroticTagsByName.items[0].id)
            }

            if (response.data.eroticTagsByName.nextToken && response.data.eroticTagsByName.items.length === 0 ) {
                let nextToken = response.data.eroticTagsByName.nextToken
                Search(nextToken)
            } 
        }

        return (Search (null));
    }

    const ListAllGenreEroticTags = async (extag: any) => {

        const Search = async (nextToken : any) => {

            const response = await API.graphql(graphqlOperation(
                eroticaTagsByEroticTagId, {
                    nextToken,
                    eroticTagId: extag,
                    filter: {
                        genreId: {
                            eq: data.genreID
                        }
                    }
                }
            ))


            if (response.data.listEroticaTags.items.length > 0) {
                return ('exists');
            } 
            
            if (response.data.listEroticaTags.nextToken && response.data.listEroticaTags.items.length === 0) {
                let nextToken = response.data.listEroticaTags.nextToken
                Search(nextToken)
            }
            
        }

        let s = await Search(null);

        if (s === 'exists') {
            return
        }
        else {
            await API.graphql(graphqlOperation(
                createEroticaTag, {input: {eroticTagId: extag, genreId: data.genreID}}
            )) 
        }
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

      const [seriesid, setSeriesid] = useState()


//PRIMARY FUNCTION for uploading all of the story data to the s3 bucket and app sync API
//There are 4 different functions depending on if a file must be uploaded to the s3 bucket or not
    const PublishStory = async () => {

        setIsPublishing(true);

        try {

            if (seriesStory.length > 0) {
                const result = await API.graphql(
                    graphqlOperation(createSeries, { input: 
                        {
                            type: 'Series',
                            name: seriesStoryName,
                            genreID: data.genreID,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            creatorID: pickedCreator
                        }
                }))

                const resultish = await API.graphql(
                    graphqlOperation(updateStory, { input: 
                        {
                            id: seriesStory,
                            seriesID: result.data.createSeries.id,
                            updatedAt: new Date(),
                        }
                }))

                console.log(resultish.data)

                setSeriesid(result.data.createSeries.id)
                console.log('new series id is', result.data.createSeries.id)
            }

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
                    creatorID: data.creatorID,
                    narratorID: data.narratorID,
                    illustratorID: data.illustratorID,
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
                    seriesID: seriesid ? seriesid : null,
                    seriesPart: data.seriesPart,
                    numComments: 0,
                    numListens: 0,
                }
        }))

        console.log('story id is', result.data.createStory.id)

        if (data.genre === 'after dark') {
            //if the user has added after dark tags to the story
            if (TagsArray.length > 0) {
                //then for each tag, check to see if it already exists
                for (let i = 0; i < TagsArray.length; i++) {
                    let tagCheck = TagsArray[i].name.toLowerCase().replace(/ /g, '')

                    let extag = await ListAllEroticTags(tagCheck);

                    //if the tag exists, create a StoryTag with the tagID and storyID
                    if (extag !== undefined) {
                        await API.graphql(graphqlOperation(
                            createEroticStoryTag, {input: {eroticTagId: extag, storyId: result.data.createStory.id, }}
                        ))

                        ListAllGenreEroticTags(extag);
                        
                    //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                    } else if (extag === undefined) {
                        let newTag = await API.graphql(graphqlOperation(
                            createEroticTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase().replace(/ /g, ''), count: 0}}
                        ))

                        if (newTag) {
                            const newthing = await API.graphql(graphqlOperation(
                                createEroticStoryTag, {input: {eroticTagId: newTag.data.createEroticTag.id, storyId: result.data.createStory.id}}
                            ))
                            console.log('new tag is', newthing.data.createEroticStoryTag.id)
                            let newthing2 = await API.graphql(graphqlOperation(
                                createEroticaTag, {input: {eroticTagId: newTag.data.createEroticTag.id, genreId: data.genreID}}
                            ))
                            console.log('new tag is', newthing2.data.createEroticaTag.id)
                        }
                    }
                }
            } 
        } 

        else {
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
                            console.log('genre id is', data.genreID)
                            console.log('tagid is', newTag.data.createTag.id)
                            await API.graphql(graphqlOperation(
                                createGenreTag, {input: {tagId: newTag.data.createTag.id, genreId: data.genreID}}
                            ))
                        }
                    }
                }
            }
        }

        if (contributors.length > 0) {
            for (let i = 0; i < contributors.length; i++) {
                const contribe = await API.graphql(graphqlOperation(
                    createContributor, {
                        input: {
                            //type: 'Contributor'
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            storyID: result.data.createStory.id,
                            name: contributors[i].name,
                            contribution: contributors[i].contribution,
                            link: contributors[i].link
                        }
                    }
                ))
                console.log(contribe.data.createContributor)
            }
        }

        await API.graphql(graphqlOperation(
            createMessage, {
                input: {
                    type: 'Message',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    receiverID: userInfo.attributes.sub,
                    content: 'Your story, ' + data.title + ' is under review.\n\nIt may take up to 48 hours for approval. You will be notified when your story goes live.',
                    title: 'Thank you for submitting your story!',
                    isReadByReceiver: false,
                    status: 'noreply',
                }
            }
        ));

        //await SendPush();

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

    //Modal dropdown for selecting  an author. Height of the dropdown is dependent on the number of genres
    const [Authors, setAuthors] = useState([]);
    const [Narrators, setNarrators] = useState([]);
    const [Illustrators, setIllustrators] = useState([]);

    //Modal dropdown for selecting a series. Height of the dropdown is dependent on the number of genres
    const [seriesArr, setSeriesArr] = useState([]);
    const [pickedCreator, setPickedCreator] = useState('');

    const [seriesStories, setSeriesStories] = useState([]);
    const [seriesStory, setSeriesStory] = useState('');
    const [seriesStoryName, setSeriesStoryName] = useState('');

    useEffect(() => {

        let seriesArray = [];

        let storiesArray = [];

        if (pickedCreator === '') {
            return;
        }

        const fetchSeries = async (nextToken : any) => {
            const result = await API.graphql(graphqlOperation(
                seriesByCreator, {
                    nextToken,
                    creatorID: pickedCreator
                }
            ))

            if (result) {
                for (let i = 0; i < result.data.seriesByCreator.items.length; i++) {
                    seriesArray.push(result.data.seriesByCreator.items[i])
                } 

                if (result.data.seriesByCreator.nextToken) {
                    fetchSeries(result.data.seriesByCreator.nextToken)
                }

                if (result.data.seriesByCreator.nextToken === null) {
                    setSeriesArr(seriesArray)
                }
            }
        }

        const fetchStories = async (nextToken : any) => {
            const result = await API.graphql(graphqlOperation(
                storiesByCreator, {
                    nextToken,
                    creatorID: pickedCreator
                }
            ))

            if (result) {
                for (let i = 0; i < result.data.storiesByCreator.items.length; i++) {
                    storiesArray.push(result.data.storiesByCreator.items[i])
                } 

                if (result.data.storiesByCreator.nextToken) {
                    fetchSeries(result.data.storiesByCreator.nextToken)
                }

                if (result.data.storiesByCreator.nextToken === null) {
                    setSeriesStories(storiesArray)
                }
            }
        }

        fetchSeries(null);
        fetchStories(null);

    }, [pickedCreator])

    //fetch the user's author profiles
    useEffect(() => {

        let authorarray = []

        const fetchCreators = async (nextToken:any) => {

            const userInfo = await Auth.currentAuthenticatedUser()
            
            const result = await API.graphql(graphqlOperation(
                creatorProfilesByUser, {
                    nextToken,
                    userID: userInfo.attributes.sub,
                    filter: {
                        type: {
                            eq: 'Author'
                        }
                    }
                }
            ))

            for (let i = 0; i < result.data.creatorProfilesByUser.items.length; i++) {
                authorarray.push(result.data.creatorProfilesByUser.items[i])
            }

            if (result.data.creatorProfilesByUser.nextToken) {
                fetchCreators(result.data.creatorProfilesByUser.nextToken)
            } else {
                setAuthors(authorarray.sort((a : any, b : any) => a.penName.localeCompare(b.penName)))
            }

        }

        fetchCreators(null);

    },[])

    //fetch the user's narrator profiles
    useEffect(() => {

        let narratorarray = []

        const fetchCreators = async (nextToken:any) => {

            const userInfo = await Auth.currentAuthenticatedUser()
            
            const result = await API.graphql(graphqlOperation(
                creatorProfilesByUser, {
                    nextToken,
                    userID: userInfo.attributes.sub,
                    filter: {
                        type: {
                            eq: 'Narrator'
                        }
                    }
                }
            ))

            for (let i = 0; i < result.data.creatorProfilesByUser.items.length; i++) {
                narratorarray.push(result.data.creatorProfilesByUser.items[i])
            }

            if (result.data.creatorProfilesByUser.nextToken) {
                fetchCreators(result.data.creatorProfilesByUser.nextToken)
            } else {
                setNarrators(narratorarray.sort((a : any, b : any) => a.penName.localeCompare(b.penName)))
            }

        }

        fetchCreators(null);

    },[])

    //fetch the user's illustrator profiles
    useEffect(() => {

        let illustratorarray = []

        const fetchCreators = async (nextToken:any) => {

            const userInfo = await Auth.currentAuthenticatedUser()
            
            const result = await API.graphql(graphqlOperation(
                creatorProfilesByUser, {
                    nextToken,
                    userID: userInfo.attributes.sub,
                    filter: {
                        type: {
                            eq: 'Illustrator'
                        }
                    }
                }
            ))

            for (let i = 0; i < result.data.creatorProfilesByUser.items.length; i++) {
                illustratorarray.push(result.data.creatorProfilesByUser.items[i])
            }

            if (result.data.creatorProfilesByUser.nextToken) {
                fetchCreators(result.data.creatorProfilesByUser.nextToken)
            } else {
                setIllustrators(illustratorarray.sort((a : any, b : any) => a.penName.localeCompare(b.penName)))
            }

        }

        fetchCreators(null);

    },[])
  
//Preview Modal, requires terms, audio, image, author, genre, description, summary, title
      const [visible, setVisible] = useState(false);

      //Preview Modal, requires terms, audio, image, author, genre, description, summary, title
      const [visible2, setVisible2] = useState(false);

    //author select modal
        const [modalVisible, setModalVisible] = useState(false);

        const showModalVisible = () => setModalVisible(true);

        const hideModalVisible = () => setModalVisible(false);

    //narrator select modal
        const [modalVisible2, setModalVisible2] = useState(false);

        const showModalVisible2 = () => setModalVisible2(true);

        const hideModalVisible2 = () => setModalVisible2(false);

    //illustrator select modal
        const [modalVisible3, setModalVisible3] = useState(false);

        const showModalVisible3 = () => setModalVisible3(true);

        const hideModalVisible3 = () => setModalVisible3(false);

    //series select modal
        const [seriesModal, setSeriesModal] = useState(false);

        const showSeriesModal = () => setSeriesModal(true);

        const hideSeriesModal = () => setSeriesModal(false);

    //series select modal
        const [newSeriesModal, setNewSeriesModal] = useState(false);

        const showNewSeriesModal = () => setNewSeriesModal(true);

        const hideNewSeriesModal = () => setNewSeriesModal(false);



      const showModal2 = () => setVisible2(true);

        const hideModal2 = () => setVisible2(false);
  
      const showModal = () => {

        let lower = data.title.toLowerCase();

        let parsed = data.title.toLowerCase();

       
        if (data.title.startsWith('The ' || 'the ')) {
            parsed = data.title.slice(4).toLowerCase()
        }

        if (data.title.startsWith('a ' || 'A ')) {
            parsed = data.title.slice(2).toLowerCase()
        }
        
        setData({...data, titleLowerCase: parsed, titleLowerCaseNoThe: lower});
      
        termsAgree === true &&
        audioName !== '' &&
        data.author !== '' &&
        data.genre !== '' &&
        data.description !== '' &&
        data.summary !== '' &&
        data.title !== '' ?

        setVisible(true) : null;
      }

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

    const Item = ({id, title, author, narrator, imageUri, numComments, numListens, ratingAvg} : any) => {

            //temporary signed image uri
                const [imageU, setImageU] = useState('')
                
                //push the s3 image key to get the signed uri
                    useEffect(() => {
                        const fetchImage = async () => {
                            let response = await Storage.get(imageUri);
                            setImageU(response);
                        }
                        fetchImage()
                    }, [])  
            
            return (
                <TouchableOpacity onPress={() => {
                    setSeriesStory(id);
                    setSeriesStoryName(title);
                    setSeries(title);
                    setData({...data, seriesPart: data.seriesPart + 1});
                    hideNewSeriesModal();
                    hideSeriesModal();
                }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#171717a5', padding: 10, margin: 10, borderRadius: 15, overflow: 'hidden'  }}>
<View style={{}}>
        <Image 
            source={{uri: imageU}}
            style={{
                width:  70,
                height: 70,
                borderRadius: 15,
                marginVertical: 0,
                marginRight: 12,
                marginLeft: -6,
                backgroundColor: '#ffffffa5'
            }}
        />
    
    </View>
                    <View style={{ width: Dimensions.get('window').width*0.68}}>
            <View style={{justifyContent: 'space-between'}}>
                <Text style={[{fontSize: 16, fontWeight: 'bold', color: '#fff', flexWrap: 'wrap', width: '96%'}]}>
                    {title}
                </Text> 

                <View style={{ flexDirection: 'row', width: '99%', marginTop: 0, alignItems: 'center', flexWrap: 'wrap'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome5 
                            name='book-open'
                            size={12}
                            color='#ffffffa5'
                        />
                        <Text style={{fontSize: 12,color: '#ffffffa5',marginRight: 15,marginLeft: 5,textTransform: 'capitalize'}}>
                            {author}
                        </Text>  
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome5 
                            name='book-reader'
                            size={12}
                            color='#ffffffa5'
                        />
                        <Text style={{fontSize: 12,color: '#ffffffa5',marginRight: 15,marginLeft: 5,textTransform: 'capitalize'}}>
                            {narrator}
                        </Text>  
                    </View>
                    
                    
                </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 12, width: Dimensions.get('window').width-40, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <Text style={{fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                        {item.genre.genre}
                    </Text> */}
                <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome 
                        name='comment'
                        color='#ffffffa5'
                        size={12}
                    />
                    <Text style={{marginLeft: 4, fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                        {numComments ? numComments : 0}
                    </Text>
                </View>
                <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome5 
                        name='headphones'
                        color='#ffffffa5'
                        size={12}
                    />
                    <Text style={{marginLeft: 4, fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                        {numListens ? numListens : 0}
                    </Text>
                </View>
                
                    <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome 
                            name='star'
                            color='#ffffffa5'
                            size={12}
                        />
                        <Text style={{marginLeft: 4, fontSize: 14, color: '#ffffffa5', textTransform: 'capitalize'}}>
                            {(ratingAvg/10).toFixed(1)}
                        </Text>
                    </View>
                </View>
                
                        
                
            </View>
    </View>
    </View>         
                </TouchableOpacity>  
            )
        
    }

    const renderItem = ({item} : any) => {
        return (
            <Item
                id={item.id}
                title={item.title}
                author={item.author}
                narrator={item.narrator}
                imageUri={item.imageUri}
                ratingAvg={item.ratingAvg}
                numComments={item.numComments}
                numListens={item.numListens}
            />
        )
        
    }

    const clear1 = useRef()
    const clear2 = useRef()
    const clear3 = useRef()

    const [contributors, setContributors] = useState([])

    const [contData, setcontData] = useState({
        name: '',
        contribution: '',
        link: '',
    })

    const AddContributor = () => {

        let contribs = [...contributors]

        contribs.push(contData)
        clear1.current.clear();
        clear2.current.clear();
        clear3.current.clear();
        setContributors(contribs)
        setcontData({
            name: '',
            contribution: '',
            link: '',
        })
    }

    const RemoveContributor = (index : any) => {
        let contribs = [...contributors]

        if (index > -1) { // only splice array when item is found
            contribs.splice(index, 1); // 2nd parameter means remove one item only
        }

        setContributors(contribs) 
    }

  return (

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>

{/* confirm modal */}
            <Modal visible={visible} onDismiss={hideModal} animationType="slide" transparent={true} onRequestClose={() => {setVisible(!visible)}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20, backgroundColor: '#171717', borderRadius: 15,}}>
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
                        <Text style={[styles.paragraph, {marginLeft: 10}]}>
                            {data.author}
                        </Text>  
                        <FontAwesome5 
                            name='book-reader'
                            size={12}
                            color='#ffffffa5'
                            style={{marginLeft: 20}}
                        />
                        <Text style={[styles.paragraph, {marginLeft: 10}]}>
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

                    <View style={{marginVertical: 10,flexDirection: 'row', borderBottomWidth: 1, borderColor: 'gray',}}>
                        <Text style={{ marginRight: 10,  color: '#ffffffa5',  paddingBottom: 20,}}>
                            Series:
                        </Text>
                        <View>
                            <Text style={{width: Dimensions.get('window').width*0.8 ,fontWeight: 'bold', color: '#ffffff', paddingBottom: 20,}}>
                                {series}
                            </Text>
                            <Text style={{fontWeight: 'bold', color: '#00ffffa5', paddingBottom: 20,}}>
                                Part {data.seriesPart}
                            </Text>
                        </View>
                        
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
                            <Text style={[styles.paragraph, {marginLeft: 10}]}>
                                {data.artist}
                            </Text> 
                        </View>
                        
                    </View>
                    
                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 40}}>
                        {isPublishing ? (
                            <View style={{marginVertical: 40, alignContent: 'center'}}>
                                {/* <ActivityIndicator size="large" color="cyan"/>  */}
                            <Text style={{marginBottom: 10, fontSize: 16, textAlign: 'center', color: '#fff', marginTop: 10}}>
                                {progressText} %
                            </Text>

                            <Progress.Bar 
                                progress={Number(progressText)/100} 
                                width={Dimensions.get('window').width/2} 
                                color={'#00ffff'}
                                unfilledColor={'#000'}
                                borderWidth={1}
                                borderColor={'#00ffff'}
                                borderRadius={4}
                            />
                            </View>
                            
                            ) : (
                        <View>
                            <TouchableOpacity onPress={PublishStory} style={{marginVertical: 40}}>
                                <View
                                    style={{ 
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 20,
                                        backgroundColor: 'cyan',
                                        overflow: 'hidden',
                                        width: Dimensions.get('window').width*0.7
                                        }} >
                                    <Text style={{ color: 'black', fontSize: 16, textAlign: 'center'}}>
                                        Publish
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={hideModal} style={{marginTop: -20}}>
                                <View
                                    style={{ 
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 20,
                                        width: Dimensions.get('window').width*0.7,
                                        backgroundColor: 'transparent',
                                        borderWidth: 1,
                                        borderColor: 'cyan',
                                        overflow: 'hidden',
                                        }} >
                                    <Text style={{ color: 'cyan', fontSize: 16, textAlign: 'center'}}>
                                        Edit
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )}   
                    </View>

                    <View style={{height: 100}}/>
                        
                </ScrollView>
            </Modal>

{/* genre modal */}
            <Modal visible={visible2} onDismiss={hideModal2} animationType="slide" transparent={true} onRequestClose={() => {setVisible2(!visible2);}}>
                {/* <TouchableOpacity onPress={hideModal2} > */}
                    <ScrollView showsVerticalScrollIndicator={false} style={{paddingVertical: 80, backgroundColor: '#000', height: Dimensions.get('window').height }}>
                        <View style={{alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: '#000000'}}>
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
                        <View style={{height: 200}}/>
                    </ScrollView>
                {/* </TouchableOpacity> */}
                
            </Modal>

{/* author modal */}
            <Modal visible={modalVisible} onDismiss={showModalVisible} animationType="slide" transparent={true} onRequestClose={() => {setModalVisible(false);}}>
                <TouchableOpacity onPress={hideModalVisible} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#000000a5'}}>
                       
                        <View style={{alignSelf: 'center', alignItems: 'center', backgroundColor: '#000000', borderRadius: 15, overflow: 'hidden', marginVertical: 80, width: Dimensions.get('window').width*0.80}}>
                            <View style={{height: 40}}/>
                            {Authors.map(item => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setData({...data, author: item.penName, creatorID: item.id});
                                        setPickedCreator(item.id);
                                        hideModalVisible();
                                    }}
                                    >
                                        <View style={{marginVertical: 6, backgroundColor: '#171717a5', borderRadius: 8, overflow: 'hidden', width: Dimensions.get('window').width*0.7}}>
                                            <Text style={{textTransform: 'capitalize', fontSize: 20, paddingHorizontal: 20, paddingVertical: 20, color: '#ffffff'}}>
                                                {item.penName}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>  
                                )})} 
                                <View style={{height: 40}}/>
                        </View>
                        
                    </ScrollView>
                </TouchableOpacity>
                
            </Modal>

{/* narrator modal */}
            <Modal visible={modalVisible2} onDismiss={showModalVisible2} animationType="slide" transparent={true} onRequestClose={() => {setModalVisible2(false);}}>
                <TouchableOpacity onPress={hideModalVisible2} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#000000a5'}}>
                       
                        <View style={{alignSelf: 'center', alignItems: 'center', backgroundColor: '#000000', borderRadius: 15, overflow: 'hidden', marginVertical: 80, width: Dimensions.get('window').width*0.80}}>
                            <View style={{height: 40}}/>
                            {Narrators.map(item => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setData({...data, narrator: item.penName, narratorID: item.id});
                                        //setPickedCreator(item.id);
                                        hideModalVisible2();
                                    }}
                                    >
                                        <View style={{marginVertical: 6, backgroundColor: '#171717a5', borderRadius: 8, overflow: 'hidden', width: Dimensions.get('window').width*0.7}}>
                                            <Text style={{textTransform: 'capitalize', fontSize: 20, paddingHorizontal: 20, paddingVertical: 20, color: '#ffffff'}}>
                                                {item.penName}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>  
                                )})} 
                                <View style={{height: 40}}/>
                        </View>
                        
                    </ScrollView>
                </TouchableOpacity>
                
            </Modal>

{/* illustrator modal */}
            <Modal visible={modalVisible3} onDismiss={showModalVisible3} animationType="slide" transparent={true} onRequestClose={() => {setModalVisible3(false);}}>
                <TouchableOpacity onPress={hideModalVisible3} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#000000a5'}}>
                       
                        <View style={{alignSelf: 'center', alignItems: 'center', backgroundColor: '#000000', borderRadius: 15, overflow: 'hidden', marginVertical: 80, width: Dimensions.get('window').width*0.80}}>
                            <View style={{height: 40}}/>
                            {Illustrators.map(item => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setData({...data, artist: item.penName, illustratorID: item.id});
                                        //setPickedCreator(item.id);
                                        hideModalVisible3();
                                    }}
                                    >
                                        <View style={{marginVertical: 6, backgroundColor: '#171717a5', borderRadius: 8, overflow: 'hidden', width: Dimensions.get('window').width*0.7}}>
                                            <Text style={{textTransform: 'capitalize', fontSize: 20, paddingHorizontal: 20, paddingVertical: 20, color: '#ffffff'}}>
                                                {item.penName}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>  
                                )})} 
                                <View style={{height: 40}}/>
                        </View>
                        
                    </ScrollView>
                </TouchableOpacity>
                
            </Modal>

{/* series modal */}
            <Modal visible={seriesModal} onDismiss={showSeriesModal} animationType="slide" transparent={true} onRequestClose={() => {setSeriesModal(false);}}>
                <TouchableOpacity onPress={hideSeriesModal} style={{backgroundColor: '#000000'}}>

                    <TouchableOpacity onPress={() => {showNewSeriesModal();}}>
                        <View style={{backgroundColor: '#00ffffa5', alignSelf: 'center', marginTop: 40, borderWidth: 0, borderColor: '#fff', borderRadius: 15, overflow: 'hidden'}}>
                            <Text style={{textTransform: 'capitalize', fontSize: 20, fontWeight: '600',  paddingHorizontal: 20, paddingVertical: 20, color: '#000'}}>
                                Create New Series
                            </Text>
                        </View>
                    </TouchableOpacity>  

                    <View style={{alignSelf: 'center', marginTop: 40}}>
                            <Text style={{textAlign: 'center', fontSize: 14, paddingHorizontal: 20, paddingVertical: 20, color: '#999999'}}>
                                Please select a series from the list below. 
                                If this is the second story of a series, create a new series.
                            </Text>
                        </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: '#000000', height: Dimensions.get('window').height}}>
                            {seriesArr.map(item => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setData({...data, seriesPart: item.seriesPart + 1, seriesID: item.id});
                                        setSeries(item.name)
                                        hideSeriesModal();
                                    }}
                                    >
                                        <View>
                                            <Text style={{textTransform: 'capitalize', fontSize: 20, paddingHorizontal: 20, paddingVertical: 20, color: '#ffffff'}}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>  
                                )})} 
                        </View>
                    </ScrollView>
                </TouchableOpacity>
                
            </Modal>

{/* new series modal */}
            <Modal visible={newSeriesModal} onDismiss={showNewSeriesModal} animationType="slide" transparent={true} onRequestClose={() => {setNewSeriesModal(false);}}>
                <TouchableOpacity onPress={hideNewSeriesModal} style={{backgroundColor: '#000000'}}>

                    <Text style={{marginTop: 40, fontWeight: '600', fontSize: 18, textAlign: 'center', paddingHorizontal: 20, paddingVertical: 20, color: '#ffffff'}}>
                        Select the first story of this series
                    </Text>

                    <ScrollView showsVerticalScrollIndicator={false} style={{height: Dimensions.get('window').height}}>
                        <View style={{alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: '#000000'}}>
                           <FlatList 
                            data={seriesStories}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                           />
                           
                           
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

                <View style={[styles.inputfield, {height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <TextInput
                        placeholder='....'
                        placeholderTextColor='#ffffffa5'
                        style={[styles.textInputTitle, {width: Dimensions.get('window').width - 80}]}
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

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 30, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Author *
                </Text>

                <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                                    {data.author.length < 1 ? 'Select author' : data.author}
                                </Text>
                        
                          <FontAwesome5 
                            name='check-circle'
                            color={data.creatorID !== '' ? 'cyan' : '#292929'}
                            size={20}
                            />  
                    </View>
                </TouchableOpacity>
                

                {/* <View style={styles.inputfield}>
                    <TextInput 
                        placeholder='....'
                        placeholderTextColor='#ffffffa5'
                        style={styles.textInputTitle}
                        maxLength={30}
                        onChangeText={val => setData({...data, author: val})}
                        autoCapitalize='words'
                    />
                </View> */}

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 30, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Narrator *
                </Text>

                <TouchableOpacity onPress={() => setModalVisible2(true)}>
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
                                    {data.narrator.length < 1 ? 'Select narrator' : data.narrator}
                                </Text>
                        
                          <FontAwesome5 
                            name='check-circle'
                            color={data.narratorID !== '' ? 'cyan' : '#292929'}
                            size={20}
                            />  
                    </View>
                </TouchableOpacity>
                {/* <View style={styles.inputfield}>
                    <TextInput 
                        placeholder='Select Narrator'
                        placeholderTextColor='#ffffffa5'
                        style={styles.textInputTitle}
                        maxLength={30}
                        onChangeText={val => setData({...data, narrator: val})}
                        autoCapitalize='words'
                    />
                </View> */}

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 30, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Cover Artist *
                </Text>
                <TouchableOpacity onPress={() => setModalVisible3(true)}>
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
                                    {data.artist.length < 1 ? 'Select illustrator' : data.artist}
                                </Text>
                        
                          <FontAwesome5 
                            name='check-circle'
                            color={data.illustratorID !== '' ? 'cyan' : '#292929'}
                            size={20}
                            />  
                    </View>
                </TouchableOpacity>
                {/* <View style={styles.inputfield}>
                    <TextInput 
                        placeholder='....'
                        placeholderTextColor='#ffffffa5'
                        style={styles.textInputTitle}
                        maxLength={30}
                        onChangeText={val => setData({...data, artist: val})}
                        autoCapitalize='words'
                    />
                </View> */}

                <View style={{marginTop: 20, width: Dimensions.get('window').width, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 0, alignSelf: 'flex-start'}]}>
                        Additional Contributors
                    </Text>

                    {/* <TouchableOpacity >
                        <View style={{ borderWidth: 0.5, borderColor: '#fff', borderRadius: 15, overflow: 'hidden', alignSelf: 'center', marginHorizontal: 20, padding: 0, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 6}}>
                            <Text style={{fontSize: 10, color: '#fff', marginLeft: 0}}>
                                ADD EXISTING
                            </Text>
                        </View>
                    </TouchableOpacity> */}
                </View>

                <View style={{marginVertical: 20, alignSelf: 'center',}}>
                    <View style={{ flexDirection: 'row', width: Dimensions.get('window').width*0.90, justifyContent: 'space-between'}}>
                        <View style={{width: '90%', justifyContent: 'space-between', height: 132}}>
                            <View style={[{backgroundColor: '#363636', padding: 10, borderRadius: 10,overflow: 'hidden', width: '96%', height: 40}]}>
                                <TextInput
                                    placeholder='Name'
                                    placeholderTextColor='#ffffffa5'
                                    style={[styles.textInputTitle, {width: '100%'}]}
                                    maxLength={70}
                                    multiline={true}
                                    numberOfLines={2}
                                    ref={clear1}
                                    onChangeText={val => setcontData({...contData, name: val})}
                                />
                            </View>
                            <View style={[{backgroundColor: '#363636', padding: 10, borderRadius: 10,overflow: 'hidden', width: '96%', height: 40}]}>
                                <TextInput
                                    placeholder='Contribution'
                                    placeholderTextColor='#ffffffa5'
                                    style={[styles.textInputTitle, {width: '100%'}]}
                                    maxLength={70}
                                    multiline={true}
                                    numberOfLines={2}
                                    ref={clear2}
                                    onChangeText={val => setcontData({...contData, contribution: val})}
                                />
                            </View>
                            <View style={[{backgroundColor: '#363636', padding: 10, borderRadius: 10,overflow: 'hidden', width: '96%', height: 40}]}>
                                <TextInput
                                    placeholder='Website'
                                    placeholderTextColor='#ffffffa5'
                                    style={[styles.textInputTitle, {width: '100%'}]}
                                    maxLength={70}
                                    multiline={true}
                                    numberOfLines={2}
                                    ref={clear3}
                                    onChangeText={val => setcontData({...contData, link: val})}
                                />
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={{width: '10%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00ffffa5', borderRadius: 6, overflow: 'hidden'}}
                            onPress={() => AddContributor()}
                            >
                            <View style={{}}>
                                <FontAwesome 
                                    name='chevron-right'
                                    color='#000'
                                    size={20}
                                />
                            </View>
                        </TouchableOpacity>
                        
                        
                    </View>
                    
                </View>

                {contributors.map((item, index) => {
                    return (
                        <View style={{}}>
                            <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 8, padding: 10, backgroundColor: '#171717', borderRadius: 12, overflow: 'hidden', width: Dimensions.get('window').width-80}}>
                                <View>
                                    <Text style={{fontWeight: '600', color: '#fff', fontSize: 13}}>
                                        {item.name}
                                    </Text>
                                    <Text style={{fontWeight: '400', color: '#ffffffa5', fontSize: 13}}>
                                        {item.contribution}
                                    </Text>
                                    <Text style={{fontWeight: '400', color: '#00ffff', fontSize: 13}}>
                                        {item.link}
                                    </Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => RemoveContributor(index)}>
                                    <FontAwesome 
                                        name='trash'
                                        color='#ffffffa5'
                                        size={20}
                                        style={{padding: 10}}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                            
                        </View>
                )})} 
                
                

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Summary *
                </Text>
                <View style={[styles.inputfield, {height: 140}]}>
                    <TextInput
                        placeholder='Max 200 characters'
                        placeholderTextColor='#ffffffa5'
                        style={{ height: 140, color: '#fff', width: '92%' }}
                        maxLength={200}
                        multiline={true}
                        numberOfLines={8}
                        onChangeText={val => setData({...data, summary: val})}
                        textAlignVertical='top'
                    />
                    <FontAwesome5 
                        name='check-circle'
                        color={data.summary !== '' ? 'cyan' : '#363636'}
                        size={20}
                    />
                </View>

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 30, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Description *
                </Text>
                <View style={[styles.inputfield, {height: 300}]}>
                    <TextInput
                        placeholder='Max 1500 characters'
                        placeholderTextColor='#ffffffa5'
                        style={[{ height: 300, color: '#fff', width: '92%', paddingBottom: 20 }]}
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

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 30, marginBottom: 10, alignSelf: 'flex-start'}]}>
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

                <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 30, marginBottom: 10, alignSelf: 'flex-start'}]}>
                    Tags
                </Text>

                <ScrollView 
                    scrollEnabled={false}
                    style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 10}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {TagsArray.map(({ name } : any, index) => (
                        <View key={index} style={{ marginTop: 10, marginRight: 10}}>
                            <TouchableOpacity onLongPress={() => RemoveFromTagArray(index)}>
                                <View style={{}}>
                                    <Text style={data.genre === 'after dark' ? styles.erotictagtext : styles.tagtext}>
                                        #{name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <View style={{ alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row', marginBottom: 20, marginTop: 0, }}>
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
                        <View style={{ borderWidth: 0.5, borderColor: '#fff', borderRadius: 15, overflow: 'hidden', alignSelf: 'center', marginHorizontal: 20, padding: 0, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 6}}>
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
                        Series
                    </Text>

                    <TouchableWithoutFeedback onPress={showSeriesModal}>
                        <View style={{ marginTop: 0, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                            <Text style={{ color: '#ffffffa5'}}>
                                Select series
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {series !== '' ? (
                        <View style={{marginTop: 20, marginHorizontal: 20 }}>
                            <Text style={{color: 'cyan'}}>
                                {series}
                            </Text>
                        </View>
                    ) : null}
                </View>

                <View style={{ width: '100%', marginBottom: 20, marginTop: 10, }}>
                    <Text style={[styles.subtitle, {marginLeft: 20, marginTop: 20, marginBottom: 10, alignSelf: 'flex-start'}]}>
                        Cover Art
                    </Text>

                    <TouchableWithoutFeedback onPress={pickImage}>
                        <View style={{ marginTop: 0, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
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
                        <View style={{ marginTop: 0, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                            <Text style={{ color: '#ffffffa5'}}>
                                Select audio file
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
            
                    {audioName !== '' ? (
                        <View style={{marginTop: 20, marginLeft: 20,  }}>
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