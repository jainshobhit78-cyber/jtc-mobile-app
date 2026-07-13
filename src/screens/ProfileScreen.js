import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Theme } from '../styles/theme';
import { StateContext } from '../context/StateContext';
import { User, Phone, Mail, MapPin, Receipt, Shield, RefreshCw, LogOut } from 'lucide-react-native';

export default function ProfileScreen({ navigation }) {
  const { user, resetDatabase } = useContext(StateContext);

  const handleReset = () => {
    Alert.alert(
      "Reset B2B Data",
      "Re-initialize databases to default values? This clears local storage.",
      [
        { text: "Cancel" },
        { 
          text: "Reset DB", 
          onPress: async () => {
            await resetDatabase();
            Alert.alert("Database Reset", "Re-initialized local databases. Logging out.");
            navigation.replace('Welcome');
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to end your active B2B session?",
      [
        { text: "Cancel" },
        { text: "Sign Out", onPress: () => navigation.replace('Welcome') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SE</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.code}>DEALER CODE: {user.code}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        
        {/* Registration details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>B2B Account Details</Text>
          
          <View style={styles.detailRow}>
            <User size={16} color={Theme.colors.textMuted} />
            <View>
              <Text style={styles.label}>Proprietor / Owner</Text>
              <Text style={styles.value}>{user.owner}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Receipt size={16} color={Theme.colors.textMuted} />
            <View>
              <Text style={styles.label}>GSTIN Registration</Text>
              <Text style={styles.value}>{user.gstin}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Phone size={16} color={Theme.colors.textMuted} />
            <View>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{user.phone}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Mail size={16} color={Theme.colors.textMuted} />
            <View>
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <MapPin size={16} color={Theme.colors.textMuted} />
            <View>
              <Text style={styles.label}>Billing Address</Text>
              <Text style={styles.value}>{user.address}</Text>
            </View>
          </View>
        </View>

        {/* Configurations */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>System Tools</Text>

          <TouchableOpacity style={styles.toolBtn} onPress={handleReset}>
            <View style={styles.toolBtnLeft}>
              <RefreshCw size={16} color={Theme.colors.accent} />
              <Text style={styles.toolBtnText}>Reset Local Storage Data</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolBtn} onPress={handleLogout}>
            <View style={styles.toolBtnLeft}>
              <LogOut size={16} color={Theme.colors.error} />
              <Text style={[styles.toolBtnText, { color: Theme.colors.error }]}>End Session (Log Out)</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Shield size={14} color={Theme.colors.textLight} />
          <Text style={styles.footerText}>JTC distribution portal console v2.0</Text>
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
    paddingTop: 30,
    paddingBottom: 30,
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
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.white,
    fontFamily: 'Poppins-Bold',
  },
  code: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#90CAF9',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  body: {
    padding: 24,
    gap: 16,
  },
  sectionCard: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.card,
    padding: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    textTransform: 'uppercase',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.bgMain,
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    color: Theme.colors.textMuted,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.textDark,
    marginTop: 2,
    lineHeight: 18,
  },
  toolBtn: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.bgMain,
  },
  toolBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toolBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 10,
    color: Theme.colors.textLight,
    fontWeight: 'bold',
  }
});
