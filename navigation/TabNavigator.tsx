import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../types/navigation";
import Homepage from "../screens/Homepage";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import { Ionicons } from "@expo/vector-icons";
import ChatScreen from "../screens/ChatScreen";
import AllReviewScreen from "../screens/AllReviewScreen";
import CouponScreen from "../screens/CouponScreen";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Review" component={AllReviewScreen} />

      <Tab.Screen name="Chat" component={ChatScreen} />

      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
