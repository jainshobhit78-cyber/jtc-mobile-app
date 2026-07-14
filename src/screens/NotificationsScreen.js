import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Theme } from '../styles/theme';
import {
  ArrowLeft,
  Truck,
  CheckCircle,
  Tag,
  Wallet,
  ClipboardCheck,
  FileText,
} from 'lucide-react-native';

const tabs = ['All', 'Orders', 'Offers', 'Collections'];

const notificationsData = [
  {
    id: '1',
    title: 'Order Out for Delivery',
    description: 'Order JTCORD2405108 is out for delivery. Expected arrival by 4 PM today.',
    timestamp: '10 min ago',
    type: 'order',
    icon: Truck,
    iconColor: '#2563EB',
    iconBg: '#DBEAFE',
    unread: true,
  },
  {
    id: '2',
    title: 'Payment Received',
    description: 'Payment of ₹35,430 received for INV24012. Balance updated in ledger.',
    timestamp: '1 hr ago',
    type: 'collection',
    icon: CheckCircle,
    iconColor: '#16A34A',
    iconBg: '#DCFCE7',
    unread: true,
  },
  {
    id: '3',
    title: 'Special Offer: 15% off on KEI Wires',
    description: 'Limited period offer! Get 15% discount on KEI 1.5 sqmm & 2.5 sqmm wires. Valid till 20th July.',
    timestamp: '3 hrs ago',
    type: 'offer',
    icon: Tag,
    iconColor: '#F5851F',
    iconBg: '#FFF3E6',
    unread: true,
  },
  {
    id: '4',
    title: 'Collection Received',
    description: 'Collection of ₹24,560 from Gupta Enterprises has been recorded successfully.',
    timestamp: '5 hrs ago',
    type: 'collection',
    icon: Wallet,
    iconColor: '#7C3AED',
    iconBg: '#EDE9FE',
    unread: false,
  },
  {
    id: '5',
    title: 'Order Confirmed',
    description: 'Order JTCORD2405132 has been confirmed and is being processed for dispatch.',
    timestamp: 'Yesterday',
    type: 'order',
    icon: ClipboardCheck,
    iconColor: '#2563EB',
    iconBg: '#DBEAFE',
    unread: false,
  },
  {
    id: '6',
    title: 'Invoice Generated',
    description: 'Invoice INV245089 has been generated for ₹42,860. Download from the Invoices section.',
    timestamp: 'Yesterday',
    type: 'order',
    icon: FileText,
    iconColor: '#2563EB',
    iconBg: '#DBEAFE',
    unread: false,
  },
];

export default function NotificationsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(notificationsData);

  const filteredNotifications =
    activeTab === 'All'
      ? notifications
      : notifications.filter((n) => {
          if (activeTab === 'Orders') return n.type === 'order';
          if (activeTab === 'Offers') return n.type === 'offer';
          if (activeTab === 'Collections') return n.type === 'collection';
          return true;
        });

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
  };

  const renderNotification = ({ item }) => {
    const IconComponent = item.icon;
    return (
      <View style={[styles.notifCard, item.unread && styles.notifCardUnread]}>
        <View style={styles.notifRow}>
          {/* Icon */}
          <View style={[styles.notifIconCircle, { backgroundColor: item.iconBg }]}>
            <IconComponent size={18} color={item.iconColor} />
          </View>

          {/* Content */}
          <View style={styles.notifContent}>
            <View style={styles.notifTitleRow}>
              <Text style={styles.notifTitle} numberOfLines={1}>
                {item.title}
              </Text>
              {item.unread && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.notifDesc} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.notifTimestamp}>{item.timestamp}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          style={styles.backBtn}
        >
          <ArrowLeft size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tab Chips */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.chip, activeTab === tab && styles.chipActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                activeTab === tab && styles.chipTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notification List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          notifications.some((n) => n.unread) ? (
            <TouchableOpacity
              style={styles.markAllBtn}
              onPress={handleMarkAllRead}
              activeOpacity={0.6}
            >
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No notifications</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.heading,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  chipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.textMuted,
  },
  chipTextActive: {
    color: Theme.colors.white,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  notifCard: {
    backgroundColor: Theme.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
  },
  notifCardUnread: {
    backgroundColor: '#F8FAFF',
  },
  notifRow: {
    flexDirection: 'row',
    gap: 14,
  },
  notifIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  notifContent: {
    flex: 1,
    gap: 4,
  },
  notifTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.textDark,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.info,
  },
  notifDesc: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    lineHeight: 18,
  },
  notifTimestamp: {
    fontSize: 11,
    color: Theme.colors.textLight,
    marginTop: 4,
  },
  markAllBtn: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  markAllText: {
    fontSize: 14,
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
