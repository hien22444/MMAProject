import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../contexts/AuthContext';

const EditableItem = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    setEditing(false);
    onChange(tempValue);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        {editing ? (
          <TextInput
            value={tempValue}
            onChangeText={setTempValue}
            onBlur={handleSave}
            autoFocus
            style={styles.input}
          />
        ) : (
          <TouchableOpacity onPress={() => setEditing(true)}>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function MyProfileScreen() {
  const { currentUser, setProfileInfo } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [gender, setGender] = useState(currentUser?.gender || 'Nam');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [dob, setDob] = useState(currentUser?.dob ? new Date(currentUser.dob) : new Date(2000, 4, 15));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const handleSave = () => {
    setProfileInfo(name, phone, '', gender, dob.toISOString());
    Alert.alert('Cập nhật', 'Thông tin đã được lưu thành công!');
  };

  return (
    <ScrollView style={styles.container}>
      <EditableItem label="Họ và tên" value={name} onChange={setName} />

      <TouchableOpacity style={styles.item} onPress={() => setShowGenderModal(true)}>
        <Text style={styles.label}>Giới tính</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{gender}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.label}>Ngày sinh</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{formatDate(dob)}</Text>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <EditableItem label="Điện thoại" value={phone} onChange={setPhone} />
      <EditableItem label="Email" value={email} onChange={setEmail} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu thông tin</Text>
      </TouchableOpacity>

      {/* Modal chọn giới tính */}
      <Modal
        visible={showGenderModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Chọn giới tính</Text>
            {['Nam', 'Nữ', 'Khác'].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalOption}
                onPress={() => {
                  setGender(item);
                  setShowGenderModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowGenderModal(false)} style={styles.modalCancel}>
              <Text style={{ color: 'red' }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  item: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 16 },
  valueContainer: { flexDirection: 'row', alignItems: 'center' },
  value: { fontSize: 14, color: '#555' },
  input: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    fontSize: 14,
    padding: 0,
    margin: 0,
    minWidth: 120,
  },
  saveButton: {
    backgroundColor: '#007bff',
    margin: 20,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCancel: {
    marginTop: 10,
  },
});
