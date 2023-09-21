import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity 
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TimeConversion from './functions/TimeConversion';
import { AppContext } from '../AppContext'

const PlayButton = ({time, id} : any) => {

    const { setStoryID } = useContext(AppContext);
    const onPlay = () => {setStoryID(id);}

    return (
        <TouchableOpacity onPress={onPlay}>
            <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                borderRadius: 30,
                paddingVertical: 2,
                paddingHorizontal: 8,
                backgroundColor: '#171717a5',
                borderColor: '#ffffffCC',
                margin: 10,
                alignSelf: 'flex-start'
                }}>
                    <FontAwesome5 
                        name='play'
                        color='#ffffff'
                        size={10}
                        style={{marginRight: 8}}
                    />
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'normal',
                        color: '#ffffffCC',
                    
                    }}>
                        {TimeConversion(time)}
                    </Text> 
            </View>
        </TouchableOpacity>
    )
}

export default PlayButton;



