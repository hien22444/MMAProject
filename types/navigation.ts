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
    ProductDetail: undefined;
    
    // Các màn hình được sử dụng trong ProductListScreen
    ProductList: { categoryId: string; categoryName: string } | undefined;
    Search: undefined;
    Address: undefined;
    Notification: undefined;
    ProductManagement: undefined;
    OrderManagement: undefined;
    CategoryManagement: undefined;
    Analytics: undefined;
    Checkout: undefined;
    Login: undefined;
    Dashboard: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Cart: { selectedCoupon?: string };
  Profile: undefined;
};

// Thêm các màn hình khác nếu có

