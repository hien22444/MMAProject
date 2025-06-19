import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, BottomTabParamList } from '../types/navigation';
import { useCart } from '../contexts/CartContext';

type CheckoutScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'Checkout'>,
  BottomTabNavigationProp<BottomTabParamList>
>;

const CheckoutScreen: React.FC = () => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const { clearCart } = useCart(); // ✅ phải nằm trong component function

  const handleConfirm = () => {
    if (!address || !phone) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    Alert.alert('Thanh toán thành công!', `Địa chỉ: ${address}\nSố điện thoại: ${phone}`, [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.navigate('Tab', { screen: 'Home' }); 
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông tin thanh toán</Text>
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ giao hàng"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Xác nhận Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CheckoutScreen;
