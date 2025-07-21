import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNavigator from "./navigation/RootNavigator";

import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ReviewProvider } from "./contexts/ReviewContext";

export default function App() {
  return (
    <AuthProvider>
      <ReviewProvider>
        <ProductProvider>
          <OrderProvider>
            <CartProvider>
              <RootNavigator />
            </CartProvider>
          </OrderProvider>
        </ProductProvider>
      </ReviewProvider>
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
