import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../styles/theme';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native';

const faqs = [
  {
    q: 'How does credit limit reserve work?',
    a: 'When you place an order, the stock is reserved for 24 or 48 hours depending on your choice. Your available credit limit is reduced by the order value. If you clear the invoice, the credit limit restores automatically. If the reservation expires, the stock is returned to JTC inventory.',
  },
  {
    q: 'What are the delivery charges?',
    a: 'All standard deliveries to dealer warehouses within a 50km radius of the JTC Kanpur hub are free. Outside this range, local freight charges are applicable on actual values and updated on the invoice.',
  },
  {
    q: 'Can I pay via Bank Transfer?',
    a: 'Yes, JTC supports RTGS, NEFT, and IMPS payments. You can get our bank account details under company details and upload the bank transfer transaction receipt under Payments.',
  },
  {
    q: 'How long does dispatch take?',
    a: 'Once booking is confirmed, items are packed within 4 hours. Dispatch leaves our warehouse twice daily at 10:00 AM and 04:00 PM. Delivery status is updated in real-time under orders timeline.',
  },
];

export default function FAQScreen({ navigation }) {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.6}>
          <ArrowLeft size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Frequently Asked FAQs</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Browse FAQs</Text>
        <Text style={styles.subtitle}>Find quick answers to common B2B account operations</Text>

        <View style={styles.list}>
          {faqs.map((faq, index) => {
            const isExpanded = expanded[index];
            return (
              <View key={index} style={styles.faqCard}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleExpand(index)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.question}>{faq.q}</Text>
                  {isExpanded ? (
                    <ChevronUp size={18} color={Theme.colors.textMuted} />
                  ) : (
                    <ChevronDown size={18} color={Theme.colors.textMuted} />
                  )}
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answer}>{faq.a}</Text>
                  </View>
                )}
              </View>
            );
          })}
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
  list: {
    gap: 12,
  },
  faqCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    overflow: 'hidden',
    ...Theme.shadows.card,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  question: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
    paddingTop: 12,
  },
  answer: {
    fontSize: 13,
    color: Theme.colors.textMuted,
    lineHeight: 18,
  },
});
