import { Grid } from '@mui/material';

import DayEvents from './DayEvents';
import DayTitle from './DayTitle';
import { getMonthDates } from './getMonthDates';

import useDrag from '../useDrag';
import { ICalendarConfig } from '../interfaces';

function Month({ config }: { config: ICalendarConfig }) {
  const drag = useDrag();

  const days = getMonthDates(config.currentDate);

  const handleEndDrag = async () => {
    const id = drag.dragEvent.current;
    const year = drag.dragYear.current;
    const month = drag.dragMonth.current;
    const day = drag.dragDay.current;
    const order = config.events.find((e) => e.id === id);
    const newDate = new Date(`${year}-${month}-${day}`);
    order.date = newDate;
    config.changeEvent(id, newDate, order.start, order.end);
    drag.stopDraggin();
  };

  return (
    <Grid id="hide-scroll" container sx={gridContainerStyle}>
      {days.map((day, index) => (
        <Grid
          key={index}
          item
          xs={12 / 7}
          sx={gridItemStyle}
          onClick={(e) => {
            e.stopPropagation();
            config.openEventModal({ date: day });
          }}
          onDrop={handleEndDrag}
          onDragOver={(e) => {
            e.preventDefault();
            drag.updateEnd(day.getDate(), day.getMonth() + 1, day.getFullYear(), 0);
          }}
        >
          <DayTitle day={day} index={index} />
          <DayEvents day={day} config={config} drag={drag} />
        </Grid>
      ))}
    </Grid>
  );
}

const gridContainerStyle = {
  display: 'flex',
  width: '100%',
  height: '100vh',
  position: 'relative',
  backgroundColor: 'white',
  boxShadow: '0 0 0 0.10px #656464',
};

const gridItemStyle = {
  height: '20%',
  boxShadow: '0 0 0 0.10px #656464',
  maxHeight: 180,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export default Month;
