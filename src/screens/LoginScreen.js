import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Theme } from '../styles/theme';
import { StateContext } from '../context/StateContext';
import { ArrowLeft, Lock, User, Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen({ route, navigation }) {
  const { role } = route.params || { role: 'customer' };
  const { setUser } = useContext(StateContext);
  
  const [b2bCode, setB2bCode] = useState(role === 'customer' ? 'JTCDE0245' : 'AGT001');
  const [passcode, setPasscode] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!b2bCode.trim() || !passcode.trim()) {
      Alert.alert("Input Error", "Please enter your credential details.");
      return;
    }

    if (role === 'customer') {
      // Mock Login Successful
      setUser({
        code: b2bCode,
        name: "Sharma Electricals",
        owner: "Dev Sharma",
        phone: "9876543210",
        email: "sharma@example.com",
        address: "123 Main St, Industrial Area, Kanpur, UP",
        gstin: "09ABCDE1234F1Z5",
        creditLimit: 500000.00,
        outstanding: 124560.00,
        city: "Kanpur"
      });
      navigation.replace('CustomerTabs');
    } else {
      Alert.alert("Field Agent Portal", "Logged in successfully as Field Agent.");
      // Agent navigation or similar - we can show user/customer tabs directly since we focus on Customer App native flow.
      navigation.replace('CustomerTabs');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          
          {/* Back button */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('Welcome')}>
            <ArrowLeft size={20} color={Theme.colors.textDark} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          {/* Heading */}
          <View style={styles.header}>
            <Text style={styles.title}>Secure Login</Text>
            <Text style={styles.subtitle}>
              {role === 'customer' 
                ? 'JTC B2B Customer & Dealer Distribution Console' 
                : 'JTC Collection Agent Route Console'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Input 1 */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {role === 'customer' ? 'B2B Client / Dealer Code' : 'Collection Agent ID'}
              </Text>
              <View style={styles.inputWrapper}>
                <User size={18} color={Theme.colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={role === 'customer' ? 'e.g. JTCDE0245' : 'e.g. AGT001'}
                  placeholderTextColor={Theme.colors.textLight}
                  value={b2bCode}
                  onChangeText={setB2bCode}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            {/* Input 2 */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>B2B Secure Passcode PIN</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color={Theme.colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter 6-digit passcode"
                  placeholderTextColor={Theme.colors.textLight}
                  secureTextEntry={!showPassword}
                  value={passcode}
                  onChangeText={setPasscode}
                  keyboardType="numeric"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  {showPassword ? <EyeOff size={18} color={Theme.colors.textMuted} /> : <Eye size={18} color={Theme.colors.textMuted} />}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotText}>
              <Text style={styles.forgotTextLabel}>Forgot Passcode?</Text>
            </TouchableOpacity>
          </View>

          {/* Action button */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
              <Text style={styles.loginButtonText}>Authenticate Credentials</Text>
            </TouchableOpacity>
            
            <View style={styles.secTextContainer}>
              <Text style={styles.secText}>Having trouble logging in? </Text>
              <TouchableOpacity>
                <Text style={styles.secTextLink}>Contact B2B Support</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bgMain,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 16,
    marginTop: 10,
  },
  backText: {
    fontSize: 14,
    color: Theme.colors.textDark,
    marginLeft: 6,
    fontWeight: '600',
  },
  header: {
    marginTop: 30,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 13,
    color: Theme.colors.textMuted,
    marginTop: 6,
    lineHeight: 18,
  },
  form: {
    gap: 20,
    flex: 1,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.input,
    height: Theme.heights.input,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    color: Theme.colors.textDark,
    fontSize: 14,
    fontWeight: '500',
  },
  eyeIcon: {
    padding: 8,
  },
  forgotText: {
    alignSelf: 'flex-end',
  },
  forgotTextLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  actions: {
    marginTop: 40,
    gap: 16,
  },
  loginButton: {
    backgroundColor: Theme.colors.primary,
    height: Theme.heights.button,
    borderRadius: Theme.radii.button,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  loginButtonText: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  secTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secText: {
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  secTextLink: {
    fontSize: 12,
    color: Theme.colors.primary,
    fontWeight: 'bold',
  }
});
