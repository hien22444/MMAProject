import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Product } from "../types/product";
import DetailProduct from "../components/product/DetailProduct";
import ReviewList from "../components/Review/ReviewList";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const reviews = [
  {
    id: "1",
    avatar: "",
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 4,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: "2",
    avatar: "",
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 1,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: "3",
    avatar: "",
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 5,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: "4",
    avatar: "",
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 2,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  {
    id: "5",
    avatar: "",
    fullname: "Nguyễn Sỹ Đức",
    email: "ducns@gmail.com",
    createdAt: "2025-10-23",
    numStar: 3,
    maxStar: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
];

type ProductDetailRouteProp = RouteProp<
  { ProductDetail: { product: Product } },
  "ProductDetail"
>;

type ReviewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Review"
>;

const ProductDetail: React.FC = () => {
  const navigation = useNavigation<ReviewScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DetailProduct />
      <ReviewList reviews={reviews.slice(0, 2)} />
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
          android_ripple={{ color: "#FF6F61" }}
          onPress={() => {
            navigation.navigate("Review");
          }}
        >
          <Text style={{ color: "#FF6F61" }}>Xem thêm đánh giá &gt;&gt;</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 30,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
export default ProductDetail;
