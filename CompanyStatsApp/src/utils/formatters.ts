export const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

export function formatMonth(date: Date): string {
  // Restituisce 'mm-yy', es. '01-21' per Gennaio 2021
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${month}-${year}`;
}

export function formatCurrency(amount: number): string {
  return `€${Number(amount).toFixed(2)}`;
}

export function formatDate(date: Date): string {
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}
