import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { CREATE_REVIEW } from '../../graphql/queries';
import theme from '../../theme';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  text: yup.string(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: undefined,
  text: '',
};

const CommentForm = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const responsiveStyleInput = (isError) => {
    const inlineStyleInput = {
      width: 200,
      height: 30,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: theme.borderRadius.normal,
    };

    if (isError) {
      inlineStyleInput.borderColor = '#d73a4a';
    }
    return inlineStyleInput;
  };

  const onSubmit = async (values) => {
    const review = { ...values, rating: Number(values.rating) };
    let response;

    try {
      response = await mutate({ variables: { review } });

      console.log('uploading data');
      setTimeout(() => {
        if (response.data) {
          const { repositoryId } = response.data.createReview;
          navigate(`/repositories/${repositoryId}`);
        }
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        gap: 10,
      }}
    >
      <TextInput
        multiline
        textAlignVertical="top"
        style={responsiveStyleInput(formik.errors.ownerName)}
        placeholder="Repository owner name"
        placeholderTextColor={'gray'}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        multiline
        textAlignVertical="top"
        style={responsiveStyleInput(formik.errors.repositoryName)}
        placeholder="Repository name"
        placeholderTextColor={'gray'}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        multiline
        textAlignVertical="top"
        style={responsiveStyleInput(formik.errors.rating)}
        placeholder="Rating"
        placeholderTextColor={'gray'}
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        multiline
        textAlignVertical="top"
        style={responsiveStyleInput(formik.errors.text)}
        placeholder="Comment (Optional)"
        placeholderTextColor={'gray'}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={{
            width: 140,
            color: 'white',
            textAlign: 'center',
            backgroundColor: theme.colors.primary,
          }}
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CommentForm;
