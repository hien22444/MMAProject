import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Product } from "../types/product";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

import aoThun from '../assets/ao_thun.jpg';
import aoThunTrang from '../assets/ao_thun_trang.jpg';
import quanJean from '../assets/quan_jean.jpg';
import vay from '../assets/vay.jpg';
import vest from '../assets/vest.jpg';
import soMi from '../assets/somi.jpg';

type RootStackParamList = {
  Home: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Profile: undefined;
};

const products: Product[] = [
  {
    id: '1',
    name: 'Áo Thun',
    price: 'Từ 200,000₫',
    image: aoThun,
    variants: [
      { id: 'v1', name: 'Áo Thun Trắng', price: '200,000₫', image: aoThunTrang },
      { id: 'v2', name: 'Áo Thun Đen', price: '210,000₫', image: aoThun },
    ]
  },
  {
    id: '2',
    name: 'Quần Jeans',
    price: '450,000₫',
    image: quanJean,
  },
  {
    id: '3',
    name: 'Váy Nữ',
    price: '350,000₫',
    image: vay,
  },
  {
    id: '4',
    name: 'Vest Nam',
    price: '650,000₫',
    image: vest,
  },
  {
    id: '5',
    name: 'Áo Sơ Mi',
    price: '300,000₫',
    image: soMi,
  },
];

const Homepage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  const filterPrice = (priceStr: string) => {
    const priceNumber = parseInt(priceStr.replace(/\D/g, ''));
    if (priceFilter === '<300') return priceNumber < 300000;
    if (priceFilter === '>=300') return priceNumber >= 300000;
    return true;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedBrand ? product.name === selectedBrand : true) &&
    filterPrice(product.price)
  );

  const numColumns = 2;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
  <Image source={require('../assets/logo.png')} style={styles.logo} />
  <TextInput
    style={styles.searchInput}
    placeholder="🔍 Tìm kiếm sản phẩm..."
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
  {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
    <Image source={require('../assets/logo.png')} style={styles.profileIcon} />
  </TouchableOpacity> */}
</View>


      {/* Banner */}
      {/* <View style={styles.bannerContainer}>
        <Image source={require('../assets/banner.jpg')} style={styles.bannerImage} />
      </View> */}

      {/* Danh mục */}
      <View style={styles.categoryContainer}>
        <Text style={styles.filterTitle}>Các sản phẩm nổi bật:</Text>
        <TouchableOpacity style={styles.categoryItem} onPress={() => setSelectedBrand('Váy Nữ')}>
          <Text>👗 Váy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => setSelectedBrand('Vest Nam')}>
          <Text>🤵 Vest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => setSelectedBrand('Áo Sơ Mi')}>
          <Text>👔 Sơ Mi</Text>
        </TouchableOpacity>
      </View>

      {/* Bộ lọc Type */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Type:</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedBrand(null)}>
          <Text>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedBrand('Áo Thun')}>
          <Text>Áo Thun</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedBrand('Quần Jeans')}>
          <Text>Quần Jeans</Text>
        </TouchableOpacity>
      </View>

      {/* Bộ lọc Giá */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Giá:</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setPriceFilter(null)}>
          <Text>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setPriceFilter('<300')}>
          <Text>{'< 300K'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setPriceFilter('>=300')}>
          <Text>{'>= 300K'}</Text>
        </TouchableOpacity>
      </View>

      {/* Giỏ hàng */}
      {/* <View style={styles.functionsContainer}>
        <TouchableOpacity style={styles.functionButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.functionIcon}>🛒</Text>
        </TouchableOpacity>
      </View> */}

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            style={styles.card}
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        numColumns={numColumns}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    elevation: 3,
    marginBottom: 10,
  },
  logo: { width: 50, height: 50, marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 35,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },

  bannerContainer: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },

  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  filterTitle: { fontWeight: 'bold', marginRight: 5 },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 3,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  functionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  functionButton: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  functionIcon: { fontSize: 24 },

  card: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  productImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  productName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  productPrice: { fontSize: 12, color: '#888', marginTop: 5 },
  profileIcon: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginLeft: 8,
},
});

export default Homepage;
