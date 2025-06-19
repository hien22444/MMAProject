import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions
} from 'react-native';

// Dữ liệu mẫu thống kê
const analyticsData = {
  revenue: {
    total: 125700000,
    lastMonth: 32500000,
    thisMonth: 28400000,
    percentChange: -12.6
  },
  orders: {
    total: 852,
    lastMonth: 215,
    thisMonth: 188,
    percentChange: -12.5
  },
  customers: {
    total: 375,
    lastMonth: 42,
    thisMonth: 56,
    percentChange: 33.3
  },
  products: {
    total: 128,
    bestsellers: [
      { id: '1', name: 'Áo Thun Unisex Basic', sold: 86 },
      { id: '2', name: 'Quần Jean Nam Slim Fit', sold: 72 },
      { id: '3', name: 'Váy Liền Nữ Dáng Xòe', sold: 65 }
    ]
  }
};

// Dữ liệu mẫu cho biểu đồ doanh thu
const revenueChartData = [
  { month: 'T1', value: 18500000 },
  { month: 'T2', value: 22300000 },
  { month: 'T3', value: 21800000 },
  { month: 'T4', value: 25600000 },
  { month: 'T5', value: 32500000 },
  { month: 'T6', value: 28400000 },
];

// Tìm giá trị lớn nhất để tỷ lệ biểu đồ
const maxValue = Math.max(...revenueChartData.map(item => item.value));

const AnalyticsScreen = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const screenWidth = Dimensions.get('window').width;

  const formatCurrency = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₫";
  };

  const renderStatusIndicator = (percentChange: number) => {
    const isPositive = percentChange > 0;
    return (
      <View style={[styles.statusIndicator, isPositive ? styles.positive : styles.negative]}>
        <Text style={styles.statusText}>
          {isPositive ? '+' : ''}{percentChange}%
        </Text>
      </View>
    );
  };

  const renderOverviewTab = () => {
    return (
      <View style={styles.tabContent}>
        {/* Thống kê tổng quan */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Doanh thu</Text>
            <Text style={styles.statValue}>{formatCurrency(analyticsData.revenue.thisMonth)}</Text>
            <View style={styles.statFooter}>
              <Text style={styles.statLabel}>Tháng này</Text>
              {renderStatusIndicator(analyticsData.revenue.percentChange)}
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Đơn hàng</Text>
            <Text style={styles.statValue}>{analyticsData.orders.thisMonth}</Text>
            <View style={styles.statFooter}>
              <Text style={styles.statLabel}>Tháng này</Text>
              {renderStatusIndicator(analyticsData.orders.percentChange)}
            </View>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Khách hàng mới</Text>
            <Text style={styles.statValue}>{analyticsData.customers.thisMonth}</Text>
            <View style={styles.statFooter}>
              <Text style={styles.statLabel}>Tháng này</Text>
              {renderStatusIndicator(analyticsData.customers.percentChange)}
            </View>
          </View>
        </View>

        {/* Biểu đồ doanh thu */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Doanh thu 6 tháng gần đây</Text>
          <View style={styles.chart}>
            {revenueChartData.map((item, index) => {
              const barHeight = (item.value / maxValue) * 200;
              return (
                <View key={index} style={styles.barContainer}>
                  <View style={[styles.bar, { height: barHeight }]} />
                  <Text style={styles.barLabel}>{item.month}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Top sản phẩm bán chạy */}
        <View style={styles.bestsellersContainer}>
          <Text style={styles.sectionTitle}>Sản phẩm bán chạy</Text>
          {analyticsData.products.bestsellers.map((product, index) => (
            <View key={product.id} style={styles.productRow}>
              <Text style={styles.productRank}>#{index + 1}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productSold}>{product.sold} đã bán</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderSalesTab = () => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Chi tiết doanh thu</Text>
        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tổng doanh thu:</Text>
            <Text style={styles.detailValue}>{formatCurrency(analyticsData.revenue.total)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tháng trước:</Text>
            <Text style={styles.detailValue}>{formatCurrency(analyticsData.revenue.lastMonth)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tháng này:</Text>
            <Text style={styles.detailValue}>{formatCurrency(analyticsData.revenue.thisMonth)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tăng trưởng:</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>{analyticsData.revenue.percentChange}%</Text>
              {renderStatusIndicator(analyticsData.revenue.percentChange)}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderOrdersTab = () => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Chi tiết đơn hàng</Text>
        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tổng đơn hàng:</Text>
            <Text style={styles.detailValue}>{analyticsData.orders.total}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tháng trước:</Text>
            <Text style={styles.detailValue}>{analyticsData.orders.lastMonth}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tháng này:</Text>
            <Text style={styles.detailValue}>{analyticsData.orders.thisMonth}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tăng trưởng:</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>{analyticsData.orders.percentChange}%</Text>
              {renderStatusIndicator(analyticsData.orders.percentChange)}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'overview' && styles.activeTabButton]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'overview' && styles.activeTabButtonText]}>
            Tổng quan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'sales' && styles.activeTabButton]}
          onPress={() => setActiveTab('sales')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'sales' && styles.activeTabButtonText]}>
            Doanh thu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'orders' && styles.activeTabButton]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'orders' && styles.activeTabButtonText]}>
            Đơn hàng
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'sales' && renderSalesTab()}
      {activeTab === 'orders' && renderOrdersTab()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  activeTabButtonText: {
    color: '#3498db',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 8,
  },
  statFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#9e9e9e',
  },
  statusIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  positive: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  negative: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#212121',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  chart: {
    height: 220,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barContainer: {
    alignItems: 'center',
    width: 36,
  },
  bar: {
    width: 24,
    backgroundColor: '#3498db',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#9e9e9e',
  },
  bestsellersContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productRank: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3498db',
    width: 32,
  },
  productName: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
  },
  productSold: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#757575',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  detailValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AnalyticsScreen;
