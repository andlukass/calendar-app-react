import { useState } from "react";
import { ICalendarConfig, IEvent } from "./interfaces";

export interface IConfigProps {
  events: IEvent[];
  openEventModal: (event: IEvent) => void;
  changeEvent: (id: string, date: Date, start: number, end: number) => void;
}

export const useCalendarConfig = (config: IConfigProps): ICalendarConfig => {
  const { events, openEventModal, changeEvent } = config;

  const [mode, setMode] = useState<"week" | "month">("week");
  const [currentDate, setToday] = useState(new Date());

  const changeMode = (mode: "week" | "month") => {
    const tempDate = new Date(currentDate);
    if (mode === "month") tempDate.setDate(15);
    if (mode === "week") tempDate.setDate(1);
    setToday(tempDate);
    setMode(mode);
  };

  const goNext = () => {
    const tempDate = new Date(currentDate);
    if (mode === "week") {
      tempDate.setDate(currentDate.getDate() + 7);
    } else {
      tempDate.setMonth(currentDate.getMonth() + 1);
    }
    setToday(tempDate);
  };

  const goPrev = () => {
    const tempDate = new Date(currentDate);
    if (mode === "week") {
      tempDate.setDate(currentDate.getDate() - 7);
    } else {
      tempDate.setMonth(currentDate.getMonth() - 1);
    }
    setToday(tempDate);
  };

  const goToday = () => {
    const tempDate = new Date();
    tempDate.setSeconds(Math.random() * 60);
    if (mode === "month") tempDate.setDate(15);
    setToday(tempDate);
  };

  return {
    mode,
    events,
    currentDate,
    openEventModal,
    changeEvent,
    changeMode,
    goToday,
    goNext,
    goPrev,
  };
};
