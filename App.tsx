import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing all required screens
import ProductListScreen from './screens/ProductListScreen';
import SearchScreen from './screens/SearchScreen';
import AddressScreen from './screens/AddressScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProductManagementScreen from './screens/ProductManagementScreen';
import OrderManagementScreen from './screens/OrderManagementScreen';
import CategoryManagementScreen from './screens/CategoryManagementScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';

// Định nghĩa kiểu cho navigation
export type RootStackParamList = {
  ProductList: undefined;
  Search: undefined;
  Address: undefined;
  Notification: undefined;
  ProductManagement: undefined;
  OrderManagement: undefined;
  CategoryManagement: undefined;
  Analytics: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ProductList"
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen name="ProductList" component={ProductListScreen} options={{title: 'Danh sách sản phẩm'}} />
          <Stack.Screen name="Search" component={SearchScreen} options={{title: 'Tìm kiếm'}} />
          <Stack.Screen name="Address" component={AddressScreen} options={{title: 'Địa chỉ giao hàng'}} />
          <Stack.Screen name="Notification" component={NotificationScreen} options={{title: 'Thông báo'}} />
          <Stack.Screen name="ProductManagement" component={ProductManagementScreen} options={{title: 'Quản lý sản phẩm'}} />
          <Stack.Screen name="OrderManagement" component={OrderManagementScreen} options={{title: 'Quản lý đơn hàng'}} />
          <Stack.Screen name="CategoryManagement" component={CategoryManagementScreen} options={{title: 'Quản lý danh mục'}} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{title: 'Thống kê'}} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
