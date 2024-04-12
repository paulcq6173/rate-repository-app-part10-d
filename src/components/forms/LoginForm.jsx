import { useFormik } from 'formik';
import { Pressable, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import theme from '../../theme';

const validationSchema = yup.object().shape({
  account: yup.string().required('Account is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  account: '',
  password: '',
};

const LoginForm = () => {
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

  const onSubmit = (values) => {
    if (formik.errors.account || formik.errors.password) {
      return;
    }
    console.log(values);
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
        style={responsiveStyleInput(formik.errors.account)}
        placeholder="type account"
        value={formik.values.account}
        onChangeText={formik.handleChange('account')}
      />
      {formik.touched.account && formik.errors.account && (
        <Text style={{ color: 'red' }}>{formik.errors.account}</Text>
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
