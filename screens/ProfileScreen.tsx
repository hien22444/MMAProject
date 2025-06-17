import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator'; // ← đường dẫn tùy theo bạn

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  

//   const handlePress = (label: string) => {
//     Alert.alert('Tính năng', `Bạn đã chọn: ${label}`);
//   };
const handlePress = (label: string) => {
    if (label === 'Danh sách yêu thích') {
      navigation.navigate('Wishlist');
    } else {
      Alert.alert('Tính năng', `Bạn đã chọn: ${label}`);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      {/* Thông tin người dùng */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: 'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nguyễn Văn A</Text>
        <Text style={styles.info}>nguyenvana@gmail.com</Text>
        <Text style={styles.info}>0909 123 456</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handlePress('Chỉnh sửa hồ sơ')}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handlePress('Đổi mật khẩu')}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách chức năng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tài khoản</Text>
        {renderItem('Đơn hàng của tôi', 'cube-outline')}
        {renderItem('Danh sách yêu thích', 'heart-outline')}
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
      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress(label)}
      >
        <Ionicons name={iconName} size={22} color="#444" style={styles.itemIcon} />
        <Text style={styles.itemLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f7f7f7',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemIcon: {
    marginRight: 15,
  },
  itemLabel: {
    fontSize: 16,
    color: '#333',
  },
});
