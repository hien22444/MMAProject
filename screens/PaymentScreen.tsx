import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useCart } from "../contexts/CartContext";

type PaymentScreenRouteProp = RouteProp<RootStackParamList, "Payment">;
type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type MaterialIconName =
  | "local-shipping"
  | "payment"
  | "account-balance"
  | "credit-card";

const paymentMethods: { id: string; name: string; icon: MaterialIconName }[] = [
  { id: "cod", name: "Thanh toán khi nhận hàng", icon: "local-shipping" },
  { id: "momo", name: "Ví điện tử MoMo", icon: "payment" },
  { id: "bank", name: "Chuyển khoản ngân hàng", icon: "account-balance" },
  { id: "card", name: "Thẻ tín dụng/Ghi nợ", icon: "credit-card" },
];

const savedCards = [
  { id: "1", last4: "4242", type: "visa", isDefault: true },
  { id: "2", last4: "5555", type: "mastercard", isDefault: false },
];

const PaymentScreen = () => {
  const route = useRoute<PaymentScreenRouteProp>();
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const totalAmount = route.params.totalAmount; // Nhận từ CartScreen
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const { clearCart, removeCoupon } = useCart();
  const shippingFee = 30000;
  const finalTotal = totalAmount + shippingFee;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Phương thức thanh toán</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chọn phương thức</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodItem,
              selectedMethod === method.id && styles.selectedMethod,
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <Icon
              name={method.icon}
              size={24}
              color="#6200ee"
              style={styles.methodIcon}
            />
            <Text style={styles.methodName}>{method.name}</Text>
            <View style={styles.radio}>
              {selectedMethod === method.id && (
                <View style={styles.radioSelected} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMethod === "card" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thẻ đã lưu</Text>
          {savedCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.cardItem, card.isDefault && styles.defaultCard]}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>
                  {card.type === "visa" ? "VISA" : "MC"}
                </Text>
              </View>
              <Text style={styles.cardNumber}>•••• •••• •••• {card.last4}</Text>
              {card.isDefault && (
                <Text style={styles.defaultBadge}>Mặc định</Text>
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.addCardButton}
            // onPress={() => navigation.navigate("AddCard")}
          >
            <Icon name="add" size={24} color="#6200ee" />
            <Text style={styles.addCardText}>Thêm thẻ mới</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text>Tạm tính:</Text>
          <Text>{totalAmount.toLocaleString()}đ</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Phí vận chuyển:</Text>
          <Text>{shippingFee.toLocaleString()}đ</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>Tổng cộng:</Text>
          <Text style={styles.totalText}>{finalTotal.toLocaleString()}đ</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => {
          clearCart();
          removeCoupon();
          navigation.navigate("Tab", { screen: "Home" });
        }}
      >
        <Text style={styles.paymentButtonText}>Hoàn tất thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6200ee",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#6200ee",
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedMethod: {
    backgroundColor: "#f3e5ff",
  },
  methodIcon: {
    marginRight: 15,
  },
  methodName: {
    flex: 1,
    fontSize: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6200ee",
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
  },
  defaultCard: {
    borderColor: "#6200ee",
    backgroundColor: "#f3e5ff",
  },
  cardIcon: {
    width: 40,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 3,
    marginRight: 10,
  },
  cardIconText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  cardNumber: {
    flex: 1,
    fontWeight: "bold",
  },
  defaultBadge: {
    color: "#6200ee",
    fontSize: 12,
    fontWeight: "bold",
  },
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 5,
  },
  addCardText: {
    marginLeft: 10,
    color: "#6200ee",
    fontWeight: "bold",
  },
  summary: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
    marginTop: 8,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  paymentButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  paymentButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PaymentScreen;
