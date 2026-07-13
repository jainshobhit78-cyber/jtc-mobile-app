import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Theme } from '../styles/theme';
import { StateContext } from '../context/StateContext';
import { ChevronLeft, ShoppingCart, Star, ShieldCheck, Truck, Plus, Minus } from 'lucide-react-native';

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params;
  const { products, addToCart } = useContext(StateContext);

  const product = products.find(p => p.id === productId);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    Alert.alert(
      "Item Added",
      `${qty} ${product.unit}(s) of ${product.name} added to cart.`,
      [
        { text: "Continue Booking" },
        { text: "Open Cart", onPress: () => navigation.navigate('Cart') }
      ]
    );
  };

  // Mock specs based on product ID
  const specs = [
    { label: "Voltage Rating", value: product.category.includes("Wire") ? "1100V" : "230V / 415V" },
    { label: "Material Type", value: product.brand.includes("KEI") || product.brand.includes("Polycab") ? "99.9% Electrolytic Copper" : "Standard Grade" },
    { label: "Standard Length", value: product.unit },
    { label: "Insulation Grade", value: product.category.includes("Wire") ? "FR PVC (Flame Retardant)" : "IP54 Protected" },
    { label: "Product SKU", value: product.sku },
    { label: "Compliance IS", value: "IS 694 : 2010" }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Technical Specs</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        {/* Brand & Name */}
        <View style={styles.card}>
          <View style={styles.brandRow}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandText}>{product.brand}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Star size={14} color={Theme.colors.accent} fill={Theme.colors.accent} />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.categoryText}>{product.category} Division</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
            <Text style={styles.unitText}>per {product.unit}</Text>
          </View>

          <View style={styles.divider} />

          {/* Delivery banner */}
          <View style={styles.badgeRow}>
            <View style={styles.badgeItem}>
              <ShieldCheck size={16} color={Theme.colors.success} />
              <Text style={styles.badgeLabel}>ISI Certified</Text>
            </View>
            <View style={styles.badgeItem}>
              <Truck size={16} color={Theme.colors.primary} />
              <Text style={styles.badgeLabel}>Standard Dispatch</Text>
            </View>
          </View>
        </View>

        {/* Quantity Stepper */}
        <View style={styles.qtyCard}>
          <Text style={styles.qtyTitle}>Specify Order Quantity</Text>
          <View style={styles.stepperContainer}>
            <TouchableOpacity 
              style={styles.stepBtn}
              onPress={() => setQty(Math.max(1, qty - 1))}
            >
              <Minus size={18} color={Theme.colors.textDark} />
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{qty}</Text>
            <TouchableOpacity 
              style={styles.stepBtn}
              onPress={() => setQty(qty + 1)}
            >
              <Plus size={18} color={Theme.colors.textDark} />
            </TouchableOpacity>
          </View>
          <Text style={styles.totalLabel}>Total Value: <Text style={styles.totalValue}>₹{(product.price * qty).toLocaleString('en-IN')}</Text></Text>
        </View>

        {/* Specifications Table */}
        <View style={styles.specsCard}>
          <Text style={styles.specsTitle}>Technical Parameter Matrix</Text>
          <View style={styles.table}>
            {specs.map((spec, idx) => (
              <View key={idx} style={[styles.tableRow, idx % 2 === 0 && styles.tableRowAlt]}>
                <Text style={styles.tableCellLabel}>{spec.label}</Text>
                <Text style={styles.tableCellValue}>{spec.value}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Fixed bottom checkout button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addCartBtn} onPress={handleAddToCart}>
          <ShoppingCart size={20} color={Theme.colors.white} style={{ marginRight: 8 }} />
          <Text style={styles.addCartText}>Add to B2B Booking Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bgMain,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Theme.colors.error,
    fontSize: 16,
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
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.bgMain,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'Poppins-Bold',
  },
  scrollBody: {
    padding: 24,
    gap: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.card,
    padding: 20,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandBadge: {
    backgroundColor: '#ECEFF1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  brandText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    marginTop: 10,
    lineHeight: 24,
  },
  categoryText: {
    fontSize: 11,
    color: Theme.colors.textLight,
    marginTop: 2,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  unitText: {
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 20,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.textDark,
  },
  qtyCard: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.card,
    padding: 20,
    alignItems: 'center',
  },
  qtyTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
    textTransform: 'uppercase',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginVertical: 14,
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Theme.colors.bgMain,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  qtyValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    minWidth: 40,
    textAlign: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  specsCard: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.card,
    padding: 20,
  },
  specsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  table: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  tableRowAlt: {
    backgroundColor: '#F8FAFC',
  },
  tableCellLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
  },
  tableCellValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.textDark,
    textAlign: 'right',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  addCartBtn: {
    backgroundColor: Theme.colors.primary,
    height: 52,
    borderRadius: Theme.radii.button,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCartText: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  }
});
