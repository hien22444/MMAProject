import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainNavigator from "./navigation/MainNavigator";
import ProfileScreen from "./screens/ProfileScreen";

import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainNavigator />
      </CartProvider>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
