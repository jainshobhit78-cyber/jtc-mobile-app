import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Theme } from '../styles/theme';
import { StateContext } from '../context/StateContext';
import { ChevronLeft, Trash2, Plus, Minus, AlertTriangle, CheckCircle } from 'lucide-react-native';

export default function CartScreen({ navigation }) {
  const { cart, user, updateCartQty, removeFromCart, placeOrder } = useContext(StateContext);
  const [remarks, setRemarks] = useState('');

  const totalValue = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const availableCredit = user.creditLimit - user.outstanding;
  
  const isCreditBlocked = totalValue > availableCredit;

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart first.");
      return;
    }

    if (isCreditBlocked) {
      Alert.alert("Credit Limit Blocked", "Your current outstanding balance + cart value exceeds your credit limit. Please clear pending invoices first.");
      return;
    }

    const order = placeOrder(remarks);
    Alert.alert(
      "Booking Confirmed",
      `Order ${order.id} placed successfully and synced with ERP.`,
      [
        { 
          text: "View Timeline", 
          onPress: () => {
            navigation.navigate('Timeline');
          } 
        },
        { 
          text: "Back to Home", 
          onPress: () => navigation.popToTop() 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={20} color={Theme.colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>B2B Booking Cart</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Cart list */}
        <FlatList
          data={cart}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')} per unit</Text>
              </View>
              
              <View style={styles.itemActions}>
                <View style={styles.stepper}>
                  <TouchableOpacity 
                    style={styles.stepBtn}
                    onPress={() => updateCartQty(item.productId, item.qty - 1)}
                  >
                    <Minus size={14} color={Theme.colors.textDark} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.qty}</Text>
                  <TouchableOpacity 
                    style={styles.stepBtn}
                    onPress={() => updateCartQty(item.productId, item.qty + 1)}
                  >
                    <Plus size={14} color={Theme.colors.textDark} />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity onPress={() => removeFromCart(item.productId)} style={styles.trashBtn}>
                  <Trash2 size={16} color={Theme.colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items inside booking cart.</Text>
            </View>
          }
          ListFooterComponent={
            cart.length > 0 ? (
              <View style={styles.footer}>
                
                {/* Remarks Input */}
                <View style={styles.remarksContainer}>
                  <Text style={styles.remarksLabel}>Special Shipping Instructions / Remarks</Text>
                  <TextInput
                    style={styles.remarksInput}
                    placeholder="e.g., Deliver at warehouse back door..."
                    value={remarks}
                    onChangeText={setRemarks}
                    multiline
                  />
                </View>

                {/* Bill details */}
                <View style={styles.billCard}>
                  <Text style={styles.billTitle}>Order Valuation</Text>
                  <View style={styles.billRow}>
                    <Text style={styles.billLabel}>Cart Items Value</Text>
                    <Text style={styles.billValue}>₹{totalValue.toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.billRow}>
                    <Text style={styles.billLabel}>GST (Inclusive)</Text>
                    <Text style={styles.billValue}>₹0.00</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.billRowTotal}>
                    <Text style={styles.billLabelTotal}>Net Payable Dues</Text>
                    <Text style={styles.billValueTotal}>₹{totalValue.toLocaleString('en-IN')}</Text>
                  </View>
                </View>

                {/* Credit Limit Verification Box */}
                <View style={[
                  styles.creditBox, 
                  isCreditBlocked ? styles.creditBlocked : styles.creditClear
                ]}>
                  {isCreditBlocked ? (
                    <>
                      <View style={styles.creditHeader}>
                        <AlertTriangle size={18} color={Theme.colors.error} />
                        <Text style={[styles.creditBoxTitle, { color: Theme.colors.error }]}>CREDIT BLOCK TRIGGERED</Text>
                      </View>
                      <Text style={styles.creditBoxDesc}>
                        Your available credit limit of <Text style={{ fontWeight: 'bold' }}>₹{availableCredit.toLocaleString('en-IN')}</Text> is insufficient to book this order. Please clear outstanding ledger balances.
                      </Text>
                    </>
                  ) : (
                    <>
                      <View style={styles.creditHeader}>
                        <CheckCircle size={18} color={Theme.colors.success} />
                        <Text style={[styles.creditBoxTitle, { color: Theme.colors.success }]}>CREDIT LIMIT APPROVED</Text>
                      </View>
                      <Text style={styles.creditBoxDesc}>
                        Available Credit Limit: <Text style={{ fontWeight: 'bold', color: Theme.colors.success }}>₹{availableCredit.toLocaleString('en-IN')}</Text>. Order booking verified with SAP S/4HANA ERP.
                      </Text>
                    </>
                  )}
                </View>
              </View>
            ) : null
          }
        />

        {/* Bottom checkout bar */}
        {cart.length > 0 && (
          <View style={styles.bottomBar}>
            <TouchableOpacity 
              style={[
                styles.checkoutBtn, 
                isCreditBlocked && styles.checkoutBlocked
              ]}
              onPress={handleCheckout}
              disabled={isCreditBlocked}
            >
              <Text style={styles.checkoutBtnText}>Confirm Order Booking</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
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
  listContainer: {
    padding: 24,
    gap: 12,
  },
  itemRow: {
    backgroundColor: Theme.colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 11,
    color: Theme.colors.textMuted,
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.bgMain,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    overflow: 'hidden',
  },
  stepBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    paddingHorizontal: 8,
  },
  trashBtn: {
    padding: 8,
  },
  emptyContainer: {
    paddingVertical: 80,
    alignItems: 'center',
  },
  emptyText: {
    color: Theme.colors.textMuted,
    fontSize: 13,
  },
  footer: {
    marginTop: 16,
    gap: 16,
    paddingBottom: 80,
  },
  remarksContainer: {
    gap: 8,
  },
  remarksLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
    textTransform: 'uppercase',
  },
  remarksInput: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 12,
    padding: 12,
    height: 64,
    textAlignVertical: 'top',
    fontSize: 12,
    color: Theme.colors.textDark,
  },
  billCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    padding: 18,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  billTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  billLabel: {
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  billValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: 4,
  },
  billLabelTotal: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  billValueTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    fontFamily: 'monospace',
  },
  creditBox: {
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  creditBlocked: {
    backgroundColor: 'rgba(211, 47, 47, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(211, 47, 47, 0.25)',
  },
  creditClear: {
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.25)',
  },
  creditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  creditBoxTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  creditBoxDesc: {
    fontSize: 11,
    color: Theme.colors.textMuted,
    lineHeight: 16,
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
  checkoutBtn: {
    backgroundColor: Theme.colors.primary,
    height: 52,
    borderRadius: Theme.radii.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutBlocked: {
    backgroundColor: Theme.colors.textLight,
  },
  checkoutBtnText: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  }
});
