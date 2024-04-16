import { View } from 'react-native';
import Text from '../components/CustomText';
import LoginForm from '../components/forms/LoginForm';

const SignIn = () => {
  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontWeight: 800 }}>Sign in</Text>
      </View>
      <LoginForm />
    </View>
  );
};

export default SignIn;
