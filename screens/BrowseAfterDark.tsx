import React from 'react';
import { 
    View, 
    StyleSheet, 
    Text,
} from 'react-native';

import {useRoute} from '@react-navigation/native'

import {LinearGradient} from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AudioListByGenre from '../components/lists/AudioListByGenre';
import useStyles from '../styles';

const BrowseAfterDark = ({navigation} : any) => {

    const styles = useStyles();

//route params from the StoriesScreen to specifiy the genre
    const route = useRoute();
    const {genreID, genreName} = route.params


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'transparent']}
                style={{height: '100%'}}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 
                                name='chevron-left'
                                size={22}
                                color='#fff'
                                style={{padding: 30}}
                                onPress={() => navigation.goBack()}
                            /> 
                            <Text style={[styles.h1, {textTransform: 'capitalize'}]}>
                                Browse {genreName}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <AudioListByGenre genreID={genreID}/>
                    </View>

                
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    gradient: {
        height: 300
    },
});

export default BrowseAfterDark;