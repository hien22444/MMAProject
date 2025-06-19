import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = () => {
  const navigation = useNavigation<any>();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Shop App Dashboard</Text>
        <Text style={styles.subtitle}>Chọn màn hình để xem</Text>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Màn hình Khách</Text>
          <View style={styles.menuGrid}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigateToScreen('ProductList')}
            >
              <View style={[styles.iconContainer, {backgroundColor: '#e3f2fd'}]}>
                <Ionicons name="grid-outline" size={24} color="#1976d2" />
              </View>
              <Text style={styles.menuText}>Danh sách sản phẩm</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigateToScreen('Search')}
            >
              <View style={[styles.iconContainer, {backgroundColor: '#e8f5e9'}]}>
                <Ionicons name="search-outline" size={24} color="#2e7d32" />
              </View>
              <Text style={styles.menuText}>Tìm kiếm</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Màn hình Khách hàng</Text>
          <View style={styles.menuGrid}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigateToScreen('Notification')}
            >
              <View style={[styles.iconContainer, {backgroundColor: '#fff3e0'}]}>
                <Ionicons name="notifications-outline" size={24} color="#e65100" />
              </View>
              <Text style={styles.menuText}>Thông báo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigateToScreen('Address')}
            >
              <View style={[styles.iconContainer, {backgroundColor: '#f3e5f5'}]}>
                <Ionicons name="location-outline" size={24} color="#7b1fa2" />
              </View>
              <Text style={styles.menuText}>Địa chỉ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigateToScreen('OrderHistory')}
            >
              <View style={[styles.iconContainer, {backgroundColor: '#ede7f6'}]}>
                <Ionicons name="document-text-outline" size={24} color="#512da8" />
              </View>
              <Text style={styles.menuText}>Lịch sử đơn hàng</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Màn hình Quản lý</Text>
          <View style={styles.menuGrid}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigateToScreen('ProductManagement')}
            >
              <View style={[styles.iconContainer, {backgroundColor: '#e1f5fe'}]}>
                <Ionicons name="cube-outline" size={24} color="#0288d1" />
              </View>
              <Text style={styles.menuText}>Quản lý sản phẩm</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigateToScreen('OrderManagement')}
            >
              <View style={[styles.iconContainer, {backgroundColor: '#fffde7'}]}>
                <Ionicons name="list-outline" size={24} color="#fbc02d" />
              </View>
              <Text style={styles.menuText}>Quản lý đơn hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigateToScreen('CategoryManagement')}
            >
              <View style={[styles.iconContainer, {backgroundColor: '#f1f8e9'}]}>
                <Ionicons name="folder-outline" size={24} color="#558b2f" />
              </View>
              <Text style={styles.menuText}>Quản lý danh mục</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => navigateToScreen('Analytics')}
            >
              <View style={[styles.iconContainer, {backgroundColor: '#fce4ec'}]}>
                <Ionicons name="bar-chart-outline" size={24} color="#c2185b" />
              </View>
              <Text style={styles.menuText}>Thống kê</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  menuSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default DashboardScreen;
