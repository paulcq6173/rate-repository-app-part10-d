import { useApolloClient, useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { WHOAMI } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'gray',
    color: 'white',
  },
});

const AppBar = () => {
  const navigate = useNavigate();
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

  const ResilentView = () => {
    if (data.me) {
      return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
          <Pressable onPress={() => navigate('/newComment')}>
            <Text style={inlineTab}>Create a review</Text>
          </Pressable>
          <Pressable onPress={() => navigate('/myReviews')}>
            <Text style={inlineTab}>My reviews</Text>
          </Pressable>
          <Pressable onPress={handleLogout}>
            <Text style={inlineTab}>Log out</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
        <Link to="/register">
          <Text style={inlineTab}>Sign up</Text>
        </Link>
        <Link to="/login">
          <Text style={inlineTab}>Sign in</Text>
        </Link>
      </View>
    );
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
      <ScrollView
        horizontal
        contentContainerStyle={{
          gap: 20,
        }}
      >
        <Pressable onPress={() => navigate('/')}>
          <Text style={inlineTab}>Repositories</Text>
        </Pressable>
        <ResilentView />
      </ScrollView>
    </View>
  );
};

export default AppBar;
