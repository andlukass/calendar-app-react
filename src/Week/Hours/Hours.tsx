import { hourIndexes } from '../../utils/hourIndexes';
import EventSelector from './EventSelector';
import HourCell from './HourCell';

import DayEvents from './DayEvents';
import Needle from './Needle';
import { getDayEvents } from './getDayEvents';
import { isToday } from '../../utils/isToday';
import { ICalendarConfig, IDrag } from '../../interfaces';

function Hours({ date, drag, config }: { date: Date; drag: IDrag; config: ICalendarConfig }) {
  const dayOrders = getDayEvents(config.events, date);

  return (
    <div className="relative">
      {isToday(date) && <Needle currentDate={config.currentDate} />}
      {hourIndexes.map((hour) => (
        <div key={hour} style={{ position: 'relative' }}>
          <HourCell hour={hour} drag={drag} date={date} openModal={config.openEventModal} />
          <DayEvents hour={hour} drag={drag} events={dayOrders} config={config} />
          <EventSelector hour={hour} drag={drag} day={date.getDate()} />
        </div>
      ))}
    </div>
  );
}

export default Hours;
