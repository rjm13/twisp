import React, { useEffect, useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableWithoutFeedback,  
    FlatList,
    Dimensions,
    RefreshControl
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { format, parseISO } from "date-fns";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { messagesByUser } from '../src/graphql/queries';


const Inbox = ({navigation} : any) => {
    
    const [messages, setMessages] = useState([]);

    const [didUpdate, setDidUpdate] = useState(false);

    const [currentUserID, setCurrentUserID] = useState()

    useEffect(() => {

        let arr = []

        const getMessages = async (nextToken : any) => {

            const userInfo = await Auth.currentAuthenticatedUser();

            setCurrentUserID(userInfo.attributes.sub)

            const response = await API.graphql(graphqlOperation(
                messagesByUser, {
                    nextToken,
                    sortDirection: 'DESC',
                    receiverID: userInfo.attributes.sub
                }
            ))

            for (let i = 0; i < response.data.messagesByUser.items.length; i++) {
                arr.push(response.data.messagesByUser.items[i])
            }

            if (response.data.messagesByUser.nextToken) {
                getMessages(response.data.messagesByUser.nextToken)
            }

            if (response.data.messagesByUser.nextToken === null) {
                setMessages(arr)
            }
        }
        getMessages(null);
    }, [didUpdate])

    const Item = ({index, id, title, content, psuedonym, subtitle, userID, createdAt, isReadByReceiver} : any) => {

        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewMessage', {messageid: id})}>
                <View style={{backgroundColor: index%2 === 0 ? '#303030a5' : 'transparent', alignItems: 'center', paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {isReadByReceiver === false ? (
                        <View style={{}}>
                            <FontAwesome5 
                                name='hand-point-right'
                                size={20}
                                color='#00ffffa5'
                                style={{marginLeft: 20, marginRight: 0, alignSelf: 'center'}}
                            />
                        </View>
                    ) : null}
                    
                    <View style={{marginRight: 20, marginVertical: 10, paddingHorizontal: 20, width: isReadByReceiver === false ? Dimensions.get('window').width - 40 : Dimensions.get('window').width}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                           
                            <Text style={{color: '#fff', fontSize: 13, marginTop: 4, fontWeight: '600' }}>
                            {title}
                        </Text>
                        </View>
                        <Text numberOfLines={2} style={{color: '#fff', fontSize: 11, marginTop: 4}}>
                            {content}
                        </Text>
                        <Text style={{color: 'gray', fontSize: 11, marginTop: 6}}>
                                {format(parseISO(createdAt), "PPpp")}
                            </Text>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        );
    }

    const renderItem = ({item, index}: any) => {

        let pseudonym = ''

        if (item.user) {
            pseudonym = item.receiver.pseudonym
        }

        return (
            <Item 
                id={item.id}
                title={item.title}
                content={item.content}
                subtitle={item.subtitle}
                receiverID={item.ReceiverID}
                createdAt={item.createdAt}
                isReadByReceiver={item.isReadByReceiver}
                index={index}
                pseudonym={pseudonym}
            />
        )
    }

    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    return (
        <View >
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{height: Dimensions.get('window').height}}
            >
                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                        <Text style={styles.header}>
                            Inbox
                        </Text>
                </View>

                <View style={{height: '87%'}}>
                    <FlatList 
                        data={messages}
                        extraData={messages}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={100}
                        maxToRenderPerBatch={100}
                        refreshControl={
                            <RefreshControl
                            refreshing={isFetching}
                            onRefresh={onRefresh}
                            />
                        }
                        ListFooterComponent={() => {
                            return (
                                <View style={{height: 120}}/>
                            )
                        }}
                    />
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        height: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
    },
    tile: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 40, 
        marginVertical: 20
    }
});

export default Inbox;