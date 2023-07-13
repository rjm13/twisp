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
          eroticStoryID
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
          eroticStoryID
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
          eroticStoryID
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
      inProgressEroticStories {
        items {
          id
          type
          userID
          eroticStoryID
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
          __typename
        }
        nextToken
        __typename
      }
      setting1
      setting2
      setting3
      setting4
      setting5
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
          eroticStoryID
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
          eroticStoryID
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
          eroticStoryID
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
      inProgressEroticStories {
        items {
          id
          type
          userID
          eroticStoryID
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
          __typename
        }
        nextToken
        __typename
      }
      setting1
      setting2
      setting3
      setting4
      setting5
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
          eroticStoryID
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
          eroticStoryID
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
          eroticStoryID
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
      inProgressEroticStories {
        items {
          id
          type
          userID
          eroticStoryID
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
          __typename
        }
        nextToken
        __typename
      }
      setting1
      setting2
      setting3
      setting4
      setting5
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      publisherID
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
          createdAt
          updatedAt
          type
          storyID
          eroticStoryID
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
          eroticStoryID
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
          eroticStoryID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      publisherID
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
          createdAt
          updatedAt
          type
          storyID
          eroticStoryID
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
          eroticStoryID
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
          eroticStoryID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      publisherID
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
          createdAt
          updatedAt
          type
          storyID
          eroticStoryID
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
          eroticStoryID
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
          eroticStoryID
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
      __typename
    }
  }
`;
export const onCreateEroticStory = /* GraphQL */ `
  subscription OnCreateEroticStory(
    $filter: ModelSubscriptionEroticStoryFilterInput
  ) {
    onCreateEroticStory(filter: $filter) {
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      publisherID
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
          createdAt
          updatedAt
          type
          storyID
          eroticStoryID
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
          eroticStoryId
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
          eroticStoryID
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
          eroticStoryID
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
      __typename
    }
  }
`;
export const onUpdateEroticStory = /* GraphQL */ `
  subscription OnUpdateEroticStory(
    $filter: ModelSubscriptionEroticStoryFilterInput
  ) {
    onUpdateEroticStory(filter: $filter) {
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      publisherID
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
          createdAt
          updatedAt
          type
          storyID
          eroticStoryID
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
          eroticStoryId
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
          eroticStoryID
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
          eroticStoryID
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
      __typename
    }
  }
`;
export const onDeleteEroticStory = /* GraphQL */ `
  subscription OnDeleteEroticStory(
    $filter: ModelSubscriptionEroticStoryFilterInput
  ) {
    onDeleteEroticStory(filter: $filter) {
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      publisherID
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
          createdAt
          updatedAt
          type
          storyID
          eroticStoryID
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
          eroticStoryId
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
          eroticStoryID
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
          eroticStoryID
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
          eroticStoryId
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
          eroticStoryId
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
          eroticStoryId
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      createdAt
      updatedAt
      time
      __typename
    }
  }
`;
export const onCreateInProgressEroticStory = /* GraphQL */ `
  subscription OnCreateInProgressEroticStory(
    $filter: ModelSubscriptionInProgressEroticStoryFilterInput
  ) {
    onCreateInProgressEroticStory(filter: $filter) {
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      createdAt
      updatedAt
      time
      __typename
    }
  }
`;
export const onUpdateInProgressEroticStory = /* GraphQL */ `
  subscription OnUpdateInProgressEroticStory(
    $filter: ModelSubscriptionInProgressEroticStoryFilterInput
  ) {
    onUpdateInProgressEroticStory(filter: $filter) {
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      createdAt
      updatedAt
      time
      __typename
    }
  }
`;
export const onDeleteInProgressEroticStory = /* GraphQL */ `
  subscription OnDeleteInProgressEroticStory(
    $filter: ModelSubscriptionInProgressEroticStoryFilterInput
  ) {
    onDeleteInProgressEroticStory(filter: $filter) {
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      userID
      approved
      __typename
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      userID
      approved
      __typename
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      userID
      approved
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      reaction
      icon
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      reaction
      icon
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      reaction
      icon
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      rating
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      rating
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        __typename
      }
      eroticStoryID
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
        setting1
        setting2
        setting3
        setting4
        setting5
        __typename
      }
      rating
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
        inProgressEroticStories {
          nextToken
          __typename
        }
        published {
          nextToken
          __typename
        }
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
      eroticStoryId
      eroticTagId
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
      eroticStoryId
      eroticTagId
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
      eroticStoryId
      eroticTagId
      eroticStory {
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
          setting1
          setting2
          setting3
          setting4
          setting5
          __typename
        }
        publisherID
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
