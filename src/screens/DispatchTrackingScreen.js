import React from 'react';
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
import { ArrowLeft, CheckCircle, Circle, MapPin } from 'lucide-react-native';

const trackingSteps = [
  { title: 'Order Confirmed', time: '10 May 2024, 04:15 PM', desc: 'Order received and checked for credit availability.', done: true },
  { title: 'Packed', time: '11 May 2024, 10:30 AM', desc: 'Items successfully packed at warehouse.', done: true },
  { title: 'Invoice Generated', time: '11 May 2024, 02:00 PM', desc: 'Invoice INV245089 generated and synced with SAP.', done: true },
  { title: 'Dispatched', time: '12 May 2024, 09:10 AM', desc: 'Package left JTC Kanpur hub.', done: true },
  { title: 'In Transit', time: '13 May 2024, 08:30 AM', desc: 'Package arrived at regional sorting center.', done: true },
  { title: 'Out for Delivery', time: '14 May 2024, 09:45 AM', desc: 'On its way to Sharma Electricals.', done: true, current: true },
  { title: 'Delivered', time: 'Expected 14 May 2024', desc: 'Pending recipient signature.', done: false },
];

export default function DispatchTrackingScreen({ navigation, route }) {
  const orderId = route?.params?.orderId || 'JTCORD2405108';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.6}>
          <ArrowLeft size={22} color={Theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info Box */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Order ID</Text>
          <Text style={styles.infoValue}>{orderId}</Text>
          <View style={styles.divider} />
          <View style={styles.addressRow}>
            <MapPin size={18} color={Theme.colors.primary} />
            <View style={styles.addressDetails}>
              <Text style={styles.addressTitle}>Shipping Address</Text>
              <Text style={styles.addressText}>Sharma Electricals, Kanpur, Uttar Pradesh - 208001</Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Tracking History</Text>
          
          <View style={styles.timelineContainer}>
            {trackingSteps.map((step, index) => {
              const isLast = index === trackingSteps.length - 1;
              return (
                <View key={index} style={styles.stepRow}>
                  {/* Left Column: Icons and line */}
                  <View style={styles.leftCol}>
                    <View
                      style={[
                        styles.dotCircle,
                        step.done && styles.dotCircleDone,
                        step.current && styles.dotCircleCurrent,
                      ]}
                    >
                      {step.done ? (
                        <CheckCircle size={16} color={Theme.colors.success} fill={Theme.colors.successBg} />
                      ) : (
                        <Circle size={16} color={Theme.colors.textLight} />
                      )}
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.line,
                          step.done && styles.lineDone,
                        ]}
                      />
                    )}
                  </View>

                  {/* Right Column: Details */}
                  <View style={styles.rightCol}>
                    <Text
                      style={[
                        styles.stepTitle,
                        step.current && styles.stepTitleCurrent,
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text style={styles.stepTime}>{step.time}</Text>
                    <Text style={styles.stepDesc}>{step.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
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
    padding: 16,
    gap: 16,
  },
  infoCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    ...Theme.shadows.card,
  },
  infoLabel: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: 12,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  addressDetails: {
    flex: 1,
    gap: 2,
  },
  addressTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  addressText: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    lineHeight: 16,
  },
  timelineCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    ...Theme.shadows.card,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: Theme.fonts.heading,
    marginBottom: 16,
  },
  timelineContainer: {
    paddingLeft: 4,
  },
  stepRow: {
    flexDirection: 'row',
    minHeight: 80,
  },
  leftCol: {
    alignItems: 'center',
    marginRight: 16,
  },
  dotCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
  },
  dotCircleDone: {
    backgroundColor: Theme.colors.white,
  },
  dotCircleCurrent: {
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: 4,
  },
  lineDone: {
    backgroundColor: Theme.colors.success,
  },
  rightCol: {
    flex: 1,
    paddingBottom: 20,
    gap: 2,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.textMuted,
    fontFamily: Theme.fonts.bodySemiBold,
  },
  stepTitleCurrent: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
  },
  stepTime: {
    fontSize: 11,
    color: Theme.colors.textLight,
  },
  stepDesc: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    lineHeight: 16,
    marginTop: 4,
  },
});
