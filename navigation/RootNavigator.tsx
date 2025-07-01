import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import TabNavigator from './TabNavigator';
import AdminNavigator from './AdminNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useAuth } from '../contexts/AuthContext';
import WishlistScreen from '../screens/WishlistScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import SupportScreen from '../screens/SupportScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ReviewScreen from '../screens/AllReviewScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CouponScreen from '../screens/CouponScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetail from '../screens/ProductDetail';
import AddressScreen from '../screens/AddressScreen';
import NotificationScreen from '../screens/NotificationScreen';
import PolicyScreen from '../screens/PolicyScreen';
import AccountSecurityScreen from '../screens/AccountSecurityScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { currentUser } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {!currentUser ? (
          // Guest Screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : currentUser.role === 'admin' ? (
          // Admin Screens
          <>
            <Stack.Screen 
              name="AdminTab" 
              component={AdminNavigator} 
              options={{ headerShown: false, title: 'Admin Dashboard' }} 
            />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
          </>
        ) : (
          // Customer Screens
          <>
            <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
            <Stack.Screen name="ShippingAddress" component={ShippingAddressScreen} />
            <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Address" component={AddressScreen} options={{ title: 'Địa chỉ giao hàng' }} />
            <Stack.Screen name="Notification" component={NotificationScreen} options={{ title: 'Thông báo' }} />
            <Stack.Screen name="Support" component={SupportScreen} options={{ title: "Hỗ trợ" }} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: "Chi tiết đơn hàng" }} />
            <Stack.Screen name="Review" component={ReviewScreen} options={{ title: "Đánh giá" }} />
            <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: "Thanh toán" }} />
            <Stack.Screen name="Coupon" component={CouponScreen} options={{ title: "Mã giảm giá" }} />
            <Stack.Screen name="Policy" component={PolicyScreen} />
            <Stack.Screen name="AccountSecurity" component={AccountSecurityScreen} options={{ title: 'Tài khoản & Bảo mật' }} />
            <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ title: 'Hồ sơ của tôi' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

