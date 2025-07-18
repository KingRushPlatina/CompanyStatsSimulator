import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ActionButtonsProps {
  day: number;
  onSkipDay: () => void;
  onSkipMonth: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ day, onSkipDay, onSkipMonth }) => {
  return (
    <>
      <TouchableOpacity style={styles.skipDayButton} onPress={onSkipDay}>
        <Text style={styles.skipDayText}>Salta Giorno {day} → {day + 1}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.skipDayButton, {backgroundColor: '#eab308'}]} onPress={onSkipMonth}>
        <Text style={styles.skipDayText}>Salta Mese ({day} → {day + 30})</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  skipDayButton: {
    width: '90%',
    backgroundColor: '#6366f1',
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 16,
  },
  skipDayText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ActionButtons;
