import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql`
  fragment RepositoryFields on Repository {
    id
    fullName
    description
    language
    ownerAvatarUrl
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          user {
            username
          }
          createdAt
          text
          rating
        }
      }
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
    }
    createdAt
  }
`;

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    user {
      username
    }
    createdAt
    text
    rating
    repositoryId
    repository {
      fullName
    }
  }
`;

export const PAGE_INFO_FIELDS = gql`
  fragment pageInfoFields on PageInfo {
    startCursor
    hasPreviousPage
    hasNextPage
    endCursor
  }
`;
