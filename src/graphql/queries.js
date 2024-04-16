import { gql } from '@apollo/client';
import {
  PAGE_INFO_FIELDS,
  REPOSITORY_FIELDS,
  REVIEW_FIELDS,
} from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  ${PAGE_INFO_FIELDS}
  query getAllQuery($first: Int, $after: String) {
    repositories(first: $first, after: $after) {
      edges {
        node {
          ...RepositoryFields
        }
        cursor
      }
      pageInfo {
        ...pageInfoFields
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_FIELDS}
  query getRepositoryQuery($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryFields
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
      text
      rating
      createdAt
      user {
        username
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUserMutation($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const WHOAMI = gql`
  ${REVIEW_FIELDS}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
`;
