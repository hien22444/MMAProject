import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

// Import contexts
import { useProducts, Product } from "../contexts/ProductContext";
import { useAuth } from "../contexts/AuthContext";
import { categories } from "../data/categories";

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  productCount: number;
}

const ProductListScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // Xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Xử lý lọc theo danh mục
  const handleCategoryFilter = (categoryName: string) => {
    setSelectedCategory(
      selectedCategory === categoryName ? null : categoryName
    );
  };

  // Xử lý sắp xếp
  const handleSort = (option: string) => {
    setSortOption(sortOption === option ? null : option);
  };
  // Access products from context
  const { products } = useProducts();

  // Lọc và sắp xếp sản phẩm
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Lọc theo tìm kiếm
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Lọc theo danh mục
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sắp xếp
    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  // Render item trong danh sách sản phẩm
  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item.id })
      }
    >
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>-20%</Text>
      </View>

      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text numberOfLines={2} style={styles.productName}>
          {item.name}
        </Text>

        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Text
              key={star}
              style={[
                styles.starIcon,
                star <= Math.round(item.rating)
                  ? styles.starFilled
                  : styles.starEmpty,
              ]}
            >
              ★
            </Text>
          ))}
          <Text style={styles.ratingText}>({item.rating})</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            {item.price.toLocaleString("vi-VN")} đ
          </Text>
          <Text style={styles.originalPrice}>
            {(item.price * 1.2).toLocaleString("vi-VN")} đ
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render item trong danh sách danh mục
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && styles.selectedCategoryItem,
      ]}
      onPress={() => handleCategoryFilter(item.name)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      <Text
        style={[
          styles.categoryName,
          selectedCategory === item.name && styles.selectedCategoryName,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const filteredProducts = getFilteredProducts();

  return (
    <View style={styles.container}>
      {/* Header với thanh tìm kiếm */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.menuButtonText}>Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Menu Điều hướng */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Điều hướng ứng dụng</Text>

            {/* Menu items for all users */}
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() => {
                navigation.navigate("ProductList");
                setMenuVisible(false);
              }}
            >
              <Text style={styles.navigationButtonText}>
                Danh sách sản phẩm
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() => {
                navigation.navigate("Search");
                setMenuVisible(false);
              }}
            >
              <Text style={styles.navigationButtonText}>Tìm kiếm</Text>
            </TouchableOpacity>

            {/* Menu items only for logged in users */}
            {currentUser && (
              <>
                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => {
                    navigation.navigate("Address");
                    setMenuVisible(false);
                  }}
                >
                  <Text style={styles.navigationButtonText}>
                    Quản lý địa chỉ
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => {
                    navigation.navigate("Notification");
                    setMenuVisible(false);
                  }}
                >
                  <Text style={styles.navigationButtonText}>Thông báo</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Admin-only menu items */}
            {currentUser?.role === "admin" && (
              <>
                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => {
                    navigation.navigate("ProductManagement");
                    setMenuVisible(false);
                  }}
                >
                  <Text style={styles.navigationButtonText}>
                    Quản lý sản phẩm
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => {
                    navigation.navigate("OrderManagement");
                    setMenuVisible(false);
                  }}
                >
                  <Text style={styles.navigationButtonText}>
                    Quản lý đơn hàng
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => {
                    navigation.navigate("CategoryManagement");
                    setMenuVisible(false);
                  }}
                >
                  <Text style={styles.navigationButtonText}>
                    Quản lý danh mục
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => {
                    navigation.navigate("Analytics");
                    setMenuVisible(false);
                  }}
                >
                  <Text style={styles.navigationButtonText}>Thống kê</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={[styles.navigationButton, styles.closeButton]}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Danh sách danh mục */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Bộ lọc */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortOption === "newest" && styles.activeFilterButton,
            ]}
            onPress={() => handleSort("newest")}
          >
            <Text
              style={[
                styles.filterText,
                sortOption === "newest" && styles.activeFilterText,
              ]}
            >
              Mới nhất
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              sortOption === "rating" && styles.activeFilterButton,
            ]}
            onPress={() => handleSort("rating")}
          >
            <Text
              style={[
                styles.filterText,
                sortOption === "rating" && styles.activeFilterText,
              ]}
            >
              Đánh giá cao
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              sortOption === "price-asc" && styles.activeFilterButton,
            ]}
            onPress={() => handleSort("price-asc")}
          >
            <Text
              style={[
                styles.filterText,
                sortOption === "price-asc" && styles.activeFilterText,
              ]}
            >
              Giá thấp → cao
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              sortOption === "price-desc" && styles.activeFilterButton,
            ]}
            onPress={() => handleSort("price-desc")}
          >
            <Text
              style={[
                styles.filterText,
                sortOption === "price-desc" && styles.activeFilterText,
              ]}
            >
              Giá cao → thấp
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Danh sách sản phẩm */}
      <View style={styles.productListContainer}>
        <View style={styles.productListHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? selectedCategory : "Tất cả sản phẩm"}
          </Text>
          <Text style={styles.resultCount}>
            {filteredProducts.length} kết quả
          </Text>
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  categoriesSection: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  categoriesList: {
    paddingTop: 16,
  },
  categoryItem: {
    marginRight: 16,
    alignItems: "center",
    width: 80,
  },
  selectedCategoryItem: {
    backgroundColor: "rgba(233, 30, 99, 0.1)",
    borderRadius: 8,
    paddingVertical: 4,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  selectedCategoryName: {
    color: "#E91E63",
    fontWeight: "600",
  },
  filterBar: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: "#E91E63",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "500",
  },
  productListContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  productListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  resultCount: {
    fontSize: 14,
    color: "#666",
  },
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#E91E63",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
  },
  productInfo: {
    padding: 12,
  },
  productCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    height: 40,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 2,
  },
  starFilled: {
    color: "#FFC107",
  },
  starEmpty: {
    color: "#E0E0E0",
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E91E63",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  menuButton: {
    marginLeft: 12,
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  menuButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  navigationButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 10,
  },
  navigationButtonText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default ProductListScreen;
