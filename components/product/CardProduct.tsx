import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Product } from "../../types/product";
import {
  Product as ContextProduct,
  useProducts,
} from "../../contexts/ProductContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";

type Prop = {
  product: Product;
};
const CardProduct: React.FC<Prop> = ({ product }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Convert to ContextProduct for navigation
  const convertToContextProduct = (oldProduct: Product): ContextProduct => {
    // Handle image conversion
    let imageUrl = "";
    if (typeof oldProduct.image === "string") {
      imageUrl = oldProduct.image;
    } else if (
      oldProduct.image &&
      typeof oldProduct.image === "object" &&
      "uri" in oldProduct.image
    ) {
      imageUrl = (oldProduct.image as any).uri || "";
    } else {
      imageUrl = "https://via.placeholder.com/300x300";
    }

    return {
      id: oldProduct.id,
      name: oldProduct.name,
      description: oldProduct.describe,
      price: parseInt(oldProduct.price.replace(/\D/g, "")),
      imageUrl: imageUrl,
      category: "Chưa phân loại",
      inStock: 50,
      sold: parseInt(oldProduct.sold.replace(/\D/g, "")),
      rating: 4.5,
      brand: "Local Brand",
      colors: ["Đa dạng"],
      sizes: ["S", "M", "L"],
      createdAt: new Date().toISOString(),
      isFeatured: false,
    };
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetail", {
          productId: product.id,
        })
      }
      style={styles.card}
    >
      <Image source={product.image} style={styles.productImage} />

      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescribe} numberOfLines={1}>
        {product.describe}
      </Text>
      <Text style={styles.productSold}>{product.sold} đã bán</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#90D7FF",
    borderRadius: 10,
    padding: 8,
    elevation: 3,
    marginBottom: 10,
  },
  logo: { width: 50, height: 50, marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 35,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },

  bannerContainer: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  categoryContainer: {
    marginBottom: 10,
  },

  categoryItem: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    width: 80, // Kích thước cố định cho item
    height: 100, // Để ảnh + text nằm gọn trong
  },

  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // bo tròn hình ảnh
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    margin: 5,
    padding: 8,
    borderRadius: 10,
    elevation: 3,
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },

  badgeContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "orange",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },

  badgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },

  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 2,
  },

  productPrice: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },

  productDescribe: {
    fontSize: 12,
    color: "#555",
  },

  productSold: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  filterTitle: { fontWeight: "bold", marginRight: 5 },
  filterButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 3,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  functionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  functionButton: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  functionIcon: { fontSize: 24 },

  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
});

export default CardProduct;
