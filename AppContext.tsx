import React from 'react';

const context = {
    storyID: null,
    setStoryID: (id: string) => {},

    expoPushToken: null,
    setExpoPushToken: (val: string | null) => {},

    userPins: [],
    setUserPins: (val) => {},

    userRates: [],
    setUserRates: (val) => {},

    userFinished: [],
    setUserFinished: (val) => {},

    userFollowing: [],
    setUserFollowing: (val) => {},

    isRootScreen: null,
    setIsRootScreen: (val: boolean) => {},

    userID: null,
    setUserID: (id: string) => {},

    deepLink: null,
    setDeepLink: () => {},

    nsfwOn: false,
    setNSFWOn: (val: boolean) => {},

    ADon: false,
    setADon: (val: boolean) => {},

    progUpdate: false,
    setProgUpdate: (val: boolean) => {},

    premium: false,
    setPremium: (val: boolean) => {},

    playbackSpeed: 1,
    setPlaybackSpeed: (val: number) => {},

    refreshApp: 0,
    setRefreshApp: (val: number) => {},

    //this is refreshes pinned list from the story screen
    refreshPins: 0,
    setRefreshPins: (val: number) => {},

    //refreshes the for you carousel
    refreshFYC: 0,
    setRefreshFYC: (val: number) => {},

    //fresh the genre carousel
    refreshGC: 0,
    setRefreshGC: (val: number) => {},

    //refresh after dark carousel
    refreshADC: 0,
    setRefreshADC: (val: number) => {},

    //refresh the pinned playlist
    refreshPP: 0,
    setRefreshPP: (val: number) => {},

    //refresh the faved playlist
    refreshFP: 0,
    setRefreshFP: (val: number) => {},
}

export const AppContext = React.createContext(context);