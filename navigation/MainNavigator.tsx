// /navigation/MainNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import WishlistScreen from '../screens/WishlistScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import { RootStackParamList } from '../types/navigation'; //  Import từ file types
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import SupportScreen from '../screens/SupportScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ReviewScreen from '../screens/ReviewScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CouponScreen from '../screens/CouponScreen';
import HelpCenterScreen from '../screens/screens/HelpCenterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen name="ShippingAddress" component={ShippingAddressScreen}/>
        <Stack.Screen name="AccountSettings" component={AccountSettingsScreen}/>
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen}/>
       
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{ title: "Hỗ trợ" }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: "Chi tiết đơn hàng" }}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{ title: "Đánh giá" }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Thanh toán" }}
      />
      <Stack.Screen
        name="Coupon"
        component={CouponScreen}
        options={{ title: "Mã giảm giá" }}
      />
  

      </Stack.Navigator>
    </NavigationContainer>
  );
}
