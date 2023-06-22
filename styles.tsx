import React, {useContext, useEffect} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import { AppContext } from './AppContext';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height


function useStyles() {

  //const { theme } = useContext(AppContext);

return StyleSheet.create ({
  
    container: {
        flex: 1,
        backgroundColor:  '#000',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
      },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
      },
      infotext: {
        fontSize: 14,
        color: '#ffffffa5',
      },
    paragraph: {
      fontSize: 14,
      color: '#fff',
    },
    subtext: {
      fontSize: 12,
      fontWeight: '600',
      color: '#ffffffa5',
    },
    itemtext: {
      marginLeft: 30,
      fontSize: 16,
      fontWeight: '400',
      color: '#fff',
    },
    textInputTitle: {
      color: '#000',
      fontWeight: 'normal',
    },
    inputfield: {
        width: SCREEN_WIDTH - 40,
        height: 40,
        backgroundColor: '#363636',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        overflow: 'hidden',
    },
    inputtitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600'
    },
    buttonlayout: {
        backgroundColor: '#00FFFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        overflow: 'hidden',
    },
    buttontext: {
      fontSize: 16,
      fontWeight: '800',
      color: '#fff',
      textAlign: 'center'
    },
    optionsitem: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      marginLeft: 40,
      marginRight: 40,
      marginBottom: 30,
  },
  timeselect: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  settingsitem: {
    fontSize: 16,
    color: '#fff',
  },
});
}

// const styles = StyleSheet.create ({
  
//     container: {
//         flex: 1,
//         backgroundColor: theme === true ? '#000' : '#fff',
//         alignItems: 'center',
//         width: SCREEN_WIDTH,
//         height: SCREEN_HEIGHT,
//       },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#000',
//       },
//       infotext: {
//         fontSize: 14,
//         color: '#000000a5',
//       },
//     paragraph: {
//       fontSize: 14,
//       color: '#000',
//     },
//     subtext: {
//       fontSize: 12,
//       fontWeight: '600',
//       color: '#000000a5',
//     },
//     itemtext: {
//       marginLeft: 30,
//         fontSize: 16,
//         fontWeight: '700'
//     },
//     textInputTitle: {
//       color: '#fff',
//       fontWeight: 'normal',
//     },
//     inputfield: {
//         width: SCREEN_WIDTH - 40,
//         height: 40,
//         backgroundColor: '#363636',
//         padding: 10,
//         borderRadius: 10,
//         alignSelf: 'center',
//     },
//     inputtitle: {
//       color: '#fff',
//       fontSize: 18,
//       fontWeight: '600'
//     },
//     buttonlayout: {
//         backgroundColor: 'maroon',
//         borderRadius: 20,
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         overflow: 'hidden',
//     },
//     buttontext: {
//       fontSize: 16,
//       fontWeight: '800',
//       color: '#fff',
//       textAlign: 'center'
//     },
//     optionsitem: {
//       flexDirection: 'row', 
//       justifyContent: 'space-between',
//       marginLeft: 40,
//       marginRight: 40,
//       marginBottom: 30,
//   },
//   timeselect: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

//const styles = useStyles()

//export { styles }

export default useStyles