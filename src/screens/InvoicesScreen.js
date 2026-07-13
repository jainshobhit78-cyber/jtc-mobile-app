import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Alert, Modal, ActivityIndicator } from 'react-native';
import { Theme } from '../styles/theme';
import { StateContext } from '../context/StateContext';
import { ChevronRight, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react-native';

export default function InvoicesScreen() {
  const { invoices, payInvoice } = useContext(StateContext);
  const [loadingInvoice, setLoadingInvoice] = useState(null);

  const handlePayInvoice = (invoice) => {
    Alert.alert(
      "Confirm Payment",
      `Authorize payment of ₹${invoice.amount.toLocaleString('en-IN')} for Invoice ${invoice.invoiceNo}?`,
      [
        { text: "Cancel" },
        { 
          text: "Confirm", 
          onPress: () => {
            setLoadingInvoice(invoice.invoiceNo);
            // Simulate processing bank payment
            setTimeout(() => {
              payInvoice(invoice.invoiceNo);
              setLoadingInvoice(null);
              Alert.alert("Payment Cleared", `Invoice ${invoice.invoiceNo} successfully cleared. Balance updated in SAP ERP S/4HANA ledger.`);
            }, 1500);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>B2B Billing & Invoices</Text>
        <Text style={styles.headerSubtitle}>Reconciled ledger from SAP ERP console</Text>
      </View>

      <FlatList
        data={invoices}
        keyExtractor={(item) => item.invoiceNo}
        renderItem={({ item }) => (
          <View style={styles.invoiceCard}>
            <View style={styles.cardHeader}>
              <View style={styles.invoiceMeta}>
                <FileText size={18} color={Theme.colors.primary} />
                <View>
                  <Text style={styles.invoiceNo}>{item.invoiceNo}</Text>
                  <Text style={styles.orderId}>Order: {item.orderId}</Text>
                </View>
              </View>
              
              <View style={[
                styles.statusBadge,
                item.status === 'Paid' ? styles.statusPaid : 
                item.status === 'Unpaid' ? styles.statusUnpaid : styles.statusOverdue
              ]}>
                <Text style={[
                  styles.statusText,
                  item.status === 'Paid' ? styles.statusTextPaid : 
                  item.status === 'Unpaid' ? styles.statusTextUnpaid : styles.statusTextOverdue
                ]}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View>
                <Text style={styles.dateLabel}>Invoice Date</Text>
                <Text style={styles.dateValue}>{item.date}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.amountLabel}>Total Value</Text>
                <Text style={styles.amountValue}>₹{item.amount.toLocaleString('en-IN')}</Text>
              </View>
            </View>

            {item.status !== 'Paid' && (
              <TouchableOpacity 
                style={styles.payBtn}
                onPress={() => handlePayInvoice(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.payBtnText}>Clear Outstanding Dues</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <View style={styles.ledgerInfo}>
            <ShieldCheck size={16} color={Theme.colors.success} />
            <Text style={styles.ledgerInfoText}>Auto-Reconciliation Active via SAP Gateway</Text>
          </View>
        }
      />

      {/* Loading Modal */}
      <Modal visible={loadingInvoice !== null} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <ActivityIndicator size="large" color={Theme.colors.primary} />
            <Text style={styles.modalTitle}>Processing B2B Transfer...</Text>
            <Text style={styles.modalDesc}>Posting ledger reconciliations to SAP ERP server</Text>
          </View>
        </View>
      </Modal>
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
  invoiceCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    padding: 16,
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  invoiceNo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  orderId: {
    fontSize: 11,
    color: Theme.colors.textLight,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusPaid: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
  },
  statusUnpaid: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  statusOverdue: {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
  },
  statusText: {
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statusTextPaid: {
    color: Theme.colors.success,
  },
  statusTextUnpaid: {
    color: Theme.colors.warning,
  },
  statusTextOverdue: {
    color: Theme.colors.error,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateLabel: {
    fontSize: 11,
    color: Theme.colors.textLight,
  },
  dateValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.textDark,
  },
  amountLabel: {
    fontSize: 11,
    color: Theme.colors.textLight,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    fontFamily: 'monospace',
  },
  payBtn: {
    backgroundColor: Theme.colors.primary,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnText: {
    color: Theme.colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  ledgerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
    paddingBottom: 40,
  },
  ledgerInfoText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(14, 35, 68, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radii.card,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    gap: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
    marginTop: 8,
  },
  modalDesc: {
    fontSize: 11,
    color: Theme.colors.textMuted,
    textAlign: 'center',
  }
});
