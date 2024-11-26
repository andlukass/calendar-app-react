import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import EventOption from './EventOption';

import { ICalendarConfig, IDrag, IEvent } from '../interfaces';

function MoreEventsList({ config, title, dayEvents, drag }: { config: ICalendarConfig; title: string; dayEvents: IEvent[]; drag: IDrag }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    //@ts-ignore
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e) e.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <div className=" w-full flex  justify-center cursor-pointer select-none ">
        <span className="font-semibold text-xs mx-1 hover:bg-gray-200 px-4 rounded" onClick={handleClick}>
          {title}
        </span>
      </div>
      {/* @ts-ignore */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ mt: 0.5 }}>
        {dayEvents.map((event, index) => (
          <MenuItem key={index} onClick={() => config.openEventModal(event)}>
            <EventOption config={config} event={event} drag={drag} close={(e) => handleClose(e)} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default MoreEventsList;
