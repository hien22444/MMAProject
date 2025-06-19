import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, BottomTabParamList } from '../types/navigation';

type CouponScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'Coupon'>,
  BottomTabNavigationProp<BottomTabParamList>
>;

type CouponScreenProps = {
  navigation: CouponScreenNavigationProp;
};

const availableCoupons = [
  { id: "1", code: "SALE10", discount: "10%", description: "Giảm 10% cho đơn hàng từ 500K", minOrder: 500000, expiry: "30/06/2023" },
  { id: "2", code: "FREESHIP", discount: "30K", description: "Miễn phí vận chuyển 30K", minOrder: 0, expiry: "15/07/2023" },
];

const usedCoupons = [
  { id: "3", code: "WELCOME", discount: "50K", description: "Giảm 50K cho đơn hàng đầu tiên", expiry: "Đã sử dụng ngày 10/05/2023" },
];

const expiredCoupons = [
  { id: "4", code: "SUMMER20", discount: "20%", description: "Giảm 20% cho mùa hè", expiry: "Hết hạn ngày 31/05/2023" },
];

type Coupon = {
  id: string;
  code: string;
  discount: string;
  description: string;
  minOrder?: number;
  expiry: string;
};

const CouponScreen = ({ navigation }: CouponScreenProps) => {
  const [activeTab, setActiveTab] = useState("available");
  const [enteredCode, setEnteredCode] = useState("");

  const renderCouponItem = ({ item }: { item: Coupon }) => (
    <View style={styles.couponCard}>
      <View style={styles.couponLeft}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>
      <View style={styles.couponRight}>
        <Text style={styles.couponCode}>{item.code}</Text>
        <Text style={styles.couponDesc}>{item.description}</Text>
        {typeof item.minOrder === 'number' && item.minOrder > 0 && (
          <Text style={styles.couponCondition}>
            Áp dụng cho đơn hàng từ {item.minOrder.toLocaleString()}đ
          </Text>
        )}
        <Text style={styles.couponExpiry}>HSD: {item.expiry || "Không xác định"}</Text>
        {activeTab === "available" && (
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => navigation.navigate('Tab', { screen: 'Cart', params: { selectedCoupon: item.code } } as any)}
          >
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const getCouponsForTab = () => {
    switch (activeTab) {
      case "available": return availableCoupons;
      case "used": return usedCoupons;
      case "expired": return expiredCoupons;
      default: return [];
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {["available", "used", "expired"].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === "available" ? "Có thể dùng" : tab === "used" ? "Đã dùng" : "Hết hạn"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={enteredCode}
          onChangeText={setEnteredCode}
          placeholder="Nhập mã giảm giá"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.applyCodeButton}>
          <Text style={styles.applyCodeText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getCouponsForTab()}
        keyExtractor={(item) => item.id}
        renderItem={renderCouponItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={{ alignItems: 'center' }}>
              <Icon name="confirmation-number" size={50} color="#ddd" />
            </View>
            <Text style={styles.emptyText}>Không có mã giảm giá nào</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tabContainer: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee" },
  tab: { flex: 1, padding: 15, alignItems: "center" },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "#6200ee" },
  tabText: { color: "#666", fontWeight: "500" },
  activeTabText: { color: "#6200ee", fontWeight: "bold" },
  inputContainer: { flexDirection: "row", padding: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 5, padding: 10, marginRight: 10 },
  applyCodeButton: { justifyContent: "center", alignItems: "center", backgroundColor: "#6200ee", borderRadius: 5, paddingHorizontal: 15 },
  applyCodeText: { color: "#fff", fontWeight: "bold" },
  listContent: { padding: 15 },
  couponCard: { flexDirection: "row", marginBottom: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 5, overflow: "hidden" },
  couponLeft: { width: 80, backgroundColor: "#6200ee", justifyContent: "center", alignItems: "center" },
  discountBadge: { backgroundColor: "#fff", borderRadius: 30, width: 50, height: 50, justifyContent: "center", alignItems: "center" },
  discountText: { color: "#6200ee", fontWeight: "bold", fontSize: 16 },
  couponRight: { flex: 1, padding: 15 },
  couponCode: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  couponDesc: { marginBottom: 5 },
  couponCondition: { color: "#666", fontSize: 12, marginBottom: 5 },
  couponExpiry: { color: "#666", fontSize: 12, fontStyle: "italic" },
  applyButton: { alignSelf: "flex-end", backgroundColor: "#6200ee", padding: 5, paddingHorizontal: 10, borderRadius: 3, marginTop: 5 },
  applyButtonText: { color: "#fff", fontSize: 12 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 50 },
  emptyText: { marginTop: 15, color: "#666", fontSize: 16 },
});

export default CouponScreen;
