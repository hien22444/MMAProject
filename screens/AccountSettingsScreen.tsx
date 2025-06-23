// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { Feather } from '@expo/vector-icons'; // hoặc: 'react-native-vector-icons/Feather'
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types/navigation';


// export default function AccountSettings() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const handlePress = (label: string) => {

//     if (label === 'Tài khoản & Bảo mật') {
//       navigation.navigate('AccountSecurity');


//     } else {
//       Alert.alert('Tính năng', `Bạn đã chọn: ${label}`);
//     }
//   };

//   const SettingItem = ({
//     title,
//     subtitle,
//     onPress,
//   }: {
//     title: string;
//     subtitle?: string;
//     onPress?: () => void;
//   }) => {
//     return (
//       <TouchableOpacity onPress={onPress} style={styles.item}>
//         <View>
//           <Text style={styles.itemTitle}>{title}</Text>
//           {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
//         </View>
//         <Feather name="chevron-right" size={20} color="gray" />
//       </TouchableOpacity>
//     );
//   };


//   // const SettingsScreen = () => {
//   return (
//     <View style={styles.container}>
//       <ScrollView>

//         {/* Tài khoản của tôi */}
//         <Text style={styles.sectionTitle}>Tài khoản của tôi</Text>
//         <SettingItem title="Tài khoản & Bảo mật" />
//         {/* <SettingItem title="Địa Chỉ" /> */}
//         <SettingItem title="Tài khoản / Thẻ ngân hàng" />

//         {/* Cài đặt */}
//         <Text style={styles.sectionTitle}>Cài đặt</Text>
//         <SettingItem title="Cài đặt Chat" />
//         <SettingItem title="Cài đặt Thông báo" />
//         <SettingItem title="Cài đặt riêng tư" />
//         <SettingItem title="Người dùng đã bị chặn" />
//         <SettingItem title="Ngôn ngữ / Language" subtitle="Tiếng Việt" />

//         {/* Hỗ trợ */}
//         <Text style={styles.sectionTitle}>Hỗ trợ</Text>
//         {/* <SettingItem title="Trung tâm hỗ trợ" /> */}
//         <SettingItem title="Tiêu chuẩn cộng đồng" />
//         {/* <SettingItem title="Điều khoản " /> */}
//         {/* <SettingItem title="Hài lòng với chúng tôi? Hãy đánh giá ngay!" /> */}
//         <SettingItem title="Giới thiệu" />
//         {/* <SettingItem title="Yêu cầu hủy tài khoản" /> */}

//         {/* Đăng xuất */}
//         {/* <TouchableOpacity style={styles.logoutButton}>
//           <Text style={styles.logoutText}>Đăng xuất</Text>
//         </TouchableOpacity> */}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   sectionTitle: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     color: 'gray',
//     fontSize: 13,
//     backgroundColor: '#f5f5f5',
//   },
//   item: {
//     paddingVertical: 16,
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//     paddingHorizontal: 16,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   itemTitle: {
//     fontSize: 16,
//   },
//   itemSubtitle: {
//     fontSize: 12,
//     color: 'gray',
//   },
//   logoutButton: {
//     backgroundColor: '#ee4d2d',
//     margin: 16,
//     paddingVertical: 14,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   logoutText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });



import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function AccountSettings() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (label: string) => {
    if (label === 'Tài khoản & Bảo mật') {
      navigation.navigate('AccountSecurity');
    } else {
      Alert.alert('Tính năng', `Bạn đã chọn: ${label}`);
    }
  };

  const SettingItem = ({
    title,
    subtitle,
    onPress,
  }: {
    title: string;
    subtitle?: string;
    onPress?: () => void;
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <View>
          <Text style={styles.itemTitle}>{title}</Text>
          {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
        </View>
        <Feather name="chevron-right" size={20} color="gray" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* Tài khoản của tôi */}
        <Text style={styles.sectionTitle}>Tài khoản của tôi</Text>
        <SettingItem title="Tài khoản & Bảo mật" onPress={() => handlePress('Tài khoản & Bảo mật')} />
        <SettingItem title="Tài khoản / Thẻ ngân hàng" onPress={() => handlePress('Tài khoản / Thẻ ngân hàng')} />

        {/* Cài đặt */}
        <Text style={styles.sectionTitle}>Cài đặt</Text>
        <SettingItem title="Cài đặt Chat" onPress={() => handlePress('Cài đặt Chat')} />
        <SettingItem title="Cài đặt Thông báo" onPress={() => handlePress('Cài đặt Thông báo')} />
        <SettingItem title="Cài đặt riêng tư" onPress={() => handlePress('Cài đặt riêng tư')} />
        <SettingItem title="Người dùng đã bị chặn" onPress={() => handlePress('Người dùng đã bị chặn')} />
        <SettingItem title="Ngôn ngữ / Language" subtitle="Tiếng Việt" onPress={() => handlePress('Ngôn ngữ / Language')} />

        {/* Hỗ trợ */}
        <Text style={styles.sectionTitle}>Hỗ trợ</Text>
        <SettingItem title="Tiêu chuẩn cộng đồng" onPress={() => handlePress('Tiêu chuẩn cộng đồng')} />
        <SettingItem title="Giới thiệu" onPress={() => handlePress('Giới thiệu')} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: 'gray',
    fontSize: 13,
    backgroundColor: '#f5f5f5',
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
  },
  itemSubtitle: {
    fontSize: 12,
    color: 'gray',
  },
  logoutButton: {
    backgroundColor: '#ee4d2d',
    margin: 16,
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
