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

      </Stack.Navigator>
    </NavigationContainer>
  );
}
