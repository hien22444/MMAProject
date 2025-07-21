import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import TabNavigator from "./TabNavigator";
import GuestNavigator from "./GuestNavigator";
import AdminNavigator from "./AdminNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useAuth } from "../contexts/AuthContext";
import WishlistScreen from "../screens/WishlistScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import ShippingAddressScreen from "../screens/ShippingAddressScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import HelpCenterScreen from "../screens/HelpCenterScreen";
import SupportScreen from "../screens/SupportScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import ReviewScreen from "../screens/AllReviewScreen";
import PaymentScreen from "../screens/PaymentScreen";
import CouponScreen from "../screens/CouponScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductDetail from "../screens/ProductDetail";
import ProductListScreen from "../screens/ProductListScreen";
import SearchScreen from "../screens/SearchScreen";
import AddressScreen from "../screens/AddressScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PolicyScreen from "../screens/PolicyScreen";
import AccountSecurityScreen from "../screens/AccountSecurityScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import BlockedUsersScreen from "../screens/BlockedUsersScreen";
import BankAccountScreen from "../screens/BankAccountScreen";
import ChatSettingsScreen from "../screens/ChatSettingsScreen";
import NotificationSettingsScreen from "../screens/NotificationSettingsScreen";
import PrivacySettingsScreen from "../screens/PrivacySettingsScreen";
import LanguageScreen from "../screens/LanguageScreen";
import CommunityStandardsScreen from "../screens/CommunityStandardsScreen";
import AboutScreen from "../screens/AboutScreen";
import OrderHelpScreen from "../screens/OrderHelpScreen";
import ShippingHelpScreen from "../screens/ShippingHelpScreen";
import PaymentHelpScreen from "../screens/PaymentHelpScreen";
import RefundHelpScreen from "../screens/RefundHelpScreen";
import ContactHelpScreen from "../screens/ContactHelpScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import SocialAccountsScreen from "../screens/SocialAccountsScreen";
import UsernameSettingsScreen from "../screens/UsernameSettingsScreen";
import PhoneSettingsScreen from "../screens/PhoneSettingsScreen";
import EmailSettingsScreen from "../screens/EmailSettingsScreen";
import AllReviewScreen from "../screens/AllReviewScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { currentUser } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {!currentUser ? (
          // Guest Screens - Show home page for guests
          <>
            <Stack.Screen
              name="GuestTab"
              component={GuestNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Đăng nhập" }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Đăng ký" }}
            />

            <Stack.Screen
              name="ProductList"
              component={ProductListScreen}
              options={{ title: "Danh sách sản phẩm" }}
            />
            {currentUser && (
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{ title: "Chi tiết" }}
              />
            )}

            <Stack.Screen
              name="AllReviews"
              component={AllReviewScreen}
              options={{ title: "Đánh giá" }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ title: "Tìm kiếm" }}
            />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
            <Stack.Screen name="Policy" component={PolicyScreen} />
            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{ title: "Giới thiệu" }}
            />

            {/* Help Center Screens for Guest - redirect to login */}
            <Stack.Screen
              name="OrderHelp"
              component={OrderHelpScreen}
              options={{ title: "Về đơn hàng" }}
            />
            <Stack.Screen
              name="ShippingHelp"
              component={ShippingHelpScreen}
              options={{ title: "Vận chuyển & Giao hàng" }}
            />
            <Stack.Screen
              name="PaymentHelp"
              component={PaymentHelpScreen}
              options={{ title: "Thanh toán" }}
            />
            <Stack.Screen
              name="RefundHelp"
              component={RefundHelpScreen}
              options={{ title: "Hoàn trả & Hoàn tiền" }}
            />
            <Stack.Screen
              name="ContactHelp"
              component={ContactHelpScreen}
              options={{ title: "Liên hệ hỗ trợ" }}
            />
          </>
        ) : currentUser.role === "admin" ? (
          // Admin Screens
          <>
            <Stack.Screen
              name="AdminTab"
              component={AdminNavigator}
              options={{ headerShown: false, title: "Admin Dashboard" }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{ title: "Chi tiết" }}
            />
            <Stack.Screen
              name="AllReviews"
              component={AllReviewScreen}
              options={{ title: "Đánh giá" }}
            />
            <Stack.Screen
              name="ProductList"
              component={ProductListScreen}
              options={{ title: "Danh sách sản phẩm" }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ title: "Tìm kiếm" }}
            />
          </>
        ) : (
          // Customer Screens
          <>
            <Stack.Screen
              name="Tab"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
            <Stack.Screen
              name="ShippingAddress"
              component={ShippingAddressScreen}
            />
            <Stack.Screen
              name="AccountSettings"
              component={AccountSettingsScreen}
            />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{ title: "Chi tiết" }}
            />
            <Stack.Screen
              name="ProductList"
              component={ProductListScreen}
              options={{ title: "Danh sách sản phẩm" }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ title: "Tìm kiếm" }}
            />
            <Stack.Screen
              name="Address"
              component={AddressScreen}
              options={{ title: "Địa chỉ giao hàng" }}
            />
            <Stack.Screen
              name="Notification"
              component={NotificationScreen}
              options={{ title: "Thông báo" }}
            />
            <Stack.Screen
              name="Support"
              component={SupportScreen}
              options={{ title: "Hỗ trợ" }}
            />
            <Stack.Screen
              name="OrderDetail"
              component={OrderDetailScreen}
              options={{ title: "Chi tiết đơn hàng" }}
            />
            <Stack.Screen
              name="AllReviews"
              component={AllReviewScreen}
              options={{ title: "Đánh giá" }}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ title: "Thanh toán" }}
            />
            <Stack.Screen
              name="Coupon"
              component={CouponScreen}
              options={{ title: "Mã giảm giá" }}
            />
            <Stack.Screen name="Policy" component={PolicyScreen} />
            <Stack.Screen
              name="AccountSecurity"
              component={AccountSecurityScreen}
              options={{ title: "Tài khoản & Bảo mật" }}
            />
            <Stack.Screen
              name="MyProfile"
              component={MyProfileScreen}
              options={{ title: "Hồ sơ của tôi" }}
            />
            <Stack.Screen
              name="BlockedUsers"
              component={BlockedUsersScreen}
              options={{ title: "Người dùng đã bị chặn" }}
            />
            <Stack.Screen
              name="BankAccount"
              component={BankAccountScreen}
              options={{ title: "Tài khoản / Thẻ ngân hàng" }}
            />
            <Stack.Screen
              name="ChatSettings"
              component={ChatSettingsScreen}
              options={{ title: "Cài đặt Chat" }}
            />
            <Stack.Screen
              name="NotificationSettings"
              component={NotificationSettingsScreen}
              options={{ title: "Cài đặt Thông báo" }}
            />
            <Stack.Screen
              name="PrivacySettings"
              component={PrivacySettingsScreen}
              options={{ title: "Cài đặt riêng tư" }}
            />
            <Stack.Screen
              name="Language"
              component={LanguageScreen}
              options={{ title: "Ngôn ngữ / Language" }}
            />
            <Stack.Screen
              name="CommunityStandards"
              component={CommunityStandardsScreen}
              options={{ title: "Tiêu chuẩn cộng đồng" }}
            />
            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{ title: "Giới thiệu" }}
            />

            {/* Help Center Screens */}
            <Stack.Screen
              name="OrderHelp"
              component={OrderHelpScreen}
              options={{ title: "Về đơn hàng" }}
            />
            <Stack.Screen
              name="ShippingHelp"
              component={ShippingHelpScreen}
              options={{ title: "Vận chuyển & Giao hàng" }}
            />
            <Stack.Screen
              name="PaymentHelp"
              component={PaymentHelpScreen}
              options={{ title: "Thanh toán" }}
            />
            <Stack.Screen
              name="RefundHelp"
              component={RefundHelpScreen}
              options={{ title: "Hoàn trả & Hoàn tiền" }}
            />
            <Stack.Screen
              name="ContactHelp"
              component={ContactHelpScreen}
              options={{ title: "Liên hệ hỗ trợ" }}
            />

            {/* Account & Security Screens */}
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
              options={{ title: "Đổi mật khẩu" }}
            />
            <Stack.Screen
              name="SocialAccounts"
              component={SocialAccountsScreen}
              options={{ title: "Tài khoản mạng xã hội" }}
            />
            <Stack.Screen
              name="UsernameSettings"
              component={UsernameSettingsScreen}
              options={{ title: "Tên người dùng" }}
            />
            <Stack.Screen
              name="PhoneSettings"
              component={PhoneSettingsScreen}
              options={{ title: "Số điện thoại" }}
            />
            <Stack.Screen
              name="EmailSettings"
              component={EmailSettingsScreen}
              options={{ title: "Email nhận hóa đơn" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
