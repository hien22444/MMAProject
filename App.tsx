// App.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput } from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import GoogleLogin from '../GoogleLogin'; // ✅ Thêm dòng này

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ State login

  // ⏳ Chờ font tải xong trước khi render
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // ✅ Gán font mặc định
  (Text as any).defaultProps = {
    ...(Text as any).defaultProps,
    style: { fontFamily: 'Roboto_400Regular' },
  };
  (TextInput as any).defaultProps = {
    ...(TextInput as any).defaultProps,
    style: { fontFamily: 'Roboto_400Regular' },
  };

  // ✅ Nếu chưa login thì hiển thị GoogleLogin screen
  if (!isLoggedIn) {
    return <GoogleLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <MainNavigator />
        <StatusBar style="auto" />
      </CartProvider>
    </AuthProvider>
  );
}
