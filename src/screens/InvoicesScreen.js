import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Theme } from '../styles/theme';
import {
  Menu,
  Bell,
  Search,
  SlidersHorizontal,
  Download,
  ChevronRight,
} from 'lucide-react-native';

const tabs = ['Orders', 'Offers', 'Collections'];

const invoicesData = [
  {
    id: 'INV245089',
    customer: 'Sharma Electricals',
    amount: '₹42,860',
    status: 'Paid',
    date: '14 May 2024',
    dueDate: '28 May 2024',
  },
  {
    id: 'INV245072',
    customer: 'Gupta Enterprises',
    amount: '₹31,240',
    status: 'Pending',
    date: '10 May 2024',
    dueDate: '24 May 2024',
  },
  {
    id: 'INV245058',
    customer: 'Verma Traders',
    amount: '₹18,750',
    status: 'Paid',
    date: '06 May 2024',
    dueDate: '20 May 2024',
  },
  {
    id: 'INV245041',
    customer: 'Khandelwal & Sons',
    amount: '₹9,560',
    status: 'Overdue',
    date: '28 Apr 2024',
    dueDate: '12 May 2024',
  },
  {
    id: 'INV245033',
    customer: 'Agarwal Electricals',
    amount: '₹15,680',
    status: 'Paid',
    date: '22 Apr 2024',
    dueDate: '06 May 2024',
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Paid':
      return { bg: Theme.colors.successBg, color: Theme.colors.success };
    case 'Pending':
      return { bg: Theme.colors.warningBg, color: Theme.colors.warning };
    case 'Overdue':
      return { bg: Theme.colors.errorBg, color: Theme.colors.error };
    default:
      return { bg: Theme.colors.infoBg, color: Theme.colors.info };
  }
};

export default function InvoicesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Orders');
  const [searchText, setSearchText] = useState('');

  const filteredInvoices = invoicesData.filter(
    (inv) =>
      inv.id.toLowerCase().includes(searchText.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderInvoiceCard = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    return (
      <View style={styles.card}>
        {/* Top row: Invoice #, Date, Status */}
        <View style={styles.cardTop}>
          <View style={styles.cardTopLeft}>
            <Text style={styles.invoiceId}>{item.id}</Text>
            <Text style={styles.invoiceDate}>{item.date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* Customer name & amount */}
        <View style={styles.cardMiddle}>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>

        {/* Bottom: Due date & Download */}
        <View style={styles.cardBottom}>
          <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
          <TouchableOpacity style={styles.downloadLink} activeOpacity={0.6}>
            <Download size={14} color={Theme.colors.primary} />
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Profile')}>
          <Menu size={24} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.logoText}>JTC</Text>
        <TouchableOpacity style={styles.bellWrapper} activeOpacity={0.6} onPress={() => navigation.navigate('Notifications')}>
          <Bell size={22} color={Theme.colors.textDark} />
          <View style={styles.bellBadge}>
            <Text style={styles.bellBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Invoices</Text>
      </View>

      {/* Tab Row */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search + Filter */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Search size={18} color={Theme.colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search invoices..."
            placeholderTextColor={Theme.colors.textLight}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <SlidersHorizontal size={18} color={Theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Invoice List */}
      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id}
        renderItem={renderInvoiceCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No invoices found</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: Theme.colors.white,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.heading,
    letterSpacing: 1,
  },
  bellWrapper: {
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
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
    fontSize: 9,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
  titleRow: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: Theme.colors.white,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.heading,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: Theme.colors.white,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.colors.bgMain,
  },
  tabActive: {
    backgroundColor: Theme.colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.textMuted,
  },
  tabTextActive: {
    color: Theme.colors.white,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 10,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.textDark,
    padding: 0,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    gap: 12,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTopLeft: {
    gap: 2,
  },
  invoiceId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  invoiceDate: {
    fontSize: 11,
    color: Theme.colors.textLight,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  cardMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.textBody || Theme.colors.textDark,
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
    paddingTop: 10,
  },
  dueDate: {
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  downloadLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  downloadText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: Theme.colors.textMuted,
  },
});
