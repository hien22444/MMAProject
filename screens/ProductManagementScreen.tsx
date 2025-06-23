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
  Alert
} from 'react-native';

// Import dữ liệu mẫu
import { products } from '../data/products';
import { categories } from '../data/categories';

// Định nghĩa kiểu dữ liệu
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: number;
  rating: number;
  brand: string;
  colors: string[];
  sizes: string[];
  createdAt: string;
  isFeatured: boolean;
}

interface Category {
  id: string;
  name: string;
}

const ProductManagementScreen = () => {
  const [productList, setProductList] = useState<Product[]>(products);
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
  const filteredProducts = productList.filter(product => {
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
            const updatedProducts = productList.filter(p => p.id !== productId);
            setProductList(updatedProducts);
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
      const updatedProducts = productList.map(p => 
        p.id === currentProduct.id ? { ...currentProduct, ...formData } : p
      );
      setProductList(updatedProducts);
    } else {
      // Tạo sản phẩm mới
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
        rating: 0,
        createdAt: new Date().toISOString(),
        isFeatured: false
      } as Product;

      setProductList([...productList, newProduct]);
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
        <Text style={styles.productCategory}>Danh mục: {item.category}</Text>
        <Text style={styles.productStock}>Kho: {item.inStock} sản phẩm</Text>
      </View>
      
      <View style={styles.productActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => handleEditProduct(item)}
        >
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Text style={styles.buttonText}>Xóa</Text>
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
      <Text style={styles.heading}>Quản lý sản phẩm</Text>
      
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Tìm kiếm sản phẩm..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <Text style={styles.sectionTitle}>Danh mục</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
      
      <View style={styles.productListHeader}>
        <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddProduct}
        >
          <Text style={styles.addButtonText}>+ Thêm mới</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />

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
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    height: 44,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  categoryList: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  categoryItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  categoryItemSelected: {
    backgroundColor: '#E91E63',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  productListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  productList: {
    paddingBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    color: '#E91E63',
    fontWeight: '500',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productStock: {
    fontSize: 14,
    color: '#666',
  },
  productActions: {
    justifyContent: 'center',
    padding: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#555',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  pickerItem: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
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
});

export default ProductManagementScreen;
