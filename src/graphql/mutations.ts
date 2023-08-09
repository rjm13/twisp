/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
          imageUri
          audioUri
          publisherID
          creatorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
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
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
          imageUri
          audioUri
          publisherID
          creatorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
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
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
          imageUri
          audioUri
          publisherID
          creatorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
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
          email
          website
          instagram
          tikTok
          facebook
          deviantArt
          reddit
          youTube
          numAuthored
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const createCreatorProfile = /* GraphQL */ `
  mutation CreateCreatorProfile(
    $input: CreateCreatorProfileInput!
    $condition: ModelCreatorProfileConditionInput
  ) {
    createCreatorProfile(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          imageUri
          audioUri
          publisherID
          creatorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
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
      __typename
    }
  }
`;
export const updateCreatorProfile = /* GraphQL */ `
  mutation UpdateCreatorProfile(
    $input: UpdateCreatorProfileInput!
    $condition: ModelCreatorProfileConditionInput
  ) {
    updateCreatorProfile(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          imageUri
          audioUri
          publisherID
          creatorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
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
      __typename
    }
  }
`;
export const deleteCreatorProfile = /* GraphQL */ `
  mutation DeleteCreatorProfile(
    $input: DeleteCreatorProfileInput!
    $condition: ModelCreatorProfileConditionInput
  ) {
    deleteCreatorProfile(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          imageUri
          audioUri
          publisherID
          creatorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
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
      __typename
    }
  }
`;
export const createFollowConnection = /* GraphQL */ `
  mutation CreateFollowConnection(
    $input: CreateFollowConnectionInput!
    $condition: ModelFollowConnectionConditionInput
  ) {
    createFollowConnection(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
        __typename
      }
      __typename
    }
  }
`;
export const updateFollowConnection = /* GraphQL */ `
  mutation UpdateFollowConnection(
    $input: UpdateFollowConnectionInput!
    $condition: ModelFollowConnectionConditionInput
  ) {
    updateFollowConnection(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
        __typename
      }
      __typename
    }
  }
`;
export const deleteFollowConnection = /* GraphQL */ `
  mutation DeleteFollowConnection(
    $input: DeleteFollowConnectionInput!
    $condition: ModelFollowConnectionConditionInput
  ) {
    deleteFollowConnection(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
        __typename
      }
      __typename
    }
  }
`;
export const createStory = /* GraphQL */ `
  mutation CreateStory(
    $input: CreateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    createStory(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
      title
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
        followers {
          nextToken
          __typename
        }
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
        followers {
          nextToken
          __typename
        }
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
          __typename
        }
        nextToken
        __typename
      }
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
          reaction
          icon
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
        __typename
      }
      seriesPart
      premium
      __typename
    }
  }
`;
export const updateStory = /* GraphQL */ `
  mutation UpdateStory(
    $input: UpdateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    updateStory(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
      title
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
        followers {
          nextToken
          __typename
        }
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
        followers {
          nextToken
          __typename
        }
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
          __typename
        }
        nextToken
        __typename
      }
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
          reaction
          icon
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
        __typename
      }
      seriesPart
      premium
      __typename
    }
  }
`;
export const deleteStory = /* GraphQL */ `
  mutation DeleteStory(
    $input: DeleteStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    deleteStory(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
      title
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
        followers {
          nextToken
          __typename
        }
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
        followers {
          nextToken
          __typename
        }
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
          __typename
        }
        nextToken
        __typename
      }
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
          reaction
          icon
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
        __typename
      }
      seriesPart
      premium
      __typename
    }
  }
`;
export const createGenre = /* GraphQL */ `
  mutation CreateGenre(
    $input: CreateGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    createGenre(input: $input, condition: $condition) {
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
export const updateGenre = /* GraphQL */ `
  mutation UpdateGenre(
    $input: UpdateGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    updateGenre(input: $input, condition: $condition) {
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
export const deleteGenre = /* GraphQL */ `
  mutation DeleteGenre(
    $input: DeleteGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    deleteGenre(input: $input, condition: $condition) {
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
export const createSeries = /* GraphQL */ `
  mutation CreateSeries(
    $input: CreateSeriesInput!
    $condition: ModelSeriesConditionInput
  ) {
    createSeries(input: $input, condition: $condition) {
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
          imageUri
          audioUri
          publisherID
          creatorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
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
      __typename
    }
  }
`;
export const updateSeries = /* GraphQL */ `
  mutation UpdateSeries(
    $input: UpdateSeriesInput!
    $condition: ModelSeriesConditionInput
  ) {
    updateSeries(input: $input, condition: $condition) {
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
          imageUri
          audioUri
          publisherID
          creatorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
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
      __typename
    }
  }
`;
export const deleteSeries = /* GraphQL */ `
  mutation DeleteSeries(
    $input: DeleteSeriesInput!
    $condition: ModelSeriesConditionInput
  ) {
    deleteSeries(input: $input, condition: $condition) {
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
          imageUri
          audioUri
          publisherID
          creatorID
          author
          narrator
          artist
          time
          summary
          description
          nsfw
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
      __typename
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createEroticTag = /* GraphQL */ `
  mutation CreateEroticTag(
    $input: CreateEroticTagInput!
    $condition: ModelEroticTagConditionInput
  ) {
    createEroticTag(input: $input, condition: $condition) {
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
      count
      __typename
    }
  }
`;
export const updateEroticTag = /* GraphQL */ `
  mutation UpdateEroticTag(
    $input: UpdateEroticTagInput!
    $condition: ModelEroticTagConditionInput
  ) {
    updateEroticTag(input: $input, condition: $condition) {
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
      count
      __typename
    }
  }
`;
export const deleteEroticTag = /* GraphQL */ `
  mutation DeleteEroticTag(
    $input: DeleteEroticTagInput!
    $condition: ModelEroticTagConditionInput
  ) {
    deleteEroticTag(input: $input, condition: $condition) {
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
      count
      __typename
    }
  }
`;
export const createPinnedStory = /* GraphQL */ `
  mutation CreatePinnedStory(
    $input: CreatePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    createPinnedStory(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePinnedStory = /* GraphQL */ `
  mutation UpdatePinnedStory(
    $input: UpdatePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    updatePinnedStory(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePinnedStory = /* GraphQL */ `
  mutation DeletePinnedStory(
    $input: DeletePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    deletePinnedStory(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createInProgressStory = /* GraphQL */ `
  mutation CreateInProgressStory(
    $input: CreateInProgressStoryInput!
    $condition: ModelInProgressStoryConditionInput
  ) {
    createInProgressStory(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
        __typename
      }
      createdAt
      updatedAt
      time
      __typename
    }
  }
`;
export const updateInProgressStory = /* GraphQL */ `
  mutation UpdateInProgressStory(
    $input: UpdateInProgressStoryInput!
    $condition: ModelInProgressStoryConditionInput
  ) {
    updateInProgressStory(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
        __typename
      }
      createdAt
      updatedAt
      time
      __typename
    }
  }
`;
export const deleteInProgressStory = /* GraphQL */ `
  mutation DeleteInProgressStory(
    $input: DeleteInProgressStoryInput!
    $condition: ModelInProgressStoryConditionInput
  ) {
    deleteInProgressStory(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
        __typename
      }
      createdAt
      updatedAt
      time
      __typename
    }
  }
`;
export const createFinishedStory = /* GraphQL */ `
  mutation CreateFinishedStory(
    $input: CreateFinishedStoryInput!
    $condition: ModelFinishedStoryConditionInput
  ) {
    createFinishedStory(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
        __typename
      }
      __typename
    }
  }
`;
export const updateFinishedStory = /* GraphQL */ `
  mutation UpdateFinishedStory(
    $input: UpdateFinishedStoryInput!
    $condition: ModelFinishedStoryConditionInput
  ) {
    updateFinishedStory(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
        __typename
      }
      __typename
    }
  }
`;
export const deleteFinishedStory = /* GraphQL */ `
  mutation DeleteFinishedStory(
    $input: DeleteFinishedStoryInput!
    $condition: ModelFinishedStoryConditionInput
  ) {
    deleteFinishedStory(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
        __typename
      }
      __typename
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
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
        followers {
          nextToken
          __typename
        }
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
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
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
        followers {
          nextToken
          __typename
        }
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
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
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
        followers {
          nextToken
          __typename
        }
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
      __typename
    }
  }
