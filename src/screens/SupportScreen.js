import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Theme } from '../styles/theme';
import { ArrowLeft, MessageSquare, Phone, Mail, HelpCircle, ArrowRight } from 'lucide-react-native';

const supportOptions = [
  {
    icon: MessageSquare,
    title: 'Raise a Ticket',
    desc: 'Report invoice discrepancy, shipping issues or billing errors.',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    action: () => {},
  },
  {
    icon: Phone,
    title: 'Call Us',
    desc: 'Speak directly with our dealer support desk at Kanpur.',
    color: '#10B981',
    bgColor: '#ECFDF5',
    action: () => Linking.openURL('tel:+919876543210'),
  },
  {
    icon: Mail,
    title: 'Email Us',
    desc: 'Write to our accounts or sales team for query resolution.',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    action: () => Linking.openURL('mailto:support@jaintrading.com'),
  },
  {
    icon: HelpCircle,
    title: 'Browse FAQs',
    desc: 'Find answers about order limits, delivery terms and payments.',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    action: (nav) => nav.navigate('FAQ'),
  },
];

export default function SupportScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.6}>
          <ArrowLeft size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support Helpdesk</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>How can we help you?</Text>
        <Text style={styles.subtitle}>Get in touch with our team for swift resolution</Text>

        <View style={styles.optionsList}>
          {supportOptions.map((opt, index) => {
            const Icon = opt.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.optCard}
                onPress={() => opt.action(navigation)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconCircle, { backgroundColor: opt.bgColor }]}>
                  <Icon size={20} color={opt.color} />
                </View>
                <View style={styles.optText}>
                  <Text style={styles.optTitle}>{opt.title}</Text>
                  <Text style={styles.optDesc}>{opt.desc}</Text>
                </View>
                <ArrowRight size={16} color={Theme.colors.textLight} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Support hours card */}
        <View style={styles.hoursCard}>
          <Text style={styles.hoursTitle}>Working Hours</Text>
          <Text style={styles.hoursText}>Monday - Saturday: 09:00 AM to 07:00 PM</Text>
          <Text style={styles.hoursSubtext}>Urgent query resolution post working hours is available via WhatsApp bot.</Text>
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
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.heading,
  },
  subtitle: {
    fontSize: 13,
    color: Theme.colors.textMuted,
    marginTop: 4,
    marginBottom: 24,
  },
  optionsList: {
    gap: 12,
    marginBottom: 24,
  },
  optCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    alignItems: 'center',
    ...Theme.shadows.card,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optText: {
    flex: 1,
    marginRight: 8,
    gap: 2,
  },
  optTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  optDesc: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    lineHeight: 16,
  },
  hoursCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  hoursTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D97706',
  },
  hoursText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#92400E',
  },
  hoursSubtext: {
    fontSize: 11,
    color: '#B45309',
    lineHeight: 16,
    marginTop: 4,
  },
});
