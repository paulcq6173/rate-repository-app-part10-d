import { useFormik } from 'formik';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import useSignIn from '../../hooks/useSignIn';
import theme from '../../theme';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

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
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={responsiveStyleInput(formik.errors.password)}
        placeholder="type password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
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
          Log in
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginForm;
