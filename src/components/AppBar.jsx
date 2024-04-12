import Constants from 'expo-constants';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';
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
  const inlineTab = {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ display: 'flex', gap: 10 }} horizontal>
        <Pressable>
          <Text style={inlineTab}>Repositories</Text>
        </Pressable>
        <Link to="/login">
          <Text style={inlineTab}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
