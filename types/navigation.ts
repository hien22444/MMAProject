import { Product } from "../contexts/ProductContext";
import { Review } from "../types/review";

export type RootStackParamList = {
  Tab: { screen: keyof BottomTabParamList } | undefined;
  GuestTab: undefined;
  AdminTab: undefined;
  Profile: undefined;
  Wishlist: undefined;
  OrderHistory: undefined;
  ShippingAddress: undefined;
  AccountSettings: undefined;
  Support: undefined;

  OrderDetail: undefined;

  Payment: { totalAmount: number };

  Coupon: { totalAmount: number };
  HelpCenter: undefined;
  Tabs: undefined;

  ProductDetail: { productId: string };

  Checkout: undefined;
  Login: undefined;
  Register: undefined;

  AllReviews: {
    productId: string;
  };

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
  // Thêm các màn hình cài đặt mới:
  BankAccount: undefined;
  ChatSettings: undefined;
  NotificationSettings: undefined;
  PrivacySettings: undefined;
  BlockedUsers: undefined;
  Language: undefined;
  CommunityStandards: undefined;
  About: undefined;

  // Help Center Screens
  OrderHelp: undefined;
  ShippingHelp: undefined;
  PaymentHelp: undefined;
  RefundHelp: undefined;
  ContactHelp: undefined;

  // Account & Security Screens
  ChangePassword: undefined;
  SocialAccounts: undefined;
  UsernameSettings: undefined;
  PhoneSettings: undefined;
  EmailSettings: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Cart: { selectedCoupon: string };
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
