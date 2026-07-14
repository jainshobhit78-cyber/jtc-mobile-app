import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(30)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const brandsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo fades in (opacity 0→1, 800ms)
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Text slides up (translateY 30→0, 600ms) with fade
    Animated.parallel([
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 600,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Brands fade in
    Animated.timing(brandsOpacity, {
      toValue: 1,
      duration: 600,
      delay: 800,
      useNativeDriver: true,
    }).start();

    // Auto-navigate to Welcome after 2.5s
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, logoOpacity, textTranslateY, textOpacity, brandsOpacity]);

  const brandNames = ['Crompton', 'KEI', 'POLYCAB', 'Havells', 'Finolex'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.primaryDark} />

      <View style={styles.content}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>JTC</Text>
          </View>
        </Animated.View>

        {/* Company Name */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <Text style={styles.companyName}>JAIN TRADING CORPORATION</Text>
          <Text style={styles.tagline}>Industrial • Electrical • Solar Solutions</Text>
          <Text style={styles.subtitle}>Authorised Dealer & Distribution Partner</Text>
        </Animated.View>
      </View>

      {/* Brand Names */}
      <Animated.View style={[styles.brandsContainer, { opacity: brandsOpacity }]}>
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    letterSpacing: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.white,
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 12,
    color: Theme.colors.white,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    color: Theme.colors.white,
    opacity: 0.85,
    textAlign: 'center',
  },
  brandsContainer: {
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  brandsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  brandName: {
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  brandSeparator: {
    fontSize: 11,
    color: '#6B7280',
    marginHorizontal: 6,
  },
});

export default SplashScreen;
