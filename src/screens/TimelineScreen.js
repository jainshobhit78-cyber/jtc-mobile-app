import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Theme } from '../styles/theme';
import { StateContext } from '../context/StateContext';
import { CheckCircle2, Clock, Truck, Package, ShieldCheck } from 'lucide-react-native';

export default function TimelineScreen() {
  const { orders } = useContext(StateContext);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock size={16} color={Theme.colors.warning} />;
      case 'Confirmed':
        return <ShieldCheck size={16} color={Theme.colors.primary} />;
      case 'Packed':
        return <Package size={16} color={Theme.colors.accent} />;
      case 'Dispatched':
      case 'Delivered':
        return <CheckCircle2 size={16} color={Theme.colors.success} />;
      default:
        return <Clock size={16} color={Theme.colors.textMuted} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <Text style={styles.headerSubtitle}>Real-time shipping progress from JTC logistics</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.orderId}>{item.id}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
              </View>
              <View style={[styles.statusBadge, item.status === 'Pending' ? styles.badgePending : styles.badgeClear]}>
                <Text style={[styles.statusText, item.status === 'Pending' ? styles.textPending : styles.textClear]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Timeline Steps */}
            <View style={styles.timeline}>
              {item.timeline.map((step, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={styles.iconCircle}>
                      {getStatusIcon(item.status)}
                    </View>
                    {idx < item.timeline.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineRight}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepTime}>{step.time}</Text>
                    <Text style={styles.stepDesc}>{step.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
            
            <View style={styles.valueRow}>
              <Text style={styles.valueLabel}>Order Valuation:</Text>
              <Text style={styles.valueText}>₹{item.amount.toLocaleString('en-IN')}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No active orders found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bgMain,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'Poppins-Bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  listContainer: {
    padding: 24,
    gap: 16,
  },
  orderCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  orderDate: {
    fontSize: 11,
    color: Theme.colors.textLight,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgePending: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  badgeClear: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  textPending: {
    color: Theme.colors.warning,
  },
  textClear: {
    color: Theme.colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: 12,
  },
  timeline: {
    marginVertical: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 60,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: 4,
  },
  timelineRight: {
    flex: 1,
    paddingBottom: 16,
    gap: 2,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  stepTime: {
    fontSize: 10,
    color: Theme.colors.textLight,
  },
  stepDesc: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    marginTop: 4,
    lineHeight: 16,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  valueLabel: {
    fontSize: 12,
    color: Theme.colors.textMuted,
  },
  valueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    fontFamily: 'monospace',
  },
  emptyContainer: {
    paddingVertical: 80,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: Theme.colors.textMuted,
  }
});
