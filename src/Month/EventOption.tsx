import { getHourByIndex } from '../utils/getHourByIndex';
import { ICalendarConfig, IDrag, IEvent } from '../interfaces';

function EventOption({
  event,
  drag,
  config,
  close,
}: {
  event: IEvent;
  drag: IDrag;
  config: ICalendarConfig;
  close?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div
      onClick={() => config.openEventModal(event)}
      className="w-full flex items-center rounded cursor-pointer select-none hover:bg-gray-200"
      draggable
      onDragStart={() => {
        if (close) close();
        drag.startEventDraggin(event.date.getDate(), event.id);
      }}
    >
      <div
        style={{ background: event.colors.length > 1 ? 'linear-gradient(45deg, red, yellow, blue)' : event.colors?.[0] || '#787878' }}
        className="min-w-1.5 min-h-1.5 rounded-full mx-1"
      />

      <span className="text-[11px] text-gray-400">{getHourByIndex(event.start)}&nbsp;</span>

      <span className="text-[11px] text-gray-900 font-semibold truncate">{event.title}</span>
    </div>
  );
}

export default EventOption;
