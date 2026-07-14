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
  Smartphone,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react-native';

const paymentTabs = [
  { key: 'upi', label: 'UPI Payment', icon: Smartphone },
  { key: 'bank', label: 'Bank Transfer', icon: Building },
  { key: 'history', label: 'Payment History', icon: Clock },
];

const paymentsData = [
  {
    id: '1',
    invoice: 'INV245012',
    amount: '₹35,430',
    date: '12 May 2024',
    status: 'Completed',
  },
  {
    id: '2',
    invoice: 'INV245001',
    amount: '₹18,750',
    date: '08 May 2024',
    status: 'Completed',
  },
  {
    id: '3',
    invoice: 'INV244980',
    amount: '₹31,240',
    date: '29 Apr 2024',
    status: 'Completed',
  },
  {
    id: '4',
    invoice: 'INV244961',
    amount: '₹21,560',
    date: '25 Apr 2024',
    status: 'Pending',
  },
];

export default function PaymentsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('history');

  const renderPaymentCard = ({ item }) => {
    const isCompleted = item.status === 'Completed';
    return (
      <View style={styles.paymentCard}>
        <View style={styles.paymentRow}>
          {/* Left: Icon + Details */}
          <View style={styles.paymentLeft}>
            <View
              style={[
                styles.paymentIconCircle,
                {
                  backgroundColor: isCompleted
                    ? Theme.colors.successBg
                    : Theme.colors.warningBg,
                },
              ]}
            >
              {isCompleted ? (
                <CheckCircle size={18} color={Theme.colors.success} />
              ) : (
                <AlertCircle size={18} color={Theme.colors.warning} />
              )}
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentInvoice}>{item.invoice}</Text>
              <Text style={styles.paymentDate}>{item.date}</Text>
            </View>
          </View>

          {/* Right: Amount + Status */}
          <View style={styles.paymentRight}>
            <Text style={styles.paymentAmount}>{item.amount}</Text>
            <View
              style={[
                styles.paymentStatusBadge,
                {
                  backgroundColor: isCompleted
                    ? Theme.colors.successBg
                    : Theme.colors.warningBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.paymentStatusText,
                  {
                    color: isCompleted
                      ? Theme.colors.success
                      : Theme.colors.warning,
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
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
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
            style={styles.backBtn}
          >
            <ArrowLeft size={22} color={Theme.colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Payments</Text>
        </View>
        <TouchableOpacity style={styles.payNowBtn} activeOpacity={0.7}>
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={paymentsData}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Outstanding Amount Card */}
            <View style={styles.outstandingCard}>
              <View style={styles.outstandingContent}>
                <Text style={styles.outstandingAmount}>₹ 1,24,560.00</Text>
                <Text style={styles.outstandingLabel}>Outstanding Amount</Text>
              </View>
            </View>

            {/* Payment Method Tabs */}
            <View style={styles.methodTabRow}>
              {paymentTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <TouchableOpacity
                    key={tab.key}
                    style={[
                      styles.methodTab,
                      isActive && styles.methodTabActive,
                    ]}
                    onPress={() => setActiveTab(tab.key)}
                    activeOpacity={0.7}
                  >
                    <TabIcon
                      size={16}
                      color={
                        isActive
                          ? Theme.colors.primary
                          : Theme.colors.textMuted
                      }
                    />
                    <Text
                      style={[
                        styles.methodTabText,
                        isActive && styles.methodTabTextActive,
                      ]}
                      numberOfLines={1}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Section Title */}
            <Text style={styles.sectionTitle}>Recent Payments</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No payments found</Text>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  payNowBtn: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    ...Theme.shadows.button,
  },
  payNowText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  outstandingCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.primary,
    padding: 20,
    marginBottom: 20,
    ...Theme.shadows.card,
  },
  outstandingContent: {
    gap: 4,
  },
  outstandingAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  outstandingLabel: {
    fontSize: 13,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  methodTabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  methodTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  methodTabActive: {
    backgroundColor: Theme.colors.primarySoft || '#E8EEF8',
    borderColor: Theme.colors.primary,
  },
  methodTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.colors.textMuted,
  },
  methodTabTextActive: {
    color: Theme.colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.heading,
    marginBottom: 14,
  },
  paymentCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDetails: {
    gap: 2,
  },
  paymentInvoice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  paymentDate: {
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  paymentRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  paymentAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  paymentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  paymentStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
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
