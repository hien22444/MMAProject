import { Product } from '../contexts/ProductContext';

export type RootStackParamList = {
  Tab: { screen: keyof BottomTabParamList } | undefined;
  AdminTab: undefined;
  Profile: undefined;
  Wishlist: undefined;
  OrderHistory: undefined;
  ShippingAddress: undefined;
  AccountSettings: undefined;
  Support: undefined;

  OrderDetail: undefined;

  Review: undefined;

  Payment: { totalAmount: number };

  Coupon: { totalAmount: number };
  HelpCenter: undefined;
  Tabs: undefined;

  ProductDetail: { product: Product };
  Checkout: undefined;
  Login: undefined;
  Register: undefined;

  ProductList: undefined;
  Search: undefined;
  Address: undefined;
  Notification: undefined;
  ProductManagement: undefined;
  OrderManagement: undefined;
  CategoryManagement: undefined;
  Analytics: undefined;
  Policy: undefined;
  AccountSecurity: undefined;
  MyProfile: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Cart: { selectedCoupon?: string };
  Profile: undefined;
  Chat: undefined;

  CreateReview: undefined;
  Coupons: undefined;
};

export type AdminTabParamList = {
  ProductManagement: undefined;
  OrderManagement: undefined;
  Analytics: undefined;
  CategoryManagement: undefined;
  UserManager: undefined;
};

// Thêm các màn hình khác nếu có
