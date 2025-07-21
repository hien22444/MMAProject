import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileInfo'>;

export default function ProfileInfoScreen({ navigation }: Props) {
  const { setProfileInfo } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('Nam');
  const [dob, setDob] = useState(new Date());

  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleContinue = () => {
    setProfileInfo(name, phone, address, gender, dob.toISOString());
    navigation.replace('Tab');
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDob(selectedDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thông tin cá nhân</Text>

      <Text style={styles.label}>Họ tên</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#777" style={styles.icon} />
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Nhập họ tên" />
      </View>

      <Text style={styles.label}>Số điện thoại</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="phone" size={20} color="#777" style={styles.icon} />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Nhập số điện thoại"
        />
      </View>

      <Text style={styles.label}>Địa chỉ giao hàng</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="map-marker" size={20} color="#777" style={styles.icon} />
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          placeholder="Nhập địa chỉ"
        />
      </View>

      <Text style={styles.label}>Giới tính</Text>
      <TouchableOpacity onPress={() => setShowGenderModal(true)} style={styles.selectBox}>
        <Text style={styles.selectText}>{gender}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} color="#777" />
      </TouchableOpacity>

      <Text style={styles.label}>Ngày sinh</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.selectBox}>
        <Text style={styles.selectText}>{dob.toLocaleDateString()}</Text>
        <MaterialIcons name="calendar-today" size={18} color="#777" />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.continueText}>TIẾP TỤC</Text>
      </TouchableOpacity>

      {/* Modal giới tính */}
      <Modal visible={showGenderModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Chọn giới tính</Text>
            {['Nam', 'Nữ', 'Khác'].map(g => (
              <TouchableOpacity
                key={g}
                onPress={() => {
                  setGender(g);
                  setShowGenderModal(false);
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{g}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowGenderModal(false)}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#4A00E0',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    color: '#333',
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 15,
  },
  selectText: {
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#4A00E0',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cancelText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 12,
  },
});
