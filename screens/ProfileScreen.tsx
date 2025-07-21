import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentUser, logout } = useAuth();

  const handlePress = (label: string) => {
    switch (label) {
      case 'Đơn hàng của tôi': navigation.navigate('OrderHistory'); break;
      case 'Địa chỉ giao hàng': navigation.navigate('ShippingAddress'); break;
      case 'Cài đặt tài khoản': navigation.navigate('AccountSettings'); break;
      case 'Trung tâm trợ giúp': navigation.navigate('HelpCenter'); break;
      case 'Chính sách & Điều khoản': navigation.navigate('Policy'); break;
      case 'Chỉnh sửa hồ sơ': navigation.navigate('MyProfile'); break;
      case 'Đăng xuất': logout(); break;
      default: Alert.alert('Tính năng', `Bạn đã chọn: ${label}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: 'https://img.freepik.com/free-icon/user_318-563642.jpg' }} style={styles.avatar} />
        <Text style={styles.name}>{currentUser?.name || 'Chưa cập nhật'}</Text>
        <Text style={styles.info}>{currentUser?.email}</Text>
        <Text style={styles.info}>{currentUser?.phone}</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handlePress('Chỉnh sửa hồ sơ')}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tài khoản</Text>
        {renderItem('Đơn hàng của tôi', 'cube-outline')}
        {renderItem('Địa chỉ giao hàng', 'location-outline')}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hỗ trợ & Cài đặt</Text>
        {renderItem('Cài đặt tài khoản', 'settings-outline')}
        {renderItem('Trung tâm trợ giúp', 'help-circle-outline')}
        {renderItem('Chính sách & Điều khoản', 'document-text-outline')}
        {renderItem('Đăng xuất', 'log-out-outline')}
      </View>
    </ScrollView>
  );

  function renderItem(label: string, iconName: any) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => handlePress(label)}>
        <Ionicons name={iconName} size={22} color="#444" style={styles.itemIcon} />
        <Text style={styles.itemLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileHeader: { alignItems: 'center', paddingVertical: 30, backgroundColor: '#f7f7f7', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#ccc', marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#666' },
  actionRow: { flexDirection: 'row', marginTop: 15 },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionText: { color: '#fff', marginLeft: 6, fontSize: 14 },
  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#444', marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#eee' },
  itemIcon: { marginRight: 15 },
  itemLabel: { fontSize: 16, color: '#333' },
});
