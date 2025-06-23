import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../guest/Login';
import RegisterScreen from '../guest/Register';
import ProfileScreen from '../user/Profile';
import AdminUserManager from '../admin/AdminUserManager';
import { useAuth } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const { currentUser } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!currentUser ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : currentUser.role === 'admin' ? (
                    <Stack.Screen name="AdminUserManager" component={AdminUserManager} />
                ) : (
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
