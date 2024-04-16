import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';
import Constants from 'expo-constants';

const createApolloClient = (authStorage) => {
  const { apolloUrl } = Constants.expoConfig.extra;

  const httpLink = createHttpLink({
    uri: apolloUrl,
  });

  const cache = new InMemoryCache({
    // In general, field policies can be used to customize the cache
    // behavior during read and write operations with read and merge
    // functions.
    typePolicies: {
      Query: {
        fields: {
          repositories: relayStylePagination(),
        },
      },
      Repository: {
        fields: {
          reviews: relayStylePagination(),
        },
      },
    },
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return { headers };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
