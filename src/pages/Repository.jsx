import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from '../components/RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// Single review item
export const ReviewItem = ({ review }) => {
  const { text, createdAt, rating, user } = review;
  const date = new Date(createdAt).toDateString();

  return (
    <View key={user.username} style={{ display: 'flex', flexDirection: 'row' }}>
      <View style={theme.roundBlue}>
        <Text style={{ color: 'blue' }}>{rating}</Text>
      </View>
      <View>
        <Text>{user.username}</Text>
        <Text style={{ color: 'gray' }}>{date}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const RepositoryPage = () => {
  const repositoryId = useParams().id;
  const variables = { repositoryId, first: 7 };
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View>
        <Text>Loading Now</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>
          Sorry, service disabled temporaly due to some problem on server
        </Text>
      </View>
    );
  }

  const repo = data?.repository;
  const reviewNodes = repo ? repo.reviews.edges.map((edge) => edge.node) : [];

  // When reach end of page, execute fetchMore function
  const handleFetchMore = () => {
    const canFetchMore = !loading && repo.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: repo.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  return (
    <FlatList
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem id={item.id} review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repo} />}
    />
  );
};

export default RepositoryPage;
