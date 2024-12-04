export interface ICalendarConfig {
  mode: "week" | "month";
  events: any[];
  currentDate: Date;
  currentUser?: string;
  openEventModal: (event: any) => void;
  changeEvent: (id: string, date: Date, start: number, end: number) => void;
  changeMode: (mode: "week" | "month") => void;
  goToday: () => void;
  goNext: () => void;
  goPrev: () => void;
}

export interface IDrag {
  dragging: boolean;
  dragStart: React.MutableRefObject<number>;
  startEventDraggin: (start: number, id: string) => void;
  eventSelectorEnd: number;
  eventDragStart: React.MutableRefObject<number>;
  startDraggin: (day: number, start: number) => void;
  stopDraggin: () => void;
  dragEvent: React.MutableRefObject<string>;
  updateEnd: (day: number, month: number, year: number, end: number) => void;
  dragMonth: React.MutableRefObject<number>;
  dragYear: React.MutableRefObject<number>;
  dragEnd: React.MutableRefObject<number>;
  dragDay: React.MutableRefObject<number>;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
export type IColor = RGB | RGBA | HEX;

export type IHourString = `${string | number}:${string | number}`;

export type IEvent = {
  id: string;
  date: Date;
  start: number;
  end: number;
  title: string;
  colors: IColor[];
  width?: string;
  left?: string;
  depth?: number;
  groupDepth?: number;
  isPersonal?: boolean;
  createdBy?: string;
};
