  import React, { useState } from "react";
  import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
  import { Product } from "../types/product";
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import { useNavigation } from "@react-navigation/native";
  import CardProduct from "../components/product/CardProduct";
  import Header from "../components/Header";

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
      price: '200,000₫',
      image: aoThun,
      describe:'áo thun đẹp',
      sold:'30,0K'
    },
    {
      id: '2',
      name: 'Quần Jeans',
      price: '450,000₫',
      image: quanJean,
      describe:'áo thun đẹp',
      sold:'30,0K'
    },
    {
      id: '3',
      name: 'Váy Nữ',
      price: '350,000₫',
      image: vay,
      describe:'áo thun đẹp',
      sold:'30,0K'
    },
    {
      id: '4',
      name: 'Vest Nam',
      price: '650,000₫',
      image: vest,
      describe:'áo thun đẹp',
      sold:'30,0K'
    },
    {
      id: '5',
      name: 'Áo Sơ Mi',
      price: '300,000₫',
      image: soMi,
      describe:'áo thun đẹp',
      sold:'30,0K'
    },
    {
      id: '6',
      name: 'Áo Thun Trắng',
      price: '200,000₫',
      image: aoThunTrang,
      describe:'áo thun đẹp',
      sold:'30,0K'
    },
  ];

  const featuredCategories = [
    { id: '1', label: '👗 Váy', value: 'Váy Nữ', image: vay },
    { id: '2', label: '🤵 Vest', value: 'Vest Nam',image:vest },
    { id: '3', label: '👔 Sơ Mi', value: 'Áo Sơ Mi',image: soMi },
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
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* Danh mục */}
        <View style={styles.categoryContainer}>
    <Text style={styles.filterTitle}>Các sản phẩm nổi bật:</Text>
    <FlatList
      data={featuredCategories}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => setSelectedBrand(item.value)}
        >
          <Image source={item.image} style={styles.categoryImage} />
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
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
    numColumns={2}
    columnWrapperStyle={{ justifyContent: 'space-between' }}
    contentContainerStyle={{ paddingBottom: 20 }}
    renderItem={({ item }) => (
      <CardProduct product={item}/>
    )}
  />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },

    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#90D7FF',
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
    marginBottom: 10,
  },

  categoryItem: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    width: 80,  // Kích thước cố định cho item
    height: 100, // Để ảnh + text nằm gọn trong
  },

  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // bo tròn hình ảnh
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 5,
    padding: 8,
    borderRadius: 10,
    elevation: 3,
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },

  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'orange',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },

  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },

  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 2,
  },

  productPrice: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },

  productDescribe: {
    fontSize: 12,
    color: '#555',
  },

  productSold: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
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


    profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  });

  export default Homepage;
