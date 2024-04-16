import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Pressable, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { CREATE_USER } from '../../graphql/queries';
import useSignIn from '../../hooks/useSignIn';
import theme from '../../theme';
import Text from '../CustomText';

const validationSchema = yup.object({
  username: yup.string().min(1).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  passwordConfirm: yup
    .string()
    .required('Password confirm is required')
    .min(5)
    .max(50)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const RegisterForm = () => {
  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const responsiveStyleInput = (isError) => {
    const inlineStyleInput = {
      width: 300,
      height: 30,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'gray',
      borderRadius: theme.borderRadius.normal,
    };

    if (isError) {
      inlineStyleInput.borderColor = '#d73a4a';
    }
    return inlineStyleInput;
  };

  const onSubmit = async (values) => {
    const { username, password } = values;
    const user = { username, password };

    try {
      await mutate({ variables: { user } });
      await signIn({ username, password });

      navigate('/');
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
        gap: 10,
      }}
    >
      <TextInput
        style={responsiveStyleInput(formik.errors.username)}
        placeholder="type username"
        placeholderTextColor={'gray'}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={responsiveStyleInput(formik.errors.password)}
        placeholder="type password"
        placeholderTextColor={'gray'}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={responsiveStyleInput(formik.errors.passwordConfirm)}
        placeholder="type password again"
        placeholderTextColor={'gray'}
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: 'red' }}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={{
            width: 100,
            color: 'white',
            textAlign: 'center',
            backgroundColor: theme.colors.primary,
          }}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default RegisterForm;
