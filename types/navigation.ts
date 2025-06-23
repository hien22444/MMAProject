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

  Coupon: undefined;
  HelpCenter: undefined;
  Tabs: undefined;
    
  ProductDetail: undefined;
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
  UserManager: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Cart: { selectedCoupon?: string };
  Profile: undefined;
  //   TestComponent: undefined;
};

export type AdminTabParamList = {
  ProductManagement: undefined;
  OrderManagement: undefined;
  CategoryManagement: undefined;
  Analytics: undefined;
  UserManager: undefined;
};

// Thêm các màn hình khác nếu có
