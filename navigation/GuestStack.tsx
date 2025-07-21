import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Login from '../guest/Login';
import Login from "../screens/LoginScreen";
// import Register from '../guest/Register';
// import Home from '../guest/Home';
import Register from "../screens/RegisterScreen";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function GuestStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      {/* <Stack.Screen name="Trang chủ" component={Home} /> */}
    </Stack.Navigator>
  );
}
