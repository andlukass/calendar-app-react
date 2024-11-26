import { IHourString } from "../interfaces";
import { hourIndexes } from "./hourIndexes";
import { hourIndexesToHours } from "./hourIndexesToHours";

export const getIndexByHour = (hour: IHourString): number => {
  return hourIndexesToHours(hourIndexes).indexOf(hour);
};
