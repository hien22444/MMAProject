import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions
} from 'react-native';

// Import contexts
import { useProducts } from '../contexts/ProductContext';
import { useOrders } from '../contexts/OrderContext';

const AnalyticsScreen = () => {
  const { products } = useProducts();
  const { orders } = useOrders();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState({
    revenue: {
      total: 0,
      lastMonth: 0,
      thisMonth: 0,
      percentChange: 0
    },
    orders: {
      total: 0,
      lastMonth: 0,
      thisMonth: 0,
      percentChange: 0
    },
    customers: {
      total: 0,
      lastMonth: 0,
      thisMonth: 0,
      percentChange: 0
    },
    products: {
      total: 0,
      bestsellers: [] as any[]
    }
  });

  // Generate analytics from real data
  useEffect(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const thisYear = now.getFullYear();

    // Calculate revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const thisMonthOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear;
    });
    const lastMonthOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === lastMonth && orderDate.getFullYear() === thisYear;
    });

    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.total, 0);
    const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.total, 0);
    const revenueChange = lastMonthRevenue > 0 ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0;

    // Calculate customers
    const uniqueCustomers = new Set(orders.map(order => order.userId)).size;
    const thisMonthCustomers = new Set(thisMonthOrders.map(order => order.userId)).size;
    const lastMonthCustomers = new Set(lastMonthOrders.map(order => order.userId)).size;
    const customerChange = lastMonthCustomers > 0 ? ((thisMonthCustomers - lastMonthCustomers) / lastMonthCustomers) * 100 : 0;

    // Calculate bestsellers
    const productSales = new Map<string, { name: string; sold: number }>();
    orders.forEach(order => {
      order.products.forEach(product => {
        if (productSales.has(product.id)) {
          const existing = productSales.get(product.id)!;
          productSales.set(product.id, {
            name: existing.name,
            sold: existing.sold + product.quantity
          });
        } else {
          productSales.set(product.id, {
            name: product.name,
            sold: product.quantity
          });
        }
      });
    });

    const bestsellers = Array.from(productSales.entries())
      .map(([id, data]) => ({ id, name: data.name, sold: data.sold }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    setAnalyticsData({
      revenue: {
        total: totalRevenue,
        lastMonth: lastMonthRevenue,
        thisMonth: thisMonthRevenue,
        percentChange: revenueChange
      },
      orders: {
        total: orders.length,
        lastMonth: lastMonthOrders.length,
        thisMonth: thisMonthOrders.length,
        percentChange: lastMonthOrders.length > 0 ? ((thisMonthOrders.length - lastMonthOrders.length) / lastMonthOrders.length) * 100 : 0
      },
      customers: {
        total: uniqueCustomers,
        lastMonth: lastMonthCustomers,
        thisMonth: thisMonthCustomers,
        percentChange: customerChange
      },
      products: {
        total: products.length,
        bestsellers
      }
    });
  }, [products, orders]);

  // Dữ liệu mẫu cho biểu đồ doanh thu (có thể tính từ orders thực tế)
  const revenueChartData = [
    { month: 'T1', value: 18500000 },
    { month: 'T2', value: 22300000 },
    { month: 'T3', value: 21800000 },
    { month: 'T4', value: 25600000 },
    { month: 'T5', value: 32500000 },
    { month: 'T6', value: 28400000 },
  ];

  // Lấy chiều rộng màn hình
  const { width } = Dimensions.get('window');
  const chartWidth = width - 40;
  const maxValue = Math.max(...revenueChartData.map(item => item.value));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(1)}%`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thống kê & Phân tích</Text>
        <Text style={styles.headerSubtitle}>Báo cáo kinh doanh tháng {new Date().getMonth() + 1}</Text>
      </View>

      {/* Tab selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>
            Tổng quan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'revenue' && styles.activeTab]}
          onPress={() => setSelectedTab('revenue')}
        >
          <Text style={[styles.tabText, selectedTab === 'revenue' && styles.activeTabText]}>
            Doanh thu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'products' && styles.activeTab]}
          onPress={() => setSelectedTab('products')}
        >
          <Text style={[styles.tabText, selectedTab === 'products' && styles.activeTabText]}>
            Sản phẩm
          </Text>
        </TouchableOpacity>
      </View>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <View style={styles.content}>
          {/* KPI Cards */}
          <View style={styles.cardRow}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiTitle}>Tổng doanh thu</Text>
              <Text style={styles.kpiValue}>{formatCurrency(analyticsData.revenue.total)}</Text>
              <Text style={[styles.kpiChange, analyticsData.revenue.percentChange >= 0 ? styles.positive : styles.negative]}>
                {formatPercent(analyticsData.revenue.percentChange)} so với tháng trước
              </Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiTitle}>Tổng đơn hàng</Text>
              <Text style={styles.kpiValue}>{analyticsData.orders.total}</Text>
              <Text style={[styles.kpiChange, analyticsData.orders.percentChange >= 0 ? styles.positive : styles.negative]}>
                {formatPercent(analyticsData.orders.percentChange)} so với tháng trước
              </Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiTitle}>Khách hàng</Text>
              <Text style={styles.kpiValue}>{analyticsData.customers.total}</Text>
              <Text style={[styles.kpiChange, analyticsData.customers.percentChange >= 0 ? styles.positive : styles.negative]}>
                {formatPercent(analyticsData.customers.percentChange)} so với tháng trước
              </Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiTitle}>Sản phẩm</Text>
              <Text style={styles.kpiValue}>{analyticsData.products.total}</Text>
              <Text style={styles.kpiChange}>Tổng số sản phẩm</Text>
            </View>
          </View>

          {/* Best Sellers */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Sản phẩm bán chạy</Text>
            {analyticsData.products.bestsellers.map((product, index) => (
              <View key={product.id} style={styles.bestsellerRow}>
                <View style={styles.bestsellerRank}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <View style={styles.bestsellerInfo}>
                  <Text style={styles.bestsellerName}>{product.name}</Text>
                  <Text style={styles.bestsellerSold}>{product.sold} đã bán</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Revenue Tab */}
      {selectedTab === 'revenue' && (
        <View style={styles.content}>
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Biểu đồ doanh thu 6 tháng gần đây</Text>
            <View style={styles.chart}>
              {revenueChartData.map((item, index) => (
                <View key={index} style={styles.chartColumn}>
                  <View 
                    style={[
                      styles.chartBar, 
                      { height: (item.value / maxValue) * 200 }
                    ]} 
                  />
                  <Text style={styles.chartLabel}>{item.month}</Text>
                  <Text style={styles.chartValue}>
                    {(item.value / 1000000).toFixed(1)}M
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.revenueDetailCard}>
            <Text style={styles.sectionTitle}>Chi tiết doanh thu</Text>
            <View style={styles.revenueRow}>
              <Text style={styles.revenueLabel}>Tháng này:</Text>
              <Text style={styles.revenueValue}>{formatCurrency(analyticsData.revenue.thisMonth)}</Text>
            </View>
            <View style={styles.revenueRow}>
              <Text style={styles.revenueLabel}>Tháng trước:</Text>
              <Text style={styles.revenueValue}>{formatCurrency(analyticsData.revenue.lastMonth)}</Text>
            </View>
            <View style={styles.revenueRow}>
              <Text style={styles.revenueLabel}>Tổng cộng:</Text>
              <Text style={[styles.revenueValue, styles.totalRevenue]}>{formatCurrency(analyticsData.revenue.total)}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Products Tab */}
      {selectedTab === 'products' && (
        <View style={styles.content}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Thống kê sản phẩm</Text>
            <View style={styles.productStatsRow}>
              <Text style={styles.productStatsLabel}>Tổng sản phẩm:</Text>
              <Text style={styles.productStatsValue}>{analyticsData.products.total}</Text>
            </View>
            <View style={styles.productStatsRow}>
              <Text style={styles.productStatsLabel}>Đã bán:</Text>
              <Text style={styles.productStatsValue}>
                {analyticsData.products.bestsellers.reduce((sum, p) => sum + p.sold, 0)}
              </Text>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Top sản phẩm bán chạy</Text>
            {analyticsData.products.bestsellers.map((product, index) => (
              <View key={product.id} style={styles.productRow}>
                <Text style={styles.productRank}>#{index + 1}</Text>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productSold}>{product.sold} lượt bán</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 2,
  },
  kpiTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  kpiChange: {
    fontSize: 12,
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  sectionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  bestsellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  bestsellerRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bestsellerInfo: {
    flex: 1,
  },
  bestsellerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  bestsellerSold: {
    fontSize: 14,
    color: '#666',
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 250,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    backgroundColor: '#007bff',
    borderRadius: 2,
    marginBottom: 10,
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  chartValue: {
    fontSize: 10,
    color: '#999',
  },
  revenueDetailCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  revenueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  revenueLabel: {
    fontSize: 16,
    color: '#666',
  },
  revenueValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalRevenue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  productStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productStatsLabel: {
    fontSize: 16,
    color: '#666',
  },
  productStatsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productRank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    width: 40,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  productSold: {
    fontSize: 14,
    color: '#666',
  },
});

export default AnalyticsScreen;
