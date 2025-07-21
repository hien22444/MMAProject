import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

const initialUsers: User[] = [
  { id: '1', name: 'Nguyễn Văn A', email: 'a@gmail.com', role: 'user' },
  { id: '2', name: 'Trần Thị B', email: 'b@gmail.com', role: 'admin' },
  { id: '3', name: 'Lê Văn C', email: 'c@gmail.com', role: 'user' },
];

export default function UserManagementScreen() {
  const navigation = useNavigation<any>();
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDelete = (id: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa người dùng này?', [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => setUsers(users.filter(u => u.id !== id)),
      },
    ]);
  };

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.role}>Vai trò: {item.role}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditUser', { user: item })}
          style={styles.editBtn}
        >
          <Text style={styles.btnText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
          <Text style={styles.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Quản lý người dùng</Text>
      </View>
      <FlatList data={users} keyExtractor={u => u.id} renderItem={renderUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginLeft: 10 },
  userItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#555' },
  role: { fontSize: 13, color: '#999' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  editBtn: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 6,
    marginRight: 5,
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 6,
  },
  btnText: { color: 'white', fontWeight: 'bold' },
});
