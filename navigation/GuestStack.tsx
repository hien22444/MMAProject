
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from '../guest/Login';
import Login from '../screens/LoginScreen';
// import Register from '../guest/Register';
// import Home from '../guest/Home';
import Register from '../screens/RegisterScreen';


const Stack = createNativeStackNavigator();

export default function GuestStack() {
  return (
    <Stack.Navigator initialRouteName="Đăng nhập">
      <Stack.Screen name="Đăng nhập" component={Login} />
      <Stack.Screen name="Đăng ký" component={Register} />
      {/* <Stack.Screen name="Trang chủ" component={Home} /> */}
    </Stack.Navigator>
  );
}
