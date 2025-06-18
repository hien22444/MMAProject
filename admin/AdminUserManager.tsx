import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function AdminUserManager() {
  const { registeredUsers, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Registered Users</Text>
      <FlatList
        data={registeredUsers}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <Text>{item.email} ({item.role})</Text>
        )}
      />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});
