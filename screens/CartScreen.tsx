import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCart } from "../contexts/CartContext";
import { Product } from "../types/product";
import {
  useNavigation,
  useRoute,
  CompositeNavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList, BottomTabParamList } from "../types/navigation";

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
      const priceNumber = parseInt(item.price.replace(/\D/g, ""));
      return total + priceNumber * item.quantity;
    }, 0);
  };

  // const calculateDiscount = (subtotal: number) => {
  //   if (coupon === "SALE10" && subtotal >= 500000) {
  //     return subtotal * 0.1;
  //   } else if (coupon === "FREESHIP") {
  //     return 30000;
  //   }
  //   return 0;
  // };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // const discount = calculateDiscount(subtotal);
    return subtotal - Number(coupon);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống. Vui lòng thêm sản phẩm!");
      return;
    }
    navigation.navigate("Payment", { totalAmount: total });
  };

  const subtotal = calculateSubtotal();
  // const discount = calculateDiscount(subtotal);
  const total = calculateTotal();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Giỏ Hàng</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}</Text>

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

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
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
              Tổng: {total.toLocaleString()}₫
            </Text>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
            </TouchableOpacity>

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
          </View>
        </>
      )}
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  infoContainer: { flex: 1, marginLeft: 10, justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  price: { fontSize: 14, color: "#888", marginVertical: 5 },

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
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  removeButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  removeButtonText: { color: "#fff", fontSize: 14 },

  totalContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 2,
  },

  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
