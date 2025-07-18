import SQLite from 'react-native-sqlite-storage';

// Initialize SQLite database
export const db = SQLite.openDatabase(
  {
    name: 'CompanyStats.db',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  (error: any) => {
    console.error('Error opening database:', error);
  }
);

export interface BalanceData {
  amount: number;
  day: number;
  lastIncome: number;
  lastExpense: number;
  lastNet: number;
  balanceHistory: number[];
  incomeHistory: number[];
  startDate: Date;
  currentDate: Date;
}

export interface MonthlyStats {
  [key: string]: {
    avgBalance?: number;
    avgIncome?: number;
  };
}

// Initialize database tables
export const initializeDatabase = () => {
  db.transaction((tx: any) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Balance (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, day INTEGER, lastIncome REAL, lastExpense REAL, lastNet REAL, balanceHistory TEXT, incomeHistory TEXT, startDate TEXT, currentDate TEXT);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS MonthlyStats (id INTEGER PRIMARY KEY AUTOINCREMENT, monthKey TEXT, avgBalance REAL, avgIncome REAL, year INTEGER, UNIQUE(monthKey, year));'
    );
  });
};

// Load balance data from database
export const loadBalanceData = (): Promise<BalanceData> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM Balance WHERE id = 1;',
        [],
        (_: any, results: any) => {
          if (results.rows.length > 0) {
            const row = results.rows.item(0);
            let startDateObj = new Date(2020, 0, 1);
            let currentDateObj = new Date(2020, 0, 1);
            
            if (row.startDate && typeof row.startDate === 'string' && !isNaN(Date.parse(row.startDate))) {
              startDateObj = new Date(row.startDate);
            }
            if (row.currentDate && typeof row.currentDate === 'string' && !isNaN(Date.parse(row.currentDate))) {
              currentDateObj = new Date(row.currentDate);
            }

            resolve({
              amount: row.amount,
              day: row.day || 1,
              lastIncome: row.lastIncome || 0,
              lastExpense: row.lastExpense || 0,
              lastNet: row.lastNet || 0,
              balanceHistory: row.balanceHistory ? JSON.parse(row.balanceHistory) : [row.amount],
              incomeHistory: row.incomeHistory ? JSON.parse(row.incomeHistory) : [row.lastIncome || 0],
              startDate: startDateObj,
              currentDate: currentDateObj,
            });
          } else {
            const initialDate = new Date(2020, 0, 1);
            const initialData: BalanceData = {
              amount: 10000,
              day: 1,
              lastIncome: 0,
              lastExpense: 0,
              lastNet: 0,
              balanceHistory: [10000],
              incomeHistory: [0],
              startDate: initialDate,
              currentDate: initialDate,
            };
            
            tx.executeSql(
              'INSERT INTO Balance (amount, day, lastIncome, lastExpense, lastNet, balanceHistory, incomeHistory, startDate, currentDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
              [10000, 1, 0, 0, 0, JSON.stringify([10000]), JSON.stringify([0]), initialDate.toISOString(), initialDate.toISOString()]
            );
            
            resolve(initialData);
          }
        },
        (error: any) => {
          console.error('Error fetching balance:', error);
          reject(error);
        }
      );
    });
  });
};

// Save balance data to database
export const saveBalanceData = (data: BalanceData) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      'UPDATE Balance SET amount = ?, day = ?, lastIncome = ?, lastExpense = ?, lastNet = ?, balanceHistory = ?, incomeHistory = ?, startDate = ?, currentDate = ? WHERE id = 1;',
      [
        data.amount,
        data.day,
        data.lastIncome,
        data.lastExpense,
        data.lastNet,
        JSON.stringify(data.balanceHistory),
        JSON.stringify(data.incomeHistory),
        data.startDate.toISOString(),
        data.currentDate.toISOString()
      ]
    );
  });
};

// Load monthly stats from database
export const loadMonthlyStats = (year: number): Promise<MonthlyStats> => {
  return new Promise((resolve) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM MonthlyStats WHERE year = ?;',
        [year],
        (_: any, results: any) => {
          console.log(`Loading stats for year ${year}, found ${results.rows.length} rows`);
          const stats: MonthlyStats = {};
          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            if (!stats[row.monthKey]) stats[row.monthKey] = {};
            if (row.avgBalance !== null && row.avgBalance !== undefined) stats[row.monthKey].avgBalance = row.avgBalance;
            if (row.avgIncome !== null && row.avgIncome !== undefined) stats[row.monthKey].avgIncome = row.avgIncome;
          }
          resolve(stats);
        }
      );
    });
  });
};

// Save monthly stats to database
export const saveMonthlyStats = (monthKey: string, avgValue: number, year: number, isIncome: boolean) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `UPDATE MonthlyStats SET ${isIncome ? 'avgIncome' : 'avgBalance'} = ? WHERE monthKey = ? AND year = ?;`,
      [avgValue, monthKey, year],
      (_: any, result: any) => {
        if (result.rowsAffected === 0) {
          const insertData = isIncome 
            ? [monthKey, null, avgValue, year]
            : [monthKey, avgValue, null, year];
          tx.executeSql(
            'INSERT INTO MonthlyStats (monthKey, avgBalance, avgIncome, year) VALUES (?, ?, ?, ?);',
            insertData
          );
        }
      }
    );
  });
};
