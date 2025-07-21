import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Product } from "../types/product";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import CardProduct from "../components/product/CardProduct";
import Header from "../components/Header";
import { useProducts } from "../contexts/ProductContext";
import { useAuth } from "../contexts/AuthContext";

type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
};

const Homepage: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { products, getFeaturedProducts } = useProducts();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  // Debug logs
  console.log("Homepage - Total products:", products.length);
  console.log("Homepage - First few products:", products.slice(0, 3));

  // Get featured categories from products
  const getUniqueCategories = () => {
    const categories = [...new Set(products.map((p) => p.category))];
    return categories.slice(0, 6); // Take first 6 categories
  };

  const filterPrice = (price: number) => {
    if (priceFilter === "<300") return price < 300000;
    if (priceFilter === ">=300") return price >= 300000;
    return true;
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      filterPrice(product.price)
  );

  function formatSoldQuantity(quantity: number): string {
    if (quantity >= 1_000_000) {
      return `${(quantity / 1_000_000).toFixed(
        quantity >= 10_000_000 ? 0 : 1
      )}M+`;
    } else if (quantity >= 1_000) {
      return `${(quantity / 1_000).toFixed(quantity >= 10_000 ? 0 : 1)}K+`;
    } else {
      return quantity.toString();
    }
  }

  // Convert Product from context to old Product format for CardProduct
  const convertProduct = (product: any) => ({
    id: product.id,
    name: product.name,
    price: `${product.price.toLocaleString()}₫`,
    image: { uri: product.imageUrl },
    describe: product.description,
    sold: formatSoldQuantity(product.sold),
  });

  return (
    <View style={styles.container}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Login Banner for Guests */}
      {!currentUser && (
        <View style={styles.loginBanner}>
          <View style={styles.loginBannerContent}>
            <Text style={styles.loginBannerTitle}>Đăng nhập để mua hàng</Text>
            <Text style={styles.loginBannerSubtitle}>
              Truy cập đầy đủ tính năng và ưu đãi
            </Text>
            <View style={styles.loginBannerButtons}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.registerButtonText}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Featured Categories */}
      <View style={styles.categoryContainer}>
        <Text style={styles.filterTitle}>Danh mục nổi bật:</Text>
        <FlatList
          data={getUniqueCategories()}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const categoryProduct = products.find((p) => p.category === item);
            return (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() =>
                  setSelectedCategory(selectedCategory === item ? null : item)
                }
              >
                {categoryProduct && (
                  <Image
                    source={{ uri: categoryProduct.imageUrl }}
                    style={styles.categoryImage}
                  />
                )}
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Category Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Danh mục:</Text>
        <TouchableOpacity
          style={[
            styles.filterButton,
            !selectedCategory && styles.activeFilter,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text>Tất cả</Text>
        </TouchableOpacity>
        {getUniqueCategories()
          .slice(0, 3)
          .map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === category && styles.activeFilter,
              ]}
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
            >
              <Text>{category}</Text>
            </TouchableOpacity>
          ))}
      </View>

      {/* Price Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Giá:</Text>
        <TouchableOpacity
          style={[styles.filterButton, !priceFilter && styles.activeFilter]}
          onPress={() => setPriceFilter(null)}
        >
          <Text>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            priceFilter === "<300" && styles.activeFilter,
          ]}
          onPress={() => setPriceFilter(priceFilter === "<300" ? null : "<300")}
        >
          <Text>{"< 300K"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            priceFilter === ">=300" && styles.activeFilter,
          ]}
          onPress={() =>
            setPriceFilter(priceFilter === ">=300" ? null : ">=300")
          }
        >
          <Text>{">= 300K"}</Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <CardProduct product={convertProduct(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
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
    width: 80,
    height: 100,
  },

  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },

  categoryText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },

  filterTitle: {
    fontWeight: "bold",
    marginRight: 5,
  },

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

  activeFilter: {
    backgroundColor: "#90D7FF",
    borderColor: "#90D7FF",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },

  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  loginBanner: {
    backgroundColor: "#007bff",
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  loginBannerContent: {
    alignItems: "center",
  },
  loginBannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  loginBannerSubtitle: {
    fontSize: 14,
    color: "#e3f2fd",
    marginBottom: 15,
    textAlign: "center",
  },
  loginBannerButtons: {
    flexDirection: "row",
    gap: 10,
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  loginButtonText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Homepage;
