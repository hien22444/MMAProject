import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAuth } from '../contexts/AuthContext';
import { useOrders, Order } from '../contexts/OrderContext';

type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipping'
  | 'delivered'
  | 'cancelled';

// Map API statuses to display statuses
const statusMapping: { [key: string]: string } = {
  'pending': 'Chờ xác nhận',
  'processing': 'Đang xử lý',
  'shipping': 'Đang giao hàng',
  'delivered': 'Đã giao hàng',
  'cancelled': 'Đã hủy'
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return { color: 'green' };
    case 'pending':
    case 'processing':
    case 'shipping':
      return { color: 'orange' };
    case 'cancelled':
      return { color: 'red' };
    default:
      return { color: 'black' };
  }
};

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN') + ' đ';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};



// Define display order type for UI
const OrderItem = ({ order, onAction }: { order: Order; onAction: (id: string, action: string) => void }) => (
  <View style={styles.orderCard}>
    <View style={styles.orderHeader}>
      <Text style={styles.orderId}>Đơn hàng #{order.id}</Text>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status).color }]}>
        <Text style={styles.statusText}>{statusMapping[order.status] || order.status}</Text>
      </View>
    </View>
    
    <Text style={styles.orderDate}>Ngày đặt: {formatDate(order.createdAt)}</Text>
    
    <View style={styles.itemsContainer}>
      {order.products.map((product, index) => (
        <View key={index} style={styles.productItem}>
          <Image 
            source={{ uri: product.imageUrl || 'https://via.placeholder.com/60' }} 
            style={styles.productImage} 
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDetails}>
              {product.color} - {product.size} | SL: {product.quantity}
            </Text>
            <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
          </View>
        </View>
      ))}
    </View>
    
    <View style={styles.orderFooter}>
      <Text style={styles.totalText}>
        Tổng cộng: <Text style={styles.totalPrice}>{formatCurrency(order.total)}</Text>
      </Text>
      
      {order.status === 'pending' && (
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => onAction(order.id, 'cancel')}
        >
          <Text style={styles.actionButtonText}>Hủy đơn</Text>
        </TouchableOpacity>
      )}
      
      {order.status === 'delivered' && (
        <TouchableOpacity
          style={[styles.actionButton, styles.reviewButton]}
          onPress={() => onAction(order.id, 'review')}
        >
          <Text style={styles.actionButtonText}>Đánh giá</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default function OrderHistoryScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'All', title: 'Tất cả' },
    { key: 'Pending', title: 'Chờ xác nhận' },
    { key: 'Shipping', title: 'Đang giao' },
    { key: 'Delivered', title: 'Đã giao' },
    { key: 'Cancelled', title: 'Đã hủy' },
  ]);

  // Get orders from context
  const { getUserOrders, updateOrderStatus } = useOrders();
  const { currentUser } = useAuth();

  // Get user orders
  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return getUserOrders(currentUser.email);
  }, [currentUser, getUserOrders]);

  const handleAction = (id: string, action: string) => {
    if (action === 'cancel') {
      Alert.alert(
        'Hủy đơn hàng',
        'Bạn có chắc muốn hủy đơn hàng này?',
        [
          { text: 'Không', style: 'cancel' },
          { 
            text: 'Có', 
            onPress: () => updateOrderStatus(id, 'cancelled')
          }
        ]
      );
    } else if (action === 'review') {
      Alert.alert('Đánh giá', `Đánh giá đơn hàng #${id}`);
    }
  };

  const renderScene = SceneMap({
    All: () => renderList(null),
    Pending: () => renderList('pending'),
    Shipping: () => renderList('shipping'),
    Delivered: () => renderList('delivered'),
    Cancelled: () => renderList('cancelled'),
  });
  const renderList = (status: string | null) => {
    const filtered = status
      ? userOrders.filter((order) => order.status === status)
      : userOrders;

    return (
      <View style={styles.scene}>
        {!currentUser ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Vui lòng đăng nhập để xem đơn hàng</Text>
          </View>
        ) : filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {status ? `Không có đơn hàng nào với trạng thái này` : 'Bạn chưa có đơn hàng nào'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderItem order={item} onAction={handleAction} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧾 Đơn mua</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#E91E63' }}
            style={{ backgroundColor: '#fff' }}
            activeColor="#E91E63"
            inactiveColor="#888"
            scrollEnabled
            tabStyle={{ width: 120 }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
  scene: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  itemsContainer: {
    marginBottom: 12,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalText: {
    fontSize: 16,
    color: '#333',
  },
  totalPrice: {
    fontWeight: 'bold',
    color: '#E91E63',
    fontSize: 18,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#FF5722',
  },
  reviewButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
  // Legacy styles to maintain compatibility
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
