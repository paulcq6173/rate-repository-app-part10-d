import { Link } from 'react-router-native';
import Text from '../components/CustomText';
import LoginForm from '../components/forms/LoginForm';

const SignIn = () => {
  return (
    <>
      <Link to="/">
        <Text>Back to Home</Text>
      </Link>
      <LoginForm />
    </>
  );
};

export default SignIn;
