import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SETTINGS = [
  { label: 'Thay đổi tên', icon: 'person-outline' },
  { label: 'Thay đổi email', icon: 'mail-outline' },
  { label: 'Thay đổi số điện thoại', icon: 'call-outline' },
  { label: 'Đổi mật khẩu', icon: 'lock-closed-outline' },
];

export default function AccountSettingsScreen() {
  const handlePress = (label: string) => {
    Alert.alert('Cài đặt', `Bạn đã chọn: ${label}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>⚙️ Cài đặt tài khoản</Text>

      {SETTINGS.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => handlePress(item.label)}
        >
          <Ionicons name={item.icon as any} size={22} color="#007bff" style={styles.icon} />

          <Text style={styles.label}>{item.label}</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
});
