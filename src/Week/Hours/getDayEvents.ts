import { IEvent } from '../../interfaces';

const isOverlapping = (a: IEvent, b: IEvent) => {
  return a.start < b.end && b.start < a.end;
};

const findOverlap = (event: IEvent, events: IEvent[]) => {
  for (let i = 0; i < events.length; i++) {
    if (isOverlapping(event, events[i]) && event.id !== events[i].id) return i;
  }
  return -1;
};

const lastOverlap = (event: IEvent, events: IEvent[], start: number) => {
  for (let i = start; i >= 0; i--) {
    if (isOverlapping(event, events[i])) return i;
  }
  return -1;
};

const getGroupDepth = (event: IEvent, events: IEvent[], start: number) => {
  if (!event.depth) return 0;
  let groupDepth = event.depth;
  if (start === events.length) return groupDepth;
  for (let i = start; i < events.length; i++) {
    const index = i;
    if (!events[index].depth) return groupDepth;
    if (groupDepth < events[index].depth) groupDepth = events[index].depth;
  }
  return groupDepth;
};

export const getDayEvents = (events: IEvent[], date: Date) => {
  const dayOrders = events.filter(
    (order) =>
      order.date &&
      order.date.getDate() === date.getDate() &&
      order.date.getMonth() === date.getMonth() &&
      order.date.getFullYear() === date.getFullYear(),
  );
  if (!dayOrders.length) return [];

  for (let i = 0; i < dayOrders.length; i++) {
    const next = findOverlap(dayOrders[i], dayOrders);
    const last = lastOverlap(dayOrders[i], dayOrders, i - 1);
    if (last !== -1 && next !== -1 && i > 0) dayOrders[i].depth = (dayOrders?.[last]?.depth || 0) + 1;
    else dayOrders[i].depth = 0;
  }

  for (let i = 0; i < dayOrders.length; i++) {
    if (dayOrders[i].depth) dayOrders[i].groupDepth = getGroupDepth(dayOrders[i], dayOrders, i + 1);
    else dayOrders[i].groupDepth = 0;
  }

  dayOrders.forEach((order) => {
    if (!order.groupDepth) {
      order.left = '0%';
      order.width = '80%';
      return;
    }
    const factor = 80 / (order.groupDepth + 1);
    const left = (order.depth || 0) * factor;
    order.width = `${80 - left}%`;
    order.left = `${left}%`;
  });

  return dayOrders;
};
