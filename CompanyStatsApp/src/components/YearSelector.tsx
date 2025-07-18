import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ selectedYear, onYearChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => onYearChange(selectedYear - 1)}
      >
        <Text style={styles.buttonText}>Anno Precedente</Text>
      </TouchableOpacity>
      <Text style={styles.yearText}>{selectedYear}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => onYearChange(selectedYear + 1)}
      >
        <Text style={styles.buttonText}>Anno Successivo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  buttonText: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  yearText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 8,
  },
});

export default YearSelector;
