import { ICalendarConfig, IDrag, IEvent } from '../../interfaces';
import Event from './Event';

function DayEvents({ hour, drag, events, config }: { hour: number; drag: IDrag; events: IEvent[]; config: ICalendarConfig }) {
  if (!events || !events.length) return null;

  return <>{events.map((event) => event.start === hour && <Event key={event.id} event={event} drag={drag} config={config} />)}</>;
}

export default DayEvents;
