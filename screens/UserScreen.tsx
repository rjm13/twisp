import React from 'react';
import {  View, StyleSheet } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import AudioListByAuthor from '../components/lists/AudioListByAuthor';

import {useRoute} from '@react-navigation/native'


const UserScreen = () => {

    const route = useRoute();
    const {userID} = route.params


    return (
        <View style={styles.container}>
            
            <AudioListByAuthor user={userID}/>
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginTop: 20,
        marginBottom: 10,
    },
    userId: {
        fontSize: 12,
        color: '#ffffffa5',
        marginRight: 15,
        marginLeft: 5,
    },
});

export default UserScreen;