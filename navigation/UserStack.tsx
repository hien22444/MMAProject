import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../user/Profile';
import Cart from '../user/Cart';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator initialRouteName="Hồ sơ">
      <Stack.Screen name="Hồ sơ" component={Profile} />
      <Stack.Screen name="Giỏ hàng" component={Cart} />
    </Stack.Navigator>
  );
}
