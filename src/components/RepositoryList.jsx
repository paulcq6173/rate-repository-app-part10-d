import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { GET_REPOSITORIES } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>loading Now...</Text>;
  }

  // Get the nodes from the edges array
  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index, separators }) => (
        <RepositoryItem key={item.key} item={item} />
      )}
    />
  );
};

export default RepositoryList;
