import Hours from './Hours/Hours';
import useDrag from '../useDrag';
import HourMeter from './HourMeter';
import DayTitle from './Hours/DayTitle';
import { getWeekDates } from './utils/getWeekDays';
import { ICalendarConfig } from '../interfaces';

function Week({ config }: { config: ICalendarConfig }) {
  const drag = useDrag();

  const weekDays = getWeekDates(config.currentDate);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="grid grid-cols-[60px_repeat(7,_1fr)] w-full">
        <div />
        {weekDays.map((date, index) => (
          <DayTitle key={index} date={date} />
        ))}
      </div>

      <div className="w-full flex-1 overflow-auto scrollbar-hide">
        <div className="grid grid-cols-[60px_repeat(7,_1fr)] border-2 w-full">
          <HourMeter />
          {weekDays.map((date, index) => (
            <Hours config={config} drag={drag} date={date} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Week;
