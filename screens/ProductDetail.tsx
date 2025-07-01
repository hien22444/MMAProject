import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Product } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { product: Product } }, 'ProductDetail'>;

const ProductDetail: React.FC = () => {
  const { params } = useRoute<ProductDetailRouteProp>();
  const { product } = params;
  const { addToCart } = useCart();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price.toLocaleString('vi-VN')}₫</Text>

      {/* Mô tả chi tiết */}
      <Text style={styles.describe}>{product.description}</Text>

      {/* Thông tin thêm */}
      <Text style={styles.category}>Danh mục: {product.category}</Text>
      <Text style={styles.brand}>Thương hiệu: {product.brand}</Text>
      <Text style={styles.inStock}>Còn lại: {product.inStock} sản phẩm</Text>
      <Text style={styles.rating}>Đánh giá: {product.rating} ⭐</Text>

      {/* Màu sắc */}
      {product.colors && product.colors.length > 0 && (
        <View style={styles.colorsContainer}>
          <Text style={styles.label}>Màu sắc:</Text>
          <Text style={styles.colors}>{product.colors.join(', ')}</Text>
        </View>
      )}

      {/* Kích thước */}
      {product.sizes && product.sizes.length > 0 && (
        <View style={styles.sizesContainer}>
          <Text style={styles.label}>Kích thước:</Text>
          <Text style={styles.sizes}>{product.sizes.join(', ')}</Text>
        </View>
      )}

      {/* Nút thêm vào giỏ */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  describe: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  inStock: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  colorsContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  sizesContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  colors: {
    fontSize: 14,
    color: '#555',
  },
  sizes: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#ff6f61',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetail;
