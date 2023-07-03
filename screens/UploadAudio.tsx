import React, {useState, useEffect, useRef} from 'react';
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
    FlatList,
    Linking,
    RefreshControl,
    Modal
}
from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, parseISO } from "date-fns";

import ImageCompress from '../components/functions/CompressImage'

import ModalDropdown from 'react-native-modal-dropdown';
import uuid from 'react-native-uuid';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createStory, createStoryTag, createTag, updateUser, createGenreTag, createMessage, createUser  } from '../src/graphql/mutations';
import { listTags, getUser, listGenres, listGenreTags, listUsers } from '../src/graphql/queries';

import { useRoute } from '@react-navigation/native';

const UploadAudio = ({navigation} : any) => {   

    const route = useRoute();
    //const {promptID} = route.params

    //set the current user state
    const [user, setUser] = useState()

    //text data input state holders. Will be sent to aws
    const [data, setData] = useState({
        title: '',
        summary: '',
        description: '',
        genreID: '',
        genre: '',
        author: '',
        narrator: '',
        artistName: '',
        time: 0,
        imageUri: '',
        audioUri: '',
        nsfw: false,
        narratorID: null,
        artistID: null,
        userID: null

    });

    //set state for the number authored so that upon upload can increase it by +1
    const [numAuthored, setNumAuthored] = useState(0)

    const [didUpdate, setDidUpdate] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

        //refresh function, does not work yet
        const onRefresh = () => {
            setIsFetching(true);
            setDidUpdate(!didUpdate)
            setTimeout(() => {
              setIsFetching(false);
            }, 2000);
          }

    //get the user in order to prefill the author's name
    useEffect(() => {
        const fetchUser = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();
                if (!userInfo) {return;}

            try {
            const userData = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))
                if (userData) {
                    //setData({...data, author: userData.data.getUser.pseudonym});
                    setNumAuthored(userData.data.getUser.numAuthored);
                    setUser(userData.data.getUser)
                    //setSharedAudio(userData.data.getUser.sharedWithAssets.items);
                    //setSharedArt(userData.data.getUser.sharedWithImageAssets.items);
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

    //determine where the image is coming from, locally or otherwise
    const [isLocalProfileImage, setIsLocalProfileImage] = useState(false);

//determine where the audio is coming from, locally or otherwise
    const [isLocalAudio, setIsLocalAudio] = useState(false);

    const ListAllGenreTags = async (extag: any) => {

        const Search = async (nextToken : any) => {

            const response = await API.graphql(graphqlOperation(
                listGenreTags, {
                    nextToken,
                    filter: {
                        tagID: {
                            eq: extag
                        },
                        genreID: {
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
                createGenreTag, {input: {tagID: extag, genreID: data.genreID}}
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


//PRIMARY FUNCTION for uploading all of the story data to the s3 bucket and app sync API
//There are 4 different functions depending on if a file must be uploaded to the s3 bucket or not
    const PublishStory = async () => {

        setIsPublishing(true);

        if (isLocalImage === true && isLocalAudio === true) {
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
                        artistName: data.artistName,
                        narratorID: data.narratorID,
                        artistID: data.artistID,
                        time: data.time,
                        approved: 'pending',
                        hidden: false,
                        imageUri: s3ResponseImage.key,
                        audioUri: s3ResponseAudio.key,
                        userID: data.userID,
                        nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : data.nsfw,
                        ratingAvg: 0,
                        ratingAmt: 0,
                        type: 'Story',
                        //promptID: promptID
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
                                createStoryTag, {input: {tagID: extag, storyID: result.data.createStory.id, }}
                            ))

                            ListAllGenreTags(extag);
                            
                        //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                        } else if (extag === undefined) {
                            let newTag = await API.graphql(graphqlOperation(
                                createTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase().replace(/ /g, ''), count: 0, nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false}}
                            ))

                            if (newTag) {
                                await API.graphql(graphqlOperation(
                                    createStoryTag, {input: {tagID: newTag.data.createTag.id, storyID: result.data.createStory.id}}
                                ))
                                await API.graphql(graphqlOperation(
                                    createGenreTag, {input: {tagID: newTag.data.createTag.id, genreID: data.genreID}}
                                ))
                            }
                        }
                    }
                }

            await API.graphql(
                graphqlOperation(updateUser, { input: {
                    id: userInfo.attributes.sub,
                    numAuthored: numAuthored + 1
                }
            }));

            await API.graphql(graphqlOperation(
                createMessage, {
                    input: {
                        type: 'Message',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userID: userInfo.attributes.sub,
                        otherUserID: null,
                        content: 'Your story, ' + data.title + ' is under review.\n\nIt may take up to 48 hours for approval. You will be notified when your story goes live.',
                        title: 'Thank you for submitting your story!',
                        subtitle: null,
                        isReadbyUser: false,
                        isReadByOtherUser: true,
                        docID: null,
                        request: null,
                        status: 'noreply'
                    }
                }
            ))

            setIsPublishing(false);
            navigation.goBack();

            //console.log(result);
                } catch (e) {
                    alert('Connection error. Please try again.')
                    setIsPublishing(false);
                    console.error(e);
        }
        } else if (isLocalImage === true && isLocalAudio === false) {
            try {
                let userInfo = await Auth.currentAuthenticatedUser();

                const responseImage = await fetch(localImageUri);
                const blobImage = await responseImage.blob();
                const filenameImage = uuid.v4().toString();
                const s3ResponseImage = await Storage.put(filenameImage, blobImage);
                
                let result = await API.graphql(
                    graphqlOperation(createStory, { input: 
                        {
                            title: data.title,
                            summary: data.summary,
                            description: data.description,
                            genreID: data.genreID,
                            author: data.author,
                            narrator: data.narrator,
                            narratorID: data.narratorID,
                            artistID: data.artistID,
                            time: data.time,
                            approved: 'pending',
                            hidden: false,
                            imageUri: s3ResponseImage.key,
                            audioUri: data.audioUri,
                            userID: data.userID,
                            nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : data.nsfw,
                            ratingAvg: 0,
                            ratingAmt: 0,
                            type: 'Story',
                            //promptID: promptID
                        }
                }))

                //for each tag, check and see if the tag alreadyt exists
                if (TagsArray.length > 0) {
                    //then for each tag, check to see if it already exists
                    for (let i = 0; i < TagsArray.length; i++) {
                        let tagCheck = TagsArray[i].name.toLowerCase().replace(/ /g, '')

                        let extag = await ListAllTags(tagCheck);

                        //if the tag exists, create a StoryTag with the tagID and storyID
                        if (extag !== undefined) {
                            await API.graphql(graphqlOperation(
                                createStoryTag, {input: {tagID: extag, storyID: result.data.createStory.id, }}
                            ))

                            ListAllGenreTags(extag);
                            
                        //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                        } else if (extag === undefined) {
                            let newTag = await API.graphql(graphqlOperation(
                                createTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase().replace(/ /g, ''), count: 0, nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false}}
                            ))

                            if (newTag) {
                                await API.graphql(graphqlOperation(
                                    createStoryTag, {input: {tagID: newTag.data.createTag.id, storyID: result.data.createStory.id}}
                                ))
                                await API.graphql(graphqlOperation(
                                    createGenreTag, {input: {tagID: newTag.data.createTag.id, genreID: data.genreID}}
                                ))
                            }
                        }
                    }
                }

            let updateUserInfo = await API.graphql(
                graphqlOperation(updateUser, { input: {
                    id: userInfo.attributes.sub,
                    numAuthored: numAuthored + 1
                }
            }));
            console.log(updateUserInfo);

            await API.graphql(graphqlOperation(
                createMessage, {
                    input: {
                        type: 'Message',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userID: userInfo.attributes.sub,
                        otherUserID: null,
                        content: 'Your story, ' + data.title + ' is under review.\n\nIt may take up to 48 hours for approval. You will be notified when your story goes live.',
                        title: 'Thank you for submitting your story!',
                        subtitle: null,
                        isReadbyUser: false,
                        isReadByOtherUser: true,
                        docID: null,
                        request: null,
                        status: 'noreply'
                    }
                }
            ))

            setIsPublishing(false);
            navigation.goBack();

            console.log(result);
                } catch (e) {
                    alert('Connection error. Please try again.')
                    setIsPublishing(false);
                    console.error(e);
        }
        } else if (isLocalImage === false && isLocalAudio === true) {
            try {
                let userInfo = await Auth.currentAuthenticatedUser();
            
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
                            narratorID: data.narratorID,
                            artistID: data.artistID,
                            time: data.time,
                            approved: 'pending',
                            hidden: false,
                            imageUri: data.imageUri,
                            audioUri: s3ResponseAudio.key,
                            userID: data.userID,
                            nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : data.nsfw,
                            ratingAvg: 0,
                            ratingAmt: 0,
                            type: 'Story',
                            //promptID: promptID
                        }
                }))

                //for each tag, check and see if the tag alreadyt exists
                if (TagsArray.length > 0) {
                    //then for each tag, check to see if it already exists
                    for (let i = 0; i < TagsArray.length; i++) {
                        let tagCheck = TagsArray[i].name.toLowerCase().replace(/ /g, '')

                        let extag = await ListAllTags(tagCheck);

                        //if the tag exists, create a StoryTag with the tagID and storyID
                        if (extag !== undefined) {
                            await API.graphql(graphqlOperation(
                                createStoryTag, {input: {tagID: extag, storyID: result.data.createStory.id, }}
                            ))

                            ListAllGenreTags(extag);
                            
                        //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                        } else if (extag === undefined) {
                            let newTag = await API.graphql(graphqlOperation(
                                createTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase().replace(/ /g, ''), count: 0, nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false}}
                            ))

                            if (newTag) {
                                await API.graphql(graphqlOperation(
                                    createStoryTag, {input: {tagID: newTag.data.createTag.id, storyID: result.data.createStory.id}}
                                ))
                                await API.graphql(graphqlOperation(
                                    createGenreTag, {input: {tagID: newTag.data.createTag.id, genreID: data.genreID}}
                                ))
                            }
                        }
                    }
                }

            let updateUserInfo = await API.graphql(
                graphqlOperation(updateUser, { input: {
                    id: userInfo.attributes.sub,
                    numAuthored: numAuthored + 1
                }
            }));
            console.log(updateUserInfo);

            await API.graphql(graphqlOperation(
                createMessage, {
                    input: {
                        type: 'Message',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userID: userInfo.attributes.sub,
                        otherUserID: null,
                        content: 'Your story, ' + data.title + ' is under review.\n\nIt may take up to 48 hours for approval. You will be notified when your story goes live.',
                        title: 'Thank you for submitting your story!',
                        subtitle: null,
                        isReadbyUser: false,
                        isReadByOtherUser: true,
                        docID: null,
                        request: null,
                        status: 'noreply'
                    }
                }
            ))

            setIsPublishing(false);
            navigation.goBack();

            console.log(result);
                } catch (e) {
                    alert('Connection error. Please try again.')
                    setIsPublishing(false);
                    console.error(e);
        }
        } else if (isLocalImage === false && isLocalAudio === false) {
            try {
                let userInfo = await Auth.currentAuthenticatedUser();

                
                let result = await API.graphql(
                    graphqlOperation(createStory, { input: 
                        {
                            title: data.title,
                            summary: data.summary,
                            description: data.description,
                            genreID: data.genreID,
                            author: data.author,
                            narrator: data.narrator,
                            narratorID: data.narratorID,
                            artistID: data.artistID,
                            time: data.time,
                            approved: 'pending',
                            hidden: false,
                            imageUri: data.imageUri,
                            audioUri: data.audioUri,
                            userID: data.userID,
                            nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : data.nsfw,
                            ratingAvg: 0,
                            ratingAmt: 0,
                            type: 'Story',
                            //promptID: promptID
                        }
                }))

                //for each tag, check and see if the tag alreadyt exists
                if (TagsArray.length > 0) {
                    //then for each tag, check to see if it already exists
                    for (let i = 0; i < TagsArray.length; i++) {
                        let tagCheck = TagsArray[i].name.toLowerCase().replace(/ /g, '')

                        let extag = await ListAllTags(tagCheck);

                        //if the tag exists, create a StoryTag with the tagID and storyID
                        if (extag !== undefined) {
                            await API.graphql(graphqlOperation(
                                createStoryTag, {input: {tagID: extag, storyID: result.data.createStory.id, }}
                            ))

                            ListAllGenreTags(extag);
                            
                        //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                        } else if (extag === undefined) {
                            let newTag = await API.graphql(graphqlOperation(
                                createTag, {input: {createdAt: new Date(), type: 'Tag', tagName: TagsArray[i].name.toLowerCase().replace(/ /g, ''), count: 0, nsfw: data.genreID === '1108a619-1c0e-4064-8fce-41f1f6262070' ? true : false}}
                            ))

                            if (newTag) {
                                await API.graphql(graphqlOperation(
                                    createStoryTag, {input: {tagID: newTag.data.createTag.id, storyID: result.data.createStory.id}}
                                ))
                                await API.graphql(graphqlOperation(
                                    createGenreTag, {input: {tagID: newTag.data.createTag.id, genreID: data.genreID}}
                                ))
                            }
                        }
                    }
                }

            let updateUserInfo = await API.graphql(
                graphqlOperation(updateUser, { input: {
                    id: userInfo.attributes.sub,
                    numAuthored: numAuthored + 1
                }
            }));
            console.log(updateUserInfo);

            await API.graphql(graphqlOperation(
                createMessage, {
                    input: {
                        type: 'Message',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userID: userInfo.attributes.sub,
                        otherUserID: null,
                        content: 'Your story, ' + data.title + ' is under review.\n\nIt may take up to 48 hours for approval. You will be notified when your story goes live.',
                        title: 'Thank you for submitting your story!',
                        subtitle: null,
                        isReadbyUser: false,
                        isReadByOtherUser: true,
                        docID: null,
                        request: null,
                        status: 'noreply'
                    }
                }
            ))

            setIsPublishing(false);
            navigation.goBack();

            console.log(result);
                } catch (e) {
                    alert('Connection error. Please try again.')
                    setIsPublishing(false);
                    console.error(e);
        }
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
        setIsLocalProfileImage(true);
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
      const containerStyle = {
          backgroundColor: '#363636', 
          padding: 20,
          borderRadius: 20, 
      }; 

//narrator modal for selecting shared audio
    const [visible2, setVisible2] = useState(false);
    
    const showNarratorModal = () => setVisible2(true);

    const hideNarratorModal = () => setVisible2(false);

    //author modal for selecting shared audio
    const [visible4, setVisible4] = useState(false);
    
    const showAuthorModal = () => setVisible4(true);

    const hideAuthorModal = () => setVisible4(false);

//artist modal for selecting shared art
    const [visible3, setVisible3] = useState(false);
    
    const showArtModal = () => setVisible3(true);

    const hideArtModal = () => setVisible3(false);

    //create user modal
    const [visible5, setVisible5] = useState(false);
    
    const showCreateUserModal = () => setVisible5(true);

    const hideCreateUserModal = () => setVisible5(false);
 
      
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

//local audio picking

    const [localAudioVisible, setLocalAudioVisible] = useState(false);

    const showLocalAudioModal = () => {setLocalAudioVisible(true)}

    const hideLocalAudioModal = () => {setLocalAudioVisible(false)}

    const LocalAudioContainerStyle = {
        backgroundColor: 'transparent', 
        padding: 15,
    }; 

    //select and set the audio
    const [localAudioArray, setLocalAudioArray] = useState([])

    useEffect(() => {
        const PickLocalAudio = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();

            let saved = await AsyncStorage.getAllKeys();
        
            if (saved != null) {
                let result = saved.filter((item) => item.includes("recording" + userInfo.attributes.sub));
            setLocalAudioArray(result)
            } 
        }
        PickLocalAudio();
    }, [])
    
