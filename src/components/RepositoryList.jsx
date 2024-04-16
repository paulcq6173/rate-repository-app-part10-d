import { useQuery } from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import { GET_REPOSITORIES } from '../graphql/queries';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SearchBar = ({ repoHook, keyword, setKeyword }) => {
  return (
    <View style={{ backgroundColor: 'lightgray' }}>
      <View style={{ alignItems: 'center' }}>
        <TextInput
          style={{
            width: 340,
            backgroundColor: 'white',
            borderRadius: 2,
          }}
          placeholder="keyword"
          placeholderTextColor={'gray'}
          value={keyword}
          onChangeText={(value) => setKeyword(value)}
        />
      </View>
      <Picker
        selectedValue={repoHook.label}
        onValueChange={(itemValue, itemIndex) => repoHook.onChange(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="Latest" />
        <Picker.Item label="Highest rated repositories" value="Highest rated" />
        <Picker.Item label="Lowest rated repositories" value="Lowest rated" />
      </Picker>
    </View>
  );
};

const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const navigate = useNavigate();
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const repoHook = useRepositories();
  const [keyword, setKeyword] = useState('');
  const [value] = useDebounce(keyword, 1000);
  let orderedRepos = [];

  orderedRepos = !value
    ? repositoryNodes
    : repositoryNodes.filter((e) => e.fullName.includes(value));
  const { orderBy, orderDirection } = repoHook.option;

  switch (orderBy) {
    case 'CREATED_AT':
      orderedRepos = orderedRepos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case 'RATING_AVERAGE':
      if (orderDirection.includes('DESC')) {
        orderedRepos = orderedRepos.sort(
          (a, b) => b.ratingAverage - a.ratingAverage
        );
      } else {
        orderedRepos = orderedRepos.sort(
          (a, b) => a.ratingAverage - b.ratingAverage
        );
      }
      break;
    default:
      console.log('Error: Unknown order method');
      break;
  }

  return (
    <FlatList
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      data={orderedRepos}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <SearchBar
          repoHook={repoHook}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      }
      renderItem={({ item, index, separators }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem key={item.key} item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const variables = { first: 7 };
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  if (loading) {
    return <Text>loading Now...</Text>;
  }

  // When reach end of page, execute fetchMore function
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
