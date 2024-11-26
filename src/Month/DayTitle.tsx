import { getDayName } from '../utils/getDayName';
import { isToday } from '../utils/isToday';

function DayTitle({ index, day }: { index: number; day: Date }) {
  return (
    <>
      {index < 7 && (
        <div className="flex justify-center items-center select-none text-xs">
          <span>{getDayName(day)}</span>
        </div>
      )}
      <div className="flex justify-center items-center select-none text-xs">
        <span className={`flex justify-center items-center rounded-full w-5 h-5 ${isToday(day) ? 'text-white bg-[#3786ed]' : ''}`}>
          {day.getDate()}
        </span>
      </div>
    </>
  );
}

export default DayTitle;
