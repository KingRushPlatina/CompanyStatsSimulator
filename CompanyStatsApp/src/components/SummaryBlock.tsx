import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../utils/formatters';

interface SummaryBlockProps {
  day: number;
  lastIncome: number;
  lastExpense: number;
  lastNet: number;
}

const SummaryBlock: React.FC<SummaryBlockProps> = ({ day, lastIncome, lastExpense, lastNet }) => {
  return (
    <View style={styles.summaryBlock}>
      <Text style={styles.summaryTitle}>Riepilogo Ultimo Giorno (Giorno {day - 1})</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Entrate:</Text>
        <Text style={styles.summaryIncome}>{formatCurrency(lastIncome)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Spese:</Text>
        <Text style={styles.summaryExpense}>{formatCurrency(lastExpense)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Netto:</Text>
        <Text style={lastNet >= 0 ? styles.summaryIncome : styles.summaryExpense}>
          {formatCurrency(lastNet)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryBlock: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 8,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#334155',
  },
  summaryIncome: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: 'bold',
  },
  summaryExpense: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: 'bold',
  },
});

export default SummaryBlock;
