import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCart } from "../contexts/CartContext";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList, BottomTabParamList } from "../types/navigation";
import Checkbox from "expo-checkbox";

type CartScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, "Cart">,
  NativeStackNavigationProp<RootStackParamList>
>;

type CartScreenRouteProp = RouteProp<BottomTabParamList, "Cart">;

const CartScreen: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    coupon,
    setCoupon,
  } = useCart();
  const navigation = useNavigation<CartScreenNavigationProp>();
  const route = useRoute<CartScreenRouteProp>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (route.params?.selectedCoupon) {
      setCoupon(route.params.selectedCoupon);
      console.log("Coupon nhận được:", route.params.selectedCoupon);
    }
  }, [route.params?.selectedCoupon]);

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (!selectedItems.includes(item.id)) return total;
      const priceNumber = parseInt(item.price.replace(/\D/g, ""));
      return total + priceNumber * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm muốn mua!");
      return;
    }
    navigation.navigate("Payment", {
      totalAmount: calculateSubtotal() - Number(coupon),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Giỏ Hàng</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Checkbox
                value={selectedItems.includes(item.id)}
                onValueChange={() => toggleSelectItem(item.id)}
              />
              <Image source={item.image} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.variant}>
                  Phân loại: Nâu kéo chậm - 35cm
                </Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.discountedPrice}>{item.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.totalItemPrice}>
                  {(
                    parseInt(item.price.replace(/\D/g, "")) * item.quantity
                  ).toLocaleString()}
                  ₫
                </Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.deleteText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Tạm tính: {subtotal.toLocaleString()}₫
        </Text>
        {coupon ? (
          <Text style={styles.totalText}>
            Giảm giá {Number(coupon).toLocaleString()}₫
          </Text>
        ) : null}
        <Text style={styles.totalText}>
          Tổng: {(subtotal - Number(coupon)).toLocaleString()}₫
        </Text>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            { backgroundColor: "#007bff", marginTop: 10 },
          ]}
          onPress={() =>
            navigation.navigate("Coupon", {
              totalAmount: calculateSubtotal(),
            })
          }
        >
          <Text style={styles.checkoutButtonText}>Nhập Mã Giảm Giá</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 8, marginHorizontal: 8 },
  infoContainer: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  variant: { fontSize: 12, color: "#888", marginVertical: 2 },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 5,
  },
  discountedPrice: { fontSize: 14, color: "red", fontWeight: "bold" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: { fontSize: 16 },
  quantityText: { fontSize: 16 },
  rightContainer: { alignItems: "flex-end" },
  totalItemPrice: { fontSize: 14, color: "#333", fontWeight: "bold" },
  deleteText: { color: "red", fontSize: 12, marginTop: 5 },
  totalContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  totalText: { fontSize: 16, fontWeight: "bold" },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  checkoutButtonText: { color: "#fff", fontSize: 16 },
});

export default CartScreen;
