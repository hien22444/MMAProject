import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Product, ProductVariant } from '../types/product';
import { useCart } from '../contexts/CartContext';

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { product: Product } }, 'ProductDetail'>;

const ProductDetail: React.FC = () => {
  const { params } = useRoute<ProductDetailRouteProp>();
  const { product } = params;
  const { addToCart } = useCart();

  const renderVariant = ({ item }: { item: ProductVariant }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => addToCart(item)}
      >
        <Text style={styles.buttonText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{product.name}</Text>
      {product.variants ? (
        <FlatList
          data={product.variants}
          keyExtractor={(item) => item.id}
          renderItem={renderVariant}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={styles.noVariantText}>Không có sản phẩm này.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f9f9f9' },
  header: { fontSize: 26, textAlign: 'center', marginVertical: 15, fontWeight: 'bold', color: '#333' },
  noVariantText: { textAlign: 'center', marginTop: 20, color: '#888', fontSize: 16 },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: { width: 150, height: 150, borderRadius: 10, marginBottom: 10 },
  productName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  productPrice: { fontSize: 16, color: '#888', marginVertical: 5 },
  
  button: {
    backgroundColor: '#ff6f61',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default ProductDetail;
