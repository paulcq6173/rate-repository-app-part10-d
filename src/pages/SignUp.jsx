import { View } from 'react-native';
import Text from '../components/CustomText';
import RegisterForm from '../components/forms/RegisterForm';

const SignUp = () => {
  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontWeight: 800 }}>Sign up</Text>
      </View>
      <RegisterForm />
    </View>
  );
};

export default SignUp;
