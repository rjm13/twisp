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
      isPublisher
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
        isPublisher
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
        isPublisher
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
        isPublisher
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
        isPublisher
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
          isPublisher
          topthree
          plan
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
      nextToken
      __typename
    }
  }
`;
export const getEroticStory = /* GraphQL */ `
  query GetEroticStory($id: ID!) {
    getEroticStory(id: $id) {
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
        isPublisher
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
export const listEroticStories = /* GraphQL */ `
  query ListEroticStories(
    $filter: ModelEroticStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEroticStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          isPublisher
          topthree
          plan
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
        isPublisher
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
        isPublisher
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
export const getInProgressEroticStory = /* GraphQL */ `
  query GetInProgressEroticStory($id: ID!) {
    getInProgressEroticStory(id: $id) {
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
        isPublisher
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
          isPublisher
          topthree
          plan
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
export const listInProgressEroticStories = /* GraphQL */ `
  query ListInProgressEroticStories(
    $filter: ModelInProgressEroticStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInProgressEroticStories(
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
          isPublisher
          topthree
          plan
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
        isPublisher
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
        isPublisher
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
        __typename
      }
      userID
      approved
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
          isPublisher
          topthree
          plan
          __typename
        }
        userID
        approved
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
        isPublisher
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
        isPublisher
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          __typename
        }
        reaction
        icon
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
        isPublisher
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
        __typename
      }
      rating
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
          isPublisher
          topthree
          plan
          __typename
        }
        rating
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
        isPublisher
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
export const listEroticStoryTags = /* GraphQL */ `
  query ListEroticStoryTags(
    $filter: ModelEroticStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEroticStoryTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
export const followConnectionsByFollowerIDAndCreatedAt = /* GraphQL */ `
  query FollowConnectionsByFollowerIDAndCreatedAt(
    $followerID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followConnectionsByFollowerIDAndCreatedAt(
      followerID: $followerID
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
          __typename
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const followConnectionsByAuthorIDAndCreatedAt = /* GraphQL */ `
  query FollowConnectionsByAuthorIDAndCreatedAt(
    $authorID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followConnectionsByAuthorIDAndCreatedAt(
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
      nextToken
      __typename
    }
  }
`;
export const storiesByPublisherIDAndCreatedAt = /* GraphQL */ `
  query StoriesByPublisherIDAndCreatedAt(
    $publisherID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByPublisherIDAndCreatedAt(
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
          isPublisher
          topthree
          plan
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
      nextToken
      __typename
    }
  }
`;
export const storiesByGenreIDAndId = /* GraphQL */ `
  query StoriesByGenreIDAndId(
    $genreID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByGenreIDAndId(
      genreID: $genreID
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
          isPublisher
          topthree
          plan
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
      nextToken
      __typename
    }
  }
`;
export const EroticStoriesByDate = /* GraphQL */ `
  query EroticStoriesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEroticStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    EroticStoriesByDate(
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
          isPublisher
          topthree
          plan
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
      nextToken
      __typename
    }
  }
`;
export const EroticStoriesByUpdated = /* GraphQL */ `
  query EroticStoriesByUpdated(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEroticStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    EroticStoriesByUpdated(
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
          isPublisher
          topthree
          plan
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
      nextToken
      __typename
    }
  }
`;
export const eroticStoriesByPublisherIDAndCreatedAt = /* GraphQL */ `
  query EroticStoriesByPublisherIDAndCreatedAt(
    $publisherID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEroticStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eroticStoriesByPublisherIDAndCreatedAt(
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
          isPublisher
          topthree
          plan
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
      nextToken
      __typename
    }
  }
`;
export const eroticStoriesByGenreIDAndId = /* GraphQL */ `
  query EroticStoriesByGenreIDAndId(
    $genreID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEroticStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eroticStoriesByGenreIDAndId(
      genreID: $genreID
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
          isPublisher
          topthree
          plan
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
export const pinnedStoriesByUserIDAndCreatedAt = /* GraphQL */ `
  query PinnedStoriesByUserIDAndCreatedAt(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPinnedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pinnedStoriesByUserIDAndCreatedAt(
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
export const inProgressStoriesByUserIDAndUpdatedAt = /* GraphQL */ `
  query InProgressStoriesByUserIDAndUpdatedAt(
    $userID: ID!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInProgressStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inProgressStoriesByUserIDAndUpdatedAt(
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
          isPublisher
          topthree
          plan
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
export const inProgressEroticStoriesByUpdated = /* GraphQL */ `
  query InProgressEroticStoriesByUpdated(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInProgressEroticStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inProgressEroticStoriesByUpdated(
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
          isPublisher
          topthree
          plan
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
export const inProgressEroticStoriesByUserIDAndUpdatedAt = /* GraphQL */ `
  query InProgressEroticStoriesByUserIDAndUpdatedAt(
    $userID: ID!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInProgressEroticStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    inProgressEroticStoriesByUserIDAndUpdatedAt(
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
          isPublisher
          topthree
          plan
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
export const finishedStoriesByUserIDAndCreatedAt = /* GraphQL */ `
  query FinishedStoriesByUserIDAndCreatedAt(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finishedStoriesByUserIDAndCreatedAt(
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          __typename
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const finishedStoriesByEroticStoryIDAndCreatedAt = /* GraphQL */ `
  query FinishedStoriesByEroticStoryIDAndCreatedAt(
    $eroticStoryID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finishedStoriesByEroticStoryIDAndCreatedAt(
      eroticStoryID: $eroticStoryID
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
          isPublisher
          topthree
          plan
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
          __typename
        }
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByStoryIDAndCreatedAt = /* GraphQL */ `
  query CommentsByStoryIDAndCreatedAt(
    $storyID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByStoryIDAndCreatedAt(
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
          isPublisher
          topthree
          plan
          __typename
        }
        userID
        approved
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByEroticStoryIDAndCreatedAt = /* GraphQL */ `
  query CommentsByEroticStoryIDAndCreatedAt(
    $eroticStoryID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByEroticStoryIDAndCreatedAt(
      eroticStoryID: $eroticStoryID
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
          isPublisher
          topthree
          plan
          __typename
        }
        userID
        approved
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const reactionsByStoryIDAndId = /* GraphQL */ `
  query ReactionsByStoryIDAndId(
    $storyID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reactionsByStoryIDAndId(
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          __typename
        }
        reaction
        icon
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const reactionsByEroticStoryIDAndId = /* GraphQL */ `
  query ReactionsByEroticStoryIDAndId(
    $eroticStoryID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reactionsByEroticStoryIDAndId(
      eroticStoryID: $eroticStoryID
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
          isPublisher
          topthree
          plan
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
          isPublisher
          topthree
          plan
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
          __typename
        }
        reaction
        icon
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
          isPublisher
          topthree
          plan
          __typename
        }
        rating
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
          isPublisher
          topthree
          plan
          __typename
        }
        rating
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ratingsByEroticStoryIDAndId = /* GraphQL */ `
  query RatingsByEroticStoryIDAndId(
    $eroticStoryID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratingsByEroticStoryIDAndId(
      eroticStoryID: $eroticStoryID
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
          isPublisher
          topthree
          plan
          __typename
        }
        rating
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ratingsByUserIDAndId = /* GraphQL */ `
  query RatingsByUserIDAndId(
    $userID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratingsByUserIDAndId(
      userID: $userID
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
          isPublisher
          topthree
          plan
          __typename
        }
        rating
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
          isPublisher
          topthree
          plan
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
export const eroticStoryTagsByEroticStoryId = /* GraphQL */ `
  query EroticStoryTagsByEroticStoryId(
    $eroticStoryId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEroticStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eroticStoryTagsByEroticStoryId(
      eroticStoryId: $eroticStoryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
