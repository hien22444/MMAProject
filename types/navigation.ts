export type RootStackParamList = {
  // Đăng nhập / đăng ký
  Login: undefined;
  Register: undefined;
  ProfileInfo: undefined;

  // Tab chính
  Tab: { screen: keyof BottomTabParamList } | undefined;

  // Hồ sơ và tài khoản
  Profile: undefined;
  MyProfile: undefined;
  AccountSettings: undefined;
  AccountSecurity: undefined;

  // Địa chỉ, thông báo
  ShippingAddress: undefined;
  Address: undefined;
  Notification: undefined;

  // Mua hàng
  Wishlist: undefined;
  OrderHistory: undefined;
  OrderDetail: undefined;
  Review: undefined;
  Checkout: undefined;
  Payment: { totalAmount: number };
  Coupon: { totalAmount: number };

  // Quản lý sản phẩm
  ProductDetail: undefined;
  ProductList: undefined;
  ProductManagement: undefined;
  OrderManagement: undefined;
  CategoryManagement: undefined;

  // Hệ thống
  Analytics: undefined;
  HelpCenter: undefined;
  Support: undefined;
  Policy: undefined;

  // Tìm kiếm
  Search: undefined;

  // Quản lý người dùng ✅
  UserManagement: undefined;
  EditUser: {
    user: {
      id: string;
      name: string;
      email: string;
      role: 'user' | 'admin';
    };
  };
};
export type BottomTabParamList = {
  Home: undefined;
  Cart: { selectedCoupon?: string };
  Profile: undefined;
  Chat: undefined;
  CreateReview: undefined;
  Coupons: undefined;
};

