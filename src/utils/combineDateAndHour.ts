import { IHourString } from "../interfaces";

export const combineDateAndHour = (date: Date, hour: IHourString) => {
  const [hours, minutes] = hour.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date;
};
