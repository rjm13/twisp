/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      type
      id
      name
      email
      imageUri
      bio
      publisherName
      isPublisher
      topthree
      plan
      createdAt
      updatedAt
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
        id
        name
        email
        imageUri
        bio
        publisherName
        isPublisher
        topthree
        plan
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
