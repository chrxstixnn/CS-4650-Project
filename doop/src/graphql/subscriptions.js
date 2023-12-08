/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onCreateComments(filter: $filter) {
      id
      text
      postsID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onUpdateComments(filter: $filter) {
      id
      text
      postsID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
    onDeleteComments(filter: $filter) {
      id
      text
      postsID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePosts = /* GraphQL */ `
  subscription OnCreatePosts($filter: ModelSubscriptionPostsFilterInput) {
    onCreatePosts(filter: $filter) {
      id
      Text
      Title
      Comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePosts = /* GraphQL */ `
  subscription OnUpdatePosts($filter: ModelSubscriptionPostsFilterInput) {
    onUpdatePosts(filter: $filter) {
      id
      Text
      Title
      Comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePosts = /* GraphQL */ `
  subscription OnDeletePosts($filter: ModelSubscriptionPostsFilterInput) {
    onDeletePosts(filter: $filter) {
      id
      Text
      Title
      Comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
