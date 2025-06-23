import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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
    address: '123 Võ Chí Công, Đà Nẵng',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Trần Thị B',
    phone: '0987654321',
    address: '456 Hai Bà Trưng, Hà Nội',
  },
];

export default function ShippingAddressScreen() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<Address | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa địa chỉ này?', [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        onPress: () =>
          setAddresses(prev => prev.filter(a => a.id !== id)),
      },
    ]);
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(a => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const openEditModal = (address?: Address) => {
    if (address) {
      setIsEditing(true);
      setCurrentEdit(address);
    } else {
      setIsEditing(false);
      setCurrentEdit({
        id: uuidv4(),
        name: '',
        phone: '',
        address: '',
        isDefault: false,
      });
    }
    setModalVisible(true);
  };

  const saveEdit = () => {
    if (!currentEdit?.name || !currentEdit.phone || !currentEdit.address) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setAddresses(prev => {
      const exists = prev.some(a => a.id === currentEdit.id);
      if (exists) {
        return prev.map(a => (a.id === currentEdit.id ? currentEdit : a));
      } else {
        return [...prev, currentEdit];
      }
    });
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Address }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>
          {item.name}{' '}
          {item.isDefault && (
            <Text style={styles.default}>(Mặc định)</Text>
          )}
        </Text>
        <Text style={styles.info}>{item.phone}</Text>
        <Text style={styles.info}>{item.address}</Text>
        {!item.isDefault && (
          <TouchableOpacity
            style={styles.setDefaultBtn}
            onPress={() => handleSetDefault(item.id)}
          >
            <Text style={styles.setDefaultText}>Đặt làm mặc định</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Ionicons name="create-outline" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={{ marginLeft: 12 }}
        >
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => openEditModal()}
      >
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.addText}>Thêm địa chỉ mới</Text>
      </TouchableOpacity>

      {/* Modal thêm/sửa */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {isEditing ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
            </Text>
            <TextInput
              placeholder="Họ tên"
              style={styles.input}
              value={currentEdit?.name}
              onChangeText={text =>
                setCurrentEdit(prev => prev && { ...prev, name: text })
              }
            />
            <TextInput
              placeholder="Số điện thoại"
              style={styles.input}
              keyboardType="phone-pad"
              value={currentEdit?.phone}
              onChangeText={text =>
                setCurrentEdit(prev => prev && { ...prev, phone: text })
              }
            />
            <TextInput
              placeholder="Địa chỉ"
              style={styles.input}
              value={currentEdit?.address}
              onChangeText={text =>
                setCurrentEdit(prev => prev && { ...prev, address: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#6c757d' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#fff' }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#007bff' }]}
                onPress={saveEdit}
              >
                <Text style={{ color: '#fff' }}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  setDefaultBtn: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  setDefaultText: {
    fontSize: 13,
    color: '#007bff',
    fontStyle: 'italic',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
  },
});
