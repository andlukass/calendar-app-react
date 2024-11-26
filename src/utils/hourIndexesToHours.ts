import { IHourString } from "../interfaces";
import { getHourByIndex } from "./getHourByIndex";

export const hourIndexesToHours = (indexes: number[]): IHourString[] => {
  return indexes.map((index) => getHourByIndex(index));
};
