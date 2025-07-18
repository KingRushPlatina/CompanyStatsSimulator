import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { 
  initializeDatabase, 
  loadBalanceData, 
  saveBalanceData, 
  loadMonthlyStats, 
  BalanceData, 
  MonthlyStats 
} from './utils/database';
import { simulateDay, simulateMonth, getMonthlyStats } from './utils/simulation';
import DashboardHeader from './components/DashboardHeader';
import YearSelector from './components/YearSelector';
import ChartsSection from './components/ChartsSection';
import SummaryBlock from './components/SummaryBlock';
import MenuGrid from './components/MenuGrid';
import SettingsScreen from './components/SettingsScreen';
import ActionButtons from './components/ActionButtons';

const MainMenu = () => {
  const [balanceData, setBalanceData] = useState<BalanceData>({
    amount: 10000,
    day: 1,
    lastIncome: 0,
    lastExpense: 0,
    lastNet: 0,
    balanceHistory: [10000],
    incomeHistory: [0],
    startDate: new Date(2020, 0, 1),
    currentDate: new Date(2020, 0, 1),
  });
  
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(2020);
  const [monthlyStatsFromDB, setMonthlyStatsFromDB] = useState<MonthlyStats>({});

  useEffect(() => {
    initializeDatabase();
    loadData();
  }, []);

  useEffect(() => {
    loadMonthlyStatsFromDB();
  }, [selectedYear]);

  const loadData = async () => {
    try {
      const data = await loadBalanceData();
      setBalanceData(data);
      setSelectedYear(data.currentDate.getFullYear());
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadMonthlyStatsFromDB = async () => {
    try {
      const stats = await loadMonthlyStats(selectedYear);
      setMonthlyStatsFromDB(stats);
    } catch (error) {
      console.error('Error loading monthly stats:', error);
    }
  };

  const handleSkipDay = () => {
    const newData = simulateDay(balanceData);
    setBalanceData(newData);
    saveBalanceData(newData);
    
    if (newData.currentDate.getFullYear() !== selectedYear) {
      setSelectedYear(newData.currentDate.getFullYear());
    }

    setTimeout(() => {
      getMonthlyStats(newData.balanceHistory, newData.startDate, selectedYear, monthlyStatsFromDB, false);
      getMonthlyStats(newData.incomeHistory, newData.startDate, selectedYear, monthlyStatsFromDB, true);
    }, 100);
  };

  const handleSkipMonth = () => {
    const newData = simulateMonth(balanceData);
    setBalanceData(newData);
    saveBalanceData(newData);
    
    if (newData.currentDate.getFullYear() !== selectedYear) {
      setSelectedYear(newData.currentDate.getFullYear());
    }

    setTimeout(() => {
      getMonthlyStats(newData.balanceHistory, newData.startDate, selectedYear, monthlyStatsFromDB, false);
      getMonthlyStats(newData.incomeHistory, newData.startDate, selectedYear, monthlyStatsFromDB, true);
    }, 100);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const newData = {
        ...balanceData,
        startDate: selectedDate,
        currentDate: selectedDate,
      };
      setBalanceData(newData);
      setSelectedYear(selectedDate.getFullYear());
      saveBalanceData(newData);
    }
  };

  const monthlyBalance = getMonthlyStats(
    balanceData.balanceHistory, 
    balanceData.startDate, 
    selectedYear, 
    monthlyStatsFromDB, 
    false
  );
  
  const monthlyIncome = getMonthlyStats(
    balanceData.incomeHistory, 
    balanceData.startDate, 
    selectedYear, 
    monthlyStatsFromDB, 
    true
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {!showSettings ? (
        <View style={styles.card}>
          <DashboardHeader 
            currentDate={balanceData.currentDate} 
            balance={balanceData.amount} 
          />
          
          <YearSelector 
            selectedYear={selectedYear} 
            onYearChange={setSelectedYear} 
          />
          
          <ChartsSection 
            monthlyBalance={monthlyBalance} 
            monthlyIncome={monthlyIncome} 
          />
          
          <SummaryBlock 
            day={balanceData.day}
            lastIncome={balanceData.lastIncome}
            lastExpense={balanceData.lastExpense}
            lastNet={balanceData.lastNet}
          />
          
          <MenuGrid onSettingsPress={() => setShowSettings(true)} />
        </View>
      ) : (
        <SettingsScreen
          currentDate={balanceData.currentDate}
          showDatePicker={showDatePicker}
          onDatePickerToggle={() => setShowDatePicker(true)}
          onDateChange={handleDateChange}
          onBackPress={() => setShowSettings(false)}
        />
      )}
      
      <ActionButtons 
        day={balanceData.day}
        onSkipDay={handleSkipDay}
        onSkipMonth={handleSkipMonth}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingVertical: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
});

export default MainMenu;
