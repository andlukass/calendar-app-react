import { IDrag } from '../../interfaces';
import { getHourByIndex } from '../../utils/getHourByIndex';

function HourCell({ date, hour, drag, openModal }: { date: Date; hour: number; drag: IDrag; openModal: (_: any) => void }) {
  const { dragEnd, dragStart, startDraggin, stopDraggin, updateEnd } = drag;

  const createEvent = (start: number, end?: number) => {
    const newEventDate = {
      date: date,
      start: getHourByIndex(start),
      end: getHourByIndex(end != undefined ? end + 1 : start + 1),
    };
    openModal(newEventDate);
    stopDraggin();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateEnd(date.getDate(), date.getMonth() + 1, date.getFullYear(), hour);
  };

  const handleDragEnd = () => {
    createEvent(dragStart.current, dragEnd.current);
    stopDraggin();
  };

  return (
    <div
      className={`h-[25px] draggable-item border-[0.5px] border-transparent border-l-gray-200 ${hour % 2 ? '!border-b-gray-200' : ''}`}
      onDragStart={() => startDraggin(date.getDate(), hour)}
      onClick={() => createEvent(hour)}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      key={hour}
      draggable
    />
  );
}

export default HourCell;
