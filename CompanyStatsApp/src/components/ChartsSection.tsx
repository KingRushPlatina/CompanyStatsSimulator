import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartData } from '../utils/simulation';

interface ChartsSectionProps {
  monthlyBalance: ChartData;
  monthlyIncome: ChartData;
}

const screenWidth = Dimensions.get('window').width;

const ChartsSection: React.FC<ChartsSectionProps> = ({ monthlyBalance, monthlyIncome }) => {
  return (
    <>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Grafico Saldo Mensile</Text>
        <LineChart
          data={{
            labels: monthlyBalance.labels,
            datasets: [{ data: monthlyBalance.data }],
          }}
          width={screenWidth * 0.8}
          height={180}
          yAxisSuffix="€"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#eff6ff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '4', strokeWidth: '2', stroke: '#2563eb' },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitleIncome}>Grafico Entrate Mensili</Text>
        <LineChart
          data={{
            labels: monthlyIncome.labels,
            datasets: [{ data: monthlyIncome.data }],
          }}
          width={screenWidth * 0.8}
          height={180}
          yAxisSuffix="€"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#f3e8ff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '4', strokeWidth: '2', stroke: '#9333ea' },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 24,
  },
  chartTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#2563eb',
    textAlign: 'center',
  },
  chartTitleIncome: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#9333ea',
    textAlign: 'center',
  },
});

export default ChartsSection;
