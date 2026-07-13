import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Theme } from '../styles/theme';
import { StateContext } from '../context/StateContext';
import { Search, SlidersHorizontal, ChevronLeft, Star } from 'lucide-react-native';

export default function ProductListScreen({ route, navigation }) {
  const { category } = route.params || { category: 'Wires & Cables' };
  const { products } = useContext(StateContext);

  const [query, setQuery] = useState('');
  const [activeBrand, setActiveBrand] = useState('All');

  // Filter products
  const categoryProducts = products.filter(p => p.category === category);
  
  const uniqueBrands = ['All', ...new Set(categoryProducts.map(p => p.brand))];

  const filteredProducts = categoryProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase());
    const matchesBrand = activeBrand === 'All' || p.brand === activeBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{category}</Text>
          <Text style={styles.headerSubtitle}>{categoryProducts.length} items available</Text>
        </View>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchWrapper}>
          <Search size={18} color={Theme.colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items or SKUs..."
            placeholderTextColor={Theme.colors.textLight}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        
        {/* Brand Filter List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={uniqueBrands}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.brandBtn, 
                activeBrand === item && styles.brandBtnActive
              ]}
              onPress={() => setActiveBrand(item)}
            >
              <Text style={[
                styles.brandBtnText, 
                activeBrand === item && styles.brandBtnTextActive
              ]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.brandFilterList}
        />
      </View>

      {/* Products Grid List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
            activeOpacity={0.8}
          >
            <View style={styles.productInfo}>
              <View style={styles.brandBadge}>
                <Text style={styles.brandText}>{item.brand}</Text>
              </View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.skuText}>SKU: {item.sku}</Text>
              
              <View style={styles.ratingRow}>
                <Star size={12} color={Theme.colors.accent} fill={Theme.colors.accent} />
                <Text style={styles.ratingText}>{item.rating} ({item.unit})</Text>
              </View>
            </View>

            <View style={styles.productAction}>
              <Text style={styles.priceText}>₹{item.price.toLocaleString('en-IN')}</Text>
              <View style={[
                styles.stockBadge, 
                item.stock > 20 ? styles.stockIn : styles.stockLow
              ]}>
                <Text style={[
                  styles.stockText, 
                  item.stock > 20 ? styles.stockTextIn : styles.stockTextLow
                ]}>
                  {item.stock > 20 ? 'In Stock' : `Low: ${item.stock}`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products match your filters.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bgMain,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.bgMain,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  headerSubtitle: {
    fontSize: 11,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  searchFilterContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    gap: 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.bgMain,
    borderRadius: Theme.radii.input,
    height: 48,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Theme.colors.textDark,
    fontWeight: '500',
  },
  brandFilterList: {
    gap: 8,
    paddingVertical: 4,
  },
  brandBtn: {
    backgroundColor: Theme.colors.bgMain,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  brandBtnActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  brandBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
  },
  brandBtnTextActive: {
    color: Theme.colors.white,
  },
  listContainer: {
    padding: 24,
    gap: 12,
  },
  productCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    padding: 16,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
    gap: 4,
  },
  brandBadge: {
    backgroundColor: '#ECEFF1',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  brandText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    lineHeight: 18,
  },
  skuText: {
    fontSize: 11,
    color: Theme.colors.textLight,
    fontFamily: 'monospace',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 11,
    color: Theme.colors.textMuted,
  },
  productAction: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  stockIn: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
  },
  stockLow: {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
  },
  stockText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  stockTextIn: {
    color: Theme.colors.success,
  },
  stockTextLow: {
    color: Theme.colors.error,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: Theme.colors.textMuted,
  }
});
