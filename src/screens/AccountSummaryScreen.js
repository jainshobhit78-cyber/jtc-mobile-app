import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Theme } from '../styles/theme';
import { ArrowLeft, Wallet, AlertCircle, TrendingUp, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AccountSummaryScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.6}>
          <ArrowLeft size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Summary</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Credit Limit Circular Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>Credit Limit Utilization</Text>
          <View style={styles.circleContainer}>
            {/* Simple representation of circular chart */}
            <View style={styles.mockProgressCircle}>
              <Text style={styles.progressPercent}>75%</Text>
              <Text style={styles.progressSubtext}>Used</Text>
            </View>
          </View>
          <Text style={styles.limitText}>
            You have used <Text style={{ fontWeight: 'bold', color: Theme.colors.primary }}>₹ 1,24,560.00</Text> out of your total ₹ 5,00,000.00 limit.
          </Text>
        </View>

        {/* Details Cards Grid */}
        <View style={styles.grid}>
          <View style={styles.gridCard}>
            <View style={[styles.iconCircle, { backgroundColor: Theme.colors.primarySoft }]}>
              <Wallet size={18} color={Theme.colors.primary} />
            </View>
            <Text style={styles.cardVal}>₹ 3,75,440.00</Text>
            <Text style={styles.cardLabel}>Available Credit</Text>
          </View>

          <View style={styles.gridCard}>
            <View style={[styles.iconCircle, { backgroundColor: Theme.colors.errorBg }]}>
              <AlertCircle size={18} color={Theme.colors.error} />
            </View>
            <Text style={styles.cardVal}>₹ 24,560.00</Text>
            <Text style={styles.cardLabel}>Overdue Balance</Text>
          </View>
        </View>

        {/* Business Sales Info */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Sales Dashboard</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statsLeft}>
              <TrendingUp size={20} color={Theme.colors.success} />
              <View>
                <Text style={styles.statsLabelText}>This Month's Sales</Text>
                <Text style={styles.statsValText}>₹ 86,430.00</Text>
              </View>
            </View>
            <Text style={styles.growthBadge}>+12.4%</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statsLeft}>
              <Calendar size={20} color={Theme.colors.textMuted} />
              <View>
                <Text style={styles.statsLabelText}>Last Month's Sales</Text>
                <Text style={styles.statsValText}>₹ 1,12,340.00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ledger Link */}
        <TouchableOpacity style={styles.ledgerBtn} activeOpacity={0.8}>
          <Text style={styles.ledgerBtnText}>View Detailed Account Ledger</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.heading,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  progressCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 20,
    alignItems: 'center',
    ...Theme.shadows.card,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    marginBottom: 16,
  },
  circleContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  mockProgressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: Theme.colors.primary,
    borderLeftColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercent: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.heading,
  },
  progressSubtext: {
    fontSize: 11,
    color: Theme.colors.textMuted,
  },
  limitText: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCard: {
    flex: 1,
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    gap: 8,
    ...Theme.shadows.card,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardVal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  cardLabel: {
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  statsCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    ...Theme.shadows.card,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.heading,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  statsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statsLabelText: {
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  statsValText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  growthBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Theme.colors.success,
    backgroundColor: Theme.colors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: 14,
  },
  ledgerBtn: {
    height: 48,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radii.button,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.button,
  },
  ledgerBtnText: {
    color: Theme.colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Theme.fonts.bodyBold,
  },
});
