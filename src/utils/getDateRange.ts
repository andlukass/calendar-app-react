import { addDaysToDate } from './addDaysToDate';

export const getDateRange = (date: Date, mode: 'week' | 'month') => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfWeek = date.getDay();

  let init = new Date(year, month, 1);
  init.setHours(0, 0, 0, 0);
  if (mode === 'week') {
    init = new Date(date);
    init.setDate(date.getDate() - dayOfWeek);
  } else init = addDaysToDate(init, -init.getDay());

  let end = new Date(year, month + 1, 0);
  end.setHours(23, 59, 59, 999);
  if (mode === 'week') {
    end = new Date(init);
    end.setDate(init.getDate() + 7);
  } else end = addDaysToDate(end, 6 - end.getDay());

  return [init, end];
};
