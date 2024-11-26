export const isToday = (date: Date): boolean => {
  if (!date) return false;
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};
