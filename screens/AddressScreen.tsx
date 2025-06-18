import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';

// Address interface definition
interface Address {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
}

// Dữ liệu mẫu địa chỉ
const initialAddresses: Address[] = [
  {
    id: '1',
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Nguyễn Văn Linh',
    ward: 'Phường Tân Phong',
    district: 'Quận 7',
    city: 'TP.HCM',
    isDefault: true
  },
  {
    id: '2',
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '456 Lê Văn Lương',
    ward: 'Phường Tân Quy',
    district: 'Quận 7',
    city: 'TP.HCM',
    isDefault: false
  }
];

const AddressScreen = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    fullName: '',
    phone: '',
    address: '',
    ward: '',
    district: '',
    city: '',
    isDefault: false
  });

  const handleAddAddress = () => {
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      ward: '',
      district: '',
      city: '',
      isDefault: false
    });
    setEditingId(null);
    setShowAddForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setFormData({ ...address });
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const handleSaveAddress = () => {
    // Kiểm tra dữ liệu
    if (!formData.fullName || !formData.phone || !formData.address || !formData.ward || !formData.district || !formData.city) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    let newAddressId: string = '';

    if (editingId) {
      // Cập nhật địa chỉ đang chỉnh sửa
      setAddresses(addresses.map(addr => 
        addr.id === editingId ? { ...formData, id: editingId } : addr
      ));
      newAddressId = editingId;
    } else {
      // Thêm địa chỉ mới
      newAddressId = Date.now().toString();
      const newAddress: Address = {
        ...formData,
        id: newAddressId
      };
      
      setAddresses([...addresses, newAddress]);
    }

    // Đảm bảo chỉ có một địa chỉ mặc định
    if (formData.isDefault) {
      const finalId = newAddressId;
      setAddresses(prevAddresses => 
        prevAddresses.map(addr => ({
          ...addr,
          isDefault: addr.id === finalId
        }))
      );
    }

    setShowAddForm(false);
  };

  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa địa chỉ này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          onPress: () => setAddresses(addresses.filter(addr => addr.id !== id)),
          style: 'destructive' 
        }
      ]
    );
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderAddressItem = ({ item }: { item: Address }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressHeader}>
        <Text style={styles.addressName}>{item.fullName}</Text>
        {item.isDefault && <View style={styles.defaultBadge}><Text style={styles.defaultText}>Mặc định</Text></View>}
      </View>
      
      <Text style={styles.phone}>{item.phone}</Text>
      <Text style={styles.addressDetail}>
        {item.address}, {item.ward}, {item.district}, {item.city}
      </Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => handleEditAddress(item)}
        >
          <Text style={styles.actionButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteAddress(item.id)}
        >
          <Text style={[styles.actionButtonText, styles.deleteText]}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Địa chỉ của tôi</Text>
      
      {!showAddForm ? (
        <>
          <FlatList
            data={addresses}
            renderItem={renderAddressItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddAddress}
          >
            <Text style={styles.addButtonText}>+ Thêm địa chỉ mới</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.form}>
          <Text style={styles.formTitle}>
            {editingId ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput 
              style={styles.input}
              value={formData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
              placeholder="Nhập họ và tên người nhận"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput 
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput 
              style={styles.input}
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              placeholder="Số nhà, tên đường"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phường/Xã</Text>
            <TextInput 
              style={styles.input}
              value={formData.ward}
              onChangeText={(text) => handleInputChange('ward', text)}
              placeholder="Phường/Xã"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quận/Huyện</Text>
            <TextInput 
              style={styles.input}
              value={formData.district}
              onChangeText={(text) => handleInputChange('district', text)}
              placeholder="Quận/Huyện"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tỉnh/Thành phố</Text>
            <TextInput 
              style={styles.input}
              value={formData.city}
              onChangeText={(text) => handleInputChange('city', text)}
              placeholder="Tỉnh/Thành phố"
            />
          </View>
          
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, formData.isDefault && styles.checkboxChecked]}
              onPress={() => handleInputChange('isDefault', !formData.isDefault)}
            />
            <Text style={styles.checkboxLabel}>Đặt làm địa chỉ mặc định</Text>
          </View>
          
          <View style={styles.formButtons}>
            <TouchableOpacity 
              style={[styles.formButton, styles.cancelButton]}
              onPress={() => setShowAddForm(false)}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.formButton, styles.saveButton]}
              onPress={handleSaveAddress}
            >
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  addressItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  defaultBadge: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    color: '#fff',
    fontSize: 12,
  },
  phone: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  addressDetail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  actionButtonText: {
    color: '#E91E63',
    fontSize: 14,
  },
  deleteText: {
    color: '#ff6b6b',
  },
  addButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E91E63',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  addButtonText: {
    color: '#E91E63',
    fontSize: 16,
    fontWeight: '500',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#555',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E91E63',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#E91E63',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formButton: {
    flex: 1,
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#E91E63',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddressScreen;
