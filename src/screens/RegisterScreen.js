import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Theme } from '../styles/theme';
import { ArrowLeft } from 'lucide-react-native';

export default function RegisterScreen({ navigation }) {
  const [businessName, setBusinessName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');

  const handleRegister = () => {
    navigation.replace('CustomerTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <View style={styles.stepIndicator}>
          <View style={[styles.stepDot, styles.stepDotActive]} />
          <View style={styles.stepDot} />
          <View style={styles.stepDot} />
          <View style={styles.stepDot} />
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Dealer Account</Text>
        <Text style={styles.subtitle}>Join us and grow your business</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Business Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Sharma Electricals"
              placeholderTextColor={Theme.colors.textLight}
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number *</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.phonePrefix}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="98765 43210"
                placeholderTextColor={Theme.colors.textLight}
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="sharmaelectricals@gmail.com"
              placeholderTextColor={Theme.colors.textLight}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>GST Number (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="09ABCDE1234F1Z5"
              placeholderTextColor={Theme.colors.textLight}
              autoCapitalize="characters"
              value={gstNumber}
              onChangeText={setGstNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Proprietor / Owner Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Rohit Sharma"
              placeholderTextColor={Theme.colors.textLight}
              value={ownerName}
              onChangeText={setOwnerName}
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
          <Text style={styles.loginLinkText}>
            Already have an account? <Text style={{ color: Theme.colors.primary, fontWeight: 'bold' }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 6,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.border,
  },
  stepDotActive: {
    backgroundColor: Theme.colors.primary,
    width: 20,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.heading,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.colors.textMuted,
    marginTop: 4,
    fontFamily: Theme.fonts.body,
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.bodyMedium,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: Theme.colors.inputBorder,
    borderRadius: Theme.radii.input,
    paddingHorizontal: 14,
    backgroundColor: Theme.colors.inputBg,
    fontSize: 14,
    color: Theme.colors.textDark,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    height: 46,
    borderWidth: 1,
    borderColor: Theme.colors.inputBorder,
    borderRadius: Theme.radii.input,
    backgroundColor: Theme.colors.inputBg,
    alignItems: 'center',
  },
  phonePrefix: {
    paddingLeft: 14,
    paddingRight: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.textDark,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    paddingRight: 14,
    fontSize: 14,
    color: Theme.colors.textDark,
  },
  btn: {
    height: 48,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radii.button,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    ...Theme.shadows.button,
  },
  btnText: {
    color: Theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Theme.fonts.bodyBold,
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 13,
    color: Theme.colors.textMuted,
    fontFamily: Theme.fonts.body,
  },
});
