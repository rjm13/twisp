/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          genre {
            id
            genre
            icon
            color
          }
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCreatorProfile = /* GraphQL */ `
  query GetCreatorProfile($id: ID!) {
    getCreatorProfile(id: $id) {
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
export const listCreatorProfiles = /* GraphQL */ `
  query ListCreatorProfiles(
    $filter: ModelCreatorProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreatorProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getFollowConnection = /* GraphQL */ `
  query GetFollowConnection($id: ID!) {
    getFollowConnection(id: $id) {
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
export const listFollowConnections = /* GraphQL */ `
  query ListFollowConnections(
    $filter: ModelFollowConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getStory = /* GraphQL */ `
  query GetStory($id: ID!) {
    getStory(id: $id) {
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
          tag {
            id
            tagName
            count
          }
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
          eroticTag {
            id
            tagName
            count
          }
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
export const listStories = /* GraphQL */ `
  query ListStories(
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      __typename
    }
  }
`;
export const getGenre = /* GraphQL */ `
  query GetGenre($id: ID!) {
    getGenre(id: $id) {
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
export const listGenres = /* GraphQL */ `
  query ListGenres(
    $filter: ModelGenreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGenres(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getContributor = /* GraphQL */ `
  query GetContributor($id: ID!) {
    getContributor(id: $id) {
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
export const listContributors = /* GraphQL */ `
  query ListContributors(
    $filter: ModelContributorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContributors(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getSeries = /* GraphQL */ `
  query GetSeries($id: ID!) {
    getSeries(id: $id) {
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
export const listSeries = /* GraphQL */ `
  query ListSeries(
    $filter: ModelSeriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
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
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getEroticTag = /* GraphQL */ `
  query GetEroticTag($id: ID!) {
    getEroticTag(id: $id) {
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
export const listEroticTags = /* GraphQL */ `
  query ListEroticTags(
    $filter: ModelEroticTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEroticTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPinnedStory = /* GraphQL */ `
  query GetPinnedStory($id: ID!) {
    getPinnedStory(id: $id) {
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
export const listPinnedStories = /* GraphQL */ `
  query ListPinnedStories(
    $filter: ModelPinnedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPinnedStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getInProgressStory = /* GraphQL */ `
  query GetInProgressStory($id: ID!) {
    getInProgressStory(id: $id) {
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
export const listInProgressStories = /* GraphQL */ `
  query ListInProgressStories(
    $filter: ModelInProgressStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInProgressStories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        time
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFinishedStory = /* GraphQL */ `
  query GetFinishedStory($id: ID!) {
    getFinishedStory(id: $id) {
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
export const listFinishedStories = /* GraphQL */ `
  query ListFinishedStories(
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFinishedStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        userID
        approved
        reactionID
        reaction {
          id
          type
          createdAt
          updatedAt
          userID
          storyID
          reactionTypeID
          __typename
        }
        ratingID
        rating {
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReaction = /* GraphQL */ `
  query GetReaction($id: ID!) {
    getReaction(id: $id) {
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
export const listReactions = /* GraphQL */ `
  query ListReactions(
    $filter: ModelReactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getReactionType = /* GraphQL */ `
  query GetReactionType($id: ID!) {
    getReactionType(id: $id) {
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
export const listReactionTypes = /* GraphQL */ `
  query ListReactionTypes(
    $filter: ModelReactionTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReactionTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        updatedAt
        reaction
        icon
        imageUri
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRating = /* GraphQL */ `
  query GetRating($id: ID!) {
    getRating(id: $id) {
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
export const listRatings = /* GraphQL */ `
  query ListRatings(
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        receiverID
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStoryTag = /* GraphQL */ `
  query GetStoryTag($id: ID!) {
    getStoryTag(id: $id) {
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
export const listStoryTags = /* GraphQL */ `
  query ListStoryTags(
    $filter: ModelStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStoryTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        tag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEroticStoryTag = /* GraphQL */ `
  query GetEroticStoryTag($id: ID!) {
    getEroticStoryTag(id: $id) {
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
export const listEroticStoryTags = /* GraphQL */ `
  query ListEroticStoryTags(
    $filter: ModelEroticStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEroticStoryTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        eroticTag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGenreTag = /* GraphQL */ `
  query GetGenreTag($id: ID!) {
    getGenreTag(id: $id) {
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
export const listGenreTags = /* GraphQL */ `
  query ListGenreTags(
    $filter: ModelGenreTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGenreTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        genreId
        tagId
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
        tag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEroticaTag = /* GraphQL */ `
  query GetEroticaTag($id: ID!) {
    getEroticaTag(id: $id) {
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
export const listEroticaTags = /* GraphQL */ `
  query ListEroticaTags(
    $filter: ModelEroticaTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEroticaTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        genreId
        eroticTagId
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
        eroticTag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const creatorsByType = /* GraphQL */ `
  query CreatorsByType(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorsByType(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const creatorsByName = /* GraphQL */ `
  query CreatorsByName(
    $type: String!
    $penNameLowerCase: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorsByName(
      type: $type
      penNameLowerCase: $penNameLowerCase
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const creatorProfilesByUser = /* GraphQL */ `
  query CreatorProfilesByUser(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCreatorProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    creatorProfilesByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const connectionsByFollower = /* GraphQL */ `
  query ConnectionsByFollower(
    $followerID: ID!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    connectionsByFollower(
      followerID: $followerID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const connectionsByFollowerByCreator = /* GraphQL */ `
  query ConnectionsByFollowerByCreator(
    $followerID: ID!
    $creatorID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    connectionsByFollowerByCreator(
      followerID: $followerID
      creatorID: $creatorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const connectionsByAuthor = /* GraphQL */ `
  query ConnectionsByAuthor(
    $authorID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    connectionsByAuthor(
      authorID: $authorID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const connectionsByCreator = /* GraphQL */ `
  query ConnectionsByCreator(
    $creatorID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    connectionsByCreator(
      creatorID: $creatorID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByDate = /* GraphQL */ `
  query StoriesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByUpdated = /* GraphQL */ `
  query StoriesByUpdated(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByUpdated(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByTitle = /* GraphQL */ `
  query StoriesByTitle(
    $type: String!
    $titleLowerCase: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByTitle(
      type: $type
      titleLowerCase: $titleLowerCase
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByTitleLower = /* GraphQL */ `
  query StoriesByTitleLower(
    $type: String!
    $titleLowerCaseNoThe: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByTitleLower(
      type: $type
      titleLowerCaseNoThe: $titleLowerCaseNoThe
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByPublisher = /* GraphQL */ `
  query StoriesByPublisher(
    $publisherID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByPublisher(
      publisherID: $publisherID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByCreator = /* GraphQL */ `
  query StoriesByCreator(
    $creatorID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByCreator(
      creatorID: $creatorID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByNarrator = /* GraphQL */ `
  query StoriesByNarrator(
    $narratorID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByNarrator(
      narratorID: $narratorID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByIllustrator = /* GraphQL */ `
  query StoriesByIllustrator(
    $illustratorID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByIllustrator(
      illustratorID: $illustratorID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByGenre = /* GraphQL */ `
  query StoriesByGenre(
    $genreID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByGenre(
      genreID: $genreID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesByGenreByTitle = /* GraphQL */ `
  query StoriesByGenreByTitle(
    $genreID: ID!
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByGenreByTitle(
      genreID: $genreID
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const storiesBySeries = /* GraphQL */ `
  query StoriesBySeries(
    $seriesID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesBySeries(
      seriesID: $seriesID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const contributorsByStory = /* GraphQL */ `
  query ContributorsByStory(
    $storyID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContributorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contributorsByStory(
      storyID: $storyID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const seriesByGenre = /* GraphQL */ `
  query SeriesByGenre(
    $genreID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSeriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    seriesByGenre(
      genreID: $genreID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const seriesByCreator = /* GraphQL */ `
  query SeriesByCreator(
    $creatorID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSeriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    seriesByCreator(
      creatorID: $creatorID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const tagsByCreated = /* GraphQL */ `
  query TagsByCreated(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagsByCreated(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const tagsByUpdated = /* GraphQL */ `
  query TagsByUpdated(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagsByUpdated(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const tagsByTitle = /* GraphQL */ `
  query TagsByTitle(
    $type: String!
    $tagName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagsByTitle(
      type: $type
      tagName: $tagName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const tagsByName = /* GraphQL */ `
  query TagsByName(
    $tagName: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagsByName(
      tagName: $tagName
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const EroticTagsByCreated = /* GraphQL */ `
  query EroticTagsByCreated(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEroticTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    EroticTagsByCreated(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const EroticTagsByUpdated = /* GraphQL */ `
  query EroticTagsByUpdated(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEroticTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    EroticTagsByUpdated(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const eroticTagsByName = /* GraphQL */ `
  query EroticTagsByName(
    $tagName: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEroticTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eroticTagsByName(
      tagName: $tagName
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const pinnedStoriesByUser = /* GraphQL */ `
  query PinnedStoriesByUser(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPinnedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pinnedStoriesByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          genre {
            id
            genre
            icon
            color
          }
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pinnedStoriesByUserByStory = /* GraphQL */ `
  query PinnedStoriesByUserByStory(
    $userID: ID!
    $storyID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPinnedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pinnedStoriesByUserByStory(
      userID: $userID
      storyID: $storyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const inProgressStoriesByUpdated = /* GraphQL */ `
  query InProgressStoriesByUpdated(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInProgressStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inProgressStoriesByUpdated(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        time
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const inProgressStoriesByUser = /* GraphQL */ `
  query InProgressStoriesByUser(
    $userID: ID!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInProgressStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inProgressStoriesByUser(
      userID: $userID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          genre {
            id
            genre
            icon
            color
          }
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        createdAt
        updatedAt
        time
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const inProgressStoriesByUserByStory = /* GraphQL */ `
  query InProgressStoriesByUserByStory(
    $userID: ID!
    $storyID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInProgressStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inProgressStoriesByUserByStory(
      userID: $userID
      storyID: $storyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        time
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const finishedStoriesByDate = /* GraphQL */ `
  query FinishedStoriesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finishedStoriesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          genre {
            id
            color
            icon
            genre
          }
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const finishedStoriesByUser = /* GraphQL */ `
  query FinishedStoriesByUser(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finishedStoriesByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          genre {
            id
            genre
            icon
            color
          }
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const finishedStoriesByUserByStory = /* GraphQL */ `
  query FinishedStoriesByUserByStory(
    $userID: ID!
    $storyID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finishedStoriesByUserByStory(
      userID: $userID
      storyID: $storyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const finishedStoriesByStoryIDAndCreatedAt = /* GraphQL */ `
  query FinishedStoriesByStoryIDAndCreatedAt(
    $storyID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finishedStoriesByStoryIDAndCreatedAt(
      storyID: $storyID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const finishedStoriesByGenre = /* GraphQL */ `
  query FinishedStoriesByGenre(
    $genreID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finishedStoriesByGenre(
      genreID: $genreID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          genre {
            id
            color
            genre
            icon
          }
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByCreated = /* GraphQL */ `
  query CommentsByCreated(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByCreated(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        userID
        approved
        reactionID
        reaction {
          id
          type
          createdAt
          updatedAt
          userID
          storyID
          reactionTypeID
          __typename
        }
        ratingID
        rating {
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByStory = /* GraphQL */ `
  query CommentsByStory(
    $storyID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByStory(
      storyID: $storyID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        userID
        approved
        reactionID
        reaction {
          id
          type
          createdAt
          updatedAt
          userID
          storyID
          reactionTypeID
          __typename
        }
        ratingID
        rating {
          id
          createdAt
          updatedAt
          type
          storyID
          userID
          rating
          reactionTypeID
          reactionType {
            id
            reaction
            icon
        }
          __typename
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const reactionsByStory = /* GraphQL */ `
  query ReactionsByStory(
    $storyID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reactionsByStory(
      storyID: $storyID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const ratingsByUpdated = /* GraphQL */ `
  query RatingsByUpdated(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratingsByUpdated(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const ratingsByStoryIDAndId = /* GraphQL */ `
  query RatingsByStoryIDAndId(
    $storyID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratingsByStoryIDAndId(
      storyID: $storyID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const ratingsByUser = /* GraphQL */ `
  query RatingsByUser(
    $userID: ID!
    $storyID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratingsByUser(
      userID: $userID
      storyID: $storyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          genre {
            id
            genre
            icon
            color
          }
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
      nextToken
      __typename
    }
  }
`;
export const messagesByUser = /* GraphQL */ `
  query MessagesByUser(
    $receiverID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByUser(
      receiverID: $receiverID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        receiverID
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const storyTagsByStoryId = /* GraphQL */ `
  query StoryTagsByStoryId(
    $storyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storyTagsByStoryId(
      storyId: $storyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        tag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const storyTagsByTagId = /* GraphQL */ `
  query StoryTagsByTagId(
    $tagId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storyTagsByTagId(
      tagId: $tagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          genre {
            id
            genre
            icon
            color
          }
          hidden
          status
          numListens
          approved
          seriesID
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
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const eroticStoryTagsByStoryId = /* GraphQL */ `
  query EroticStoryTagsByStoryId(
    $storyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEroticStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eroticStoryTagsByStoryId(
      storyId: $storyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        eroticTag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const eroticStoryTagsByEroticTagId = /* GraphQL */ `
  query EroticStoryTagsByEroticTagId(
    $eroticTagId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEroticStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eroticStoryTagsByEroticTagId(
      eroticTagId: $eroticTagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          genre {
            id
            genre
            icon
            color
          }
          hidden
          status
          numListens
          approved
          seriesID
          seriesPart
          premium
          __typename
        }
        eroticTag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const genreTagsByGenreId = /* GraphQL */ `
  query GenreTagsByGenreId(
    $genreId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGenreTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    genreTagsByGenreId(
      genreId: $genreId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        genreId
        tagId
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
        tag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const genreTagsByTagId = /* GraphQL */ `
  query GenreTagsByTagId(
    $tagId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGenreTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    genreTagsByTagId(
      tagId: $tagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        genreId
        tagId
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
        tag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const eroticaTagsByGenreId = /* GraphQL */ `
  query EroticaTagsByGenreId(
    $genreId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEroticaTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eroticaTagsByGenreId(
      genreId: $genreId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        genreId
        eroticTagId
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
        eroticTag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const eroticaTagsByEroticTagId = /* GraphQL */ `
  query EroticaTagsByEroticTagId(
    $eroticTagId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEroticaTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eroticaTagsByEroticTagId(
      eroticTagId: $eroticTagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        genreId
        eroticTagId
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
        eroticTag {
          id
          updatedAt
          createdAt
          type
          tagName
          count
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
