import '@testing-library/jest-native/extend-expect';
import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import { useFormik } from 'formik';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import RepositoryItem from '../components/RepositoryItem';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const RepositoryListContainer = ({ repositories }) => {
        const repositoryNodes = repositories
          ? repositories.edges.map((edge) => edge.node)
          : [];

        return (
          <FlatList
            data={repositoryNodes}
            renderItem={({ item, index, separators }) => (
              <RepositoryItem key={item.key} item={item} />
            )}
          />
        );
      };

      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      const dummyRepo1 = repositories.edges[0].node;
      const dummyRepo2 = repositories.edges[1].node;

      expect(firstRepositoryItem).toHaveTextContent(dummyRepo1.fullName);
      expect(firstRepositoryItem).toHaveTextContent(dummyRepo1.description);
      expect(firstRepositoryItem).toHaveTextContent(dummyRepo1.language);
      expect(firstRepositoryItem).toHaveTextContent('1.6k');
      expect(firstRepositoryItem).toHaveTextContent('21.8k');
      expect(firstRepositoryItem).toHaveTextContent(dummyRepo1.ratingAverage);
      expect(firstRepositoryItem).toHaveTextContent(dummyRepo1.reviewCount);

      expect(secondRepositoryItem).toHaveTextContent(dummyRepo2.fullName);
      expect(secondRepositoryItem).toHaveTextContent(dummyRepo2.description);
      expect(secondRepositoryItem).toHaveTextContent(dummyRepo2.language);
      expect(secondRepositoryItem).toHaveTextContent('69');
      expect(secondRepositoryItem).toHaveTextContent('1.7k');
      expect(secondRepositoryItem).toHaveTextContent(dummyRepo2.ratingAverage);
      expect(secondRepositoryItem).toHaveTextContent(dummyRepo2.reviewCount);
    });
  });
});

describe('SignIn', () => {
  describe('SignInContainer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const user = userEvent.setup();
      const onEventMock = jest.fn((values) => {
        const { username, password } = values;

        try {
          console.log(`username:${username} password:${password}`);
        } catch (err) {
          console.log(err);
        }
      });

      const LoginFormContainer = ({ onEventMock }) => {
        const validationSchema = yup.object().shape({
          username: yup.string().min(5).required('Username is required'),
          password: yup.string().min(5).required('Password is required'),
        });

        const initialValues = {
          username: '',
          password: '',
        };

        const onSubmit = (values) => {
          if (formik.errors.username || formik.errors.password) {
            return;
          }

          return onEventMock(values);
        };

        const formik = useFormik({
          initialValues,
          validationSchema,
          onSubmit,
        });

        return (
          <View>
            <TextInput
              placeholder="type username"
              value={formik.values.username}
              onChangeText={formik.handleChange('username')}
            />
            <TextInput
              placeholder="type password"
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
            />
            <Pressable testID="pressLogin" onPress={formik.handleSubmit}>
              <Text>Log in</Text>
            </Pressable>
          </View>
        );
      };

      // render the SignInContainer component, fill the text inputs and press the submit button
      const { getByText, getByPlaceholderText } = render(
        <LoginFormContainer onEventMock={onEventMock} />
      );

      // Simulate input
      fireEvent(
        getByPlaceholderText('type username'),
        'onChangeText',
        'Albert Wesker'
      );
      fireEvent(getByPlaceholderText('type password'), 'onChangeText', '44444');

      const element = getByText('Log in');

      // simulate user press event and wait for 1000ms
      await user.press(element);

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onEventMock).toHaveBeenCalled();
      });
    });
  });
});