`;
export const createReaction = /* GraphQL */ `
  mutation CreateReaction(
    $input: CreateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    createReaction(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
        followers {
          nextToken
          __typename
        }
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
      reaction
      icon
      __typename
    }
  }
`;
export const updateReaction = /* GraphQL */ `
  mutation UpdateReaction(
    $input: UpdateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    updateReaction(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
        followers {
          nextToken
          __typename
        }
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
      reaction
      icon
      __typename
    }
  }
`;
export const deleteReaction = /* GraphQL */ `
  mutation DeleteReaction(
    $input: DeleteReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    deleteReaction(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
        followers {
          nextToken
          __typename
        }
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
      reaction
      icon
      __typename
    }
  }
`;
export const createRating = /* GraphQL */ `
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
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
        following {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
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
      __typename
    }
  }
`;
export const updateRating = /* GraphQL */ `
  mutation UpdateRating(
    $input: UpdateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    updateRating(input: $input, condition: $condition) {
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
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
        following {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
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
      __typename
    }
  }
`;
export const deleteRating = /* GraphQL */ `
  mutation DeleteRating(
    $input: DeleteRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    deleteRating(input: $input, condition: $condition) {
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
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
        following {
          nextToken
          __typename
        }
        followers {
          nextToken
          __typename
        }
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
      __typename
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
        followers {
          nextToken
          __typename
        }
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
export const createStoryTag = /* GraphQL */ `
  mutation CreateStoryTag(
    $input: CreateStoryTagInput!
    $condition: ModelStoryTagConditionInput
  ) {
    createStoryTag(input: $input, condition: $condition) {
      id
      storyId
      tagId
      story {
        id
        type
        createdAt
        updatedAt
        title
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
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
export const updateStoryTag = /* GraphQL */ `
  mutation UpdateStoryTag(
    $input: UpdateStoryTagInput!
    $condition: ModelStoryTagConditionInput
  ) {
    updateStoryTag(input: $input, condition: $condition) {
      id
      storyId
      tagId
      story {
        id
        type
        createdAt
        updatedAt
        title
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
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
export const deleteStoryTag = /* GraphQL */ `
  mutation DeleteStoryTag(
    $input: DeleteStoryTagInput!
    $condition: ModelStoryTagConditionInput
  ) {
    deleteStoryTag(input: $input, condition: $condition) {
      id
      storyId
      tagId
      story {
        id
        type
        createdAt
        updatedAt
        title
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
          plan
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
          plan
          isMod
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        creatorID
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
        tags {
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
          __typename
        }
        seriesPart
        premium
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
export const createGenreTag = /* GraphQL */ `
  mutation CreateGenreTag(
    $input: CreateGenreTagInput!
    $condition: ModelGenreTagConditionInput
  ) {
    createGenreTag(input: $input, condition: $condition) {
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
export const updateGenreTag = /* GraphQL */ `
  mutation UpdateGenreTag(
    $input: UpdateGenreTagInput!
    $condition: ModelGenreTagConditionInput
  ) {
    updateGenreTag(input: $input, condition: $condition) {
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
export const deleteGenreTag = /* GraphQL */ `
  mutation DeleteGenreTag(
    $input: DeleteGenreTagInput!
    $condition: ModelGenreTagConditionInput
  ) {
    deleteGenreTag(input: $input, condition: $condition) {
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
export const createEroticaTag = /* GraphQL */ `
  mutation CreateEroticaTag(
    $input: CreateEroticaTagInput!
    $condition: ModelEroticaTagConditionInput
  ) {
    createEroticaTag(input: $input, condition: $condition) {
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
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEroticaTag = /* GraphQL */ `
  mutation UpdateEroticaTag(
    $input: UpdateEroticaTagInput!
    $condition: ModelEroticaTagConditionInput
  ) {
    updateEroticaTag(input: $input, condition: $condition) {
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
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEroticaTag = /* GraphQL */ `
  mutation DeleteEroticaTag(
    $input: DeleteEroticaTagInput!
    $condition: ModelEroticaTagConditionInput
  ) {
    deleteEroticaTag(input: $input, condition: $condition) {
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
        count
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
