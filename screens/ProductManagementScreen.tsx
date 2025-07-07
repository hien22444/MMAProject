import React, { useState } from 'react';
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
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import contexts
import { useProducts, Product } from '../contexts/ProductContext';
import { categories } from '../data/categories';

interface Category {
  id: string;
  name: string;
}

const ProductManagementScreen = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Form state cho sản phẩm mới hoặc chỉnh sửa
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    inStock: 0,
    brand: '',
    colors: [],
    sizes: []
  });

  // Xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  // Lọc sản phẩm theo tìm kiếm và danh mục
  const filteredProducts = products.filter((product: Product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // Xử lý thêm sản phẩm mới
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      imageUrl: 'https://example.com/placeholder.jpg',
      category: categories[0]?.name || '',
      inStock: 0,
      brand: '',
      colors: [],
      sizes: []
    });
    setModalVisible(true);
  };

  // Xử lý chỉnh sửa sản phẩm
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      inStock: product.inStock,
      brand: product.brand,
      colors: [...product.colors],
      sizes: [...product.sizes]
    });
    setModalVisible(true);
  };
  // Xử lý xóa sản phẩm
  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa sản phẩm này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Xóa', 
          onPress: () => {
            deleteProduct(productId);
          },
          style: 'destructive' 
        }
      ]
    );
  };
  // Xử lý lưu sản phẩm (thêm mới hoặc cập nhật)
  const handleSaveProduct = () => {
    // Kiểm tra dữ liệu
    if (!formData.name || !formData.description || !formData.category) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (Number(formData.price) <= 0) {
      Alert.alert('Lỗi', 'Giá sản phẩm phải lớn hơn 0');
      return;
    }

    if (currentProduct) {
      // Cập nhật sản phẩm hiện có
      const updatedProduct = { ...currentProduct, ...formData } as Product;
      updateProduct(updatedProduct);
    } else {
      // Tạo sản phẩm mới
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
        rating: 0,
        createdAt: new Date().toISOString(),
        isFeatured: false
      } as Product;

      addProduct(newProduct);
    }

    setModalVisible(false);
  };

  // Xử lý đổi giá trị form
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  // Xử lý đổi danh mục
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
  };

  // Render item trong danh sách sản phẩm
  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price.toLocaleString('vi-VN')} đ</Text>
        <View style={styles.productMetaRow}>
          <View style={styles.productMetaItem}>
            <Ionicons name="apps-outline" size={14} color="#666" />
            <Text style={styles.productCategory}>{item.category}</Text>
          </View>
          <View style={styles.productMetaItem}>
            <Ionicons name="cube-outline" size={14} color="#666" />
            <Text style={styles.productStock}>{item.inStock}</Text>
          </View>
        </View>
        {item.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      
      <View style={styles.productActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => handleEditProduct(item)}
        >
          <Ionicons name="create-outline" size={16} color="#fff" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Ionicons name="trash-outline" size={16} color="#fff" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render item trong danh sách danh mục
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem, 
        selectedCategory === item.name && styles.categoryItemSelected
      ]} 
      onPress={() => handleCategoryChange(item.name)}
    >
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.categoryTextSelected
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.heading}>Quản lý sản phẩm</Text>
        
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            placeholder="Tìm kiếm sản phẩm..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
  
        <Text style={styles.categoryTitle}>Danh mục</Text>
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        <View style={styles.sortContainer}>
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="arrow-up" size={16} color="#555" />
            <Text style={styles.sortText}>Giá tăng dần</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="arrow-down" size={16} color="#555" />
            <Text style={styles.sortText}>Giá giảm dần</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.productListHeader}>
          <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddProduct}
          >
            <Text style={styles.addButtonText}>+ Thêm mới</Text>
          </TouchableOpacity>
        </View>
  
        {filteredProducts.length > 0 ? (
          <View style={styles.productListContainer}>
            {filteredProducts.map((item) => (
              <View key={item.id}>
                {renderProductItem({item})}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={50} color="#ccc" />
            <Text style={styles.emptyStateText}>Không tìm thấy sản phẩm</Text>
          </View>
        )}
      </ScrollView>

      {/* Modal thêm/sửa sản phẩm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {currentProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </Text>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Tên sản phẩm *</Text>
                <TextInput 
                  style={styles.input} 
                  value={formData.name} 
                  onChangeText={(text) => handleChange('name', text)}
                  placeholder="Nhập tên sản phẩm"
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Mô tả *</Text>
                <TextInput 
                  style={[styles.input, styles.textArea]} 
                  value={formData.description} 
                  onChangeText={(text) => handleChange('description', text)}
                  placeholder="Nhập mô tả sản phẩm"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
              
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Giá *</Text>
                  <TextInput 
                    style={styles.input} 
                    value={formData.price?.toString()} 
                    onChangeText={(text) => handleChange('price', parseInt(text) || 0)}
                    placeholder="Nhập giá"
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Số lượng *</Text>
                  <TextInput 
                    style={styles.input} 
                    value={formData.inStock?.toString()} 
                    onChangeText={(text) => handleChange('inStock', parseInt(text) || 0)}
                    placeholder="Số lượng"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Danh mục *</Text>
                <View style={styles.pickerContainer}>
                  <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.pickerItem,
                          formData.category === item.name && styles.pickerItemSelected
                        ]}
                        onPress={() => handleChange('category', item.name)}
                      >
                        <Text style={[
                          styles.pickerItemText,
                          formData.category === item.name && styles.pickerItemTextSelected
                        ]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Thương hiệu</Text>
                <TextInput 
                  style={styles.input} 
                  value={formData.brand} 
                  onChangeText={(text) => handleChange('brand', text)}
                  placeholder="Nhập tên thương hiệu"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>URL hình ảnh</Text>
                <TextInput 
                  style={styles.input} 
                  value={formData.imageUrl} 
                  onChangeText={(text) => handleChange('imageUrl', text)}
                  placeholder="Nhập URL hình ảnh"
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
                  onPress={handleSaveProduct}
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
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 80, // Add padding at bottom for better scroll experience
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },  
  categoriesList: {
    flexDirection: 'row',
  },
  categoryItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
  },
  categoryItemSelected: {
    backgroundColor: '#E91E63',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  sortContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  sortText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  productList: {
    flex: 1,
  },
  productListContainer: {
    marginBottom: 16,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 12,
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 6,
  },
  productMetaRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  productMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  productCategory: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  productStock: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  featuredBadge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  productActions: {
    padding: 10,
    justifyContent: 'center',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  addButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 16,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  pickerOptions: {
    maxHeight: 200,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerItemSelected: {
    backgroundColor: '#E91E63',
  },
  pickerItemText: {
    color: '#333',
  },
  pickerItemTextSelected: {
    color: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#E91E63',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  productListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});

export default ProductManagementScreen;
