import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const helpTopics = [
  { id: '1', title: 'Về đơn hàng', icon: 'receipt-outline', screen: 'OrderHelp' },
  { id: '2', title: 'Vận chuyển & giao hàng', icon: 'car-outline', screen: 'ShippingHelp' },
  { id: '3', title: 'Thanh toán', icon: 'card-outline', screen: 'PaymentHelp' },
  { id: '4', title: 'Hoàn trả & hoàn tiền', icon: 'refresh-outline', screen: 'RefundHelp' },
  { id: '5', title: 'Liên hệ hỗ trợ', icon: 'call-outline', screen: 'ContactHelp' },
];

type HelpCenterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HelpCenter'>;

export default function HelpCenterScreen() {
  const navigation = useNavigation<HelpCenterNavigationProp>();

  const handleTopicPress = (screen: string) => {
    navigation.navigate(screen as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛠 Trung tâm trợ giúp</Text>
      <ScrollView>
        {helpTopics.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => handleTopicPress(item.screen)}
          >
            <Ionicons name={item.icon as any} size={22} color="#007bff" style={styles.icon} />
            <Text style={styles.label}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    marginRight: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
});
