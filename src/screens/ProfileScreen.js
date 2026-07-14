import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import { Theme } from '../styles/theme';
import {
  Building2,
  FileText,
  CreditCard,
  BarChart3,
  Users,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

const menuItems = [
  {
    icon: Building2,
    label: 'Company Details',
    iconColor: '#2563EB',
    iconBg: '#DBEAFE',
  },
  {
    icon: FileText,
    label: 'GST & Documents',
    iconColor: '#16A34A',
    iconBg: '#DCFCE7',
  },
  {
    icon: CreditCard,
    label: 'Credit Limit',
    iconColor: '#F5851F',
    iconBg: '#FFF3E6',
    rightText: '₹ 5,00,000',
    route: 'Payments',
  },
  {
    icon: BarChart3,
    label: 'Account Summary',
    iconColor: '#7C3AED',
    iconBg: '#EDE9FE',
    route: 'AccountSummary',
  },
  {
    icon: Users,
    label: 'Users & Staff',
    iconColor: '#0D9488',
    iconBg: '#CCFBF1',
  },
  {
    icon: Lock,
    label: 'Change Password',
    iconColor: '#6B7280',
    iconBg: '#F3F4F6',
  },
  {
    icon: HelpCircle,
    label: 'Help & Support',
    iconColor: '#2563EB',
    iconBg: '#DBEAFE',
    route: 'Support',
  },
];

const logoutItem = {
  icon: LogOut,
  label: 'Logout',
  iconColor: '#DC2626',
  iconBg: '#FEE2E2',
  isLogout: true,
};

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.replace('Welcome'),
        },
      ]
    );
  };

  const renderMenuItem = (item, index, isLast = false) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.menuItem,
          !isLast && !item.isLogout && styles.menuItemBorder,
        ]}
        activeOpacity={0.6}
        onPress={
          item.isLogout
            ? handleLogout
            : item.route
            ? () => navigation.navigate(item.route)
            : undefined
        }
      >
        <View style={styles.menuItemLeft}>
          <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
            <IconComponent size={18} color={item.iconColor} />
          </View>
          <Text
            style={[
              styles.menuItemLabel,
              item.isLogout && { color: Theme.colors.error },
            ]}
          >
            {item.label}
          </Text>
        </View>
        <View style={styles.menuItemRight}>
          {item.rightText && (
            <Text style={styles.menuItemRightText}>{item.rightText}</Text>
          )}
          {!item.isLogout && (
            <ChevronRight size={18} color={Theme.colors.textLight} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.primaryDark} />

      {/* Dark Navy Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SE</Text>
        </View>
        <Text style={styles.name}>Sharma Electricals</Text>
        <View style={styles.dealerBadge}>
          <Text style={styles.dealerCode}>Dealer Code: JTCD00045</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu Card */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) =>
            renderMenuItem(item, index, index === menuItems.length - 1)
          )}
        </View>

        {/* Logout Card */}
        <View style={styles.menuCard}>
          {renderMenuItem(logoutItem, 'logout', true)}
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
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.heading,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.white,
    fontFamily: Theme.fonts.heading,
  },
  dealerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  dealerCode: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  body: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  menuCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.bodySemiBold,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemRightText: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
});
