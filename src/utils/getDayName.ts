export const getDayName = (date: Date): string => {
  let dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
  dayName = dayName.replace('.', '');
  dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  return dayName;
};
