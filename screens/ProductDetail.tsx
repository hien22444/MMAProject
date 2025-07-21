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

import reviews from "../data/reviews";

type ProductDetailRouteProp = RouteProp<
  { ProductDetail: { product: Product } },
  "ProductDetail"
>;

type ReviewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Review"
>;

const ProductDetail: React.FC<{
  route: ProductDetailRouteProp;
}> = ({ route }) => {
  const navigation = useNavigation<ReviewScreenNavigationProp>();
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DetailProduct product={product} />
      <ReviewList
        reviews={reviews.filter((r) => r.productId === "1").slice(0, 2)}
      />
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
            navigation.navigate("Review", {
              productId: "sample-product",
              productName: "Sản phẩm mẫu",
            });
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
