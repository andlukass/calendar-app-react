import { hourIndexes } from '../utils/hourIndexes';
import { getHourByIndex } from '../utils/getHourByIndex';

function HourMeter() {
  return (
    <div className="select-none">
      {hourIndexes.map((hour) => (
        <div key={hour} className="border-[0.5px] border-transparent h-[25px] flex w-full justify-end">
          <span className="-mt-2 mr-2 text-xs">{hour % 2 || !hour ? null : getHourByIndex(hour)}</span>
        </div>
      ))}
    </div>
  );
}

export default HourMeter;
