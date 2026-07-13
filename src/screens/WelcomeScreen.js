import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Theme } from '../styles/theme';
import { Zap, ShieldCheck } from 'lucide-react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.primaryDark} />
      
      {/* Header Splash */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Zap size={36} color={Theme.colors.primary} strokeWidth={2.5} />
        </View>
        <Text style={styles.brandTitle}>JAIN TRADING</Text>
        <Text style={styles.brandSubtitle}>ENTERPRISE B2B SYSTEM</Text>
      </View>

      {/* Center Graphics */}
      <View style={styles.illustrations}>
        <View style={styles.badgeContainer}>
          <ShieldCheck size={20} color={Theme.colors.success} />
          <Text style={styles.badgeText}>ERP Integrated & Secured</Text>
        </View>
        <Text style={styles.headline}>Direct distribution & collection management at your fingertips.</Text>
        <Text style={styles.subheadline}>Book bulk inventory items, view outstanding ledgers, and pay invoices instantly.</Text>
      </View>

      {/* Navigation Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.replace('Login', { role: 'customer' })}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Sign In as Dealer / Client</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.replace('Login', { role: 'agent' })}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Sign In as Field Agent</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Jain Trading Corporation © 2026</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E2344', // Theme sidebar color
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Theme.colors.white,
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontSize: 10,
    color: '#94A3B8',
    letterSpacing: 3,
    fontWeight: 'bold',
    marginTop: 4,
  },
  illustrations: {
    alignItems: 'center',
    marginVertical: 40,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 125, 50, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.25)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#81C784',
    marginLeft: 6,
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.white,
    textAlign: 'center',
    lineHeight: 28,
  },
  subheadline: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  actions: {
    gap: 14,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: Theme.colors.primary,
    height: Theme.heights.button,
    borderRadius: Theme.radii.button,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    height: Theme.heights.button,
    borderRadius: Theme.radii.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 10,
    marginTop: 16,
    letterSpacing: 0.5,
  }
});
