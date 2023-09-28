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
    Linking,
    Modal
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as ImagePicker from 'expo-image-picker';

import { useRoute } from '@react-navigation/native';

import uuid from 'react-native-uuid';

import { API, graphqlOperation, } from "aws-amplify";
import { 
    createTag, 
    createEroticTag, 
    createEroticStoryTag, 
    deleteEroticStoryTag, 
    createEroticaTag, 
    updateStory, 
    createStoryTag, 
    deleteStoryTag, 
    createGenreTag 
} from '../src/graphql/mutations';

import { 
    genreTagsByTagId, 
    tagsByName, 
    getStory, 
    eroticaTagsByEroticTagId, 
    eroticTagsByName, 
    storyTagsByStoryId, 
    eroticStoryTagsByStoryId 
} from '../src/graphql/queries';


const EditAudio = ({navigation} : any) => {  
    
//recieve story ID as props
    const route = useRoute();
    const {storyID, genre} = route.params;

//set the current story
    const [Story, setStory] = useState({})

//get the story
    useEffect(() => {
        const fetchStory = async () => {

            let arr = [];
        
        try {
            const storyData = await API.graphql(graphqlOperation(getStory, {id: storyID}))

            console.log(storyData.data.getStory.tags.items)

            if (storyData) {
                setStory(storyData.data.getStory);

                for (let i = 0; i < storyData.data.getStory.tags.items.length; i++) {
                    arr.push(storyData.data.getStory.tags.items[i].tag)
                }
                setCurrentTags(arr)
            }

            const tagData = await API.graphql(graphqlOperation(
                storyTagsByStoryId, {storyId: storyID}
            ))
            setCurrentStoryTags(tagData.data.storyTagsByStoryId.items)
            

            

        } catch (e) {
            console.log(e);
        }}

        const fetchEroticStory = async () => {

            let arr = []
        
            try {
                const storyData = await API.graphql(graphqlOperation(getStory, {id: storyID}))
    
                if (storyData) {
                    setStory(storyData.data.getStory);
                    for (let i = 0; i < storyData.data.getStory.eroticTags.items.length; i++) {
                        arr.push(storyData.data.getStory.eroticTags.items[i].eroticTag)
                    }
                    setCurrentTags(arr)
                }
    
                const tagData = await API.graphql(graphqlOperation(
                    eroticStoryTagsByStoryId, {storyId: storyID}
                ))

                setCurrentStoryTags(tagData.data.eroticStoryTagsByStoryId.items)
                
    
                
    
            } catch (e) {
                console.log(e);
            }}

        if (genre === 'after dark') {
            fetchEroticStory();
        } else {
            fetchStory();
        }
        
    }, [storyID])

//text data input state holders. Will be sent to aws
    const [data, setData] = useState({
        title: Story.title,
        summary: Story.summary,
        description: Story.description,
        imageUri: Story.imageUri,
    });

//placeholder for the local image uri
const [localImageUri, setLocalImageUri] = useState('');

//Tags flatlist, data, and functions

    const clear = useRef()

    const [TagsArray, setTagsArray] = useState([])

    const [currentTags, setCurrentTags] = useState([])

    const [tagText, setTagText] = useState('')

    const [currentStoryTags, setCurrentStoryTags] = useState([])

    const [toRemove, setToRemove] = useState([])

    const [nextToken, setNextToken] = useState()


//this function will run through all of the genretags to see if one matches the tag and genre ID,
//when or if it finds one it will return 'exists'
    const ListAllGenreTags = async (extag: any) => {

        const Search = async (nextToken : any) => {

            console.log('here is')

            const response = await API.graphql(graphqlOperation(
                genreTagsByTagId, {
                    nextToken,
                    tagId: extag,
                    filter: {
                        genreId: {
                            eq: Story.genreID
                        }
                    }
                }
            ))

            console.log('genretag is', response)

            if (response.data.genreTagsByTagId.items.length > 0) {
                return ('exists');
            } 
            
            if (response.data.genreTagsByTagId.nextToken && response.data.genreTagsByTagId.items.length === 0) {
                let nextToken = response.data.genreTagsByTagId.nextToken
                Search(nextToken)
            }
            
        }

        let s = await Search(null);

        if (s === 'exists') {
            return
        }
        else {
            await API.graphql(graphqlOperation(
                createGenreTag, {input: {tagId: extag, genreId: Story.genreID}}
            )) 
        }
    }

//this function will run through all of the tags, checking against the variable tagCheck,
//it will then return the first match that it finds
    const ListAllTags =  (tagCheck : any) => {

        console.log('tagcheck is', tagCheck)

        const Search = async (nextToken : any) => {
                    
            const response = await API.graphql(graphqlOperation(
                tagsByName, {
                    nextToken,
                    tagName: tagCheck
                }
                 
            ))

            console.log('it worked', response)

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

    //this function will run through all of the genretags to see if one matches the tag and genre ID,
//when or if it finds one it will return 'exists'
const ListAllEroticGenreTags = async (extag: any) => {

    const Search = async (nextToken : any) => {

        const response = await API.graphql(graphqlOperation(
            eroticaTagsByEroticTagId, {
                nextToken,
                eroticTagId: extag,
                filter: {
                    genreId: {
                        eq: Story.genreID
                    }
                }
            }
        ))

        if (response.data.eroticaTagsByEroticTagId.items.length > 0) {
            return ('exists');
        } 
        
        if (response.data.eroticaTagsByEroticTagId.nextToken && response.data.eroticaTagsByEroticTagId.items.length === 0) {
            let nextToken = response.data.eroticaTagsByEroticTagId.nextToken
            Search(nextToken)
        }
        
    }

    let s = await Search(null);

    if (s === 'exists') {
        return
    }
    else {
        await API.graphql(graphqlOperation(
            createEroticaTag, {input: {eroticTagId: extag, genreId: Story.genreID}}
        )) 
    }
}

//this function will run through all of the tags, checking against the variable tagCheck,
//it will then return the first match that it finds
const ListAllEroticTags =  (tagCheck : any) => {

    const Search = async (nextToken : any) => {
                
        const response = await API.graphql(graphqlOperation(
            eroticTagsByName, {
                nextToken,
                tagName: tagCheck
            }
        ))

        if (response.data.eroticTagsByName.items.length > 0) {
            return (response.data.eroticTagsByName.items[0].id)
        }

        console.log('resp is', response.data.eroticTagsByName.items[0].id)

        if (response.data.eroticTagsByName.nextToken && response.data.eroticTagsByName.items.length === 0) {
            let nextToken = response.data.eroticTagsByName.nextToken
            Search(nextToken)
        } 
    }

    return (Search (null));
}



//update attributes for story
    const [isPublishing, setIsPublishing] = useState(false);

    const PublishEroticStory = async () => {

        if (confirmUpdate === false) {
            return;
        }

        setIsPublishing(true);

        let UpdateObject = {
            id: storyID
        }

        if (newData === true) {
            Object.assign(UpdateObject, {title: data.title})
        }
        if (newSumData === true) {
            Object.assign(UpdateObject, {summary: data.summary})
        }
        if (newDescData === true) {
            Object.assign(UpdateObject, {description: data.description})
        }
        if (newImageData === true) {
            Object.assign(UpdateObject, {description: data.imageUri})
        }
        // if (localImageUri !== '') {
        
        //     const response = await fetch(localImageUri);
        //     const blob = await response.blob();
        //     const filename = uuid.v4().toString();
        //     const s3ResponseImage = await Storage.put(filename, blob);
        //     const result = await Storage.get(s3ResponseImage.key);
        //     Object.assign(UpdateObject, {imageUri: result})
    
        // }


        try {
            let result = await API.graphql(
                    graphqlOperation(updateStory, { input: UpdateObject
                    }))
                if (result) {
                    hideModal();
                    navigation.navigate("MyStories")
                }
                        //console.log(result);
                } catch (e) {
                        console.error(e);
            }

        // if (toRemove.length > 0) {
        //     for (let i = 0; i < toRemove.length; i++) {
        //         const deletethis = await API.graphql(graphqlOperation(
        //             deleteStoryTag, {input: {
        //                 id: toRemove[i].id
        //                 } 
        //             }
        //         ))
        //         console.log(deletethis)
        //     }
        // }

        //if any storytags have been removed, loop though and delete them
            try {
                for (let i = 0; i < toRemove.length; i++) {
                    await API.graphql(graphqlOperation(
                        deleteEroticStoryTag, {input: {
                            id: toRemove[i].id
                            } 
                        }
                    ))
                }
            } catch (e) {
                console.log(e)
            }


            for (let i = 0; i < TagsArray.length; i++) {
                let tagCheck = TagsArray[i].name.toLowerCase().replace(/ /g, '')

                let extag = await ListAllEroticTags(tagCheck);

                //if the tag exists, create a StoryTag with the tagID and storyID
                if (extag !== undefined) {
                    console.log('extag is', extag)
                    await API.graphql(graphqlOperation(
                        createEroticStoryTag, {input: {eroticTagId: extag, storyId: storyID, }}
                    ))

                    ListAllEroticGenreTags(extag);

        //if the tag does not exist, create the tag and then the StoryTag with the tagID and storyID
                } else if (extag === undefined) {
                    let newTag = await API.graphql(graphqlOperation(
                        createEroticTag, {input: {type: 'EroticTag', createdAt: new Date(), count: 1, updatedAt: new Date(), tagName: TagsArray[i].name.toLowerCase().replace(/ /g, '')}}
                    ))
                    if (newTag) {
                        await API.graphql(graphqlOperation(
                            createEroticStoryTag, {input: {eroticTagId: newTag.data.createEroticTag.id, storyId: storyID}}
                        ))
                        await API.graphql(graphqlOperation(
                            createEroticaTag, {input: {eroticTagId: newTag.data.createEroticTag.id, genreId: Story.genreID}}
                        ))
                    }
                }

            }
        //}
        setIsPublishing(false);
    }

    const PublishStory = async () => {

        if (confirmUpdate === false) {
            return;
        }

        setIsPublishing(true);

        let UpdateObject = {
            id: storyID
        }

        if (newData === true) {
            Object.assign(UpdateObject, {title: data.title})
        }
        if (newSumData === true) {
            Object.assign(UpdateObject, {summary: data.summary})
        }
        if (newDescData === true) {
            Object.assign(UpdateObject, {description: data.description})
        }
        if (newImageData === true) {
            Object.assign(UpdateObject, {description: data.imageUri})
        }
        // if (localImageUri !== '') {
        
        //     const response = await fetch(localImageUri);
        //     const blob = await response.blob();
        //     const filename = uuid.v4().toString();
        //     const s3ResponseImage = await Storage.put(filename, blob);
        //     const result = await Storage.get(s3ResponseImage.key);
        //     Object.assign(UpdateObject, {imageUri: result})
    
        // }


        try {
            let result = await API.graphql(
                    graphqlOperation(updateStory, { input: UpdateObject
                    }))
                if (result) {
                    hideModal();
                    navigation.navigate("MyStories")
                }
                        //console.log(result);
                } catch (e) {
                        console.error(e);
        }

        // if (toRemove.length > 0) {
        //     for (let i = 0; i < toRemove.length; i++) {
        //         const deletethis = await API.graphql(graphqlOperation(
        //             deleteStoryTag, {input: {
        //                 id: toRemove[i].id
        //                 } 
        //             }
        //         ))
        //         console.log(deletethis)
        //     }
        // }

        //if any storytags have been removed, loop though and delete them
            try {
                for (let i = 0; i < toRemove.length; i++) {
                    await API.graphql(graphqlOperation(
                        deleteStoryTag, {input: {
                            id: toRemove[i].id
                            } 
                        }
                    ))
                }
            } catch (e) {
                console.log(e)
            }


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

                    console.log('tag is', tagCheck)

                    const newTag = await API.graphql(graphqlOperation(
                        createTag, {input: {type: 'Tag', createdAt: new Date(), count: 1, updatedAt: new Date(), tagName: tagCheck}}
                    ))
                    console.log('new tag is', newTag)
                    if (newTag) {
                        await API.graphql(graphqlOperation(
                            createStoryTag, {input: {tagId: newTag.data.createTag.id, storyId: storyID}}
                        ))
                        await API.graphql(graphqlOperation(
                            createGenreTag, {input: {tagId: newTag.data.createTag.id, genreId: Story.genreID}}
                        ))
                    }
                    console.log('complete')
                }

            }
        //}
        setIsPublishing(false);
    }


//request permission to access camera roll
    // useEffect(() => {
    //     (async () => {
    //       if (Platform.OS !== 'web') {
    //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if (status !== 'granted') {
    //           alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //       }
    //     })();
    //   }, []);


//image picker
    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.cancelled) {
    //     setLocalImageUri(result.uri);
    //     }
    // };
  
  
//Modal
      const [visible, setVisible] = useState(false);
  
      const showModal = () => termsAgree === true ? setVisible(true) : null;

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

    //user confirms state to update attributes
    const [confirmUpdate, setConfirmUpdate] = useState(false)

    //new data states to check if new data has ben entered or changed
    const [newData, setNewData] = useState(false);
    const [newSumData, setNewSumData] = useState(false);
    const [newDescData, setNewDescData] = useState(false);
    const [newImageData, setNewImageData] = useState(false);

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

       //remove a tag from the tag array
       const RemoveFromCurrentTagArray = (index : any) => {

        console.log('index is', index)

        let Tags = [...currentTags]
        let StoryTags = [...currentStoryTags]
        let Remove = [...toRemove]

        Tags.splice(index, 1);
        StoryTags.splice(index, 1)
        Remove.push(currentStoryTags[index])
        setCurrentTags(Tags);
        setCurrentStoryTags(StoryTags)
        setToRemove(Remove)
    }

  return (
        <ScrollView>
            <View style={styles.container}>
                <Modal visible={visible} onDismiss={hideModal} animationType="slide" transparent={true} onRequestClose={() => {setVisible(!visible)}}>
                    <ScrollView style={{  paddingHorizontal: 10,  backgroundColor: '#000000', borderRadius: 15}}>
                        <View style={{marginTop: 100, justifyContent: 'space-between'}}>
                            <View>
                                {data.title !== '' ? (
                                    <View style={{marginBottom: 20,}}>
                                        <Text style={styles.inputheadermodal}>
                                            Title
                                        </Text>
                                        <Text style={{marginHorizontal: 20, color: '#ffffff', fontWeight: 'bold', textTransform: 'capitalize'}}>
                                        {data.title}
                                        </Text>   
                                    </View>
                                ) : null}

                                {data.summary !== '' ? (
                                    <View style={{marginBottom: 20}}>
                                        <Text style={styles.inputheadermodal}>
                                            Summary
                                        </Text>
                                        <Text style={{marginHorizontal: 20, color: '#ffffff'}}>
                                        {data.summary}
                                        </Text>   
                                    </View>
                                ) : null}

                                {data.description !== '' ? (
                                    <View style={{marginBottom: 20}}>
                                        <Text style={styles.inputheadermodal}>
                                            Description
                                        </Text>
                                        <Text style={{marginHorizontal: 20, color: '#ffffff'}}>
                                            {data.description}
                                        </Text>   
                                    </View>
                                ) : null}

                                
                                <View style={{marginBottom: 20}}>
                                    <Text style={styles.inputheadermodal}>
                                        Tags
                                    </Text>

                                    <ScrollView style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {currentTags.map(({ id, tagName } : any, index) => (
                                            <View key={id} style={{marginTop: 10, marginRight: 10}}>
                                                <TouchableOpacity>
                                                    <View style={{}}>
                                                    <Text style={[styles.tagtext, {
                                                        textTransform: 'lowercase',
                                                        color: genre === 'after dark' ? 'magenta' : 'cyan',
                                                        backgroundColor: genre === 'after dark' ? '#3C1A41a5' : '#1A4851a5',
                                                        borderColor: genre === 'after dark' ? '#ff00ffa5' : '#00ffffa5',
                                                        }]}>
                                                            #{tagName}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </ScrollView>

                                    <ScrollView style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {TagsArray.map(({ id, name } : any, index) => (
                                            <View key={id} style={{marginTop: 10, marginRight: 10}}>
                                                <TouchableOpacity>
                                                    <View style={{}}>
                                                        <Text style={[styles.tagtext, {
                                                            textTransform: 'lowercase',
                                                            color: genre === 'after dark' ? 'magenta' : 'cyan',
                                                            backgroundColor: genre === 'after dark' ? '#3C1A41a5' : '#1A4851a5',
                                                            borderColor: genre === 'after dark' ? '#ff00ffa5' : '#00ffffa5',
                                                            }]}>
                                                            #{name}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>

                                {/* {localImageUri !== '' ? (
                                    <View style={{marginBottom: 20}}>
                                        <Text style={styles.inputheadermodal}>
                                            Cover Art
                                        </Text>
                                        <Image 
                                            source={{ uri: localImageUri}}
                                            resizeMode='contain'
                                            style={{ 
                                                marginVertical: 10,
                                                height: 120,
                                                borderRadius: 15,
                                            }} 
                                            />
                                    </View>
                                ) : null} */}
                            </View>
                            
                            <View style={{width: '100%', alignItems: 'center'}}>
                                {isPublishing === false ? (
                                    <TouchableOpacity
                                            style={{marginBottom: 20}}
                                            onPress={() => setConfirmUpdate(true)}
                                            onLongPress={() => genre === 'after dark' ? PublishEroticStory() : PublishStory()}
                                            >
                                            <View
                                                style={{ 
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 10,
                                                    borderRadius: 20,
                                                    backgroundColor: confirmUpdate === true ? 'gold' : 'transparent',
                                                    borderWidth: 1,
                                                    borderColor: confirmUpdate === true ? 'gold' : 'cyan'
                                                    }} >
                                                <Text style={{ color: confirmUpdate === true ? '#000' : 'cyan', fontSize: 16, textAlign: 'center'}}>
                                                    {confirmUpdate === true ? 'Hold to Confirm' : 'Update Story'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                ) : 
                                <View style={{marginBottom: 20}}>
                                    <ActivityIndicator size="small" color="cyan"/> 
                                </View>}
                            </View>
                        </View>
                    </ScrollView>
                </Modal>

            <TouchableWithoutFeedback onPress={ () => navigation.goBack()}>
                <View style={{padding: 30, margin: -30 }}>
                    <AntDesign 
                            name='close'
                            size={25}
                            color='#fff'
                            style={{marginTop: 50, marginLeft: 20}} 
                        /> 
                </View>
            </TouchableWithoutFeedback>
                
                <View style={{ alignItems: 'center'}}> 
                    <Text style={[styles.title, {marginBottom: 50}]}>
                        Edit Story
                    </Text>

                    <Text style={styles.inputheader}>
                        Title
                    </Text>
                    <View style={[styles.inputfield, {height: 60}]}>
                        
                        <TextInput
                            defaultValue={Story?.title}
                            style={styles.textInputTitle}
                            maxLength={50}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={val => {setData({...data, title: val}); setNewData(true)}}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={newData === true ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    <View style={{alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20, marginBottom: 10, alignSelf: 'flex-start'}}>
                            Summary
                        </Text>
                        <Text style={{marginBottom: 10, fontSize: 12, alignSelf: 'flex-end', color: '#ffffffa5', marginLeft: 10,}}>
                           (200 max characters)
                        </Text>
                    </View>
                    
                    <View style={styles.inputfield}>
                        <TextInput
                            style={[styles.textInput, { height: 80 }]}
                            maxLength={200}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={val => {setData({...data, summary: val}); setNewSumData(true)}}
                            defaultValue={Story?.summary}
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={newSumData === true ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    <View style={{alignSelf: 'flex-start', flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 20, marginBottom: 10, alignSelf: 'flex-start'}}>
                            Description
                        </Text>
                        <Text style={{marginBottom: 10, fontSize: 12, alignSelf: 'flex-end', color: '#ffffffa5', marginLeft: 10,}}>
                           (1500 max characters)
                        </Text>
                    </View>
                    
                    <View style={styles.inputfield}>
                        <TextInput
                            //placeholder={Story?.description}
                            placeholderTextColor='#ffffffa5'
                            style={[styles.textInput, {  }]}
                            maxLength={1500}
                            multiline={true}
                            numberOfLines={30}
                            onChangeText={val => {setData({...data, description: val}); setNewDescData(true)}}
                            defaultValue={Story?.description}
                            textAlignVertical='top'
                        />
                        <FontAwesome5 
                            name='check-circle'
                            color={newDescData === true ? 'cyan' : '#363636'}
                            size={20}
                        />
                    </View>

                    <View style={{flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center'}}>
                        <Text style={styles.inputheader}>
                            Tags
                        </Text>
                        <Text style={{color: 'gray', marginBottom: 10, fontSize: 11, marginLeft: 10}}>
                            (hold to remove)
                        </Text>
                    </View>
                    

                    <ScrollView style={{width: Dimensions.get('window').width - 20, marginLeft: 10, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {currentTags.map(({ id, tagName } : any, index) => (
                            <View key={id} style={{marginTop: 10, marginRight: 10}}>
                                <TouchableOpacity onLongPress={() => RemoveFromCurrentTagArray(index)}>
                                    <View style={{}}>
                                        <Text style={styles.currenttagtext}>
                                            #{tagName}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <ScrollView style={{width: Dimensions.get('window').width - 20, marginLeft: 10, marginBottom: 20}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {TagsArray.map(({ id, name } : any, index) => (
                            <View key={id} style={{marginTop: 10, marginRight: 10}}>
                                <TouchableOpacity onLongPress={() => RemoveFromTagArray(index)}>
                                    <View style={{}}>
                                        <Text style={[styles.tagtext, {
                                            textTransform: 'lowercase',
                                            color: genre === 'after dark' ? 'magenta' : 'cyan',
                                            backgroundColor: genre === 'after dark' ? '#3C1A41a5' : '#1A4851a5',
                                            borderColor: genre === 'after dark' ? '#ff00ffa5' : '#00ffffa5',
                                            }]}>
                                            #{name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginBottom: 20, marginTop: 0, }}>
                        <TouchableWithoutFeedback>
                            <View style={{ width: Dimensions.get('window').width - 140, marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <TextInput
                                    placeholder='#'
                                    placeholderTextColor='#ffffffa5'
                                    style={styles.textInputTitle}
                                    maxLength={50}
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

                    {/* <Image 
                        source={{uri: localImageUri === '' ? Story?.imageUri : localImageUri}}
                        style={{backgroundColor: 'gray', marginVertical: 20, borderRadius: 15, width: Dimensions.get('window').width - 40, height: 200}}
                    />

                    <Text style={styles.inputheader}>
                        Cover Art
                    </Text> */}

                    {/* <View style={{ width: '100%', marginBottom: 20, marginTop: 0, }}>
                        <TouchableOpacity onPress={pickImage}>
                            <View style={{ marginHorizontal: 20, padding: 10, borderRadius: 8, backgroundColor: '#363636'}}>
                                <Text style={{ color: '#ffffffa5'}}>
                                    {localImageUri !== '' ? localImageUri : 'Select artwork'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View> */}

                    <View style={{ margin: 40, flexDirection: 'row'}}>
                        <FontAwesome5 
                            name='check-circle'
                            color={termsAgree === true ? 'cyan' : '#363636'}
                            size={20}
                            onPress={handleTerms}
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

                        <TouchableOpacity onPress={showModal}>
                            <View style={[styles.uploadbutton, {
                                backgroundColor: 
                                    termsAgree === true 
                                    ? 'cyan' : 'transparent'
                            }]}>
                                <Text style={{ fontSize: 16, color: 
                                    termsAgree === true 
                                    ? '#000' : '#00ffff'
                                }}>
                                    Update Story
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
inputheadermodal: {
    color: 'gray',
    fontSize: 18,
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
tagbox: {
    marginRight: 10   
  },
  tagtext: {
    fontSize: 14,
    // backgroundColor: '#1A4851a5',
    // borderColor: '#00ffffa5',
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 13,
    overflow: 'hidden',
    marginBottom: 1
},
currenttagtext: {
    color: 'gray',
    fontSize: 14,
    backgroundColor: '#363636',
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 13,
    overflow: 'hidden',
    marginBottom: 1
},
});

export default EditAudio;