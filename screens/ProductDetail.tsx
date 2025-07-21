import React, { use, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Product as ContextProduct } from "../contexts/ProductContext";
import DetailProduct from "../components/product/DetailProduct";
import ReviewList from "../components/Review/ReviewList";
import { RootStackParamList } from "../types/navigation";
import { useProducts } from "../contexts/ProductContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useReviews } from "../contexts/ReviewContext";

type ProductDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductDetail"
>;

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const { productId } = route.params;

  const [originProduct, setOriginProduct] = useState<
    ContextProduct | undefined | null
  >(null);

  const { getProductById } = useProducts();
  const { reviews } = useReviews();

  useEffect(() => {
    const fetchOriginProduct = async () => {
      const data = await getProductById(productId);
      setOriginProduct(data);
    };
    fetchOriginProduct();
  }, []);

  if (!originProduct) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DetailProduct product={originProduct} />
      <ReviewList
        reviews={reviews
          .filter((r) => r.productId === productId)
          .reverse()
          .splice(0, 2)}
        productId={productId}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 30,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
export default ProductDetail;
