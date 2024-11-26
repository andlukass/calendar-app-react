import Event from './Event';
import { getHourByIndex } from '../../utils/getHourByIndex';
import { IDrag, IEvent } from '../../interfaces';

function EventSelector({ hour, day, drag }: { hour: number; day: number; drag: IDrag }) {
  const { eventDragStart, dragDay, eventSelectorEnd, dragStart } = drag;

  const getStart = (): number => {
    return dragStart.current - eventSelectorEnd < 0 ? dragStart.current : eventSelectorEnd;
  };

  const getEnd = (): number => {
    return dragStart.current - eventSelectorEnd < 0 ? eventSelectorEnd : dragStart.current;
  };

  const title =
    Math.abs(dragStart.current - eventSelectorEnd) === 0
      ? `Novo, ${getHourByIndex(dragStart.current)}`
      : `Novo \n${getHourByIndex(getStart())} - ${getHourByIndex(getEnd() + 1)}`;

  const event: IEvent = {
    start: getStart(),
    title,
    end: getEnd() + 1,
    width: '85%',
    colors: ['#353535'],
    id: 'new',
    date: new Date(),
  };

  return <>{eventDragStart.current === -1 && hour === getStart() && day === dragDay.current && <Event event={event} />}</>;
}

export default EventSelector;
