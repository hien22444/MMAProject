import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { product: Product } }, 'ProductDetail'>;

const ProductDetail: React.FC = () => {
  const { params } = useRoute<ProductDetailRouteProp>();
  const { product } = params;
  const { addToCart } = useCart();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.image} style={styles.image} />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>

      {/* Mô tả chi tiết */}
      <Text style={styles.describe}>{product.describe}</Text>

      {/* Đã bán */}
      <Text style={styles.sold}>Đã bán: {product.sold}</Text>

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
    marginBottom: 10,
    textAlign: 'center',
  },
  sold: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
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
