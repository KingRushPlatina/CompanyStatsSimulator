import { BalanceData, MonthlyStats, saveMonthlyStats } from './database';
import { formatMonth } from './formatters';

export interface ChartData {
  labels: string[];
  data: number[];
}

export function generateRandomTransactions() {
  const income = Math.floor(Math.random() * 200) + 50;
  const expense = Math.floor(Math.random() * 100) + 20;
  const net = income - expense;
  return { income, expense, net };
}

export function simulateDay(currentData: BalanceData): BalanceData {
  const { income, expense, net } = generateRandomTransactions();
  const newBalance = currentData.amount + net;
  const newDate = new Date(currentData.currentDate.getTime());
  newDate.setDate(newDate.getDate() + 1);

  return {
    ...currentData,
    amount: newBalance,
    day: 1,
    lastIncome: income,
    lastExpense: expense,
    lastNet: net,
    balanceHistory: [...currentData.balanceHistory, newBalance],
    incomeHistory: [...currentData.incomeHistory, income],
    startDate: newDate,
    currentDate: newDate,
  };
}

export function simulateMonth(currentData: BalanceData): BalanceData {
  let tempData = { ...currentData };
  let tempBalanceHistory = [...currentData.balanceHistory];
  let tempIncomeHistory = [...currentData.incomeHistory];
  
  for (let i = 0; i < 30; i++) {
    const { income, expense, net } = generateRandomTransactions();
    tempData.amount += net;
    tempData.lastIncome = income;
    tempData.lastExpense = expense;
    tempData.lastNet = net;
    tempBalanceHistory.push(tempData.amount);
    tempIncomeHistory.push(income);
  }
  
  const newDate = new Date(currentData.currentDate.getTime());
  newDate.setDate(newDate.getDate() + 30);

  return {
    ...tempData,
    day: 1,
    balanceHistory: tempBalanceHistory,
    incomeHistory: tempIncomeHistory,
    startDate: newDate,
    currentDate: newDate,
  };
}

export function getMonthlyStats(
  history: number[],
  startDate: Date,
  selectedYear: number,
  monthlyStatsFromDB: MonthlyStats,
  isIncome: boolean = false
): ChartData {
  // Prima prova a caricare i dati dal database
  const dbStats = Object.keys(monthlyStatsFromDB);
  if (dbStats.length > 0) {
    const labels = dbStats.sort();
    const data = labels.map(label => {
      const stat = monthlyStatsFromDB[label];
      return isIncome ? (stat?.avgIncome || 0) : (stat?.avgBalance || 0);
    });
    return { labels, data };
  }

  // Se non ci sono dati nel DB, calcola dai dati storici
  const months: { [key: string]: number[] } = {};
  const yearMap: { [key: string]: number } = {};
  
  for (let i = 0; i < history.length; i++) {
    const date = new Date(startDate.getTime());
    date.setDate(date.getDate() + i);
    const key = formatMonth(date);
    const year = date.getFullYear();
    if (!months[key]) months[key] = [];
    months[key].push(history[i]);
    yearMap[key] = year;
  }
  
  // Filtra solo mesi dell'anno selezionato
  const labels = Object.keys(months).filter(label => yearMap[label] === selectedYear);
  const data = labels.map(label => {
    const arr = months[label];
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  });

  // Salva i dati mensili aggregati nel database
  labels.forEach((label, index) => {
    const avgValue = data[index];
    const year = yearMap[label];
    saveMonthlyStats(label, avgValue, year, isIncome);
  });

  return { labels, data };
}
