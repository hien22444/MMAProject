import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import ProductContext thay vì data trực tiếp
import { useProducts, Product } from '../contexts/ProductContext';
import { RootStackParamList } from '../types/navigation';

// Dữ liệu mẫu tìm kiếm gần đây
const recentSearches = [
  'Áo thun unisex',
  'Quần jean nam',
  'Váy dự tiệc',
  'Giày thể thao',
  'Áo khoác denim'
];

// Dữ liệu mẫu từ khóa phổ biến
const popularKeywords = [
  'Áo phông',
  'Quần short',
  'Áo sơ mi',
  'Đầm maxi',
  'Túi xách',
  'Giày cao gót',
  'Phụ kiện thời trang',
  'Đồng hồ'
];

const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearchList, setRecentSearchList] = useState<string[]>(recentSearches);
  
  // Get products from context
  const { products } = useProducts();

  // Xử lý tìm kiếm
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.length > 0) {
      setIsSearching(true);
      
      // Lọc sản phẩm theo từ khóa tìm kiếm
      const results = products.filter((product: Product) => 
        product.name.toLowerCase().includes(text.toLowerCase()) ||
        product.description.toLowerCase().includes(text.toLowerCase()) ||
        product.category.toLowerCase().includes(text.toLowerCase()) ||
        product.brand.toLowerCase().includes(text.toLowerCase())
      );
      
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  // Xử lý khi nhấn nút tìm kiếm
  const handleSubmitSearch = () => {
    if (searchQuery.trim() === '') return;
    
    // Thêm từ khóa vào danh sách tìm kiếm gần đây
    if (!recentSearchList.includes(searchQuery)) {
      const updatedRecentSearches = [searchQuery, ...recentSearchList].slice(0, 5);
      setRecentSearchList(updatedRecentSearches);
    }
  };

  // Xử lý khi nhấn vào từ khóa
  const handleKeywordPress = (keyword: string) => {
    setSearchQuery(keyword);
    handleSearch(keyword);
    handleSubmitSearch();
  };

  // Xóa tìm kiếm gần đây
  const handleClearRecentSearches = () => {
    setRecentSearchList([]);
  };

  // Xóa một từ khóa tìm kiếm gần đây
  const handleRemoveRecentSearch = (keyword: string) => {
    setRecentSearchList(recentSearchList.filter(item => item !== keyword));
  };

  // Render item trong danh sách kết quả tìm kiếm
  const renderSearchResultItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>{item.price.toLocaleString('vi-VN')} đ</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSubmitSearch}
            returnKeyType="search"
            autoFocus
          />
          
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => handleSearch('')}
            >
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleSubmitSearch}
        >
          <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      {isSearching ? (
        <View style={styles.searchResultsContainer}>
          <Text style={styles.resultsTitle}>
            Kết quả tìm kiếm ({searchResults.length})
          </Text>
          
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={renderSearchResultItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.searchResultsList}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                Không tìm thấy sản phẩm nào phù hợp với từ khóa "{searchQuery}"
              </Text>
              <TouchableOpacity
                style={styles.suggestButton}
                onPress={() => {}}
              >
                <Text style={styles.suggestButtonText}>Đề xuất sản phẩm</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <ScrollView style={styles.searchSuggestionsContainer}>
          {/* Tìm kiếm gần đây */}
          {recentSearchList.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
                <TouchableOpacity onPress={handleClearRecentSearches}>
                  <Text style={styles.clearAllText}>Xóa tất cả</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.keywordsList}>
                {recentSearchList.map((keyword, index) => (
                  <View key={index} style={styles.keywordContainer}>
                    <TouchableOpacity 
                      style={styles.keyword}
                      onPress={() => handleKeywordPress(keyword)}
                    >
                      <Text style={styles.keywordText}>{keyword}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.removeKeywordButton}
                      onPress={() => handleRemoveRecentSearch(keyword)}
                    >
                      <Text style={styles.removeKeywordText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {/* Từ khóa phổ biến */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Từ khóa phổ biến</Text>
            </View>
            
            <View style={styles.keywordsList}>
              {popularKeywords.map((keyword, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.keyword}
                  onPress={() => handleKeywordPress(keyword)}
                >
                  <Text style={styles.keywordText}>{keyword}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Đề xuất sản phẩm */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Có thể bạn sẽ thích</Text>
            
            <FlatList
              data={products.filter((product: Product) => product.isFeatured).slice(0, 5)}
              renderItem={renderSearchResultItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.suggestedProducts}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#999',
  },
  searchButton: {
    backgroundColor: '#E91E63',
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  searchSuggestionsContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  clearAllText: {
    color: '#E91E63',
    fontSize: 14,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  keyword: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 0,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  keywordText: {
    fontSize: 14,
    color: '#333',
  },
  removeKeywordButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    marginTop: -10,
  },
  removeKeywordText: {
    fontSize: 12,
    color: '#666',
  },
  suggestedProducts: {
    marginTop: 8,
  },
  searchResultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  searchResultsList: {
    paddingBottom: 16,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
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
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  suggestButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  suggestButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default SearchScreen;
