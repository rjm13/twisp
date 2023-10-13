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

    refreshApp: false,
    setRefreshApp: (val: boolean) => {},

    refreshPins: false,
    setRefreshPins: (val: Number) => {},
}

export const AppContext = React.createContext(context);