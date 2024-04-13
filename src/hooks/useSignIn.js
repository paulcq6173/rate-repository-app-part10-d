import { useApolloClient, useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    let response;

    try {
      response = await mutate({
        variables: { credentials: { username, password } },
      });

      const { accessToken } = response.data.authenticate;
      await authStorage.setAccessToken(accessToken);
      // This will clear the Apollo Client's cache and re-execute all
      // active queries once user login successful
      apolloClient.resetStore();
    } catch (error) {
      console.log(error);
    }

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
