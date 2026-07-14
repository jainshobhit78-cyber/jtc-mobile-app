import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Theme } from '../styles/theme';
import {
  Menu,
  Bell,
  Search,
  SlidersHorizontal,
  ClipboardList,
  Truck,
  FileText,
  CheckCircle2,
  XCircle,
  Package,
  RefreshCw,
  Download,
  ChevronRight,
  Plus,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const STATUS_CONFIG = {
  Confirmed: {
    color: Theme.colors.success,
    bg: Theme.colors.successBg,
    icon: ClipboardList,
  },
  Packed: {
    color: Theme.colors.warning,
    bg: Theme.colors.warningBg,
    icon: Truck,
  },
  'Invoice Generated': {
    color: Theme.colors.info,
    bg: Theme.colors.infoBg,
    icon: FileText,
  },
  Delivered: {
    color: Theme.colors.success,
    bg: Theme.colors.successBg,
    icon: CheckCircle2,
  },
  Cancelled: {
    color: Theme.colors.error,
    bg: Theme.colors.errorBg,
    icon: XCircle,
  },
};

const TABS = [
  { label: 'All Orders', count: null },
  { label: 'Current', count: 12 },
  { label: 'Completed', count: 86 },
  { label: 'Cancelled', count: 4 },
  { label: 'Drafts', count: 3 },
];

const ORDERS = [
  {
    id: 'JTCORD2405132',
    date: '12 May 2024',
    status: 'Confirmed',
    amount: 25430,
    items: 23,
    info: 'Expected delivery by 18 May',
  },
  {
    id: 'JTCORD2405108',
    date: '10 May 2024',
    status: 'Packed',
    amount: 18750,
    items: 17,
    info: 'Shipped via BlueDart',
  },
  {
    id: 'JTCORD2405089',
    date: '08 May 2024',
    status: 'Invoice Generated',
    amount: 42860,
    items: 31,
    info: 'Invoice #INV-2024-089',
  },
  {
    id: 'JTCORD2405062',
    date: '06 May 2024',
    status: 'Delivered',
    amount: 31240,
    items: 28,
    info: 'Delivered on 09 May',
  },
  {
    id: 'JTCORD2405031',
    date: '03 May 2024',
    status: 'Cancelled',
    amount: 9560,
    items: 8,
    info: 'Cancelled by dealer',
  },
];

export default function OrdersScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState('');

  const renderTabChip = (tab, index) => {
    const isActive = activeTab === index;
    return (
      <TouchableOpacity
        key={index}
        style={[styles.tabChip, isActive && styles.tabChipActive]}
        onPress={() => setActiveTab(index)}
        activeOpacity={0.7}
      >
        <Text style={[styles.tabChipText, isActive && styles.tabChipTextActive]}>
          {tab.label}
        </Text>
        {tab.count !== null && (
          <View style={[styles.tabBadge, isActive && styles.tabBadgeActive]}>
            <Text style={[styles.tabBadgeText, isActive && styles.tabBadgeTextActive]}>
              {tab.count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderOrderCard = ({ item }) => {
    const config = STATUS_CONFIG[item.status];
    const StatusIcon = config.icon;
    const isCancelled = item.status === 'Cancelled';
    const isDelivered = item.status === 'Delivered';

    return (
      <View style={styles.orderCard}>
        {/* Top row */}
        <View style={styles.cardTopRow}>
          <View style={styles.cardTopLeft}>
            <View style={[styles.statusIconCircle, { backgroundColor: config.bg }]}>
              <StatusIcon size={18} color={config.color} />
            </View>
            <View>
              <Text style={styles.orderId}>{item.id}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
            </View>
          </View>
          <View style={styles.cardTopRight}>
            <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
              <Text style={[styles.statusText, { color: config.color }]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.orderAmount}>
              ₹{item.amount.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.cardDivider} />

        {/* Bottom row */}
        <View style={styles.cardBottomRow}>
          <View style={styles.itemsInfo}>
            <Package size={14} color={Theme.colors.textMuted} />
            <Text style={styles.itemsText}>{item.items} Items</Text>
            <Text style={styles.infoText}>• {item.info}</Text>
          </View>
          <View style={styles.actionsRow}>
            {isDelivered && (
              <>
                <TouchableOpacity style={styles.reorderBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Cart')}>
                  <RefreshCw size={13} color={Theme.colors.white} />
                  <Text style={styles.reorderBtnText}>Reorder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Invoices')}>
                  <Download size={13} color={Theme.colors.primary} />
                  <Text style={styles.linkBtnText}>Invoice</Text>
                </TouchableOpacity>
              </>
            )}
            {isCancelled && (
              <TouchableOpacity style={styles.reorderBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Brands')}>
                <RefreshCw size={13} color={Theme.colors.white} />
                <Text style={styles.reorderBtnText}>Reorder</Text>
              </TouchableOpacity>
            )}
            {!isDelivered && !isCancelled && (
              <TouchableOpacity style={styles.viewDetailsBtn} activeOpacity={0.7} onPress={() => navigation.navigate('DispatchTracking', { orderId: item.id })}>
                <Text style={styles.viewDetailsText}>View Details</Text>
                <ChevronRight size={14} color={Theme.colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Profile')}>
          <Menu size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.logoText}>JTC</Text>
        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7} onPress={() => navigation.navigate('Notifications')}>
          <Bell size={22} color={Theme.colors.textDark} />
          <View style={styles.bellBadge}>
            <Text style={styles.bellBadgeText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Title section */}
      <View style={styles.titleSection}>
        <Text style={styles.pageTitle}>My Orders</Text>
        <Text style={styles.pageSubtitle}>
          Track, manage and repeat your orders
        </Text>
      </View>

      {/* Search + Filter */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Search size={18} color={Theme.colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Order ID, Product, Brand..."
            placeholderTextColor={Theme.colors.textLight}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <SlidersHorizontal size={18} color={Theme.colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Tab chips */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {TABS.map((tab, index) => renderTabChip(tab, index))}
        </ScrollView>
      </View>

      {/* Orders list */}
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => navigation.navigate('Brands')}>
        <Plus size={18} color={Theme.colors.white} />
        <Text style={styles.fabText}>Place New Order</Text>
      </TouchableOpacity>
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
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
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
    paddingBottom: 8,
    backgroundColor: Theme.colors.white,
    gap: 10,
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

  /* ───── Tabs ───── */
  tabsContainer: {
    backgroundColor: Theme.colors.white,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  tabsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Theme.radii.chip,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.white,
    gap: 6,
  },
  tabChipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  tabChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.textDark,
  },
  tabChipTextActive: {
    color: Theme.colors.white,
  },
  tabBadge: {
    backgroundColor: Theme.colors.bgMain,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
  },
  tabBadgeTextActive: {
    color: Theme.colors.white,
  },

  /* ───── Orders list ───── */
  listContainer: {
    padding: 16,
    paddingBottom: 140,
  },

  /* ───── Order card ───── */
  orderCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    marginBottom: 12,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  orderDate: {
    fontSize: 11,
    color: Theme.colors.textLight,
    marginTop: 2,
  },
  cardTopRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Theme.radii.badge,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  orderAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },

  /* ───── Card divider ───── */
  cardDivider: {
    height: 1,
    backgroundColor: Theme.colors.borderLight,
    marginVertical: 12,
  },

  /* ───── Card bottom ───── */
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  itemsText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.textDark,
  },
  infoText: {
    fontSize: 11,
    color: Theme.colors.textMuted,
    marginLeft: 2,
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Theme.radii.button,
  },
  reorderBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  linkBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },

  /* ───── FAB ───── */
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: Theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 25,
    gap: 8,
    ...Theme.shadows.button,
  },
  fabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
});
