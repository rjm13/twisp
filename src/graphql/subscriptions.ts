/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      type
      createdAt
      updatedAt
      id
      name
      email
      imageUri
      bio
      publisherName
      website
      isPublisher
      numAuthored
      topthree
      following {
        items {
          id
          type
          createdAt
          updatedAt
          followerID
          authorID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      numFolowing
      followers {
        items {
          id
          type
          createdAt
          updatedAt
          followerID
          authorID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      numFollowers
      Pinned {
        items {
          id
          type
          userID
          storyID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Rated {
        items {
          id
          createdAt
          updatedAt
          type
          storyID
          userID
          rating
          reactionTypeID
          __typename
        }
        nextToken
        __typename
      }
      Finished {
        items {
          id
          type
          createdAt
          updatedAt
          userID
          storyID
          genreID
          __typename
        }
        nextToken
        __typename
      }
      plan
      messageRec {
        items {
          id
          type
          createdAt
          updatedAt
          title
          subtitle
          content
          messageType
          status
          isReadByReceiver
          receiverID
          __typename
        }
        nextToken
        __typename
      }
      inProgressStories {
        items {
          id
          type
          userID
          storyID
          createdAt
          updatedAt
          time
          __typename
        }
        nextToken
        __typename
      }
      published {
        items {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        nextToken
        __typename
      }
      numPublished
      isMod
      setting1
      setting2
      setting3
      setting4
      setting5
      creatorProfiles {
        items {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      type
      createdAt
      updatedAt
      id
      name
      email
      imageUri
      bio
      publisherName
      website
      isPublisher
      numAuthored
      topthree
      following {
        items {
          id
          type
          createdAt
          updatedAt
          followerID
          authorID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      numFolowing
      followers {
        items {
          id
          type
          createdAt
          updatedAt
          followerID
          authorID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      numFollowers
      Pinned {
        items {
          id
          type
          userID
          storyID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Rated {
        items {
          id
          createdAt
          updatedAt
          type
          storyID
          userID
          rating
          reactionTypeID
          __typename
        }
        nextToken
        __typename
      }
      Finished {
        items {
          id
          type
          createdAt
          updatedAt
          userID
          storyID
          genreID
          __typename
        }
        nextToken
        __typename
      }
      plan
      messageRec {
        items {
          id
          type
          createdAt
          updatedAt
          title
          subtitle
          content
          messageType
          status
          isReadByReceiver
          receiverID
          __typename
        }
        nextToken
        __typename
      }
      inProgressStories {
        items {
          id
          type
          userID
          storyID
          createdAt
          updatedAt
          time
          __typename
        }
        nextToken
        __typename
      }
      published {
        items {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        nextToken
        __typename
      }
      numPublished
      isMod
      setting1
      setting2
      setting3
      setting4
      setting5
      creatorProfiles {
        items {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      type
      createdAt
      updatedAt
      id
      name
      email
      imageUri
      bio
      publisherName
      website
      isPublisher
      numAuthored
      topthree
      following {
        items {
          id
          type
          createdAt
          updatedAt
          followerID
          authorID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      numFolowing
      followers {
        items {
          id
          type
          createdAt
          updatedAt
          followerID
          authorID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      numFollowers
      Pinned {
        items {
          id
          type
          userID
          storyID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Rated {
        items {
          id
          createdAt
          updatedAt
          type
          storyID
          userID
          rating
          reactionTypeID
          __typename
        }
        nextToken
        __typename
      }
      Finished {
        items {
          id
          type
          createdAt
          updatedAt
          userID
          storyID
          genreID
          __typename
        }
        nextToken
        __typename
      }
      plan
      messageRec {
        items {
          id
          type
          createdAt
          updatedAt
          title
          subtitle
          content
          messageType
          status
          isReadByReceiver
          receiverID
          __typename
        }
        nextToken
        __typename
      }
      inProgressStories {
        items {
          id
          type
          userID
          storyID
          createdAt
          updatedAt
          time
          __typename
        }
        nextToken
        __typename
      }
      published {
        items {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        nextToken
        __typename
      }
      numPublished
      isMod
      setting1
      setting2
      setting3
      setting4
      setting5
      creatorProfiles {
        items {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onCreateCreatorProfile = /* GraphQL */ `
  subscription OnCreateCreatorProfile(
    $filter: ModelSubscriptionCreatorProfileFilterInput
  ) {
    onCreateCreatorProfile(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      imageUri
      bio
      penName
      penNameLowerCase
      email
      website
      instagram
      tikTok
      facebook
      deviantArt
      reddit
      youTube
      numAuthored
      stories {
        items {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        nextToken
        __typename
      }
      followers {
        items {
          id
          type
          createdAt
          updatedAt
          followerID
          authorID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      numFollowers
      __typename
    }
  }
`;
export const onUpdateCreatorProfile = /* GraphQL */ `
  subscription OnUpdateCreatorProfile(
    $filter: ModelSubscriptionCreatorProfileFilterInput
  ) {
    onUpdateCreatorProfile(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      imageUri
      bio
      penName
      penNameLowerCase
      email
      website
      instagram
      tikTok
      facebook
      deviantArt
      reddit
      youTube
      numAuthored
      stories {
        items {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        nextToken
        __typename
      }
      followers {
        items {
          id
          type
          createdAt
          updatedAt
          followerID
          authorID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      numFollowers
      __typename
    }
  }
`;
export const onDeleteCreatorProfile = /* GraphQL */ `
  subscription OnDeleteCreatorProfile(
    $filter: ModelSubscriptionCreatorProfileFilterInput
  ) {
    onDeleteCreatorProfile(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      imageUri
      bio
      penName
      penNameLowerCase
      email
      website
      instagram
      tikTok
      facebook
      deviantArt
      reddit
      youTube
      numAuthored
      stories {
        items {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        nextToken
        __typename
      }
      followers {
        items {
          id
          type
          createdAt
          updatedAt
          followerID
          authorID
          creatorID
          __typename
        }
        nextToken
        __typename
      }
      numFollowers
      __typename
    }
  }
`;
export const onCreateFollowConnection = /* GraphQL */ `
  subscription OnCreateFollowConnection(
    $filter: ModelSubscriptionFollowConnectionFilterInput
  ) {
    onCreateFollowConnection(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      followerID
      follower {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      authorID
      author {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      creatorID
      creator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateFollowConnection = /* GraphQL */ `
  subscription OnUpdateFollowConnection(
    $filter: ModelSubscriptionFollowConnectionFilterInput
  ) {
    onUpdateFollowConnection(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      followerID
      follower {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      authorID
      author {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      creatorID
      creator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteFollowConnection = /* GraphQL */ `
  subscription OnDeleteFollowConnection(
    $filter: ModelSubscriptionFollowConnectionFilterInput
  ) {
    onDeleteFollowConnection(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      followerID
      follower {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      authorID
      author {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      creatorID
      creator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      __typename
    }
  }
`;
export const onCreateStory = /* GraphQL */ `
  subscription OnCreateStory($filter: ModelSubscriptionStoryFilterInput) {
    onCreateStory(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      title
      titleLowerCase
      titleLowerCaseNoThe
      imageUri
      audioUri
      publisher {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      publisherID
      creator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      creatorID
      narratorProfile {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      narratorID
      illustrator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      illustratorID
      author
      narrator
      artist
      time
      summary
      description
      nsfw
      comments {
        items {
          id
          type
          createdAt
          updatedAt
          storyID
          content
          userID
          approved
          reactionID
          ratingID
          __typename
        }
        nextToken
        __typename
      }
      numComments
      tags {
        items {
          id
          storyId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      eroticTags {
        items {
          id
          storyId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      ratingAvg
      ratingAmt
      ratings {
        items {
          id
          createdAt
          updatedAt
          type
          storyID
          userID
          rating
          reactionTypeID
          __typename
        }
        nextToken
        __typename
      }
      reactions {
        items {
          id
          type
          createdAt
          updatedAt
          userID
          storyID
          reactionTypeID
          __typename
        }
        nextToken
        __typename
      }
      genreID
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      hidden
      status
      numListens
      approved
      seriesID
      series {
        id
        type
        createdAt
        updatedAt
        name
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        stories {
          nextToken
          __typename
        }
        creatorID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        __typename
      }
      seriesPart
      premium
      contributors {
        items {
          id
          createdAt
          updatedAt
          storyID
          name
          contribution
          link
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateStory = /* GraphQL */ `
  subscription OnUpdateStory($filter: ModelSubscriptionStoryFilterInput) {
    onUpdateStory(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      title
      titleLowerCase
      titleLowerCaseNoThe
      imageUri
      audioUri
      publisher {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      publisherID
      creator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      creatorID
      narratorProfile {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      narratorID
      illustrator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      illustratorID
      author
      narrator
      artist
      time
      summary
      description
      nsfw
      comments {
        items {
          id
          type
          createdAt
          updatedAt
          storyID
          content
          userID
          approved
          reactionID
          ratingID
          __typename
        }
        nextToken
        __typename
      }
      numComments
      tags {
        items {
          id
          storyId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      eroticTags {
        items {
          id
          storyId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      ratingAvg
      ratingAmt
      ratings {
        items {
          id
          createdAt
          updatedAt
          type
          storyID
          userID
          rating
          reactionTypeID
          __typename
        }
        nextToken
        __typename
      }
      reactions {
        items {
          id
          type
          createdAt
          updatedAt
          userID
          storyID
          reactionTypeID
          __typename
        }
        nextToken
        __typename
      }
      genreID
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      hidden
      status
      numListens
      approved
      seriesID
      series {
        id
        type
        createdAt
        updatedAt
        name
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        stories {
          nextToken
          __typename
        }
        creatorID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        __typename
      }
      seriesPart
      premium
      contributors {
        items {
          id
          createdAt
          updatedAt
          storyID
          name
          contribution
          link
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteStory = /* GraphQL */ `
  subscription OnDeleteStory($filter: ModelSubscriptionStoryFilterInput) {
    onDeleteStory(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      title
      titleLowerCase
      titleLowerCaseNoThe
      imageUri
      audioUri
      publisher {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      publisherID
      creator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      creatorID
      narratorProfile {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      narratorID
      illustrator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      illustratorID
      author
      narrator
      artist
      time
      summary
      description
      nsfw
      comments {
        items {
          id
          type
          createdAt
          updatedAt
          storyID
          content
          userID
          approved
          reactionID
          ratingID
          __typename
        }
        nextToken
        __typename
      }
      numComments
      tags {
        items {
          id
          storyId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      eroticTags {
        items {
          id
          storyId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      ratingAvg
      ratingAmt
      ratings {
        items {
          id
          createdAt
          updatedAt
          type
          storyID
          userID
          rating
          reactionTypeID
          __typename
        }
        nextToken
        __typename
      }
      reactions {
        items {
          id
          type
          createdAt
          updatedAt
          userID
          storyID
          reactionTypeID
          __typename
        }
        nextToken
        __typename
      }
      genreID
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      hidden
      status
      numListens
      approved
      seriesID
      series {
        id
        type
        createdAt
        updatedAt
        name
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        stories {
          nextToken
          __typename
        }
        creatorID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        __typename
      }
      seriesPart
      premium
      contributors {
        items {
          id
          createdAt
          updatedAt
          storyID
          name
          contribution
          link
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onCreateGenre = /* GraphQL */ `
  subscription OnCreateGenre($filter: ModelSubscriptionGenreFilterInput) {
    onCreateGenre(filter: $filter) {
      id
      genre
      icon
      color
      imageUri
      tags {
        items {
          id
          genreId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      eroticTags {
        items {
          id
          genreId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateGenre = /* GraphQL */ `
  subscription OnUpdateGenre($filter: ModelSubscriptionGenreFilterInput) {
    onUpdateGenre(filter: $filter) {
      id
      genre
      icon
      color
      imageUri
      tags {
        items {
          id
          genreId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      eroticTags {
        items {
          id
          genreId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteGenre = /* GraphQL */ `
  subscription OnDeleteGenre($filter: ModelSubscriptionGenreFilterInput) {
    onDeleteGenre(filter: $filter) {
      id
      genre
      icon
      color
      imageUri
      tags {
        items {
          id
          genreId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      eroticTags {
        items {
          id
          genreId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateContributor = /* GraphQL */ `
  subscription OnCreateContributor(
    $filter: ModelSubscriptionContributorFilterInput
  ) {
    onCreateContributor(filter: $filter) {
      id
      createdAt
      updatedAt
      storyID
      name
      contribution
      link
      __typename
    }
  }
`;
export const onUpdateContributor = /* GraphQL */ `
  subscription OnUpdateContributor(
    $filter: ModelSubscriptionContributorFilterInput
  ) {
    onUpdateContributor(filter: $filter) {
      id
      createdAt
      updatedAt
      storyID
      name
      contribution
      link
      __typename
    }
  }
`;
export const onDeleteContributor = /* GraphQL */ `
  subscription OnDeleteContributor(
    $filter: ModelSubscriptionContributorFilterInput
  ) {
    onDeleteContributor(filter: $filter) {
      id
      createdAt
      updatedAt
      storyID
      name
      contribution
      link
      __typename
    }
  }
`;
export const onCreateSeries = /* GraphQL */ `
  subscription OnCreateSeries($filter: ModelSubscriptionSeriesFilterInput) {
    onCreateSeries(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      name
      genreID
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      stories {
        items {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        nextToken
        __typename
      }
      creatorID
      creator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateSeries = /* GraphQL */ `
  subscription OnUpdateSeries($filter: ModelSubscriptionSeriesFilterInput) {
    onUpdateSeries(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      name
      genreID
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      stories {
        items {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        nextToken
        __typename
      }
      creatorID
      creator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteSeries = /* GraphQL */ `
  subscription OnDeleteSeries($filter: ModelSubscriptionSeriesFilterInput) {
    onDeleteSeries(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      name
      genreID
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      stories {
        items {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        nextToken
        __typename
      }
      creatorID
      creator {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        imageUri
        bio
        penName
        penNameLowerCase
        email
        website
        instagram
        tikTok
        facebook
        deviantArt
        reddit
        youTube
        numAuthored
        stories {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
        numFollowers
        __typename
      }
      __typename
    }
  }
`;
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag($filter: ModelSubscriptionTagFilterInput) {
    onCreateTag(filter: $filter) {
      id
      updatedAt
      createdAt
      type
      tagName
      genre {
        items {
          id
          genreId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      stories {
        items {
          id
          storyId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      count
      __typename
    }
  }
`;
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag($filter: ModelSubscriptionTagFilterInput) {
    onUpdateTag(filter: $filter) {
      id
      updatedAt
      createdAt
      type
      tagName
      genre {
        items {
          id
          genreId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      stories {
        items {
          id
          storyId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      count
      __typename
    }
  }
`;
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag($filter: ModelSubscriptionTagFilterInput) {
    onDeleteTag(filter: $filter) {
      id
      updatedAt
      createdAt
      type
      tagName
      genre {
        items {
          id
          genreId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      stories {
        items {
          id
          storyId
          tagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      count
      __typename
    }
  }
`;
export const onCreateEroticTag = /* GraphQL */ `
  subscription OnCreateEroticTag(
    $filter: ModelSubscriptionEroticTagFilterInput
  ) {
    onCreateEroticTag(filter: $filter) {
      id
      updatedAt
      createdAt
      type
      tagName
      genre {
        items {
          id
          genreId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      stories {
        items {
          id
          storyId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      count
      __typename
    }
  }
`;
export const onUpdateEroticTag = /* GraphQL */ `
  subscription OnUpdateEroticTag(
    $filter: ModelSubscriptionEroticTagFilterInput
  ) {
    onUpdateEroticTag(filter: $filter) {
      id
      updatedAt
      createdAt
      type
      tagName
      genre {
        items {
          id
          genreId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      stories {
        items {
          id
          storyId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      count
      __typename
    }
  }
`;
export const onDeleteEroticTag = /* GraphQL */ `
  subscription OnDeleteEroticTag(
    $filter: ModelSubscriptionEroticTagFilterInput
  ) {
    onDeleteEroticTag(filter: $filter) {
      id
      updatedAt
      createdAt
      type
      tagName
      genre {
        items {
          id
          genreId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      stories {
        items {
          id
          storyId
          eroticTagId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      count
      __typename
    }
  }
`;
export const onCreatePinnedStory = /* GraphQL */ `
  subscription OnCreatePinnedStory(
    $filter: ModelSubscriptionPinnedStoryFilterInput
  ) {
    onCreatePinnedStory(filter: $filter) {
      id
      type
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePinnedStory = /* GraphQL */ `
  subscription OnUpdatePinnedStory(
    $filter: ModelSubscriptionPinnedStoryFilterInput
  ) {
    onUpdatePinnedStory(filter: $filter) {
      id
      type
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePinnedStory = /* GraphQL */ `
  subscription OnDeletePinnedStory(
    $filter: ModelSubscriptionPinnedStoryFilterInput
  ) {
    onDeletePinnedStory(filter: $filter) {
      id
      type
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateInProgressStory = /* GraphQL */ `
  subscription OnCreateInProgressStory(
    $filter: ModelSubscriptionInProgressStoryFilterInput
  ) {
    onCreateInProgressStory(filter: $filter) {
      id
      type
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      createdAt
      updatedAt
      time
      __typename
    }
  }
`;
export const onUpdateInProgressStory = /* GraphQL */ `
  subscription OnUpdateInProgressStory(
    $filter: ModelSubscriptionInProgressStoryFilterInput
  ) {
    onUpdateInProgressStory(filter: $filter) {
      id
      type
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      createdAt
      updatedAt
      time
      __typename
    }
  }
`;
export const onDeleteInProgressStory = /* GraphQL */ `
  subscription OnDeleteInProgressStory(
    $filter: ModelSubscriptionInProgressStoryFilterInput
  ) {
    onDeleteInProgressStory(filter: $filter) {
      id
      type
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      createdAt
      updatedAt
      time
      __typename
    }
  }
`;
export const onCreateFinishedStory = /* GraphQL */ `
  subscription OnCreateFinishedStory(
    $filter: ModelSubscriptionFinishedStoryFilterInput
  ) {
    onCreateFinishedStory(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      genreID
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateFinishedStory = /* GraphQL */ `
  subscription OnUpdateFinishedStory(
    $filter: ModelSubscriptionFinishedStoryFilterInput
  ) {
    onUpdateFinishedStory(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      genreID
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteFinishedStory = /* GraphQL */ `
  subscription OnDeleteFinishedStory(
    $filter: ModelSubscriptionFinishedStoryFilterInput
  ) {
    onDeleteFinishedStory(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      genreID
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      content
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      userID
      approved
      reactionID
      reaction {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        storyID
        story {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        reactionTypeID
        reactionType {
          id
          type
          createdAt
          updatedAt
          reaction
          icon
          imageUri
          __typename
        }
        __typename
      }
      ratingID
      rating {
        id
        createdAt
        updatedAt
        type
        storyID
        story {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        rating
        reactionTypeID
        reactionType {
          id
          type
          createdAt
          updatedAt
          reaction
          icon
          imageUri
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      content
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      userID
      approved
      reactionID
      reaction {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        storyID
        story {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        reactionTypeID
        reactionType {
          id
          type
          createdAt
          updatedAt
          reaction
          icon
          imageUri
          __typename
        }
        __typename
      }
      ratingID
      rating {
        id
        createdAt
        updatedAt
        type
        storyID
        story {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        rating
        reactionTypeID
        reactionType {
          id
          type
          createdAt
          updatedAt
          reaction
          icon
          imageUri
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      content
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      userID
      approved
      reactionID
      reaction {
        id
        type
        createdAt
        updatedAt
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        storyID
        story {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        reactionTypeID
        reactionType {
          id
          type
          createdAt
          updatedAt
          reaction
          icon
          imageUri
          __typename
        }
        __typename
      }
      ratingID
      rating {
        id
        createdAt
        updatedAt
        type
        storyID
        story {
          id
          type
          createdAt
          updatedAt
          title
          titleLowerCase
          titleLowerCaseNoThe
          imageUri
          audioUri
          publisherID
          creatorID
          narratorID
          illustratorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
          numComments
          ratingAvg
          ratingAmt
          genreID
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        userID
        user {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        rating
        reactionTypeID
        reactionType {
          id
          type
          createdAt
          updatedAt
          reaction
          icon
          imageUri
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
export const onCreateReaction = /* GraphQL */ `
  subscription OnCreateReaction($filter: ModelSubscriptionReactionFilterInput) {
    onCreateReaction(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      reactionTypeID
      reactionType {
        id
        type
        createdAt
        updatedAt
        reaction
        icon
        imageUri
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateReaction = /* GraphQL */ `
  subscription OnUpdateReaction($filter: ModelSubscriptionReactionFilterInput) {
    onUpdateReaction(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      reactionTypeID
      reactionType {
        id
        type
        createdAt
        updatedAt
        reaction
        icon
        imageUri
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteReaction = /* GraphQL */ `
  subscription OnDeleteReaction($filter: ModelSubscriptionReactionFilterInput) {
    onDeleteReaction(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      storyID
      story {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      reactionTypeID
      reactionType {
        id
        type
        createdAt
        updatedAt
        reaction
        icon
        imageUri
        __typename
      }
      __typename
    }
  }
`;
export const onCreateReactionType = /* GraphQL */ `
  subscription OnCreateReactionType(
    $filter: ModelSubscriptionReactionTypeFilterInput
  ) {
    onCreateReactionType(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      reaction
      icon
      imageUri
      __typename
    }
  }
`;
export const onUpdateReactionType = /* GraphQL */ `
  subscription OnUpdateReactionType(
    $filter: ModelSubscriptionReactionTypeFilterInput
  ) {
    onUpdateReactionType(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      reaction
      icon
      imageUri
      __typename
    }
  }
`;
export const onDeleteReactionType = /* GraphQL */ `
  subscription OnDeleteReactionType(
    $filter: ModelSubscriptionReactionTypeFilterInput
  ) {
    onDeleteReactionType(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      reaction
      icon
      imageUri
      __typename
    }
  }
`;
export const onCreateRating = /* GraphQL */ `
  subscription OnCreateRating($filter: ModelSubscriptionRatingFilterInput) {
    onCreateRating(filter: $filter) {
      id
      createdAt
      updatedAt
      type
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      rating
      reactionTypeID
      reactionType {
        id
        type
        createdAt
        updatedAt
        reaction
        icon
        imageUri
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateRating = /* GraphQL */ `
  subscription OnUpdateRating($filter: ModelSubscriptionRatingFilterInput) {
    onUpdateRating(filter: $filter) {
      id
      createdAt
      updatedAt
      type
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      rating
      reactionTypeID
      reactionType {
        id
        type
        createdAt
        updatedAt
        reaction
        icon
        imageUri
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteRating = /* GraphQL */ `
  subscription OnDeleteRating($filter: ModelSubscriptionRatingFilterInput) {
    onDeleteRating(filter: $filter) {
      id
      createdAt
      updatedAt
      type
      storyID
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      userID
      user {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      rating
      reactionTypeID
      reactionType {
        id
        type
        createdAt
        updatedAt
        reaction
        icon
        imageUri
        __typename
      }
      __typename
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      title
      subtitle
      content
      messageType
      status
      isReadByReceiver
      receiver {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      receiverID
      __typename
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      title
      subtitle
      content
      messageType
      status
      isReadByReceiver
      receiver {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      receiverID
      __typename
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      type
      createdAt
      updatedAt
      title
      subtitle
      content
      messageType
      status
      isReadByReceiver
      receiver {
        type
        createdAt
        updatedAt
        id
        name
        email
        imageUri
        bio
        publisherName
        website
        isPublisher
        numAuthored
        topthree
        following {
          nextToken
          __typename
        }
        numFolowing
        followers {
          nextToken
          __typename
        }
        numFollowers
        Pinned {
          nextToken
          __typename
        }
        Rated {
          nextToken
          __typename
        }
        Finished {
          nextToken
          __typename
        }
        plan
        messageRec {
          nextToken
          __typename
        }
        inProgressStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        numPublished
        isMod
        setting1
        setting2
        setting3
        setting4
        setting5
        creatorProfiles {
          nextToken
          __typename
        }
        __typename
      }
      receiverID
      __typename
    }
  }
`;
export const onCreateStoryTag = /* GraphQL */ `
  subscription OnCreateStoryTag($filter: ModelSubscriptionStoryTagFilterInput) {
    onCreateStoryTag(filter: $filter) {
      id
      storyId
      tagId
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      tag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStoryTag = /* GraphQL */ `
  subscription OnUpdateStoryTag($filter: ModelSubscriptionStoryTagFilterInput) {
    onUpdateStoryTag(filter: $filter) {
      id
      storyId
      tagId
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      tag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStoryTag = /* GraphQL */ `
  subscription OnDeleteStoryTag($filter: ModelSubscriptionStoryTagFilterInput) {
    onDeleteStoryTag(filter: $filter) {
      id
      storyId
      tagId
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      tag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateEroticStoryTag = /* GraphQL */ `
  subscription OnCreateEroticStoryTag(
    $filter: ModelSubscriptionEroticStoryTagFilterInput
  ) {
    onCreateEroticStoryTag(filter: $filter) {
      id
      storyId
      eroticTagId
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      eroticTag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEroticStoryTag = /* GraphQL */ `
  subscription OnUpdateEroticStoryTag(
    $filter: ModelSubscriptionEroticStoryTagFilterInput
  ) {
    onUpdateEroticStoryTag(filter: $filter) {
      id
      storyId
      eroticTagId
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      eroticTag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEroticStoryTag = /* GraphQL */ `
  subscription OnDeleteEroticStoryTag(
    $filter: ModelSubscriptionEroticStoryTagFilterInput
  ) {
    onDeleteEroticStoryTag(filter: $filter) {
      id
      storyId
      eroticTagId
      story {
        id
        type
        createdAt
        updatedAt
        title
        titleLowerCase
        titleLowerCaseNoThe
        imageUri
        audioUri
        publisher {
          type
          createdAt
          updatedAt
          id
          name
          email
          imageUri
          bio
          publisherName
          website
          isPublisher
          numAuthored
          topthree
          numFolowing
          numFollowers
          plan
          numPublished
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
        creator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        creatorID
        narratorProfile {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        narratorID
        illustrator {
          id
          type
          createdAt
          updatedAt
          userID
          imageUri
          bio
          penName
          penNameLowerCase
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          numFollowers
          __typename
        }
        illustratorID
        author
        narrator
        artist
        time
        summary
        description
        nsfw
        comments {
          nextToken
          __typename
        }
        numComments
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        ratingAvg
        ratingAmt
        ratings {
          nextToken
          __typename
        }
        reactions {
          nextToken
          __typename
        }
        genreID
        genre {
          id
          genre
          icon
          color
          imageUri
          createdAt
          updatedAt
          __typename
        }
        hidden
        status
        numListens
        approved
        seriesID
        series {
          id
          type
          createdAt
          updatedAt
          name
          genreID
          creatorID
          __typename
        }
        seriesPart
        premium
        contributors {
          nextToken
          __typename
        }
        __typename
      }
      eroticTag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateGenreTag = /* GraphQL */ `
  subscription OnCreateGenreTag($filter: ModelSubscriptionGenreTagFilterInput) {
    onCreateGenreTag(filter: $filter) {
      id
      genreId
      tagId
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      tag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateGenreTag = /* GraphQL */ `
  subscription OnUpdateGenreTag($filter: ModelSubscriptionGenreTagFilterInput) {
    onUpdateGenreTag(filter: $filter) {
      id
      genreId
      tagId
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      tag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteGenreTag = /* GraphQL */ `
  subscription OnDeleteGenreTag($filter: ModelSubscriptionGenreTagFilterInput) {
    onDeleteGenreTag(filter: $filter) {
      id
      genreId
      tagId
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      tag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateEroticaTag = /* GraphQL */ `
  subscription OnCreateEroticaTag(
    $filter: ModelSubscriptionEroticaTagFilterInput
  ) {
    onCreateEroticaTag(filter: $filter) {
      id
      genreId
      eroticTagId
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      eroticTag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEroticaTag = /* GraphQL */ `
  subscription OnUpdateEroticaTag(
    $filter: ModelSubscriptionEroticaTagFilterInput
  ) {
    onUpdateEroticaTag(filter: $filter) {
      id
      genreId
      eroticTagId
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      eroticTag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEroticaTag = /* GraphQL */ `
  subscription OnDeleteEroticaTag(
    $filter: ModelSubscriptionEroticaTagFilterInput
  ) {
    onDeleteEroticaTag(filter: $filter) {
      id
      genreId
      eroticTagId
      genre {
        id
        genre
        icon
        color
        imageUri
        tags {
          nextToken
          __typename
        }
        eroticTags {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      eroticTag {
        id
        updatedAt
        createdAt
        type
        tagName
        genre {
          nextToken
          __typename
        }
        stories {
          nextToken
          __typename
        }
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
