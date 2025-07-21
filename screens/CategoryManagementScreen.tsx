import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Alert,
} from "react-native";

// Import ProductContext
import { useProducts } from "../contexts/ProductContext";

// Định nghĩa kiểu dữ liệu
interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  productCount: number;
}

const CategoryManagementScreen = () => {
  const { products } = useProducts();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    description: "",
    imageUrl: "",
  });

  // Generate categories from products
  useEffect(() => {
    const categoryMap = new Map<string, { count: number; imageUrl: string }>();

    products.forEach((product) => {
      if (categoryMap.has(product.category)) {
        const existing = categoryMap.get(product.category)!;
        categoryMap.set(product.category, {
          count: existing.count + 1,
          imageUrl: existing.imageUrl,
        });
      } else {
        categoryMap.set(product.category, {
          count: 1,
          imageUrl: product.imageUrl,
        });
      }
    });

    const generatedCategories: Category[] = Array.from(
      categoryMap.entries()
    ).map(([name, data], index) => ({
      id: `cat-${index + 1}`,
      name,
      imageUrl: data.imageUrl,
      description: `Danh mục ${name} với ${data.count} sản phẩm`,
      productCount: data.count,
    }));

    setCategories(generatedCategories);
  }, [products]);

  // Xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Lọc danh mục theo từ khóa tìm kiếm
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Xử lý thêm danh mục mới
  const handleAddCategory = () => {
    setCurrentCategory(null);
    setFormData({
      name: "",
      description: "",
      imageUrl: "https://example.com/placeholder.jpg",
    });
    setModalVisible(true);
  };

  // Xử lý chỉnh sửa danh mục
  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
    });
    setModalVisible(true);
  };

  // Xử lý xóa danh mục
  const handleDeleteCategory = (categoryId: string) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa danh mục này? Tất cả sản phẩm trong danh mục này sẽ không còn danh mục.",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => {
            setCategories(categories.filter((c) => c.id !== categoryId));
          },
          style: "destructive",
        },
      ]
    );
  };

  // Xử lý lưu danh mục (thêm mới hoặc cập nhật)
  const handleSaveCategory = () => {
    if (!formData.name || !formData.description) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ tên và mô tả danh mục");
      return;
    }

    if (currentCategory) {
      // Cập nhật danh mục hiện có
      setCategories(
        categories.map((c) =>
          c.id === currentCategory.id
            ? {
                ...c,
                name: formData.name!,
                description: formData.description!,
                imageUrl: formData.imageUrl!,
              }
            : c
        )
      );
    } else {
      // Thêm danh mục mới
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name!,
        description: formData.description!,
        imageUrl: formData.imageUrl!,
        productCount: 0,
      };

      setCategories([...categories, newCategory]);
    }

    setModalVisible(false);
  };

  // Xử lý đổi giá trị form
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Render item trong danh sách danh mục
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />

      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.productCount}>{item.productCount} sản phẩm</Text>
      </View>

      <View style={styles.categoryActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditCategory(item)}
        >
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteCategory(item.id)}
        >
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quản lý danh mục</Text>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Tìm kiếm danh mục..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.actionHeader}>
        <Text style={styles.sectionTitle}>Danh sách danh mục</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
          <Text style={styles.addButtonText}>+ Thêm mới</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.categoriesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal thêm/sửa danh mục */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {currentCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Tên danh mục *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) => handleChange("name", text)}
                  placeholder="Nhập tên danh mục"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Mô tả *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={formData.description}
                  onChangeText={(text) => handleChange("description", text)}
                  placeholder="Nhập mô tả danh mục"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>URL hình ảnh</Text>
                <TextInput
                  style={styles.input}
                  value={formData.imageUrl}
                  onChangeText={(text) => handleChange("imageUrl", text)}
                  placeholder="Nhập URL hình ảnh danh mục"
                />
              </View>

              {/* Các nút điều khiển */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSaveCategory}
                >
                  <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    height: 44,
    fontSize: 16,
  },
  actionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#E91E63",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  categoriesList: {
    paddingBottom: 16,
  },
  categoryItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    padding: 12,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  categoryInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  productCount: {
    fontSize: 12,
    color: "#888",
  },
  categoryActions: {
    justifyContent: "center",
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 8,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#2196F3",
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginLeft: 12,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#E91E63",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
});

export default CategoryManagementScreen;
