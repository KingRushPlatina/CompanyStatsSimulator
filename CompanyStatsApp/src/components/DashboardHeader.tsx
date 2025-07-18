import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDate, formatCurrency } from '../utils/formatters';

interface DashboardHeaderProps {
  currentDate: Date;
  balance: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentDate, balance }) => {
  return (
    <>
      <Text style={styles.title}>Dashboard Aziendale</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Data Attuale</Text>
        <Text style={styles.day}>
          {formatDate(currentDate)}
        </Text>
      </View>
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Saldo Attuale</Text>
        <Text style={[styles.balance, balance >= 0 ? styles.positive : styles.negative]}>
          {formatCurrency(balance)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoBlock: {
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  day: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  positive: {
    color: '#22c55e',
  },
  negative: {
    color: '#ef4444',
  },
});

export default DashboardHeader;
