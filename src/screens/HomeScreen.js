import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { Theme } from '../styles/theme';
import { StateContext } from '../context/StateContext';
import { ShoppingCart, Wallet, CreditCard, ChevronRight, Zap, Gift, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const categories = [
  { name: "Wires & Cables", icon: "cable", color: '#E3F2FD', textColor: '#0D47A1' },
  { name: "Electrical & Fans", icon: "fan", color: '#FFF3E0', textColor: '#E65100' },
  { name: "Pumps & Motors", icon: "pump", color: '#E8F5E9', textColor: '#1B5E20' },
  { name: "Solar Solutions", icon: "solar", color: '#FFFDE7', textColor: '#F57F17' },
  { name: "Switchgears", icon: "switch", color: '#F3E5F5', textColor: '#4A148C' },
  { name: "Accessories", icon: "grid", color: '#ECEFF1', textColor: '#37474F' }
];

const schemes = [
  { id: '1', title: 'Monsoon Wire Bonanza', desc: 'Book 50 coils of KEI 1.5/2.5 sqmm & get 2 coils free!', validity: 'Till 31st July' },
  { id: '2', title: 'Solar Dealer Lift', desc: 'Extra 2% cash discount on booking UTL 330W Panels above ₹1L.', validity: 'Till 20th July' }
];

const brands = ['KEI Wires', 'Polycab', 'Crompton', 'Havells', 'Kirloskar', 'L&T', 'UTL Solar', 'Luminous'];

export default function HomeScreen({ navigation }) {
  const { user, cart } = useContext(StateContext);

  const availableCredit = user.creditLimit - user.outstanding;
  const creditUsagePercent = (user.outstanding / user.creditLimit) * 100;

  const totalCartQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.dealerName}>{user.name}</Text>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>DEALER CODE: {user.code}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <ShoppingCart size={22} color={Theme.colors.white} />
          {totalCartQty > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalCartQty}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* KPI Balance Summary Cards */}
        <View style={styles.kpiContainer}>
          {/* Outstanding Card */}
          <View style={[styles.kpiCard, styles.outstandingCard]}>
            <View style={styles.kpiHeader}>
              <View style={styles.kpiIconWrapper}>
                <Wallet size={18} color={Theme.colors.error} />
              </View>
              <Text style={styles.kpiLabel}>Outstanding Balance</Text>
            </View>
            <Text style={styles.kpiValue}>₹{user.outstanding.toLocaleString('en-IN')}</Text>
            
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${Math.min(100, creditUsagePercent)}%` }]} />
            </View>
            <View style={styles.kpiFooter}>
              <Text style={styles.creditLimitText}>Limit: ₹{user.creditLimit.toLocaleString('en-IN')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Billing')}>
                <Text style={styles.payLink}>Pay Ledger →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Available Credit Card */}
          <View style={[styles.kpiCard, styles.creditCard]}>
            <View style={styles.kpiHeader}>
              <View style={[styles.kpiIconWrapper, { backgroundColor: 'rgba(46, 125, 50, 0.1)' }]}>
                <CreditCard size={18} color={Theme.colors.success} />
              </View>
              <Text style={styles.kpiLabel}>Available Credit Limit</Text>
            </View>
            <Text style={[styles.kpiValue, { color: Theme.colors.success }]}>
              ₹{availableCredit.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.kpiSubText}>Reconciled with SAP S/4HANA</Text>
          </View>
        </View>

        {/* Schemes Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active B2B Schemes</Text>
          <Gift size={18} color={Theme.colors.accent} />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          snapToInterval={width - 48}
          decelerationRate="fast"
          contentContainerStyle={styles.schemesScroll}
        >
          {schemes.map(scheme => (
            <View key={scheme.id} style={styles.schemeCard}>
              <View style={styles.schemeHeader}>
                <Text style={styles.schemeTitle}>{scheme.title}</Text>
                <Text style={styles.schemeDate}>{scheme.validity}</Text>
              </View>
              <Text style={styles.schemeDesc}>{scheme.desc}</Text>
              <TouchableOpacity style={styles.schemeBtn}>
                <Text style={styles.schemeBtnText}>Book Scheme Products</Text>
                <ArrowRight size={14} color={Theme.colors.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Quick Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Product Divisions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesGrid}>
          {categories.map((cat, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.categoryCell}
              onPress={() => navigation.navigate('ProductList', { category: cat.name })}
            >
              <View style={[styles.categoryIconCircle, { backgroundColor: cat.color }]}>
                <Zap size={20} color={cat.textColor} />
              </View>
              <Text style={styles.categoryCellLabel}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Brand partners */}
        <Text style={styles.brandSectionTitle}>Authorized Distribution Brands</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={brands}
          renderItem={({ item }) => (
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.brandsList}
        />

        <View style={styles.bottomDisclaimer}>
          <Text style={styles.disclaimerText}>SAP ERP Ledger Sync Connection Secure</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bgMain,
  },
  header: {
    backgroundColor: Theme.colors.primaryDark,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  welcomeText: {
    fontSize: 12,
    color: '#90CAF9',
  },
  dealerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.white,
    fontFamily: 'Poppins-Bold',
    marginTop: 2,
  },
  codeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  codeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Theme.colors.white,
    letterSpacing: 0.5,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Theme.colors.accent,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.primaryDark,
  },
  cartBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
  scrollBody: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  kpiContainer: {
    gap: 16,
    marginBottom: 24,
  },
  kpiCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  outstandingCard: {
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.error,
  },
  creditCard: {
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.success,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kpiIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
    marginTop: 10,
  },
  progressBarBg: {
    backgroundColor: '#F1F5F9',
    height: 6,
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: Theme.colors.error,
    height: '100%',
  },
  kpiFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  creditLimitText: {
    fontSize: 11,
    color: Theme.colors.textMuted,
  },
  payLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  kpiSubText: {
    fontSize: 11,
    color: Theme.colors.textLight,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'Poppins-Bold',
  },
  viewAllText: {
    fontSize: 12,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  schemesScroll: {
    paddingBottom: 16,
    gap: 16,
  },
  schemeCard: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.card,
    padding: 16,
    width: width - 80,
  },
  schemeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  schemeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    flex: 1,
  },
  schemeDate: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Theme.colors.accent,
    backgroundColor: 'rgba(255,152,0,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  schemeDesc: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 12,
  },
  schemeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  schemeBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  categoryCell: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 16,
    padding: 12,
    width: (width - 64) / 3,
    alignItems: 'center',
    gap: 8,
  },
  categoryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCellLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    textAlign: 'center',
  },
  brandSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  brandsList: {
    gap: 10,
    paddingBottom: 24,
  },
  brandBadge: {
    backgroundColor: '#ECEFF1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
  brandBadgeText: {
    fontSize: 11,
    color: Theme.colors.textDark,
    fontWeight: '600',
  },
  bottomDisclaimer: {
    alignItems: 'center',
    marginTop: 10,
  },
  disclaimerText: {
    fontSize: 10,
    color: Theme.colors.textLight,
    fontWeight: 'bold',
  }
});
