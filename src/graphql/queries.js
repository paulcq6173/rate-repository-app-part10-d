import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_FIELDS}
  query getAllQuery {
    repositories {
      edges {
        node {
          ...RepositoryFields
        }
      }
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
  query FindMe {
    me {
      username
    }
  }
`;
