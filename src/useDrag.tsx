import { useEffect, useRef, useState } from 'react';
import { removeDragImage } from './Week/utils/removeDragImage';
import { IDrag } from './interfaces';

function useDrag(): IDrag {
  const dragStart = useRef(-1);
  const dragEnd = useRef(-1);
  const dragMonth = useRef(-1);
  const dragYear = useRef(-1);
  const dragDay = useRef(-1);
  const dragEvent = useRef('');
  const eventDragStart = useRef(-1);
  const [eventSelectorEnd, setEventSelectorEnd] = useState(-1);
  const [dragging, setDragging] = useState(false);

  const updateEnd = (day: number, month: number, year: number, end: number) => {
    if (eventDragStart.current !== -1 && day !== dragDay.current) dragDay.current = day;
    if (eventDragStart.current !== -1 && month !== dragMonth.current) dragMonth.current = month;
    if (eventDragStart.current !== -1 && year !== dragYear.current) dragYear.current = year;
    if (dragStart.current !== -1) setEventSelectorEnd(end);
    if (end !== dragEnd.current) dragEnd.current = end;
  };

  const startDraggin = (day: number, start: number) => {
    dragStart.current = start;
    dragDay.current = day;
    setDragging(true);
  };

  const startEventDraggin = (start: number, id: string) => {
    setDragging(true);
    eventDragStart.current = start;
    dragEvent.current = id;
  };

  const stopDraggin = () => {
    dragStart.current = -1;
    eventDragStart.current = -1;
    dragMonth.current = -1;
    dragEnd.current = -1;
    dragYear.current = -1;
    dragDay.current = -1;
    dragEvent.current = '';
    setEventSelectorEnd(-1);
    setDragging(false);
  };

  useEffect(() => {
    removeDragImage();
  }, []);

  return {
    dragging,
    dragStart,
    startEventDraggin,
    eventSelectorEnd,
    eventDragStart,
    startDraggin,
    stopDraggin,
    dragEvent,
    updateEnd,
    dragMonth,
    dragYear,
    dragEnd,
    dragDay,
  };
}

export default useDrag;
