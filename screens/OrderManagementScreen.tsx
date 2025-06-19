import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Modal,
  ScrollView
} from 'react-native';

// Import dữ liệu mẫu
import { orders } from '../data/orders';

// Định nghĩa kiểu dữ liệu
interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
}

interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  products: OrderProduct[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: string;
  subTotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

const OrderManagementScreen = () => {
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // Xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Xử lý lọc theo trạng thái
  const handleStatusFilter = (status: string) => {
    setStatusFilter(statusFilter === status ? null : status);
  };

  // Xử lý lọc theo ngày
  const handleDateFilter = (startDate: string, endDate: string) => {
    setDateRange({
      startDate,
      endDate
    });
  };

  // Xử lý cập nhật trạng thái đơn hàng
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrderList(
      orderList.map(order => 
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
      )
    );
    
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder({ ...currentOrder, status: newStatus, updatedAt: new Date().toISOString() });
    }
  };

  // Xem chi tiết đơn hàng
  const handleViewOrderDetail = (order: Order) => {
    setCurrentOrder(order);
    setModalVisible(true);
  };

  // Định dạng ngày tháng
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Định dạng tiền tệ
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN') + ' đ';
  };

  // Xác định màu sắc cho trạng thái đơn hàng
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return '#FFC107'; // Vàng
      case 'processing':
        return '#2196F3'; // Xanh dương
      case 'shipping':
        return '#9C27B0'; // Tím
      case 'delivered':
        return '#4CAF50'; // Xanh lá
      case 'cancelled':
        return '#F44336'; // Đỏ
      default:
        return '#757575'; // Xám
    }
  };

  // Xác định tên hiển thị cho trạng thái đơn hàng
  const getStatusName = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'Đang chờ';
      case 'processing':
        return 'Đang xử lý';
      case 'shipping':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  // Lọc đơn hàng theo tìm kiếm và bộ lọc
  const filteredOrders = (): Order[] => {
    let result = [...orderList];
    
    // Lọc theo trạng thái
    if (statusFilter) {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Lọc theo tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerPhone.includes(query) ||
        order.customerEmail.toLowerCase().includes(query)
      );
    }
    
    // Lọc theo khoảng thời gian
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      
      result = result.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }
    
    // Sắp xếp theo thời gian tạo mới nhất
    return result.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  // Render item trong danh sách đơn hàng
  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity 
      style={styles.orderItem}
      onPress={() => handleViewOrderDetail(item)}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>#{item.id}</Text>
        <View 
          style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(item.status) }
          ]}
        >
          <Text style={styles.statusText}>{getStatusName(item.status)}</Text>
        </View>
      </View>
      
      <View style={styles.orderInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Khách hàng:</Text>
          <Text style={styles.infoValue}>{item.customerName}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số điện thoại:</Text>
          <Text style={styles.infoValue}>{item.customerPhone}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Sản phẩm:</Text>
          <Text style={styles.infoValue}>{item.products.length} sản phẩm</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tổng tiền:</Text>
          <Text style={styles.totalPrice}>{formatCurrency(item.total)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Thời gian đặt:</Text>
          <Text style={styles.infoValue}>{formatDate(item.createdAt)}</Text>
        </View>
      </View>
      
      <View style={styles.orderActions}>
        <TouchableOpacity 
          style={styles.viewDetailButton}
          onPress={() => handleViewOrderDetail(item)}
        >
          <Text style={styles.viewDetailText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quản lý đơn hàng</Text>
      
      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm đơn hàng theo mã, tên khách hàng..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      {/* Bộ lọc trạng thái */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterButton, statusFilter === null && styles.activeFilterButton]} 
            onPress={() => handleStatusFilter('')}
          >
            <Text style={[styles.filterText, statusFilter === null && styles.activeFilterText]}>
              Tất cả
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, statusFilter === 'pending' && styles.activeFilterButton]} 
            onPress={() => handleStatusFilter('pending')}
          >
            <Text style={[styles.filterText, statusFilter === 'pending' && styles.activeFilterText]}>
              Đang chờ
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, statusFilter === 'processing' && styles.activeFilterButton]} 
            onPress={() => handleStatusFilter('processing')}
          >
            <Text style={[styles.filterText, statusFilter === 'processing' && styles.activeFilterText]}>
              Đang xử lý
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, statusFilter === 'shipping' && styles.activeFilterButton]} 
            onPress={() => handleStatusFilter('shipping')}
          >
            <Text style={[styles.filterText, statusFilter === 'shipping' && styles.activeFilterText]}>
              Đang giao
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, statusFilter === 'delivered' && styles.activeFilterButton]} 
            onPress={() => handleStatusFilter('delivered')}
          >
            <Text style={[styles.filterText, statusFilter === 'delivered' && styles.activeFilterText]}>
              Đã giao
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, statusFilter === 'cancelled' && styles.activeFilterButton]} 
            onPress={() => handleStatusFilter('cancelled')}
          >
            <Text style={[styles.filterText, statusFilter === 'cancelled' && styles.activeFilterText]}>
              Đã hủy
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {/* Danh sách đơn hàng */}
      <FlatList
        data={filteredOrders()}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.orderList}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Modal chi tiết đơn hàng */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {currentOrder && (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Chi tiết đơn hàng #{currentOrder.id}</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.orderStatusSection}>
                  <Text style={styles.sectionTitle}>Trạng thái đơn hàng</Text>
                  <View style={styles.statusButtonsContainer}>
                    <TouchableOpacity 
                      style={[
                        styles.statusButton, 
                        currentOrder.status === 'pending' && styles.activeStatusButton
                      ]} 
                      onPress={() => handleUpdateStatus(currentOrder.id, 'pending')}
                    >
                      <Text style={[
                        styles.statusButtonText, 
                        currentOrder.status === 'pending' && styles.activeStatusButtonText
                      ]}>Đang chờ</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.statusButton, 
                        currentOrder.status === 'processing' && styles.activeStatusButton
                      ]} 
                      onPress={() => handleUpdateStatus(currentOrder.id, 'processing')}
                    >
                      <Text style={[
                        styles.statusButtonText, 
                        currentOrder.status === 'processing' && styles.activeStatusButtonText
                      ]}>Đang xử lý</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.statusButton, 
                        currentOrder.status === 'shipping' && styles.activeStatusButton
                      ]} 
                      onPress={() => handleUpdateStatus(currentOrder.id, 'shipping')}
                    >
                      <Text style={[
                        styles.statusButtonText, 
                        currentOrder.status === 'shipping' && styles.activeStatusButtonText
                      ]}>Đang giao</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.statusButton, 
                        currentOrder.status === 'delivered' && styles.activeStatusButton
                      ]} 
                      onPress={() => handleUpdateStatus(currentOrder.id, 'delivered')}
                    >
                      <Text style={[
                        styles.statusButtonText, 
                        currentOrder.status === 'delivered' && styles.activeStatusButtonText
                      ]}>Đã giao</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.statusButton, 
                        currentOrder.status === 'cancelled' && styles.activeStatusButton,
                        styles.cancelButton
                      ]} 
                      onPress={() => handleUpdateStatus(currentOrder.id, 'cancelled')}
                    >
                      <Text style={[
                        styles.statusButtonText, 
                        currentOrder.status === 'cancelled' && styles.activeStatusButtonText
                      ]}>Đã hủy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoItemLabel}>Tên khách hàng:</Text>
                    <Text style={styles.infoItemValue}>{currentOrder.customerName}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoItemLabel}>Số điện thoại:</Text>
                    <Text style={styles.infoItemValue}>{currentOrder.customerPhone}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoItemLabel}>Email:</Text>
                    <Text style={styles.infoItemValue}>{currentOrder.customerEmail}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoItemLabel}>Phương thức thanh toán:</Text>
                    <Text style={styles.infoItemValue}>{currentOrder.paymentMethod}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoItemLabel}>Thời gian đặt hàng:</Text>
                    <Text style={styles.infoItemValue}>{formatDate(currentOrder.createdAt)}</Text>
                  </View>
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
                  
                  <View style={styles.shippingAddress}>
                    <Text style={styles.addressText}>
                      {currentOrder.shippingAddress.fullName} | {currentOrder.shippingAddress.phone}
                    </Text>
                    <Text style={styles.addressText}>
                      {currentOrder.shippingAddress.address}, {currentOrder.shippingAddress.ward}, {currentOrder.shippingAddress.district}, {currentOrder.shippingAddress.city}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Sản phẩm</Text>
                  
                  {currentOrder.products.map((product, index) => (
                    <View key={index} style={styles.productItem}>
                      <View style={styles.productInfo}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productVariant}>
                          {product.color}, {product.size}
                        </Text>
                        <Text style={styles.productPrice}>
                          {formatCurrency(product.price)} x {product.quantity}
                        </Text>
                      </View>
                      <Text style={styles.productTotal}>
                        {formatCurrency(product.price * product.quantity)}
                      </Text>
                    </View>
                  ))}
                </View>
                
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Tổng tiền</Text>
                  
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Tạm tính:</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(currentOrder.subTotal)}</Text>
                  </View>
                  
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(currentOrder.shippingFee)}</Text>
                  </View>
                  
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Giảm giá:</Text>
                    <Text style={styles.summaryValue}>-{formatCurrency(currentOrder.discount)}</Text>
                  </View>
                  
                  <View style={styles.summaryItem}>
                    <Text style={[styles.summaryLabel, styles.totalLabel]}>Tổng cộng:</Text>
                    <Text style={styles.totalAmount}>{formatCurrency(currentOrder.total)}</Text>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    height: 44,
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilterButton: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  orderList: {
    paddingBottom: 16,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  orderInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  orderActions: {
    alignItems: 'flex-end',
  },
  viewDetailButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#E91E63',
    borderRadius: 4,
  },
  viewDetailText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  modalSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoItemLabel: {
    fontSize: 14,
    color: '#666',
    width: 150,
  },
  infoItemValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  shippingAddress: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  productVariant: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 12,
    color: '#666',
  },
  productTotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  orderStatusSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f1f1f1',
    marginRight: 8,
    marginBottom: 8,
  },
  activeStatusButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
  },
  statusButtonText: {
    fontSize: 12,
    color: '#666',
  },
  activeStatusButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default OrderManagementScreen;
