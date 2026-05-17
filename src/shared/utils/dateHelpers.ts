export const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export default { formatDate, isSameDay };
