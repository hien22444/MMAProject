import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const order = {
  id: "ORD12345",
  date: "15/06/2023",
  status: "Đang giao hàng",
  items: [
    {
      id: 1,
      name: "Áo thun nam cổ tròn",
      price: 199000,
      quantity: 2,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Quần jean nữ rách gối",
      price: 350000,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
  ],
  shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
  paymentMethod: "Thanh toán khi nhận hàng",
  subtotal: 748000,
  shippingFee: 30000,
  total: 778000,
};

import type { StackNavigationProp } from "@react-navigation/stack";

type OrderDetailScreenProps = {
  navigation: StackNavigationProp<any>;
};

const OrderDetailScreen = ({ navigation }: OrderDetailScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
        <View style={styles.infoRow}>
          <Text>Mã đơn hàng:</Text>
          <Text style={styles.infoValue}>{order.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>Ngày đặt:</Text>
          <Text style={styles.infoValue}>{order.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>Trạng thái:</Text>
          <Text style={[styles.infoValue, styles.status]}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sản phẩm</Text>
        {order.items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Số lượng: {item.quantity}</Text>
              <Text>Giá: {item.price.toLocaleString()}đ</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
        <Text style={styles.address}>{order.shippingAddress}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <Text>{order.paymentMethod}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tổng cộng</Text>
        <View style={styles.totalRow}>
          <Text>Tạm tính:</Text>
          <Text>{order.subtotal.toLocaleString()}đ</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>Phí vận chuyển:</Text>
          <Text>{order.shippingFee.toLocaleString()}đ</Text>
        </View>
        <View style={[styles.totalRow, styles.finalTotal]}>
          <Text style={styles.finalTotalText}>Tổng tiền:</Text>
          <Text style={styles.finalTotalText}>
            {order.total.toLocaleString()}đ
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6200ee",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoValue: {
    fontWeight: "bold",
  },
  status: {
    color: "#ffa000",
  },
  item: {
    flexDirection: "row",
    marginBottom: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: "#ddd",
    marginRight: 10,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    marginTop: 5,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  finalTotal: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
    marginTop: 8,
  },
  finalTotalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default OrderDetailScreen;
