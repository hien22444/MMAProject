import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Address = {
  id: string;
  name: string;
  phone: string;
  address: string;
  isDefault?: boolean;
};

const initialAddresses: Address[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    phone: '0909123456',
    address: '123 Vo Chi Cong, DaNang',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Trần Thị B',
    phone: '0987654321',
    address: '456 Hai Ba Trung, Ha Noi',
  },
];

export default function ShippingAddressScreen() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const handleDelete = (id: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa địa chỉ này?', [
      { text: 'Hủy' },
      { text: 'Xóa', onPress: () => setAddresses(prev => prev.filter(a => a.id !== id)) },
    ]);
  };

  const renderItem = ({ item }: { item: Address }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name} {item.isDefault && <Text style={styles.default}>(Mặc định)</Text>}</Text>
        <Text style={styles.info}>{item.phone}</Text>
        <Text style={styles.info}>{item.address}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => Alert.alert('Chỉnh sửa', 'Tính năng đang phát triển')}>
          <Ionicons name="create-outline" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 12 }}>
          <Ionicons name="trash-outline" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={styles.header}>📍 Địa chỉ giao hàng</Text>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Thêm địa chỉ', 'Tính năng đang phát triển')}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addText}>Thêm địa chỉ mới</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  default: {
    fontSize: 13,
    fontWeight: '500',
    color: '#28a745',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6,
  },
});
