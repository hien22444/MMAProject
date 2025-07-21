import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
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
      {order.products.map((product, index) => {
        let imageSource: any = require('../assets/ao_thun.jpg'); // fallback mặc định local
        if (product.imageUrl && typeof product.imageUrl === 'string') {
          if (/^https?:\/\//.test(product.imageUrl)) {
            imageSource = { uri: product.imageUrl };
          } else {
            // Nếu là đường dẫn local, chỉ lấy tên file, map cứng các file phổ biến
            const fileName = product.imageUrl.replace(/^.*[\\\/]/, '');
            // Map tên file sang require đúng file assets
            switch (fileName) {
              case 'ao_thun.jpg':
                imageSource = require('../assets/ao_thun.jpg'); break;
              case 'ao_thun_trang.jpg':
                imageSource = require('../assets/ao_thun_trang.jpg'); break;
              case 'quan_jean.jpg':
                imageSource = require('../assets/quan_jean.jpg'); break;
              case 'somi.jpg':
                imageSource = require('../assets/somi.jpg'); break;
              case 'vay.jpg':
                imageSource = require('../assets/vay.jpg'); break;
              case 'vest.jpg':
                imageSource = require('../assets/vest.jpg'); break;
              case 'logo.png':
                imageSource = require('../assets/logo.png'); break;
              case 'icon.png':
                imageSource = require('../assets/icon.png'); break;
              default:
                imageSource = require('../assets/ao_thun.jpg'); // fallback local
            }
          }
        }
        // Nếu là đơn hàng mẫu (pending) thì luôn hiển thị ảnh mẫu local
        if (order.status === 'pending' && product.name === 'Sản phẩm mẫu') {
          imageSource = require('../assets/ao_thun.jpg');
        }
        return (
          <View key={index} style={styles.productItem}>
            <Image
              source={imageSource}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDetails}>
                {product.color} - {product.size} | SL: {product.quantity}
              </Text>
              <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
            </View>
          </View>
        );
      })}
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
      {order.status === 'shipping' && (
        <TouchableOpacity
          style={[styles.actionButton, styles.reviewButton]}
          onPress={() => onAction(order.id, 'delivered')}
        >
          <Text style={styles.actionButtonText}>Đã nhận được hàng</Text>
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
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'All', title: 'Tất cả' },
    { key: 'Pending', title: 'Chờ xác nhận' },
    { key: 'Shipping', title: 'Đang giao' },
    { key: 'Delivered', title: 'Đã giao' },
    { key: 'Cancelled', title: 'Đã hủy' },
  ]);

  // Get orders from context
  const { getUserOrders, updateOrderStatus, createOrder } = useOrders();
  const { currentUser } = useAuth();

  // Track timeouts for pending orders
  const pendingTimeouts = useRef<{ [orderId: string]: NodeJS.Timeout }>({});

  // Ref lưu userOrders lần đầu khi vào trang
  const userOrdersRef = useRef<Order[]>([]);

  // Ref để đảm bảo chỉ tạo đơn pending 1 lần khi vào trang
  const hasCreatedPendingRef = useRef(false);

  // Get user orders
  const userOrders = useMemo(() => {
    if (!currentUser) {
      return [];
    }
    return getUserOrders(currentUser.email);
  }, [currentUser, getUserOrders]);

  // Tạo đơn hàng mẫu mỗi lần vào trang nếu có user và chỉ khi màn hình được focus, và chưa có đơn pending nào
  useEffect(() => {
    if (isFocused && currentUser) {
      userOrdersRef.current = userOrders;
      const hasPending = userOrders.some(order => order.status === 'pending');
      if (!hasPending && !hasCreatedPendingRef.current) {
        // Lấy đơn đã giao gần nhất (nếu có)
        const deliveredOrder = userOrders
          .filter(order => order.status === 'delivered' && order.products && order.products.length > 0)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
        // Danh sách sản phẩm mẫu đa dạng
        const sampleProducts = [
          { id: '1', name: 'Áo thun', imageUrl: 'ao_thun.jpg', color: 'Đỏ', size: 'M', quantity: 1, price: 120000 },
          { id: '2', name: 'Quần jean', imageUrl: 'quan_jean.jpg', color: 'Xanh', size: 'L', quantity: 1, price: 250000 },
          { id: '3', name: 'Sơ mi', imageUrl: 'somi.jpg', color: 'Trắng', size: 'M', quantity: 1, price: 180000 },
          { id: '4', name: 'Váy', imageUrl: 'vay.jpg', color: 'Hồng', size: 'S', quantity: 1, price: 200000 },
          { id: '5', name: 'Vest', imageUrl: 'vest.jpg', color: 'Đen', size: 'XL', quantity: 1, price: 350000 },
        ];
        let products = [];
        if (deliveredOrder && deliveredOrder.products.length > 0) {
          // Random 2-3 sản phẩm khác nhau từ đơn đã giao (nếu đủ), không trùng
          const deliveredProducts = [...deliveredOrder.products];
          const count = Math.min(3, deliveredProducts.length);
          const selected: any[] = [];
          while (selected.length < count && deliveredProducts.length > 0) {
            const idx = Math.floor(Math.random() * deliveredProducts.length);
            const p = deliveredProducts.splice(idx, 1)[0];
            selected.push({
              ...p,
              imageUrl: typeof p.imageUrl === 'string' ? p.imageUrl : 'https://via.placeholder.com/60',
            });
          }
          // Nếu chưa đủ 2-3 sản phẩm, bổ sung từ sampleProducts (không trùng tên)
          const usedNames = selected.map(p => p.name);
          const sampleLeft = sampleProducts.filter(p => !usedNames.includes(p.name));
          while (selected.length < 2 && sampleLeft.length > 0) {
            const idx = Math.floor(Math.random() * sampleLeft.length);
            selected.push(sampleLeft.splice(idx, 1)[0]);
          }
          products = selected;
        } else {
          // Random 2-3 sản phẩm mẫu khác nhau
          const count = Math.floor(Math.random() * 2) + 2; // 2 hoặc 3
          const sampleCopy = [...sampleProducts];
          const selected: any[] = [];
          while (selected.length < count && sampleCopy.length > 0) {
            const idx = Math.floor(Math.random() * sampleCopy.length);
            selected.push(sampleCopy.splice(idx, 1)[0]);
          }
          products = selected;
        }
        const newOrder = {
          id: Date.now().toString(),
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          total: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
          subTotal: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
          shippingFee: deliveredOrder ? deliveredOrder.shippingFee : 0,
          discount: deliveredOrder ? deliveredOrder.discount : 0,
          paymentMethod: deliveredOrder ? deliveredOrder.paymentMethod : 'COD',
          products,
          userId: currentUser.email,
          customerName: currentUser.email,
          customerPhone: '',
          customerEmail: currentUser.email,
          shippingAddress: {
            fullName: currentUser.email,
            phone: '',
            address: 'Địa chỉ mẫu',
            ward: '',
            district: '',
            city: '',
          },
        };
        createOrder(newOrder);
        hasCreatedPendingRef.current = true;
      }
    }
    // eslint-disable-next-line
  }, [isFocused, currentUser, userOrders]);

  // Reset ref khi rời khỏi trang để lần sau vào lại có thể tạo pending mới nếu cần
  useEffect(() => {
    if (!isFocused) {
      hasCreatedPendingRef.current = false;
    }
  }, [isFocused]);

  // Auto-move pending orders to shipping after 8s mỗi lần vào trang
  useEffect(() => {
    // Xóa hết timeout cũ trước khi set lại
    Object.values(pendingTimeouts.current).forEach(clearTimeout);
    pendingTimeouts.current = {};
    userOrders.forEach(order => {
      if (order.status === 'pending') {
        pendingTimeouts.current[order.id] = setTimeout(() => {
          updateOrderStatus(order.id, 'shipping');
        }, 8000);
      }
    });
    // Cleanup on unmount
    return () => {
      Object.values(pendingTimeouts.current).forEach(clearTimeout);
      pendingTimeouts.current = {};
    };
  }, [index, userOrders, updateOrderStatus]);

  const handleAction = (id: string, action: string) => {
    if (action === 'cancel') {
      if (pendingTimeouts.current[id]) {
        clearTimeout(pendingTimeouts.current[id]);
        delete pendingTimeouts.current[id];
      }
      Alert.alert(
        'Hủy đơn hàng',
        'Bạn có chắc muốn hủy đơn hàng này?',
        [
          { text: 'Không', style: 'cancel' },
          {
            text: 'Có',
            onPress: () => updateOrderStatus(id, 'cancelled'),
          },
        ]
      );
    } else if (action === 'review') {
      Alert.alert('Đánh giá', `Đánh giá đơn hàng #${id}`);
    } else if (action === 'delivered') {
      updateOrderStatus(id, 'delivered');
    }
  };

  const renderList = (status: string | null) => {
    let filtered = status
      ? userOrders.filter((order) => order.status === status)
      : userOrders;

    // Giới hạn 4 đơn hàng mới nhất cho tab Đang giao
    if (status === 'shipping') {
      filtered = filtered
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);
    }
    // Giới hạn 6 đơn hàng mới nhất cho tab Tất cả
    if (status === null) {
      filtered = filtered
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 6);
    }

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

  const renderScene = SceneMap({
    All: () => renderList(null),
    Pending: () => renderList('pending'),
    Shipping: () => renderList('shipping'),
    Delivered: () => renderList('delivered'),
    Cancelled: () => renderList('cancelled'),
  });

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
            tabStyle={{ width: 150 }}
          />
        )}
      />
    </View>
  );
}

const OrderList = ({ orders, onAction }: { orders: Order[]; onAction: (id: string, action: string) => void }) => (
  <FlatList
    data={orders}
    renderItem={({ item }) => <OrderItem order={item} onAction={onAction} />}
    keyExtractor={item => item.id}
    contentContainerStyle={{ paddingBottom: 100 }}
  />
);

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
});
