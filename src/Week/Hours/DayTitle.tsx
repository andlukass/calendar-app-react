import { getDayName } from '../../utils/getDayName';
import { isToday } from '../../utils/isToday';

function DayTitle({ date }: { date: Date }) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white border-[0.5pt] border-transparent border-b-black">
      <span className={`text-[11px] ${isToday(date) ? 'text-[#3786ed]' : ''}`}>{getDayName(date)}</span>
      <div
        className={`mb-1 flex items-center justify-center text-xl rounded-full w-9 h-9 ${isToday(date) ? 'bg-[#3786ed] text-white' : ''}`}
      >
        <span className="-ml-0.5">{date.getDate()}</span>
      </div>
    </div>
  );
}

export default DayTitle;
