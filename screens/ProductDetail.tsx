import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Product } from '../types/product';
import DetailProduct from '../components/product/DetailProduct';
import ReviewList from '../components/Review/ReviewList';

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { product: Product } }, 'ProductDetail'>;

const reviews = [
  {
    id: '1',
    avatar: '',
    fullname: 'Nguyễn Sỹ Đức',
    email: 'ducns@gmail.com',
    createdAt: '2023-06-22',
    numStar: 4,
    maxStar: 5,
    content: 'Sản phẩm rất tốt, giao hàng nhanh chóng.',
  },
  {
    id: '2',
    avatar: '',
    fullname: 'Trần Văn B',
    email: 'tranb@gmail.com',
    createdAt: '2023-06-20',
    numStar: 5,
    maxStar: 5,
    content: 'Chất lượng tuyệt vời, sẽ ủng hộ tiếp.',
  },
  {
    id: '3',
    avatar: '',
    fullname: 'Trần Văn B',
    email: 'tranb@gmail.com',
    createdAt: '2023-06-20',
    numStar: 5,
    maxStar: 5,
    content: 'Chất lượng tuyệt vời, sẽ ủng hộ tiếp.',
  },
  {
    id: '4',
    avatar: '',
    fullname: 'Trần Văn B',
    email: 'tranb@gmail.com',
    createdAt: '2023-06-20',
    numStar: 5,
    maxStar: 5,
    content: 'Chất lượng tuyệt vời, sẽ ủng hộ tiếp.',
  },
  {
    id: '5',
    avatar: '',
    fullname: 'Trần Văn B',
    email: 'tranb@gmail.com',
    createdAt: '2023-06-20',
    numStar: 5,
    maxStar: 5,
    content: 'Chất lượng tuyệt vời, sẽ ủng hộ tiếp.',
  },
];

const ProductDetail: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DetailProduct />
      <ReviewList reviews={reviews} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
export default ProductDetail;
