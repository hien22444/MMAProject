import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import TabNavigator from "./TabNavigator"; // import TabNavigator
import WishlistScreen from "../screens/WishlistScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import ShippingAddressScreen from "../screens/ShippingAddressScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import HelpCenterScreen from "../screens/HelpCenterScreen";
import SupportScreen from "../screens/SupportScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import ReviewScreen from "../screens/AllReviewScreen";
import PaymentScreen from "../screens/PaymentScreen";
import CouponScreen from "../screens/CouponScreen";
import ProductDetail from "../screens/ProductDetail";
import Checkout from "../screens/Checkout";
import CartScreen from "../screens/CartScreen";
import Homepage from "../screens/Homepage";
import { BottomTabParamList } from "../types/navigation";
import LoginScreen from "../screens/LoginScreen";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tab">
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen
          name="ShippingAddress"
          component={ShippingAddressScreen}
        />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettingsScreen}
        />
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Coupon" component={CouponScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
