import { useApolloClient, useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';
import { WHOAMI } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'gray',
    color: 'white',
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const { data, loading } = useQuery(WHOAMI);

  if (loading) {
    return <Text>Loading Now</Text>;
  }

  const inlineTab = {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  };

  const handleLogout = async () => {
    try {
      await authStorage.removeAccessToken();
      await client.resetStore();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ display: 'flex', gap: 10 }} horizontal>
        <Pressable>
          <Text style={inlineTab}>Repositories</Text>
        </Pressable>
        {data.me ? (
          <Pressable onPress={handleLogout}>
            <Text style={inlineTab}>Log out</Text>
          </Pressable>
        ) : (
          <Link to="/login">
            <Text style={inlineTab}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
