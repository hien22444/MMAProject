import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

type OrderStatus =
  | 'Chờ xác nhận'
  | 'Chờ lấy hàng'
  | 'Chờ giao hàng'
  | 'Đã giao'
  | 'Trả hàng'
  | 'Đã hủy';

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: string;
};

const ORDERS: Order[] = [
  { id: 'DH001', date: '2025-06-10', status: 'Đã giao', total: '599.000₫' },
  { id: 'DH002', date: '2025-06-11', status: 'Chờ xác nhận', total: '259.000₫' },
  { id: 'DH003', date: '2025-06-12', status: 'Chờ lấy hàng', total: '349.000₫' },
  { id: 'DH004', date: '2025-06-13', status: 'Chờ giao hàng', total: '499.000₫' },
  { id: 'DH005', date: '2025-06-14', status: 'Trả hàng', total: '299.000₫' },
  { id: 'DH006', date: '2025-06-15', status: 'Đã hủy', total: '199.000₫' },
];

const OrderItem = ({ order }: { order: Order }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => Alert.alert('Chi tiết', `Mã: ${order.id}\nTổng: ${order.total}`)}
  >
    <View style={styles.row}>
      <Text style={styles.label}>Mã đơn:</Text>
      <Text style={styles.value}>{order.id}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Ngày:</Text>
      <Text style={styles.value}>{order.date}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Trạng thái:</Text>
      <Text style={[styles.value, getStatusColor(order.status)]}>{order.status}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Tổng:</Text>
      <Text style={styles.value}>{order.total}</Text>
    </View>
  </TouchableOpacity>
);

const OrderList = ({ status }: { status: OrderStatus }) => {
  const filtered = ORDERS.filter((o) => o.status === status);
  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <OrderItem order={item} />}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có đơn hàng</Text>}
    />
  );
};

export default function OrderHistoryScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ChoXacNhan', title: 'Chờ xác nhận' },
    { key: 'ChoLayHang', title: 'Chờ lấy hàng' },
    { key: 'ChoGiaoHang', title: 'Chờ giao hàng' },
    { key: 'DaGiao', title: 'Đã giao' },
    { key: 'TraHang', title: 'Trả hàng' },
    { key: 'DaHuy', title: 'Đã hủy' },
  ]);

  const renderScene = SceneMap({
    ChoXacNhan: () => <OrderList status="Chờ xác nhận" />,
    ChoLayHang: () => <OrderList status="Chờ lấy hàng" />,
    ChoGiaoHang: () => <OrderList status="Chờ giao hàng" />,
    DaGiao: () => <OrderList status="Đã giao" />,
    TraHang: () => <OrderList status="Trả hàng" />,
    DaHuy: () => <OrderList status="Đã hủy" />,
  });

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <Text style={styles.header}>🧾 Đơn mua</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#000' }}
            style={{ backgroundColor: '#fff' }}
            activeColor="#000"
            inactiveColor="#888"
            scrollEnabled
            tabStyle={{ width: 150 }} //  Giảm độ rộng mỗi cột tab
            // labelStyle={{ fontSize: 12 }}
          />
        )}
      />
    </View>
  );
}

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'Đã giao':
      return { color: 'green' };
    case 'Chờ xác nhận':
    case 'Chờ lấy hàng':
    case 'Chờ giao hàng':
      return { color: 'orange' };
    case 'Trả hàng':
      return { color: 'blue' };
    case 'Đã hủy':
      return { color: 'red' };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 100,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#555',
  },
});
