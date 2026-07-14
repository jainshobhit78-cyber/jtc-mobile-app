import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Theme } from '../styles/theme';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('password');

  const handleLogin = () => {
    navigation.replace('CustomerTabs');
  };

  const handleOTPLogin = () => {
    setActiveTab('otp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>JTC</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        {/* Tab Toggle */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'password' && styles.tabActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setActiveTab('password')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'password' && styles.tabTextActive,
              ]}
            >
              Login with Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'otp' && styles.tabActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setActiveTab('otp')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'otp' && styles.tabTextActive,
              ]}
            >
              Login with OTP
            </Text>
          </TouchableOpacity>
        </View>

        {/* Phone Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <View style={styles.prefixContainer}>
              <Text style={styles.prefixText}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your phone number"
              placeholderTextColor={Theme.colors.textLight}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        {/* Password Input (only for password tab) */}
        {activeTab === 'password' && (
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor={Theme.colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                activeOpacity={0.7}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={Theme.colors.textMuted} />
                ) : (
                  <Eye size={20} color={Theme.colors.textMuted} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Remember Me & Forgot Password */}
        {activeTab === 'password' && (
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.7}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxChecked,
                ]}
              >
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember Me</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.8}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Divider */}
        {activeTab === 'password' && (
          <>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* OTP Button */}
            <TouchableOpacity
              style={styles.otpButton}
              activeOpacity={0.8}
              onPress={handleOTPLogin}
            >
              <Text style={styles.otpButtonText}>Login with OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerLink}>Register Now &gt;</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 32,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.white,
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: Theme.radii.button,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: Theme.colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.colors.textMuted,
  },
  tabTextActive: {
    color: Theme.colors.white,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.colors.textDark,
    marginBottom: 6,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.button,
    backgroundColor: Theme.colors.inputBg,
    overflow: 'hidden',
  },
  prefixContainer: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Theme.colors.border,
    backgroundColor: '#F3F4F6',
  },
  prefixText: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.colors.textDark,
  },
  phoneInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 14,
    color: Theme.colors.textDark,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.button,
    backgroundColor: Theme.colors.inputBg,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 14,
    color: Theme.colors.textDark,
  },
  eyeIcon: {
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  checkmark: {
    fontSize: 12,
    color: Theme.colors.white,
    fontWeight: 'bold',
  },
  rememberText: {
    fontSize: 13,
    color: Theme.colors.textDark,
  },
  forgotText: {
    fontSize: 13,
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radii.button,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.white,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.border,
  },
  dividerText: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    marginHorizontal: 16,
    fontWeight: '500',
  },
  otpButton: {
    width: '100%',
    height: 50,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    borderRadius: Theme.radii.button,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  otpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 16,
  },
  registerText: {
    fontSize: 14,
    color: Theme.colors.textMuted,
  },
  registerLink: {
    fontSize: 14,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
