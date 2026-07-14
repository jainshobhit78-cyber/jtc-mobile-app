import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Menu,
  Bell,
  IndianRupee,
  ShoppingBag,
  FileText,
  TrendingUp,
  AlertCircle,
  ShoppingCart,
  Package,
  CreditCard,
  Tag,
  Wallet,
  BarChart3,
} from 'lucide-react-native';
import { Theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#1B3A7C',
  primaryDark: '#0E2344',
  primaryLight: '#2D5BB9',
  accent: '#F5851F',
  bgMain: '#F5F7FA',
  white: '#FFFFFF',
  textDark: '#1A1A2E',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  success: '#16A34A',
};

const HomeScreen = ({ navigation }) => {
  const statsCards = [
    {
      icon: IndianRupee,
      amount: '₹ 1,24,560.00',
      label: 'Outstanding Amount',
      borderColor: COLORS.accent,
    },
    {
      icon: IndianRupee,
      amount: '₹ 6,00,000.00',
      label: 'Credit Available',
      borderColor: COLORS.success,
    },
    {
      icon: IndianRupee,
      amount: '₹ 3,75,440.00',
      label: 'Available Credit',
      borderColor: COLORS.primaryLight,
    },
  ];

  const quickStats = [
    {
      icon: ShoppingBag,
      label: 'Pending Orders',
      value: '12',
      color: '#3B82F6',
      bgColor: '#EFF6FF',
    },
    {
      icon: FileText,
      label: 'Pending Invoices',
      value: '5',
      color: '#F59E0B',
      bgColor: '#FFFBEB',
    },
    {
      icon: TrendingUp,
      label: 'Monthly Sales',
      value: '₹86,430',
      color: '#10B981',
      bgColor: '#ECFDF5',
    },
    {
      icon: AlertCircle,
      label: 'Collection Due',
      value: '₹24,560',
      color: '#EF4444',
      bgColor: '#FEF2F2',
    },
  ];

  const quickActions = [
    {
      icon: ShoppingCart,
      label: 'Place Order',
      color: '#3B82F6',
      onPress: () => navigation.navigate('Categories'),
    },
    {
      icon: Package,
      label: 'Book Back',
      color: '#16A34A',
      onPress: () => navigation.navigate('Categories'),
    },
    {
      icon: CreditCard,
      label: 'Payments',
      color: '#F5851F',
      onPress: () => navigation.navigate('Payments'),
    },
    {
      icon: Tag,
      label: 'Schemes',
      color: '#8B5CF6',
      onPress: () => navigation.navigate('Support'),
    },
    {
      icon: Wallet,
      label: 'Collections',
      color: '#14B8A6',
      onPress: () => navigation.navigate('Invoices'),
    },
    {
      icon: BarChart3,
      label: 'Reports',
      color: '#EF4444',
      onPress: () => navigation.navigate('AccountSummary'),
    },
  ];

  const brands = ['KEI', 'POLYCAB', 'Crompton', 'Havells', 'Finolex', 'Anchor'];

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Profile')}>
          <Menu size={24} color={COLORS.textDark} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>J</Text>
          </View>
          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>JAIN TRADING</Text>
            <Text style={styles.headerSubtitle}>CORPORATION</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Notifications')}>
          <Bell size={24} color={COLORS.textDark} />
          <View style={styles.notifBadge}>
            <Text style={styles.notifBadgeText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Card */}
        <View style={styles.greetingCard}>
          <TouchableOpacity style={styles.greetingLeft} onPress={() => navigation.navigate('AccountSummary')}>
            <Text style={styles.greetingLabel}>Good Morning,</Text>
            <Text style={styles.greetingName}>Sharma Electricals ✨</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.avatarText}>SE</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsScrollContent}
          style={styles.statsScroll}
        >
          {statsCards.map((card, index) => (
            <View key={index} style={[styles.statsCard, { borderLeftColor: card.borderColor }]}>
              <View style={[styles.statsIconCircle, { backgroundColor: card.borderColor + '15' }]}>
                <card.icon size={18} color={card.borderColor} />
              </View>
              <Text style={styles.statsAmount}>{card.amount}</Text>
              <Text style={styles.statsLabel}>{card.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Quick Stats Grid */}
        <View style={styles.sectionContainer}>
          <View style={styles.quickStatsGrid}>
            {quickStats.map((stat, index) => (
              <View key={index} style={styles.quickStatCard}>
                <View style={[styles.quickStatIcon, { backgroundColor: stat.bgColor }]}>
                  <stat.icon size={18} color={stat.color} />
                </View>
                <Text style={styles.quickStatValue}>{stat.value}</Text>
                <Text style={styles.quickStatLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionItem}
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.quickActionCircle, { backgroundColor: action.color }]}>
                  <action.icon size={22} color={COLORS.white} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Brand Partners */}
        <View style={styles.sectionContainer}>
          <View style={styles.brandHeader}>
            <Text style={styles.sectionTitle}>Top Brands</Text>
            <TouchableOpacity>
              <Text style={styles.brandLink}>Shop by Brands &gt;</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsScrollContent}
          >
            {brands.map((brand, index) => (
              <TouchableOpacity key={index} style={styles.brandChip} activeOpacity={0.7}>
                <Text style={styles.brandChipText}>{brand}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
  },

  // Header
  header: {
    height: 56,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  headerTitleGroup: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryDark,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 2,
    backgroundColor: '#EF4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  notifBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '700',
  },

  // ScrollView
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Greeting Card
  greetingCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#E8F0FE',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingLeft: {
    flex: 1,
  },
  greetingLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  greetingName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },

  // Stats Cards
  statsScroll: {
    marginTop: 16,
  },
  statsScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  statsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    width: 180,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statsIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statsAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },

  // Quick Stats
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickStatCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    width: (width - 44) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  quickStatIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  quickStatLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },

  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  quickActionItem: {
    width: (width - 32) / 3,
    alignItems: 'center',
  },
  quickActionCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Brand Partners
  brandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandLink: {
    fontSize: 13,
    color: COLORS.primaryLight,
    fontWeight: '600',
  },
  brandsScrollContent: {
    gap: 10,
  },
  brandChip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
  },
  brandChipText: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: '500',
  },
});

export default HomeScreen;
