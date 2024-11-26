import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import MoreEventsList from './MoreEventsList';
import EventOption from './EventOption';

import { ICalendarConfig, IDrag } from '../interfaces';

function DayEvents({ day, config, drag }: { day: Date; config: ICalendarConfig; drag: IDrag }) {
  const { height } = useWindowSize();

  const dayEvents = config.events.filter((event) => {
    const date = new Date(event.date);
    return date.getDate() === day.getDate() && date.getMonth() === day.getMonth() && date.getFullYear() === day.getFullYear();
  });

  const [rows, setRows] = useState(0);

  const calculateRows = () => {
    let rows;
    if (height < 420) rows = 0;
    else if (height < 520) rows = 1;
    else if (height < 620) rows = 2;
    else if (height < 720) rows = 3;
    else if (height < 820) rows = 4;
    else if (height < 920) rows = 5;
    else if (height < 1020) rows = 6;
    else rows = 7;
    setRows(rows);
  };

  useEffect(() => {
    calculateRows();
  }, [height]);

  return (
    <>
      {dayEvents.map((event, index) => (
        <div key={index}>{(index < rows || dayEvents.length === 1) && <EventOption event={event} drag={drag} config={config} />}</div>
      ))}

      {dayEvents.length > rows && dayEvents.length !== 1 && (
        <MoreEventsList
          title={!rows ? dayEvents.length + ' ordens' : 'mais ' + (dayEvents.length - rows)}
          dayEvents={dayEvents}
          config={config}
          drag={drag}
        />
      )}
    </>
  );
}

export default DayEvents;
