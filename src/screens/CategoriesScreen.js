import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Theme } from '../styles/theme';
import { Zap, ChevronRight } from 'lucide-react-native';

const fullCategories = [
  { id: 1, name: "Wires & Cables", desc: "FR, HRFR, LSH, PVC Multi-core wires & cables", items: "124 items" },
  { id: 2, name: "Switchgears", desc: "MCBs, RCCBs, Isolators, Changeovers, Distribution boards", items: "85 items" },
  { id: 3, name: "Electrical & Fans", desc: "Ceiling fans, Exhaust fans, Wall fans & regulators", items: "98 items" },
  { id: 4, name: "Pumps & Motors", desc: "Monoblock, Domestic, Submersible & Induction motors", items: "42 items" },
  { id: 5, name: "Solar Solutions", desc: "On-grid Inverters, Solar panels, Solar batteries & wires", items: "36 items" },
  { id: 6, name: "Conduit Pipes", desc: "PVC Rigid conduits, bends, collars, junction boxes", items: "64 items" },
  { id: 7, name: "LED Lighting", desc: "LED Bulbs, Panel lights, Downlights, Floodlights", items: "110 items" },
  { id: 8, name: "Industrial Spares", desc: "Contactors, Relays, pushbuttons, limit switches", items: "72 items" },
  { id: 9, name: "Distribution Boxes", desc: "SPN, TPN Metal enclosures & plastic db boxes", items: "30 items" },
  { id: 10, name: "Modular Switches", desc: "Switches, Sockets, plates, regulators & boxes", items: "150 items" },
  { id: 11, name: "Insulation Tapes", desc: "PVC insulation tapes, joint kits, sleeves", items: "15 items" },
  { id: 12, name: "Terminal Lugs", desc: "Copper/Aluminum ring, pin & fork type lugs", items: "250 items" }
];

export default function CategoriesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Divisions</Text>
        <Text style={styles.headerSubtitle}>JTC distribution categories catalog</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {fullCategories.map(cat => (
          <TouchableOpacity 
            key={cat.id} 
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ProductList', { category: cat.name })}
          >
            <View style={styles.cardInner}>
              <View style={styles.iconCircle}>
                <Zap size={18} color={Theme.colors.primary} />
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{cat.name}</Text>
                <Text style={styles.desc}>{cat.desc}</Text>
                <Text style={styles.itemCount}>{cat.items}</Text>
              </View>
            </View>
            <ChevronRight size={18} color={Theme.colors.textLight} />
          </TouchableOpacity>
        ))}
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
    gap: 12,
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radii.card,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Theme.colors.textDark,
  },
  desc: {
    fontSize: 11,
    color: Theme.colors.textMuted,
    lineHeight: 15,
  },
  itemCount: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginTop: 4,
  }
});
