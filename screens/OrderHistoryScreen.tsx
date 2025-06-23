import React, { useState, useEffect, useMemo } from 'react';
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
import { useAuth } from '../contexts/AuthContext';
import { useOrders, Order as OrderType } from '../contexts/OrderContext';

type OrderStatus =
  | 'Chờ xác nhận'
  | 'Đang xử lý'
  | 'Đang giao hàng'
  | 'Đã giao'
  | 'Đã hủy';

// Map API statuses to display statuses
const statusMapping: { [key: string]: OrderStatus } = {
  'pending': 'Chờ xác nhận',
  'processing': 'Đang xử lý',
  'shipping': 'Đang giao hàng',
  'delivered': 'Đã giao',
  'cancelled': 'Đã hủy'
};

const statusFlow: { [key in OrderStatus]?: OrderStatus } = {
  'Chờ xác nhận': 'Đang xử lý',
  'Đang xử lý': 'Đang giao hàng',
};

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'Đã giao':
      return { color: 'green' };
    case 'Chờ xác nhận':
    case 'Đang xử lý':
    case 'Đang giao hàng':
      return { color: 'orange' };
    case 'Đã hủy':
      return { color: 'red' };
    default:
      return {};
  }
};



// Define display order type for UI
type DisplayOrder = {
  id: string;
  date: string;
  status: OrderStatus;
  total: string;
};

const OrderItem = ({ order, onAction }: { order: DisplayOrder; onAction: (id: string, action: string) => void }) => (
  <View style={styles.card}>
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

    {/* Action buttons */}
    {order.status === 'Chờ xác nhận' && (
      <TouchableOpacity onPress={() => onAction(order.id, 'cancel')}>
        <Text style={styles.action}>❌ Hủy đơn</Text>
      </TouchableOpacity>
    )}
    {order.status === 'Đang giao hàng' && (
      <TouchableOpacity onPress={() => onAction(order.id, 'received')}>
        <Text style={styles.action}>✅ Đã nhận đơn hàng</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default function OrderHistoryScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ChoXacNhan', title: 'Chờ xác nhận' },
    { key: 'DangXuLy', title: 'Đang xử lý' },
    { key: 'DangGiaoHang', title: 'Đang giao hàng' },
    { key: 'DaGiao', title: 'Đã giao' },
    { key: 'DaHuy', title: 'Đã hủy' },
  ]);

  // Get orders from context
  const { orders, updateOrderStatus } = useOrders();
  const { currentUser } = useAuth();

  // Transform API orders to display format
  const displayOrders = useMemo<DisplayOrder[]>(() => {
    if (!currentUser) return [];
    
    return orders
      .filter(order => order.userId === currentUser.email)
      .map(order => ({
        id: order.id,
        date: new Date(order.createdAt).toLocaleDateString('vi-VN'),
        status: statusMapping[order.status] || 'Chờ xác nhận' as OrderStatus,
        total: order.total.toLocaleString('vi-VN') + ' đ'
      }));
  }, [orders, currentUser]);

  const handleAction = (id: string, action: string) => {
    if (action === 'cancel') {
      updateOrderStatus(id, 'cancelled');
    } else if (action === 'received') {
      updateOrderStatus(id, 'delivered');
    }
  };

  const renderScene = SceneMap({
    ChoXacNhan: () => renderList('Chờ xác nhận'),
    DangXuLy: () => renderList('Đang xử lý'),
    DangGiaoHang: () => renderList('Đang giao hàng'),
    DaGiao: () => renderList('Đã giao'),
    DaHuy: () => renderList('Đã hủy'),
  });
  const renderList = (status: OrderStatus) => {
    const filtered = displayOrders.filter((o) => o.status === status);
    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem order={item} onAction={handleAction} />}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có đơn hàng</Text>}
      />
    );
  };

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
            tabStyle={{ width: 150 }}
          />
        )}
      />
    </View>
  );
}

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
  action: {
    marginTop: 10,
    color: '#007bff',
    fontWeight: 'bold',
  },
});
