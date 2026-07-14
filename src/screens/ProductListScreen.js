import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Heart, ArrowUpDown, SlidersHorizontal, Plus } from 'lucide-react-native';
import { Theme } from '../styles/theme';

const PRODUCTS = [
  {
    id: '1',
    name: 'KEI FR PVC Copper Wire 1.5 Sqmm Blue',
    price: 1420.0,
    unit: 'Roll',
    stock: 250,
    color: '#3B82F6',
    initial: 'K',
    brand: 'KEI',
    sku: 'KEI-WR-1.5-BL',
    category: 'Wires & Cables',
    type: 'FR PVC',
    size: '1.5 Sqmm',
    length: '90m',
    mrp: 1650.0,
  },
  {
    id: '2',
    name: 'KEI FR PVC Copper Wire 2.5 Sqmm Red',
    price: 2450.0,
    unit: 'Roll',
    stock: 180,
    color: '#EF4444',
    initial: 'K',
    brand: 'KEI',
    sku: 'KEI-WR-2.5-RD',
    category: 'Wires & Cables',
    type: 'FR PVC',
    size: '2.5 Sqmm',
    length: '90m',
    mrp: 2850.0,
  },
  {
    id: '3',
    name: 'Polycab Flexible Wire 1.5mm Yellow',
    price: 1290.0,
    unit: 'Roll',
    stock: 350,
    color: '#EAB308',
    initial: 'P',
    brand: 'Polycab',
    sku: 'PC-FLX-1.5-YL',
    category: 'Wires & Cables',
    type: 'Flexible',
    size: '1.5mm',
    length: '90m',
    mrp: 1490.0,
  },
  {
    id: '4',
    name: 'Polycab Flexible Wire 2.5mm Green',
    price: 1740.0,
    unit: 'Roll',
    stock: 200,
    color: '#22C55E',
    initial: 'P',
    brand: 'Polycab',
    sku: 'PC-FLX-2.5-GR',
    category: 'Wires & Cables',
    type: 'Flexible',
    size: '2.5mm',
    length: '90m',
    mrp: 2010.0,
  },
  {
    id: '5',
    name: 'Finolex FR Cable 4mm',
    price: 3890.0,
    unit: 'Roll',
    stock: 120,
    color: '#8B5CF6',
    initial: 'F',
    brand: 'Finolex',
    sku: 'FN-FR-4.0',
    category: 'Wires & Cables',
    type: 'FR Cable',
    size: '4mm',
    length: '90m',
    mrp: 4500.0,
  },
  {
    id: '6',
    name: 'Havells LifeLine 1mm',
    price: 980.0,
    unit: 'Roll',
    stock: 400,
    color: '#F97316',
    initial: 'H',
    brand: 'Havells',
    sku: 'HV-LL-1.0',
    category: 'Wires & Cables',
    type: 'LifeLine',
    size: '1mm',
    length: '90m',
    mrp: 1150.0,
  },
];

const ProductCard = ({ item, onPress, onAddPress }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.7}
    onPress={() => onPress(item)}
  >
    <View style={[styles.cardImage, { backgroundColor: item.color + '18' }]}>
      <Text style={[styles.cardInitial, { color: item.color }]}>{item.initial}</Text>
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.cardName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.cardPrice}>
        ₹ {item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} / {item.unit}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardStock}>In Stock: {item.stock} {item.unit}</Text>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={onAddPress}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const ProductListScreen = ({ navigation, route }) => {
  const categoryName = route?.params?.category || 'Wires & Cables';

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleProductAdd = () => {
    navigation.navigate('Cart');
  };

  const renderProduct = ({ item, index }) => (
    <View
      style={[
        styles.cardWrapper,
        index % 2 === 0 ? { paddingRight: 6 } : { paddingLeft: 6 },
      ]}
    >
      <ProductCard item={item} onPress={handleProductPress} onAddPress={handleProductAdd} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Cart')}>
          <Heart size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Sort + Filter Row */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterPill} activeOpacity={0.7}>
          <ArrowUpDown size={14} color={Theme.colors.textDark} />
          <Text style={styles.filterPillText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterPill} activeOpacity={0.7}>
          <SlidersHorizontal size={14} color={Theme.colors.textDark} />
          <Text style={styles.filterPillText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.bgMain,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Theme.fontSize.lg,
    fontFamily: Theme.fonts.headingSemiBold,
    color: Theme.colors.textDark,
    flex: 1,
    textAlign: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.md,
    backgroundColor: Theme.colors.bgMain,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radii.chip,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.white,
    gap: 6,
  },
  filterPillText: {
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.bodyMedium,
    color: Theme.colors.textDark,
  },
  listContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: Theme.spacing.md,
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    overflow: 'hidden',
  },
  cardImage: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInitial: {
    fontSize: 36,
    fontFamily: Theme.fonts.heading,
  },
  cardBody: {
    padding: Theme.spacing.md,
  },
  cardName: {
    fontSize: 13,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.textDark,
    lineHeight: 18,
    marginBottom: 6,
    minHeight: 36,
  },
  cardPrice: {
    fontSize: Theme.fontSize.md,
    fontFamily: Theme.fonts.bodyBold,
    color: Theme.colors.primary,
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardStock: {
    fontSize: Theme.fontSize.xs,
    fontFamily: Theme.fonts.bodyMedium,
    color: Theme.colors.success,
  },
  addBtn: {
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    borderRadius: Theme.radii.button,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 4,
  },
  addBtnText: {
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.primary,
  },
});

export default ProductListScreen;
