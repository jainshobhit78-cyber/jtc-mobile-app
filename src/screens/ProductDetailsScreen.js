import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Share2, Heart, Minus, Plus, ChevronDown } from 'lucide-react-native';
import { Theme } from '../styles/theme';

const DEFAULT_PRODUCT = {
  id: '1',
  name: 'KEI FR PVC Copper Wire 1.5 Sqmm Blue',
  price: 1420.0,
  mrp: 1650.0,
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
};

const SPECS_KEYS = [
  { label: 'Brand', key: 'brand' },
  { label: 'SKU', key: 'sku' },
  { label: 'Category', key: 'category' },
  { label: 'Type', key: 'type' },
  { label: 'Size', key: 'size' },
  { label: 'Length', key: 'length' },
];

const ProductDetailsScreen = ({ navigation, route }) => {
  const product = route?.params?.product || DEFAULT_PRODUCT;
  const [quantity, setQuantity] = useState(1);
  const [bookStock, setBookStock] = useState('24');

  const savings = product.mrp - product.price;
  const savingsPercent = Math.round((savings / product.mrp) * 100);

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

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
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Share2 size={20} color={Theme.colors.textDark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Heart size={20} color={Theme.colors.textDark} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image Area */}
        <View style={[styles.imageArea, { backgroundColor: product.color + '14' }]}>
          <Text style={[styles.imageInitial, { color: product.color }]}>
            {product.initial}
          </Text>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <Text style={styles.productName}>{product.name}</Text>

          {/* Brand · SKU · Category */}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{product.brand}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{product.sku}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{product.category}</Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.mrpText}>
              MRP ₹{product.mrp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Text>
            <Text style={styles.priceText}>
              ₹ {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} / {product.unit}
            </Text>
          </View>

          {/* Savings Badge */}
          <View style={styles.savingsBadge}>
            <Text style={styles.savingsText}>
              You Save ₹ {savings.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({savingsPercent}%)
            </Text>
          </View>

          {/* Stock & Min Order */}
          <Text style={styles.stockText}>
            In Stock: {product.stock} {product.unit}
          </Text>
          <Text style={styles.minOrderText}>Min Order: 1 {product.unit}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Product Specifications */}
          <Text style={styles.sectionTitle}>Product Specifications</Text>
          <View style={styles.specsTable}>
            {SPECS_KEYS.map((spec, index) => (
              <View
                key={spec.key}
                style={[
                  styles.specRow,
                  index % 2 === 0 && styles.specRowAlt,
                ]}
              >
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{product[spec.key] || '—'}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.viewMoreBtn} activeOpacity={0.7}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Book Stock */}
          <Text style={styles.sectionTitle}>Book Stock for:</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                bookStock === '24' && styles.toggleBtnActive,
              ]}
              onPress={() => setBookStock('24')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.toggleBtnText,
                  bookStock === '24' && styles.toggleBtnTextActive,
                ]}
              >
                24 Hours
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                bookStock === '48' && styles.toggleBtnActive,
              ]}
              onPress={() => setBookStock('48')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.toggleBtnText,
                  bookStock === '48' && styles.toggleBtnTextActive,
                ]}
              >
                48 Hours
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quantity Stepper */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.stepper}>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={decrementQty}
                activeOpacity={0.7}
              >
                <Minus size={16} color={Theme.colors.primary} />
              </TouchableOpacity>
              <View style={styles.stepperValue}>
                <Text style={styles.stepperValueText}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={incrementQty}
                activeOpacity={0.7}
              >
                <Plus size={16} color={Theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.btnOutline} activeOpacity={0.7} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.btnOutlineText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFilled} activeOpacity={0.7} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.btnFilledText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
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
  headerRight: {
    flexDirection: 'row',
    gap: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageArea: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageInitial: {
    fontSize: 72,
    fontFamily: Theme.fonts.heading,
  },
  infoSection: {
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.lg,
  },
  productName: {
    fontSize: Theme.fontSize.xl,
    fontFamily: Theme.fonts.bodyBold,
    color: Theme.colors.textDark,
    lineHeight: 26,
    marginBottom: Theme.spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.body,
    color: Theme.colors.textMuted,
  },
  metaDot: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textMuted,
    marginHorizontal: 6,
  },
  priceSection: {
    marginBottom: Theme.spacing.sm,
  },
  mrpText: {
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.body,
    color: Theme.colors.textMuted,
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 20,
    fontFamily: Theme.fonts.bodyBold,
    color: Theme.colors.primary,
  },
  savingsBadge: {
    backgroundColor: Theme.colors.successBg,
    alignSelf: 'flex-start',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 4,
    borderRadius: Theme.radii.badge,
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  savingsText: {
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.success,
  },
  stockText: {
    fontSize: Theme.fontSize.md,
    fontFamily: Theme.fonts.bodyMedium,
    color: Theme.colors.success,
    marginBottom: 4,
  },
  minOrderText: {
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.body,
    color: Theme.colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontFamily: Theme.fonts.bodyBold,
    color: Theme.colors.textDark,
    marginBottom: Theme.spacing.md,
  },
  specsTable: {
    borderRadius: Theme.radii.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  specRow: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  specRowAlt: {
    backgroundColor: Theme.colors.bgMain,
  },
  specLabel: {
    flex: 1,
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.bodyMedium,
    color: Theme.colors.textMuted,
  },
  specValue: {
    flex: 1,
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.textDark,
    textAlign: 'right',
  },
  viewMoreBtn: {
    marginTop: Theme.spacing.md,
  },
  viewMoreText: {
    fontSize: Theme.fontSize.md,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.primaryLight,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radii.button,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
  },
  toggleBtnActive: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primarySoft,
  },
  toggleBtnText: {
    fontSize: Theme.fontSize.md,
    fontFamily: Theme.fonts.bodyMedium,
    color: Theme.colors.textMuted,
  },
  toggleBtnTextActive: {
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.bodySemiBold,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityLabel: {
    fontSize: Theme.fontSize.md,
    fontFamily: Theme.fonts.bodyMedium,
    color: Theme.colors.textDark,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.button,
    overflow: 'hidden',
  },
  stepperBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.bgMain,
  },
  stepperValue: {
    width: 48,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.white,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Theme.colors.border,
  },
  stepperValueText: {
    fontSize: Theme.fontSize.lg,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.textDark,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    ...Theme.shadows.cardMd,
  },
  btnOutline: {
    flex: 1,
    height: 50,
    borderRadius: Theme.radii.button,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineText: {
    fontSize: Theme.fontSize.lg,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.primary,
  },
  btnFilled: {
    flex: 1,
    height: 50,
    borderRadius: Theme.radii.button,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadows.button,
  },
  btnFilledText: {
    fontSize: Theme.fontSize.lg,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.textWhite,
  },
});

export default ProductDetailsScreen;
