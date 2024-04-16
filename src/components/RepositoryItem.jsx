import * as Linking from 'expo-linking';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useLocation } from 'react-router-native';
import theme from '../theme';
import Text from './CustomText';

const RepositoryItem = ({ item }) => {
  const pathname = useLocation().pathname;

  const GithubBTN = () => {
    if (pathname.includes(`${item.id}`)) {
      const inlineStyle = {
        width: 120,
        backgroundColor: theme.colors.primary,
      };

      return (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Pressable
            style={inlineStyle}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Open in Github
            </Text>
          </Pressable>
        </View>
      );
    }

    return null;
  };

  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
      margin: 5,
      borderRadius: 5,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  const FormatDigits = (param) => {
    if (param >= 1000) {
      const a = Math.floor(param / 1000);
      const b = Math.floor((param % 1000) / 100);

      return Number(String(`${a}.${b}`));
    }

    return param;
  };
  const starCount = FormatDigits(item.stargazersCount);
  const ForkCount = FormatDigits(item.forksCount);

  return (
    <View
      testID="repositoryItem"
      style={{
        display: 'flex',
        backgroundColor: 'white',
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
        <View>
          <Text style={{ fontWeight: 800 }}>{item.fullName}</Text>
          <Text style={{ color: 'gray' }}>{item.description}</Text>
          <View
            style={{
              width: 100,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                backgroundColor: theme.colors.primary,
                borderRadius: 2,
              }}
            >
              {item.language}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={{ display: 'flex' }}>
          <Text>{starCount % 1 !== 0 ? `${starCount}k` : starCount}</Text>
          <Text style={{ color: 'gray' }}>Stars</Text>
        </View>
        <View style={{ display: 'flex' }}>
          <Text>{ForkCount % 1 !== 0 ? `${ForkCount}k` : ForkCount}</Text>
          <Text style={{ color: 'gray' }}>Forks</Text>
        </View>
        <View style={{ display: 'flex' }}>
          <Text>{item.reviewCount}</Text>
          <Text style={{ color: 'gray' }}>Reviews</Text>
        </View>
        <View style={{ display: 'flex' }}>
          <Text>{item.ratingAverage}</Text>
          <Text style={{ color: 'gray' }}>Ratings</Text>
        </View>
      </View>
      <GithubBTN />
    </View>
  );
};

export default RepositoryItem;
