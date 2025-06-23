import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminUserManager() {
  const { registeredUsers, logout } = useAuth();
  const navigation = useNavigation();
  const handleLogout = () => {
    // Chỉ gọi logout() - RootNavigator sẽ tự động xử lý việc điều hướng
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{registeredUsers.length}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {registeredUsers.filter(u => u.role === 'admin').length}
          </Text>
          <Text style={styles.statLabel}>Admins</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {registeredUsers.filter(u => u.role === 'user').length}
          </Text>
          <Text style={styles.statLabel}>Regular Users</Text>
        </View>
      </View>
      
      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>User List</Text>
        <FlatList
          data={registeredUsers}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Ionicons 
                name={item.role === 'admin' ? 'shield-outline' : 'person-outline'} 
                size={24} 
                color={item.role === 'admin' ? '#007bff' : '#666'} 
              />
              <View style={styles.userInfo}>
                <Text style={styles.userEmail}>{item.email}</Text>
                <Text style={[
                  styles.userRole,
                  item.role === 'admin' ? styles.adminRole : styles.regularRole
                ]}>
                  {item.role.toUpperCase()}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#333'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff'
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333'
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  userInfo: {
    marginLeft: 10,
    flex: 1
  },
  userEmail: {
    fontSize: 16,
    color: '#333'
  },
  userRole: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2
  },
  adminRole: {
    color: '#007bff'
  },
  regularRole: {
    color: '#666'
  },
  separator: {
    height: 1,
    backgroundColor: '#eee'
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  }
});