//flatlist item for selecting the blip audio file from async storage
    const Item = ({item} : any) => {

        let [itemState, setItemState] = useState({
            title: '',
            time: 0,
            created: new Date(),
            id: null,
            audio: '',
        })

        const SetAudio = () => {
            setLocalAudioUri(itemState.audio);
            setAudioName(itemState.title);
            setData({...data, time: itemState.time})
            setIsLocalAudio(true);
            hideLocalAudioModal();
        }

        //get the item from async storage
        useEffect(() => {
            let componentMounted = true;
            const fetchData = async () => {
                try {
                    console.log('whats going on here')
                    let object = await AsyncStorage.getItem(item);
                    let objs = object ? JSON.parse(object) : null
                    if(componentMounted) {
                        setItemState({
                            title: objs.title,
                            time: objs.time,
                            created: parseISO(objs.created),
                            id: objs.id,
                            audio: objs.audioUri
                        })
                }
                } catch(e) {
                    // read error
                }
                
            };
            fetchData();
            return () => {
            componentMounted = false;
            }
        }, []);

        return (
            <View style={{marginBottom: 10, padding: 10, width: '100%', backgroundColor: '#232323', alignSelf: 'center', borderRadius: 10}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={SetAudio}>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                   <Text style={{color: '#fff', fontWeight: 'bold', marginBottom: 2}}>
                                        {itemState.title}
                                    </Text>
                                    <Text style={{color: '#ffffffa5', marginBottom: 6, fontSize: 12}}>
                                        {format(itemState.created, "MMM do yyyy")}
                                    </Text> 
                                </View>
                                
                                <Text style={{color: '#fff', fontSize: 12}}>
                                    {itemState.time}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            </View> 
        )
        

    }

    const renderItem = ({ item } : any) => (

        <Item 
          item={item}
        />
    );

    //function for selecting a narrator
    const [narrators, setNarrators] = useState([]);

    useEffect(() => {

        let narrs = []

        const fetchNarrators = async (nextToken : any) => {
            let response = await API.graphql(graphqlOperation(
                listUsers, {nextToken, 
                    filter: {
                    isNarrator: {
                        eq: true
                    },
                }
            }
            ))

            for (let i = 0; i < response.data.listUsers.items.length; i++) {
                narrs.push(response.data.listUsers.items[i])
            }

            if (response.data.listUsers.nextToken) {
               fetchNarrators(response.data.listUsers.nextToken);
               return;
            } else {
                setNarrators(narrs)
            }
        }

        fetchNarrators(null);
    }, [])

        //function for selecting a author
        const [authors, setAuthors] = useState([]);

        useEffect(() => {
    
            let auths = []
    
            const fetchAuthors = async (nextToken : any) => {
                let response = await API.graphql(graphqlOperation(
                    listUsers, {nextToken, filter: {
                        isPublisher: {
                            eq: true
                        },
                    }}
                ))
    
                for (let i = 0; i < response.data.listUsers.items.length; i++) {
                    auths.push(response.data.listUsers.items[i])
                }

                setAuthors(auths)
    
                if (response.data.listUsers.nextToken) {
                   fetchAuthors(response.data.listUsers.nextToken);
                   return;
                } else {
                    setAuthors(auths)
                    return
                }
            }
    
            fetchAuthors(null);
        }, [])

        //function for selecting a narrator
        const [illustrators, setIllustrators] = useState([]);

        useEffect(() => {
    
            let ills = []
    
            const fetchIllustrators = async (nextToken : any) => {
                let response = await API.graphql(graphqlOperation(
                    listUsers, {nextToken, filter: {
                        isArtist: {
                            eq: true
                        },
                    }}
                ))
    
                for (let i = 0; i < response.data.listUsers.items.length; i++) {
                    ills.push(response.data.listUsers.items[i])
                }
    
                if (response.data.listUsers.nextToken) {
                    fetchIllustrators(response.data.listUsers.nextToken);
                    return;
                } else {
                    setIllustrators(ills)
                }
            }
    
            fetchIllustrators(null);
        }, [])


    const UserItem = ({id, name, imageUri, pseudonym, narratorPseudo, artistPseudo, numAuthored} : any) => {

        const SetUser = () => {
            if (visible4 === true) {
                setData({...data, userID: id, author: pseudonym}) 
                hideAuthorModal()
            }
            if (visible2 === true) {
                setData({...data, narratorID: id, narrator: narratorPseudo}) 
                hideNarratorModal()
            }
            if (visible3 === true) {
                setData({...data, artistID: id, artistName: artistPseudo}) 
                hideArtModal()
            }
        }

        const [imageU, setImageU] = useState('')

        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri)
                setImageU(response)
            }
            fetchImage()
        }, [])
        
        return (
            <View>
                <View style={{marginTop: 20, padding: 10, width: '100%', backgroundColor: '#232323', alignSelf: 'center', borderRadius: 10}}>
                    <TouchableOpacity onPress={SetUser}>
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                            <Image 
                                source={{uri: imageU}}
                                style={{width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray' }}
                            />
                            <Text style={{color: '#fff', fontWeight: 'bold', marginBottom: 2, textTransform: 'capitalize'}}>
                                {name}
                            </Text>
                        </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderUser = ({item} : any) => {

        return (
            <UserItem 
                id={item.id}
                name={item.name}
                imageUri={item.imageUri}
                isPublisher={item.isPublisher}
                isArtist={item.isArtist}
                isNarrator={item.isNarrator}
                pseudonym={item.pseudonym}
                narratorPseudo={item.narratorPseudo}
                artistPseudo={item.artistPseudo}
                numAuthored={item.numAuthored}
                
            />
        )
    }

    //function for selecting a dhared art file
    const [sharedArt, setSharedArt] = useState([]);

    const SharedArtItem = ({id, title, imageUri, isSample, userID, userName, sharedUserID, sharedUserName} : any) => {
        
        const SCREEN_WIDTH = Dimensions.get('window').width;

        const [imageU, setImageU] = useState('');

        useEffect(() => {
            const fetchUri = async () => {
                let response = await Storage.get(imageUri);
                setImageU(response);
            }
            console.log(imageUri)
            fetchUri();
        }, [])

        const SetImage = () => {
            setLocalImageUri(imageU);
            setIsLocalImage(false);
            setData({...data, artistID: userID, imageUri: imageUri, artistName: userName})
            hideArtModal();
        }
        
        return (
            <TouchableWithoutFeedback onPress={SetImage}>
                <View style={{marginTop: 20, marginHorizontal: 10}}>
                    <Image 
                        source={{uri: imageU}}
                        style={{borderRadius: 15, width: (SCREEN_WIDTH-80)/2, height: ((SCREEN_WIDTH-40)/2)*0.75}}
                    />
                    <Text style={{color: '#fff', marginTop: 4}}>
                        {title}
                    </Text>
                    <Text style={{color: '#00ffffa5'}}>
                        Shared by {userName}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            
        )
    }

    const renderSharedArt = ({item} : any) => {

        return (
            <SharedArtItem 
                id={item.id}
                title={item.title}
                imageUri={item.imageUri}
                isSample={item.isSample}
                userID={item.userID}
                userName={item.user.artistPseudo}
                sharedUserID={item.sharedUserID}
                sharedUserName={item.sharedUser.pseudonym}
                createdAt={item.createdAt}
            />
        )
    }

    const [newUserData, setNewUserData] = useState({
        name: '',
        imageUri: '',
        bio: '',
        numAuthored: 0,
        pseudonym: '',
        narratorPseudo: '',
        artistPseudo: '',
        isNarrator: false,
        isArtist: false,
        isPublisher: false,
        narratorText: '',
        artistText: '',
        plan: 'admincreated'
    })

    const CreateNewUser = async () => {

        setIsPublishing(true)

        try {

            if (isLocalProfileImage === true) {
                 const responseImage = await fetch(localImageUri);
                const blobImage = await responseImage.blob();
                const filenameImage = uuid.v4().toString();
                const s3ResponseImage = await Storage.put(filenameImage, blobImage);

                let response = await API.graphql(graphqlOperation(
                    createUser, {input: {
                        name: newUserData.name,
                        imageUri: s3ResponseImage.key,
                        bio: newUserData.bio,
                        numAuthored: 0,
                        pseudonym: newUserData.pseudonym,
                        narratorPseudo: newUserData.narratorPseudo,
                        artistPseudo: newUserData.artistPseudo,
                        isNarrator: newUserData.isNarrator,
                        isArtist: newUserData.isArtist,
                        isPublisher: newUserData.isPublisher,
                        narratorText: newUserData.narratorText,
                        artistText: newUserData.artistText,
                        plan: 'admincreated'
                    }}
                ))
            
                if (response) {
                    setNewUserData({
                        name: '',
                        imageUri: '',
                        bio: '',
                        numAuthored: 0,
                        pseudonym: '',
                        narratorPseudo: '',
                        artistPseudo: '',
                        isNarrator: false,
                        isArtist: false,
                        isPublisher: false,
                        narratorText: '',
                        artistText: '',
                        plan: 'admincreated'
                    })
                    hideCreateUserModal();
                    setIsPublishing(false);
                    setIsLocalImage(false);
                    setIsLocalProfileImage(false);
                }

            } else {
                let response = await API.graphql(graphqlOperation(
                    createUser, {input: {
                        name: newUserData.name,
                        bio: newUserData.bio,
                        numAuthored: 0,
                        pseudonym: newUserData.pseudonym,
                        narratorPseudo: newUserData.narratorPseudo,
                        artistPseudo: newUserData.artistPseudo,
                        isNarrator: newUserData.isNarrator,
                        isArtist: newUserData.isArtist,
                        isPublisher: newUserData.isPublisher,
                        narratorText: newUserData.narratorText,
                        artistText: newUserData.artistText,
                        plan: 'admincreated'
                    }}
                ))

                if (response) {
                    setNewUserData({
                        name: '',
                        imageUri: '',
                        bio: '',
                        numAuthored: 0,
                        pseudonym: '',
                        narratorPseudo: '',
                        artistPseudo: '',
                        isNarrator: false,
                        isArtist: false,
                        isPublisher: false,
                        narratorText: '',
                        artistText: '',
                        plan: 'admincreated'
                    })
                    hideCreateUserModal();
                    setIsPublishing(false);
                    setIsLocalImage(false);
                    setIsLocalProfileImage(false);
                }

            }

            
        } catch {
            alert('Error')
            setIsPublishing(false)
        }
    }

  return (

        <ScrollView>
            <View style={styles.container}>


{/* local audio list modal */}
                <Modal visible={localAudioVisible} onDismiss={hideLocalAudioModal} animationType="slide" transparent={true}>
                    <ScrollView style={{ padding: 20, backgroundColor: '#363636', borderRadius: 15,}}>
                        <View>
                            <FlatList 
                                data={localAudioArray}
                                renderItem={renderItem}
                                keyExtractor={item => item}
                                style={{}}
                                initialNumToRender={20}
                                ListEmptyComponent={() => {
                                    return(
                                        <View style={{alignItems: 'center', margin: 30}}>
                                            <Text style={{color: '#fff'}}>
                                                There is nothing here.
                                            </Text>
                                        </View>
                                    )
                                }}
                                showsVerticalScrollIndicator={false}    
                                ListFooterComponent={ () => {
                                    return (
                                    <View style={{ height:  60}}>
                                    </View>
                                );}}
                                ListHeaderComponent={ () => {
                                    return (
                                    <View style={{ height:  60}}>
                                        <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                                            My Recordings
                                        </Text>
                                    </View>
                                );}}
                            />
                        </View>
                    </ScrollView>
                </Modal>

{/* confirm modal */}
                <Modal visible={visible} onDismiss={hideModal} animationType="slide" transparent={true}>
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

                        <View style={{marginBottom: 10, width: Dimensions.get('window').width - 80, height: 1, backgroundColor: 'gray'}}>
                        </View>

                        

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
{/* narrator modal */}
                <Modal visible={visible2} onDismiss={hideNarratorModal} animationType="slide" transparent={true}>
                    <View style={{height: '80%'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 10}}>
                            Select Narrator
                        </Text>
                        <View style={{marginVertical: 10, alignSelf: 'center', width: '90%', height: 1, backgroundColor: '#fff'}}/>
                        <FlatList 
                            data={narrators}
                            keyExtractor={item => item.id}
                            renderItem={renderUser}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isFetching}
                                    onRefresh={onRefresh}
                                />
                            }
                            ListFooterComponent={() => {
                                return(
                                    <View style={{height: 60}}/>
                                )
                            }}
                        />
                        
                    </View>
                </Modal>
{/* author modal */}
                <Modal visible={visible4} onDismiss={hideAuthorModal} animationType="slide" transparent={true}>
                    <View style={{height: '80%'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 10}}>
                            Select Author
                        </Text>
                        <View style={{marginVertical: 10, alignSelf: 'center', width: '90%', height: 1, backgroundColor: '#fff'}}/>
                        <FlatList 
                            data={authors}
                            keyExtractor={item => item.id}
                            renderItem={renderUser}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isFetching}
                                    onRefresh={onRefresh}
                                />
                            }
                            ListFooterComponent={() => {
                                return(
                                    <View style={{height: 60}}/>
                                )
                            }}
                        />
                        
                    </View>
                </Modal>
{/* artist modal */}
                <Modal visible={visible3} onDismiss={hideArtModal} animationType="slide" transparent={true}>
                    <View style={{height: '80%'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                           Select Illustrator
                        </Text>
                        <View style={{marginVertical: 10, alignSelf: 'center', width: '90%', height: 1, backgroundColor: '#fff'}}/>
                        <FlatList 
                            data={illustrators}
                            keyExtractor={item => item.id}
                            renderItem={renderUser}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isFetching}
                                    onRefresh={onRefresh}
                                />
                            }
                            ListFooterComponent={() => {
                                return(
                                    <View style={{height: 60}}/>
                                )
                            }}
                        />
                        
                    </View>
                </Modal>
{/* create user modal */}
                <Modal visible={visible5} onDismiss={hideCreateUserModal} animationType="slide" transparent={true}>
                    <ScrollView style={{height: '80%', marginTop: 20}} showsVerticalScrollIndicator={false}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
                           Create New User
                        </Text>
                        <View style={{marginVertical: 20, alignSelf: 'center', width: '90%', height: 1, backgroundColor: '#fff'}}/>
                        
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20}}>
                            <TouchableWithoutFeedback onPress={() => setNewUserData({...newUserData, isPublisher: !newUserData.isPublisher})}>
                                <View style={{backgroundColor: newUserData.isPublisher === true ? 'cyan' : 'gray', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 10}}>
                                    <Text>
                                        Publisher
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setNewUserData({...newUserData, isNarrator: !newUserData.isNarrator})}>
                                <View style={{backgroundColor: newUserData.isNarrator === true ? 'cyan' : 'gray', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 10}}>
                                    <Text>
                                        Narrator
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setNewUserData({...newUserData, isArtist: !newUserData.isArtist})}>
                                <View style={{backgroundColor: newUserData.isArtist === true ? 'cyan' : 'gray', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 10}}>
                                    <Text>
                                        Illustrator
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View>
                            <Text style={{color: '#00ffff'}}>
                                Name
                            </Text>
                            <View style={[styles.inputfield, {backgroundColor: '#000', height: 50, marginTop: 10, paddingVertical: 2}]}>
                                <TextInput
                                    placeholder='....'
                                    placeholderTextColor='#ffffffa5'
                                    style={{color: '#fff'}}
                                    maxLength={70}
                                    multiline={true}
                                    numberOfLines={2}
                                    onChangeText={val => setNewUserData({...newUserData, name: val})}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={{color: '#00ffff'}}>
                                Image
                            </Text>
                            <View style={{ width: '90%'}}>
                                <TouchableWithoutFeedback onPress={pickImage}>
                                    <View style={{ marginLeft: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                        <Text style={{ textAlign: 'center', color: '#ffffffa5'}}>
                                            Select Image
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            {localImageUri !== '' ? (
                            <Image 
                                source={{uri: localImageUri}}
                                style={{alignSelf: 'center', backgroundColor: 'gray', marginVertical: 20, borderRadius: 15, width: Dimensions.get('window').width - 40, height: 200}}
                            />
                        ) : null}
                        </View>

                        <View>
                            <Text style={{color: '#00ffff'}}>
                                Bio
                            </Text>
                            <View style={[styles.inputfield, {backgroundColor: '#000', height: 50, marginTop: 10, paddingVertical: 2}]}>
                                <TextInput
                                    placeholder='....'
                                    placeholderTextColor='#ffffffa5'
                                    style={{color: '#fff'}}
                                    maxLength={250}
                                    multiline={true}
                                    numberOfLines={10}
                                    onChangeText={val => setNewUserData({...newUserData, bio: val})}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={{color: '#00ffff'}}>
                                Pseudonym
                            </Text>
                            <View style={[styles.inputfield, {backgroundColor: '#000', height: 50, marginTop: 10, paddingVertical: 2}]}>
                                <TextInput
                                    placeholder='....'
                                    placeholderTextColor='#ffffffa5'
                                    style={{color: '#fff'}}
                                    maxLength={70}
                                    multiline={true}
                                    numberOfLines={2}
                                    onChangeText={val => setNewUserData({...newUserData, pseudonym: val})}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={{color: '#00ffff'}}>
                                Narrator Pseudonym
                            </Text>
                            <View style={[styles.inputfield, {backgroundColor: '#000', height: 50, marginTop: 10, paddingVertical: 2}]}>
                                <TextInput
                                    placeholder='....'
                                    placeholderTextColor='#ffffffa5'
                                    style={{color: '#fff'}}
                                    maxLength={70}
                                    multiline={true}
                                    numberOfLines={2}
                                    onChangeText={val => setNewUserData({...newUserData, narratorPseudo: val})}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={{color: '#00ffff'}}>
                                Illustrator Pseudonym
                            </Text>
                            <View style={[styles.inputfield, {backgroundColor: '#000', height: 50, marginTop: 10, paddingVertical: 2}]}>
                                <TextInput
                                    placeholder='....'
                                    placeholderTextColor='#ffffffa5'
                                    style={{color: '#fff'}}
                                    maxLength={70}
                                    multiline={true}
                                    numberOfLines={2}
                                    onChangeText={val => setNewUserData({...newUserData, artistPseudo: val})}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={{color: '#00ffff'}}>
                                Illustrator Bio
                            </Text>
                            <View style={[styles.inputfield, {backgroundColor: '#000', height: 50, marginTop: 10, paddingVertical: 2}]}>
                                <TextInput
                                    placeholder='....'
                                    placeholderTextColor='#ffffffa5'
                                    style={{color: '#fff'}}
                                    maxLength={250}
                                    multiline={true}
                                    numberOfLines={10}
                                    onChangeText={val => setNewUserData({...newUserData, artistText: val})}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={{color: '#00ffff'}}>
                                Narrator Bio
                            </Text>
                            <View style={[styles.inputfield, {backgroundColor: '#000', height: 50, marginTop: 10, paddingVertical: 2}]}>
                                <TextInput
                                    placeholder='....'
                                    placeholderTextColor='#ffffffa5'
                                    style={{color: '#fff'}}
                                    maxLength={250}
                                    multiline={true}
                                    numberOfLines={10}
                                    onChangeText={val => setNewUserData({...newUserData, narratorText: val})}
                                />
                            </View>
                        </View>

                        <View>
                            {isPublishing === true ? (
                                <ActivityIndicator size='small' color='cyan'/>
                            ) : (
                                <TouchableOpacity onPress={CreateNewUser}>
                                    <View style={{marginVertical: 40, backgroundColor: 'cyan', paddingVertical: 6, paddingHorizontal: 20, borderRadius: 15}}>
                                        <Text style={{textAlign: 'center'}}>
                                            Create User
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>

                    </ScrollView>
                </Modal>



                <View style={{ marginTop: 50, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <AntDesign 
                        name='close'
                        size={25}
                        color='#fff'
                        onPress={ () => navigation.goBack()}
                    /> 
                </View>
                <View style={{ alignItems: 'center'}}> 
                    <Text style={[styles.title, {marginBottom: 50}]}>
                        Admin Upload
                    </Text>

                    <Text style={styles.inputheader}>
                        Story Title *
                    </Text>
                    <View style={[styles.inputfield, {}]}>
                        
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

                    <Text style={styles.inputheader}>
                        Summary *
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput
                            placeholder='Max 200 characters'
                            placeholderTextColor='#ffffffa5'
                            style={[styles.textInput, { height: 80 }]}
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

                    <Text style={styles.inputheader}>
                        Description *
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput
                            placeholder='Max 1500 characters'
                            placeholderTextColor='#ffffffa5'
                            style={[styles.textInput, { height: 120 }]}
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

                    <Text style={styles.inputheader}>
                        Genre *
                    </Text>
                    <View style={{ 
                            width: '90%', 
                            marginBottom: 20, 
                            backgroundColor: '#363636',
                            marginHorizontal: 20,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            }}>
                        <ModalDropdown 
                            options={Genre}
                            defaultValue='Select Genre'
                            defaultTextStyle={{ color: '#ffffffa5'}}
                            onSelect={(val) => ConvertToString(val)}
                            textStyle={{ color: 'cyan', fontSize: 14, textTransform: 'capitalize',}}
                            dropdownStyle={{ 
                                backgroundColor: '#363636', 
                                width: '80%', 
                                borderWidth: 0,
                                borderRadius: 15,
                                height: Genre.length*15,
                                marginTop: 10
                            }}
                            dropdownTextStyle={{ 
                                backgroundColor: 'transparent',
                                color: '#fff',
                                fontSize: 14,
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                textTransform: 'capitalize',
                            }}
                            dropdownTextHighlightStyle={{
                                color: 'cyan'
                            }}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={data.genreID !== '' ? 'cyan' : '#292929'}
                            size={20}
                        />

                    </View>

                    <Text style={styles.inputheader}>
                        Tags
                    </Text>

                    <ScrollView 
                        scrollEnabled={false}
                        style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
                            <View style={{ marginHorizontal: 20, padding: 10}}>
                                <FontAwesome5
                                    name='chevron-up'
                                    size={20}
                                    color='#fff'
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.inputheader}>
                        Create User
                    </Text>

                    <TouchableWithoutFeedback onPress={showCreateUserModal}>
                        <View style={{ width: Dimensions.get('window').width - 40, marginVertical: 20, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                            <Text style={{ color: '#ffffffa5'}}>
                                Create User
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={styles.inputheader}>
                        Author *
                    </Text>
                
                    <Text style={{color: 'cyan'}}>
                        {data.userID}
                    </Text>
                    
                    <TouchableWithoutFeedback onPress={showAuthorModal}>
                        <View style={{ width: Dimensions.get('window').width - 40, marginVertical: 20, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                            <Text style={{ color: '#ffffffa5'}}>
                                Select Author
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={styles.inputheader}>
                        Narrator *
                    </Text>
                    <Text style={{color: 'cyan'}}>
                        {data.narratorID}
                    </Text>
                    <TouchableWithoutFeedback onPress={showNarratorModal}>
                        <View style={{ width: Dimensions.get('window').width - 40, marginVertical: 20, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                            <Text style={{ color: '#ffffffa5'}}>
                                Select Narrator
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={styles.inputheader}>
                        Illustrator *
                    </Text>
                    <Text style={{color: 'cyan'}}>
                        {data.artistID}
                    </Text>
                    <TouchableWithoutFeedback onPress={showArtModal}>
                        <View style={{ width: Dimensions.get('window').width - 40, marginVertical: 20, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                            <Text style={{ color: '#ffffffa5'}}>
                                Select Illustrator
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={{ width: '100%', marginBottom: 20, marginTop: 10, }}>
                    <Text style={styles.inputheader}>
                        Cover Art
                    </Text>
                        
                        {/* <TouchableWithoutFeedback onPress={showArtModal}>
                            <View style={{ marginTop: 0, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <Text style={{ color: '#ffffffa5'}}>
                                    Select from shared art
                                </Text>
                            </View>
                        </TouchableWithoutFeedback> */}

                        <TouchableWithoutFeedback onPress={pickImage}>
                            <View style={{ marginTop: 20, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <Text style={{ color: '#ffffffa5'}}>
                                    Select local image
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

                    <Text style={[styles.inputheader, {marginTop: 10}]}>
                        Audio *
                    </Text>
                    <View style={{ width: '100%', marginBottom: 0, marginTop: 0, }}>
                        {/* <TouchableWithoutFeedback onPress={showNarratorModal}>
                            <View style={{ marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <Text style={{ textAlign: 'center', color: '#ffffffa5'}}>
                                    Select shared audio
                                </Text>
                            </View>
                        </TouchableWithoutFeedback> */}
                    </View>

                        <View style={{width: '100%', justifyContent: 'space-between', marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ width: '48%'}}>
                                <TouchableWithoutFeedback onPress={pickAudio}>
                                    <View style={{ marginLeft: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                        <Text style={{ textAlign: 'center', color: '#ffffffa5'}}>
                                            {'Select local audio'}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={{ width: '48%'}}>
                                <TouchableWithoutFeedback onPress={showLocalAudioModal}>
                                    <View style={{ marginRight: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                        <Text style={{ textAlign: 'center', color: '#ffffffa5'}}>
                                            {'Select Blip recording'}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    

                    {audioName !== '' ? (
                        <View style={{marginTop: 20, }}>
                            <Text style={{color: 'cyan'}}>
                                {audioName}
                            </Text>
                        </View>
                    ) : null}

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
                            <View style={[styles.uploadbutton, {
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