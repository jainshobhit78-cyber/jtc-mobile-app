import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Theme } from '../styles/theme';
import { Check, Download, Share2, ArrowRight } from 'lucide-react-native';

export default function BookingConfirmationScreen({ navigation, route }) {
  const amount = route?.params?.amount || '₹ 19,906.60';
  const bookingNumber = route?.params?.bookingNumber || 'JTCBOK2405147';

  // Count down timer for 24 hours reservation
  const [timeLeft, setTimeLeft] = useState(23 * 3600 + 45 * 60 + 12);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Checkmark Circle */}
        <View style={styles.successIconContainer}>
          <View style={styles.successIconCircle}>
            <Check size={48} color={Theme.colors.white} strokeWidth={3} />
          </View>
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your stock has been reserved successfully.</Text>

        {/* Card Details */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Booking Number</Text>
            <Text style={styles.valueBold}>{bookingNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reserved Till</Text>
            <Text style={styles.value}>13 May 2024, 09:30 AM</Text>
          </View>

          <View style={styles.divider} />

          {/* Countdown timer */}
          <Text style={styles.timerTitle}>Stock Reserved For</Text>
          <View style={styles.timerRow}>
            <View style={styles.timeBox}>
              <Text style={styles.timeText}>{time.h}</Text>
              <Text style={styles.timeLabel}>Hours</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>
            <View style={styles.timeBox}>
              <Text style={styles.timeText}>{time.m}</Text>
              <Text style={styles.timeLabel}>Minutes</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>
            <View style={styles.timeBox}>
              <Text style={styles.timeText}>{time.s}</Text>
              <Text style={styles.timeLabel}>Seconds</Text>
            </View>
          </View>

          <Text style={styles.timerNote}>
            Invoice will be generated after order confirmation by the JTC team.
          </Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Total Amount</Text>
            <Text style={styles.amountText}>{amount}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.btnFilled} activeOpacity={0.8}>
            <Download size={18} color={Theme.colors.white} style={styles.btnIcon} />
            <Text style={styles.btnFilledText}>Download PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutline} activeOpacity={0.8}>
            <Share2 size={18} color={Theme.colors.primary} style={styles.btnIcon} />
            <Text style={styles.btnOutlineText}>Share Invoice</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.continueLink} 
          onPress={() => navigation.popToTop()}
          activeOpacity={0.7}
        >
          <Text style={styles.continueLinkText}>Continue Shopping</Text>
          <ArrowRight size={14} color={Theme.colors.primaryLight} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bgMain,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 40,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.cardMd,
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
    marginTop: 6,
    textAlign: 'center',
    fontFamily: Theme.fonts.body,
    marginBottom: 28,
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.card,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    color: Theme.colors.textMuted,
    fontFamily: Theme.fonts.body,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.bodySemiBold,
  },
  valueBold: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: 16,
  },
  timerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 12,
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  timeBox: {
    backgroundColor: Theme.colors.bgMain,
    width: 60,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.heading,
  },
  timeLabel: {
    fontSize: 9,
    color: Theme.colors.textMuted,
    fontFamily: Theme.fonts.body,
    marginTop: -2,
  },
  timerColon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
  },
  timerNote: {
    fontSize: 11,
    color: Theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 16,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.bodyBold,
  },
  btnGroup: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  btnFilled: {
    height: 48,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radii.button,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.button,
  },
  btnIcon: {
    marginRight: 8,
  },
  btnFilledText: {
    color: Theme.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: Theme.fonts.bodyBold,
  },
  btnOutline: {
    height: 48,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    borderRadius: Theme.radii.button,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
  },
  btnOutlineText: {
    color: Theme.colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: Theme.fonts.bodyBold,
  },
  continueLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  continueLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.primaryLight,
    fontFamily: Theme.fonts.bodySemiBold,
  },
});
