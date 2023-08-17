import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    TouchableWithoutFeedback,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { storiesByDate, commentsByCreated } from '../src/graphql/queries';

const ModSection = ({navigation} : any) => {

    const [stories, setStories] = useState(0);
    //const [flags, setFlags] = useState(0);
    const [comments, setComments] = useState(0);


//double check the user is a mod
    useEffect(() => {
        const getUser = async () => {
            let response = await Auth.currentAuthenticatedUser();
            if (response.signInUserSession.idToken.payload["cognito:groups"].includes('mods') === true) {
                return
            } else {
                navigation.goBack();
            }
        }
        getUser();
    }, [])


//fetch the data
    useEffect(() => {
        const fetchStories = async () => {
            let response = await API.graphql(graphqlOperation(
                storiesByDate, {
                    type: 'PendingStory',
                    sortDirection: 'DESC',
                    filter: {
                        approved: {
                            eq: false
                        }
                    }
                }
            ))
            setStories(response.data.storiesByDate.items.length)
        }
        fetchStories();

        // const fetchFlags = async () => {
        //     let response = await API.graphql(graphqlOperation(
        //         listFlags, {
        //             filter: {
        //                 Status: {
        //                     eq: 'active'
        //                 }
        //             }
        //         }
        //     ))
        //     setFlags(response.data.listFlags.items.length)
        // }
        // fetchFlags();

        const fetchComments = async () => {
            let response = await API.graphql(graphqlOperation(
                commentsByCreated, {
                    type: 'Comment',
                    sortDirection: 'DESC',
                    filter: {
                        approved: {
                            eq: false
                        }
                    }
                }
            ))
            setComments(response.data.commentsByCreated.items.length)
        }
        fetchComments();
    }, [])


    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 60, marginBottom: 30, marginLeft: 20 }}>
                <FontAwesome5 
                    name='chevron-left'
                    size={20}
                    color='#fff'
                    style={{padding: 30, margin: -30}}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18, marginLeft: 40}}>
                    Moderator
                </Text>
            </View>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('PendingStories')}>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        Pending Stories
                    </Text>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {stories}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            
{/* 
            <TouchableWithoutFeedback onPress={() => navigation.navigate('FlaggedStories')}>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        Flagged Stories
                    </Text>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {flags}
                    </Text>
                </View>
            </TouchableWithoutFeedback> */}

            <TouchableWithoutFeedback onPress={() => navigation.navigate('PendingComments')}>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        New Comments
                    </Text>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {comments}
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('AdminUpload', {promptID: null})}>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        Admin Upload
                    </Text>
                </View>
            </TouchableWithoutFeedback> */}
        </View>
    )
}

export default ModSection;