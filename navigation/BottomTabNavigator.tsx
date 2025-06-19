// /navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string = 'home-outline';

                    if (route.name === 'Home') iconName = 'home-outline';
                    else if (route.name === 'Notification') iconName = 'notifications-outline';
                    else if (route.name === 'Profile') iconName = 'person-outline';

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007bff',
                tabBarInactiveTintColor: '#888',
                headerShown: false,
                tabBarLabelStyle: { fontSize: 12 },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Notification" component={NotificationScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
