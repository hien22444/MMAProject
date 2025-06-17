import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const DATA = [
  { id: '1', name: 'Áo hoodie nam', price: '299.000₫', image: 'https://i.imgur.com/HO1Q8M2.png', category: 'Ao' },
  { id: '2', name: 'Quần jean nữ', price: '349.000₫', image: 'https://i.imgur.com/HY1cFhb.png', category: 'Quan' },
  { id: '3', name: 'Giày sneaker', price: '499.000₫', image: 'https://i.imgur.com/O6FvD1Z.png', category: 'Giay' },
  { id: '4', name: 'Áo sơ mi trắng', price: '259.000₫', image: 'https://i.imgur.com/wYQc1xE.png', category: 'Ao' },
];

type Product = typeof DATA[0];

const ProductItem = ({ item }: { item: Product }) => (
  <View style={styles.item}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={{ flex: 1 }}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
    <TouchableOpacity>
      <Text style={styles.remove}>🗑</Text>
    </TouchableOpacity>
  </View>
);

const FilteredList = ({ category }: { category: string }) => {
  const filtered = category === 'TatCa' ? DATA : DATA.filter(p => p.category === category);
  return (
    <FlatList
      data={filtered}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ProductItem item={item} />}
    />
  );
};

export default function WishlistScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'TatCa', title: 'Tất cả' },
    { key: 'Ao', title: 'Áo' },
    { key: 'Quan', title: 'Quần' },
    { key: 'Giay', title: 'Giày' },
  ]);

  const renderScene = SceneMap({
    TatCa: () => <FilteredList category="TatCa" />,
    Ao: () => <FilteredList category="Ao" />,
    Quan: () => <FilteredList category="Quan" />,
    Giay: () => <FilteredList category="Giay" />,
  });

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <Text style={styles.header}>❤️ Danh sách yêu thích</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#000' }}
            style={{ backgroundColor: '#fff' }}
            activeColor="#000"
            inactiveColor="#888"
            scrollEnabled
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    color: '#888',
    marginTop: 4,
  },
  remove: {
    fontSize: 20,
    color: '#888',
  },
});
