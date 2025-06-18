import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { currentUser, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Email: {currentUser?.email}</Text>
      <Text>Role: {currentUser?.role}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 }
});
