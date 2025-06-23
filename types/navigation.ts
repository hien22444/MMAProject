export type RootStackParamList = {
  Tab: { screen: keyof BottomTabParamList } | undefined;
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
    Register:undefined;
    
    ProductList: undefined;
    Search: undefined;
    Address: undefined;
    Notification: undefined;
    ProductManagement: undefined;
    OrderManagement: undefined;
    CategoryManagement: undefined;
    Analytics: undefined;
    Policy: undefined;
    AccountSecurity:undefined;
    MyProfile:undefined;
};
export type BottomTabParamList = {
  Home: undefined;
  Cart: { selectedCoupon?: string };
  Profile: undefined;
  //   TestComponent: undefined;
};

// Thêm các màn hình khác nếu có
