import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';

// Screens
import TabNavigator from './TabNavigator';
import WishlistScreen from '../screens/WishlistScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import SupportScreen from '../screens/SupportScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ReviewScreen from '../screens/ReviewScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CouponScreen from '../screens/CouponScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetail from '../screens/ProductDetail';
import AddressScreen from '../screens/AddressScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProductManagementScreen from '../screens/ProductManagementScreen';
import OrderManagementScreen from '../screens/OrderManagementScreen';
import CategoryManagementScreen from '../screens/CategoryManagementScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PolicyScreen from '../screens/PolicyScreen';
import AccountSecurityScreen from '../screens/AccountSecurityScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import ProfileInfoScreen from '../screens/ProfileInfoScreen';

// ✅ Thêm 2 màn hình mới
import UserManagementScreen from '../screens/UserManagementScreen';
import EditUserScreen from '../screens/EditUserScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  const { currentUser } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!currentUser ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
            <Stack.Screen name="ShippingAddress" component={ShippingAddressScreen} />
            <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Address" component={AddressScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="ProductManagement" component={ProductManagementScreen} />
            <Stack.Screen name="OrderManagement" component={OrderManagementScreen} />
            <Stack.Screen name="CategoryManagement" component={CategoryManagementScreen} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            <Stack.Screen name="Policy" component={PolicyScreen} />
            <Stack.Screen name="AccountSecurity" component={AccountSecurityScreen} />
            <Stack.Screen name="MyProfile" component={MyProfileScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Coupon" component={CouponScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

            {/* ✅ Màn quản lý người dùng */}
            <Stack.Screen name="UserManagement" component={UserManagementScreen} />
            <Stack.Screen name="EditUser" component={EditUserScreen} />
          </>
        )}

        {/* ✅ Màn nhập thông tin sau đăng ký vẫn luôn có thể vào */}
        <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
