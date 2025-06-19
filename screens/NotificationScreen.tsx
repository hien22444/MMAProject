import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';

// Định nghĩa kiểu dữ liệu
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'news' | 'review';
  isRead: boolean;
  createdAt: string;
  imageUrl: string | null;
}

// Dữ liệu mẫu thông báo
const notificationData: Notification[] = [
  {
    id: '1',
    title: 'Đơn hàng đã giao thành công!',
    message: 'Đơn hàng #ORD-001 đã được giao thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.',
    type: 'order',
    isRead: true,
    createdAt: '2025-06-03T15:20:00.000Z',
    imageUrl: null
  },
  {
    id: '2',
    title: 'Khuyến mãi mới: Giảm giá 20%',
    message: 'Giảm giá 20% cho tất cả các sản phẩm thời trang mùa hè. Nhanh tay mua sắm nào!',
    type: 'promotion',
    isRead: false,
    createdAt: '2025-06-05T10:20:00.000Z',
    imageUrl: 'https://example.com/images/promotion.jpg'
  },
  {
    id: '3',
    title: 'Đơn hàng đang được giao',
    message: 'Đơn hàng #ORD-002 của bạn đang được giao. Dự kiến giao hàng trong vòng 2 ngày tới.',
    type: 'order',
    isRead: false,
    createdAt: '2025-06-04T14:10:00.000Z',
    imageUrl: null
  },
  {
    id: '4',
    title: 'Bộ sưu tập mới đã ra mắt!',
    message: 'Bộ sưu tập mùa thu 2025 đã chính thức ra mắt với nhiều thiết kế độc đáo. Khám phá ngay!',
    type: 'news',
    isRead: true,
    createdAt: '2025-06-01T09:30:00.000Z',
    imageUrl: 'https://example.com/images/collection.jpg'
  },
  {
    id: '5',
    title: 'Ưu đãi sinh nhật',
    message: 'Chúc mừng sinh nhật! Nhận ngay voucher giảm giá 100,000đ cho đơn hàng tiếp theo của bạn.',
    type: 'promotion',
    isRead: false,
    createdAt: '2025-05-28T08:20:00.000Z',
    imageUrl: 'https://example.com/images/birthday.jpg'
  },
  {
    id: '6',
    title: 'Nhận xét của bạn đã được đăng',
    message: 'Cảm ơn bạn đã đánh giá sản phẩm "Áo Thun Unisex Basic". Nhận xét của bạn đã được đăng công khai.',
    type: 'review',
    isRead: true,
    createdAt: '2025-05-25T14:50:00.000Z',
    imageUrl: null
  },
  {
    id: '7',
    title: 'Đơn hàng đã bị hủy',
    message: 'Đơn hàng #ORD-004 đã bị hủy theo yêu cầu của bạn. Tiền sẽ được hoàn trả trong 3-5 ngày làm việc.',
    type: 'order',
    isRead: true,
    createdAt: '2025-06-02T15:30:00.000Z',
    imageUrl: null
  }
];

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationData);
  const [filter, setFilter] = useState<string | null>(null);

  // Lọc thông báo theo loại
  const filteredNotifications = filter
    ? notifications.filter(item => item.type === filter)
    : notifications;

  // Đánh dấu đã đọc thông báo
  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(item =>
        item.id === id ? { ...item, isRead: true } : item
      )
    );
  };

  // Đánh dấu tất cả đã đọc
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(item => ({ ...item, isRead: true }))
    );
  };

  // Xóa thông báo
  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(item => item.id !== id));
  };

  // Xử lý lọc
  const handleFilter = (filterType: string | null) => {
    setFilter(filterType === filter ? null : filterType);
  };

  // Format thời gian
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Hôm nay';
    } else if (diffInDays === 1) {
      return 'Hôm qua';
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  // Biểu tượng cho loại thông báo
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return '📦';
      case 'promotion':
        return '🎁';
      case 'news':
        return '📢';
      case 'review':
        return '⭐';
      default:
        return '📣';
    }
  };

  // Render một mục thông báo
  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
      onPress={() => handleMarkAsRead(item.id)}
    >
      <View style={styles.notificationIcon}>
        <Text style={styles.iconText}>{getNotificationIcon(item.type)}</Text>
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.notificationTime}>{formatTime(item.createdAt)}</Text>
        </View>

        <Text style={styles.notificationMessage} numberOfLines={2}>{item.message}</Text>

        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.notificationImage}
          />
        )}

        <View style={styles.notificationActions}>
          {!item.isRead && (
            <TouchableOpacity onPress={() => handleMarkAsRead(item.id)}>
              <Text style={styles.actionText}>Đánh dấu đã đọc</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
            <Text style={[styles.actionText, styles.deleteText]}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thông báo</Text>

      {/* Các bộ lọc */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === null && styles.activeFilter]}
          onPress={() => handleFilter(null)}
        >
          <Text style={[styles.filterText, filter === null && styles.activeFilterText]}>
            Tất cả
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'order' && styles.activeFilter]}
          onPress={() => handleFilter('order')}
        >
          <Text style={[styles.filterText, filter === 'order' && styles.activeFilterText]}>
            Đơn hàng
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'promotion' && styles.activeFilter]}
          onPress={() => handleFilter('promotion')}
        >
          <Text style={[styles.filterText, filter === 'promotion' && styles.activeFilterText]}>
            Khuyến mãi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'news' && styles.activeFilter]}
          onPress={() => handleFilter('news')}
        >
          <Text style={[styles.filterText, filter === 'news' && styles.activeFilterText]}>
            Tin tức
          </Text>
        </TouchableOpacity>
      </View>

      {/* Đánh dấu đọc tất cả */}
      {notifications.some(item => !item.isRead) && (
        <TouchableOpacity
          style={styles.markAllButton}
          onPress={handleMarkAllAsRead}
        >
          <Text style={styles.markAllText}>Đánh dấu tất cả đã đọc</Text>
        </TouchableOpacity>
      )}

      {/* Danh sách thông báo */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có thông báo nào</Text>
          </View>
        }
      />
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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilter: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  markAllButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  markAllText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '500',
  },
  notificationList: {
    paddingBottom: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationImage: {
    width: '100%',
    height: 150,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  notificationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionText: {
    fontSize: 14,
    color: '#E91E63',
    marginLeft: 16,
  },
  deleteText: {
    color: '#ff6b6b',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default NotificationScreen;
