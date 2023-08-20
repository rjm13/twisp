import React, {useContext, useEffect} from 'react';
import {  View, StyleSheet } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import CreatorProfile from '../components/lists/CreatorProfile';

import {useRoute} from '@react-navigation/native';

import { AppContext } from '../AppContext';


const CreatorScreen = () => {

    const { setIsRootScreen } = useContext(AppContext);

    

    const route = useRoute();
    const {userID, rootChange} = route.params

    useEffect(() => {
        if (rootChange === 'bottom') {
            setIsRootScreen(true)
        }
    }, [rootChange])

    return (
        <View style={styles.container}>
        
            <CreatorProfile userID={userID} rootChange={rootChange}/>
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

export default CreatorScreen;