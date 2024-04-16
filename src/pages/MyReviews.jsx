import { useMutation, useQuery } from '@apollo/client';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from '../components/CustomText';
import { DELETE_REVIEW, WHOAMI } from '../graphql/queries';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgray',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  const { id, text, createdAt, rating, repository, repositoryId } = review;
  const date = new Date(createdAt).toDateString();
  const [delMutate] = useMutation(DELETE_REVIEW, {
    update(cache) {
      const normalizedId = cache.identify({ id, __typename: 'Review' });
      cache.evict({ id: normalizedId });
      // Evicting an object often makes other cached objects unreachable.
      // Because of this, you should call cache.gc after evicting one
      // or more objects from the cache.
      cache.gc();
    },
  });

  const pressDelete = async () => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        await delMutate({ variables: { deleteReviewId: id } });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View>
      <View key={id} style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={theme.roundBlue}>
          <Text style={{ color: 'blue' }}>{rating}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: 800 }}>{repository.fullName}</Text>
          <Text style={{ color: 'gray' }}>{date}</Text>
          <Text>{text}</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <Pressable onPress={() => navigate(`/repositories/${repositoryId}`)}>
          <Text
            style={{
              width: 140,
              color: 'white',
              backgroundColor: theme.colors.primary,
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            View repository
          </Text>
        </Pressable>
        <Pressable onPress={pressDelete}>
          <Text
            style={{
              width: 140,
              color: 'white',
              backgroundColor: 'red',
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(WHOAMI, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });

  if (loading) {
    return <Text>Loading Now</Text>;
  }

  if (!data.me) {
    return <Text>You had logged out</Text>;
  }

  const reviewNodes = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  if (!reviewNodes) {
    return <Text>You don't have any review</Text>;
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewCard id={item.id} review={item} />}
    />
  );
};

export default MyReviews;
