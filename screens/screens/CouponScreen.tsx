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

const availableCoupons = [
  {
    id: "1",
    code: "SALE10",
    discount: "10%",
    description: "Giảm 10% cho đơn hàng từ 500K",
    minOrder: 500000,
    expiry: "30/06/2023",
  },
  {
    id: "2",
    code: "FREESHIP",
    discount: "30K",
    description: "Miễn phí vận chuyển 30K",
    minOrder: 0,
    expiry: "15/07/2023",
  },
];

const usedCoupons = [
  {
    id: "3",
    code: "WELCOME",
    discount: "50K",
    description: "Giảm 50K cho đơn hàng đầu tiên",
    expiry: "Đã sử dụng ngày 10/05/2023",
  },
];

const expiredCoupons = [
  {
    id: "4",
    code: "SUMMER20",
    discount: "20%",
    description: "Giảm 20% cho mùa hè",
    expiry: "Hết hạn ngày 31/05/2023",
  },
];

import type { StackNavigationProp } from "@react-navigation/stack";

type CouponScreenProps = {
  navigation: StackNavigationProp<any>;
};

const CouponScreen = ({ navigation }: CouponScreenProps) => {
  const [activeTab, setActiveTab] = useState("available");
  const [enteredCode, setEnteredCode] = useState("");

  type Coupon = {
    id: string;
    code: string;
    discount: string;
    description: string;
    minOrder?: number;
    expiry: string;
  };

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
        {item.minOrder && item.minOrder > 0 && (
          <Text style={styles.couponCondition}>
            Áp dụng cho đơn hàng từ {item.minOrder.toLocaleString()}đ
          </Text>
        )}
        <Text style={styles.couponExpiry}>HSD: {item.expiry}</Text>
        {activeTab === "available" && (
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.applyButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "available" && styles.activeTab]}
          onPress={() => setActiveTab("available")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "available" && styles.activeTabText,
            ]}
          >
            Có thể dùng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "used" && styles.activeTab]}
          onPress={() => setActiveTab("used")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "used" && styles.activeTabText,
            ]}
          >
            Đã dùng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "expired" && styles.activeTab]}
          onPress={() => setActiveTab("expired")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "expired" && styles.activeTabText,
            ]}
          >
            Hết hạn
          </Text>
        </TouchableOpacity>
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
        data={
          activeTab === "available"
            ? availableCoupons
            : activeTab === "used"
            ? usedCoupons
            : expiredCoupons
        }
        keyExtractor={(item) => item.id}
        renderItem={renderCouponItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="confirmation-number" size={50} color="#ddd" />
            <Text style={styles.emptyText}>Không có mã giảm giá nào</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#6200ee",
  },
  tabText: {
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#6200ee",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  applyCodeButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6200ee",
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  applyCodeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContent: {
    padding: 15,
  },
  couponCard: {
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  couponLeft: {
    width: 80,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
  },
  discountBadge: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  discountText: {
    color: "#6200ee",
    fontWeight: "bold",
    fontSize: 16,
  },
  couponRight: {
    flex: 1,
    padding: 15,
  },
  couponCode: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  couponDesc: {
    marginBottom: 5,
  },
  couponCondition: {
    color: "#666",
    fontSize: 12,
    marginBottom: 5,
  },
  couponExpiry: {
    color: "#666",
    fontSize: 12,
    fontStyle: "italic",
  },
  applyButton: {
    alignSelf: "flex-end",
    backgroundColor: "#6200ee",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginTop: 5,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  emptyText: {
    marginTop: 15,
    color: "#666",
    fontSize: 16,
  },
});

export default CouponScreen;
