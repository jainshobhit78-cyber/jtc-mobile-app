import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Heart, Minus, Plus, Trash2 } from 'lucide-react-native';
import { Theme } from '../styles/theme';

const INITIAL_CART = [
  {
    id: '1',
    name: 'KEI FR PVC Copper Wire 1.5 Sqmm Blue',
    specs: '1.5 Sqmm · FR PVC · 90m',
    unitPrice: 1420.0,
    price: 7100.0,
    unit: 'Roll',
    qty: 2,
    color: '#3B82F6',
    initial: 'K',
  },
  {
    id: '2',
    name: 'KEI FR PVC Copper Wire 2.5 Sqmm Red',
    specs: '2.5 Sqmm · FR PVC · 90m',
    unitPrice: 2450.0,
    price: 2450.0,
    unit: 'Roll',
    qty: 1,
    color: '#EF4444',
    initial: 'K',
  },
  {
    id: '3',
    name: 'Polycab Flexible Wire 1.5mm Yellow',
    specs: '1.5mm · Flexible · 90m',
    unitPrice: 870.0,
    price: 2610.0,
    unit: 'Roll',
    qty: 3,
    color: '#EAB308',
    initial: 'P',
  },
];

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  const updateQty = (id, delta) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return {
            ...item,
            qty: newQty,
            price: item.unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const formatCurrency = (val) =>
    '₹ ' + val.toLocaleString('en-IN', { minimumFractionDigits: 2 });

  const renderCartItem = ({ item }) => (
    <View style={styles.cartCard}>
      <View style={styles.cartCardInner}>
        {/* Product Thumbnail */}
        <View style={[styles.thumb, { backgroundColor: item.color + '18' }]}>
          <Text style={[styles.thumbInitial, { color: item.color }]}>
            {item.initial}
          </Text>
        </View>

        {/* Product Info */}
        <View style={styles.cartInfo}>
          <Text style={styles.cartItemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.cartItemSpecs}>{item.specs}</Text>
          <Text style={styles.cartItemPrice}>
            {formatCurrency(item.unitPrice)} / {item.unit}
          </Text>
        </View>

        {/* Right: Stepper + Subtotal + Delete */}
        <View style={styles.cartRight}>
          <View style={styles.stepperSmall}>
            <TouchableOpacity
              style={styles.stepperSmallBtn}
              onPress={() => updateQty(item.id, -1)}
              activeOpacity={0.7}
            >
              <Minus size={12} color={Theme.colors.primary} />
            </TouchableOpacity>
            <View style={styles.stepperSmallValue}>
              <Text style={styles.stepperSmallText}>{item.qty}</Text>
            </View>
            <TouchableOpacity
              style={styles.stepperSmallBtn}
              onPress={() => updateQty(item.id, 1)}
              activeOpacity={0.7}
            >
              <Plus size={12} color={Theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.cartSubtotal}>{formatCurrency(item.price)}</Text>
          <TouchableOpacity
            onPress={() => removeItem(item.id)}
            activeOpacity={0.7}
            style={styles.trashBtn}
          >
            <Trash2 size={16} color={Theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const ListFooter = () => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>GST (18%)</Text>
        <Text style={styles.summaryValue}>{formatCurrency(gst)}</Text>
      </View>
      <View style={styles.summaryDivider} />
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>
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
        <Text style={styles.headerTitle}>My Cart ({totalItems})</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Heart size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ListFooter}
      />

      {/* Bottom Checkout */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.checkoutBtn} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('BookingConfirmation', { amount: formatCurrency(total) })}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
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
  headerTitle: {
    fontSize: Theme.fontSize.lg,
    fontFamily: Theme.fonts.headingSemiBold,
    color: Theme.colors.textDark,
    flex: 1,
    textAlign: 'center',
  },
  listContent: {
    padding: Theme.spacing.lg,
    paddingBottom: 100,
  },
  cartCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  cartCardInner: {
    flexDirection: 'row',
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: Theme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbInitial: {
    fontSize: 24,
    fontFamily: Theme.fonts.heading,
  },
  cartInfo: {
    flex: 1,
    marginLeft: Theme.spacing.md,
    marginRight: Theme.spacing.sm,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 13,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.textDark,
    lineHeight: 18,
    marginBottom: 2,
  },
  cartItemSpecs: {
    fontSize: Theme.fontSize.xs,
    fontFamily: Theme.fonts.body,
    color: Theme.colors.textMuted,
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.bodyBold,
    color: Theme.colors.primary,
  },
  cartRight: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  stepperSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.sm,
    overflow: 'hidden',
  },
  stepperSmallBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.bgMain,
  },
  stepperSmallValue: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.white,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Theme.colors.border,
  },
  stepperSmallText: {
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.textDark,
  },
  cartSubtotal: {
    fontSize: Theme.fontSize.sm,
    fontFamily: Theme.fonts.bodyBold,
    color: Theme.colors.textDark,
  },
  trashBtn: {
    padding: 4,
  },
  summaryCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    padding: Theme.spacing.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginTop: Theme.spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: Theme.fontSize.md,
    fontFamily: Theme.fonts.body,
    color: Theme.colors.textMuted,
  },
  summaryValue: {
    fontSize: Theme.fontSize.md,
    fontFamily: Theme.fonts.bodyMedium,
    color: Theme.colors.textDark,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: Theme.spacing.sm,
  },
  totalLabel: {
    fontSize: Theme.fontSize.lg,
    fontFamily: Theme.fonts.bodyBold,
    color: Theme.colors.textDark,
  },
  totalValue: {
    fontSize: Theme.fontSize.xl,
    fontFamily: Theme.fonts.bodyBold,
    color: Theme.colors.primary,
  },
  bottomBar: {
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    ...Theme.shadows.cardMd,
  },
  checkoutBtn: {
    height: 50,
    borderRadius: Theme.radii.button,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadows.button,
  },
  checkoutBtnText: {
    fontSize: Theme.fontSize.lg,
    fontFamily: Theme.fonts.bodySemiBold,
    color: Theme.colors.textWhite,
  },
});

export default CartScreen;
