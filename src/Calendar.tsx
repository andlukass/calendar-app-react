import Week from './Week/Week';
import Month from './Month/Month';
import Header from './Header';
import './index.css';
import { ICalendarConfig } from './interfaces';

export const Calendar = ({ config }: { config: ICalendarConfig }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header config={config} />
      {config.mode === 'week' && <Week config={config} />}
      {config.mode === 'month' && <Month config={config} />}
    </div>
  );
};
