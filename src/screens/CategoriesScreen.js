import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import { Theme } from '../styles/theme';
import {
  ArrowLeft,
  ShoppingCart,
  Bell,
  Search,
  SlidersHorizontal,
  HelpCircle,
  Settings,
  ChevronRight,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 1, name: 'Wires & Cables', products: 256, color: '#2563EB' },
  { id: 2, name: 'Fans', products: 184, color: '#78350F' },
  { id: 3, name: 'Pumps', products: 96, color: '#1E3A5F' },
  { id: 4, name: 'Solar Solutions', products: 142, color: '#CA8A04' },
  { id: 5, name: 'Lighting', products: 210, color: '#D97706' },
  { id: 6, name: 'Motors', products: 78, color: '#1B3A7C' },
  { id: 7, name: 'Electrical', products: 312, color: '#DC2626' },
  { id: 8, name: 'Industrial', products: 156, color: '#4B5563' },
  { id: 9, name: 'Switchgears', products: 88, color: '#6B7280' },
  { id: 10, name: 'Accessories', products: 134, color: '#92400E' },
  { id: 11, name: 'Cable Mgmt', products: 67, color: '#374151' },
  { id: 12, name: 'Generators', products: 53, color: '#B91C1C' },
];

const COLUMN_COUNT = 3;
const CARD_GAP = 10;
const HORIZONTAL_PADDING = 16;
const CARD_WIDTH =
  (width - HORIZONTAL_PADDING * 2 - CARD_GAP * (COLUMN_COUNT - 1)) / COLUMN_COUNT;

export default function CategoriesScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  const renderCategoryCard = ({ item, index }) => {
    const initial = item.name.charAt(0).toUpperCase();
    const isLastRow = index >= CATEGORIES.length - (CATEGORIES.length % COLUMN_COUNT || COLUMN_COUNT);

    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          {
            width: CARD_WIDTH,
            marginRight: (index + 1) % COLUMN_COUNT === 0 ? 0 : CARD_GAP,
          },
        ]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ProductList', { category: item.name })}
      >
        <View style={[styles.iconSquare, { backgroundColor: item.color }]}>
          <Text style={styles.iconInitial}>{initial}</Text>
        </View>
        <Text style={styles.categoryName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.productCountRow}>
          <Text style={styles.productCountText}>{item.products} Products</Text>
          <ChevronRight size={10} color={Theme.colors.textMuted} />
        </View>
      </TouchableOpacity>
    );
  };

  const ListFooter = () => (
    <View style={styles.ctaCard}>
      <View style={styles.ctaTop}>
        <HelpCircle size={20} color={Theme.colors.textMuted} />
        <Text style={styles.ctaTitle}>Can't find what you're looking for?</Text>
        <Settings size={18} color={Theme.colors.textMuted} />
      </View>
      <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Support')}>
        <Text style={styles.ctaBtnText}>Request Product</Text>
        <ChevronRight size={14} color={Theme.colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.headerIconBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.logoText}>JTC</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Cart')}>
            <ShoppingCart size={20} color={Theme.colors.textDark} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Notifications')}>
            <Bell size={20} color={Theme.colors.textDark} />
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>5</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Title section */}
      <View style={styles.titleSection}>
        <Text style={styles.pageTitle}>Product Categories</Text>
        <Text style={styles.pageSubtitle}>
          Choose a category to explore products
        </Text>
      </View>

      {/* Search + Filter */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Search size={18} color={Theme.colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories..."
            placeholderTextColor={Theme.colors.textLight}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <SlidersHorizontal size={18} color={Theme.colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Categories grid */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCategoryCard}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bgMain,
  },

  /* ───── Header bar ───── */
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 0,
    backgroundColor: Theme.colors.accent,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Theme.colors.white,
  },
  cartBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
  bellBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Theme.colors.error,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Theme.colors.white,
  },
  bellBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },

  /* ───── Title ───── */
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    backgroundColor: Theme.colors.white,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'Poppins-Bold',
  },
  pageSubtitle: {
    fontSize: 13,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },

  /* ───── Search ───── */
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: Theme.colors.white,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.inputBg,
    borderRadius: Theme.radii.input,
    borderWidth: 1,
    borderColor: Theme.colors.inputBorder,
    paddingHorizontal: 12,
    height: 42,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: Theme.colors.textDark,
    paddingVertical: 0,
  },
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: Theme.radii.input,
    borderWidth: 1,
    borderColor: Theme.colors.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
  },

  /* ───── Grid ───── */
  gridContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  categoryCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    ...Theme.shadows.card,
  },
  iconSquare: {
    width: CARD_WIDTH - 20,
    height: CARD_WIDTH - 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Theme.colors.white,
    fontFamily: 'Poppins-Bold',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    marginTop: 8,
    textAlign: 'center',
  },
  productCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 2,
  },
  productCountText: {
    fontSize: 10,
    color: Theme.colors.textMuted,
  },

  /* ───── CTA card ───── */
  ctaCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    marginTop: 8,
    gap: 12,
  },
  ctaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ctaTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.textDark,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
    paddingVertical: 10,
    borderRadius: Theme.radii.button,
    gap: 6,
  },
  ctaBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
});
