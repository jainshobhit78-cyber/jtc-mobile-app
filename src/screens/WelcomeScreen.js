import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Theme } from '../styles/theme';

const WelcomeScreen = ({ navigation }) => {
  const features = [
    'Wide Range of Quality Products',
    'Real-time Stock Availability & 24/7 Ordering',
    'Book Stock & Get Instant Invoice',
    'Track Orders & Manage Account Easily',
  ];

  const brandNames = ['Crompton', 'KEI', 'POLYCAB', 'Havells', 'Finolex'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>JTC</Text>
          </View>
          <Text style={styles.companyName}>JAIN TRADING CORPORATION</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Your Trusted Partner For All Your Needs</Text>

        {/* Feature Bullets */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Brand Names */}
        <View style={styles.brandsRow}>
          {brandNames.map((brand, index) => (
            <React.Fragment key={brand}>
              <Text style={styles.brandName}>{brand}</Text>
              {index < brandNames.length - 1 && (
                <Text style={styles.brandSeparator}>•</Text>
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Loading */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Theme.colors.primary} />
          <Text style={styles.loadingText}>Loading Product Catalogue...</Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.loginLink}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLinkText}>Log In to Your Account</Text>
        </TouchableOpacity>

        {/* Language Toggle */}
        <TouchableOpacity style={styles.languageToggle} activeOpacity={0.7}>
          <Text style={styles.languageText}>English 🌐</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>Powered by SATOSHI Entertainment Pvt. Ltd.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.white,
    letterSpacing: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.primaryDark,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: Theme.colors.primary,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  featuresContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.primary,
    marginTop: 5,
    marginRight: 12,
  },
  featureText: {
    fontSize: 13,
    color: Theme.colors.textDark,
    flex: 1,
    lineHeight: 18,
  },
  brandsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  brandName: {
    fontSize: 11,
    color: Theme.colors.textLight,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  brandSeparator: {
    fontSize: 11,
    color: Theme.colors.textLight,
    marginHorizontal: 6,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    marginLeft: 8,
  },
  getStartedButton: {
    width: '100%',
    height: 50,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radii.button,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.white,
  },
  loginLink: {
    marginBottom: 20,
  },
  loginLinkText: {
    fontSize: 14,
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  languageToggle: {
    marginBottom: 16,
  },
  languageText: {
    fontSize: 13,
    color: Theme.colors.textMuted,
  },
  footer: {
    fontSize: 10,
    color: Theme.colors.textLight,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
