import { ICalendarConfig, IDrag, IEvent } from "../../interfaces";
import EventColor from "./EventColor";

function Event({
  event,
  drag,
  config,
}: {
  event: IEvent;
  drag?: IDrag;
  config?: ICalendarConfig;
}) {
  const eventSize = event.end - event.start;

  const changeOrderDate = () => {
    if (!drag) return;
    if (!config?.changeEvent || !drag) return;
    if (drag.eventDragStart.current < 0 || drag.eventDragStart.current > 47)
      return;
    if (drag.dragEnd.current < 0 || drag.dragEnd.current > 47) return;
    if (drag.dragDay.current < 0 || drag.dragDay.current > 31) return;
    const duration = event.end - event.start;
    const start = drag.dragEnd.current;
    const end = start + duration;
    const eventDate = new Date(
      `${drag.dragYear.current}/${drag.dragMonth.current}/${drag.dragDay.current}`
    );
    event.date = eventDate;
    event.start = start;
    event.end = end;

    config.changeEvent(event.id, event.date, event.start, event.end);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, end: number) => {
    if (!drag) return;
    e.preventDefault();
    drag.updateEnd(
      event.date.getDate(),
      event.date.getMonth() + 1,
      event.date.getFullYear(),
      end
    );
  };

  const handleDragEnd = () => {
    if (!drag) return;
    changeOrderDate();
    drag.stopDraggin();
  };

  const isPersonal = event.isPersonal && event.createdBy != config.currentUser;

  return (
    <div
      onClick={() => {
        if (isPersonal) return;
        config?.openEventModal(event);
      }}
      className={`cursor-pointer absolute top-[-1px] rounded-lg overflow-hidden border border-white ${
        drag ? "z-[89]" : "z-[90] pointer-events-none"
      } ${drag?.dragEvent.current == event.id && drag ? "opacity-50" : ""}`}
      style={{ left: event.left, width: event.width }}
      onDragEnd={handleDragEnd}
    >
      <div
        className="flex items-center h-[25px]"
        draggable={!isPersonal}
        onDragOver={(e) => handleDragOver(e, event.start)}
        onDragStart={() =>
          drag && drag.startEventDraggin(event.start, event.id)
        }
      >
        <EventColor colors={event.colors} />
        <span className="absolute text-xs text-white font-bold whitespace-pre-line text-nowrap max-w-full p-2 truncate leading-[13px] !pt-5">
          {isPersonal ? "" : event.title}
        </span>
      </div>

      {Array.from({ length: eventSize - 1 }, (_, index) => (
        <div
          onDragOver={(e) => handleDragOver(e, event.start + index + 1)}
          onDragStart={() =>
            drag && drag.startEventDraggin(event.start + index, event.id)
          }
          className="flex items-center h-[25px]"
          key={index}
          draggable={!isPersonal}
        >
          <EventColor colors={event.colors} />
        </div>
      ))}
    </div>
  );
}

export default Event;
