import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { product: Product } }, 'ProductDetail'>;

const DetailProduct: React.FC = () => {
  const { params } = useRoute<ProductDetailRouteProp>();
  const { product } = params;
  const { addToCart } = useCart();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.sold}>Đã bán: {product.sold}</Text>
      </View>
      <Text style={styles.describe}>{product.describe}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(product)}
        >
          <Text style={styles.addToCartText}>Thêm Vào Giỏ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => alert('Chức năng mua ngay chưa triển khai')}
        >
          <Text style={styles.buyNowText}>Mua Ngay</Text>
        </TouchableOpacity>
        </View>
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
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 22,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sold: {
    fontSize: 14,
    color: '#888',
  },
  favorite: {
    fontSize: 14,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  voucherRow: {
    width: '100%',
    backgroundColor: '#FFF5F0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  voucher: {
    fontSize: 14,
    color: '#FF6F61',
    marginBottom: 5,
  },
  shipping: {
    fontSize: 14,
    color: '#4CAF50',
  },
  describe: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6F61',
    paddingVertical: 10,
    marginRight: 5,
    borderRadius: 25,
    alignItems: 'center',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    marginLeft: 5,
    borderRadius: 25,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container1: {
    flex: 1,
    backgroundColor: "green",
  },
  innerContainer: {
    flex: 1,
    maxHeight: 700,
    backgroundColor: "#fff",
    padding: 10,
    gap: 5,
  },
});

export default DetailProduct;
