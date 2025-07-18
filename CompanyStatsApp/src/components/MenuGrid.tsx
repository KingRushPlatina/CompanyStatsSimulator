import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MenuGridProps {
  onSettingsPress: () => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ onSettingsPress }) => {
  return (
    <View style={styles.menuGrid}>
      <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#2563eb'}]}>
        <Text style={styles.menuText}>Dipendenti</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#9333ea'}]}>
        <Text style={styles.menuText}>Clienti</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#eab308'}]}>
        <Text style={styles.menuText}>Asset CEO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuButton, {backgroundColor: '#22c55e'}]}>
        <Text style={styles.menuText}>Finanza</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.menuButton, {backgroundColor: '#6366f1'}]} 
        onPress={onSettingsPress}
      >
        <Text style={styles.menuText}>Impostazioni</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
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
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MenuGrid;
