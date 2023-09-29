import React from 'react';
import { 
    View, 
    Text, 
    Image 
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FireRating = ({ratingAvg, fontSize, height, width, iconSize} : any) => {

    let ratingAverage = Number((ratingAvg/10).toFixed(1))
    
    return (
        <View style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
            {ratingAverage > 8.5 ? (
                <Image
                source={require('../assets/fire-icon2.png')}
                style={{width: width || 10, height: height || 12}}
                />
            ) : (
                <FontAwesome
                    name='star'
                    color='#ffffffa5'
                    size={iconSize || 12}
                />
            )}
            
            <Text style={{marginLeft: 4, fontSize: fontSize || 14, color: ratingAverage > 8.5 ? '#F47B20' : '#ffffffa5', textTransform: 'capitalize'}}>
                {ratingAverage}
            </Text>
        </View>
    )
}

export default FireRating;