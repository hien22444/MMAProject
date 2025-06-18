import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Support: undefined;
  OrderDetail: undefined;
  Review: undefined;
  Payment: undefined;
  Coupon: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Support"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ứng dụng Đơn giản</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Support")}
      >
        <Text style={styles.buttonText}>Hỗ trợ khách hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("OrderDetail")}
      >
        <Text style={styles.buttonText}>Chi tiết đơn hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Review")}
      >
        <Text style={styles.buttonText}>Đánh giá sản phẩm</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text style={styles.buttonText}>Quản lý thanh toán</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Coupon")}
      >
        <Text style={styles.buttonText}>Mã giảm giá</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#6200ee",
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
