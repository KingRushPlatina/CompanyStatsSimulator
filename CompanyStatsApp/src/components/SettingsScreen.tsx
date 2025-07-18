import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface SettingsScreenProps {
  currentDate: Date;
  showDatePicker: boolean;
  onDatePickerToggle: () => void;
  onDateChange: (event: any, selectedDate?: Date) => void;
  onBackPress: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  currentDate,
  showDatePicker,
  onDatePickerToggle,
  onDateChange,
  onBackPress,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Impostazioni</Text>
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsLabel}>Data di inizio simulazione:</Text>
        <TouchableOpacity style={styles.menuButton} onPress={onDatePickerToggle}>
          <Text style={styles.menuText}>{currentDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={currentDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>
      <TouchableOpacity style={styles.skipDayButton} onPress={onBackPress}>
        <Text style={styles.skipDayText}>Torna alla Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    padding: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  settingsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  settingsLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  menuButton: {
    flexBasis: '48%',
    marginBottom: 12,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#6366f1',
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipDayButton: {
    width: '100%',
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

export default SettingsScreen;
