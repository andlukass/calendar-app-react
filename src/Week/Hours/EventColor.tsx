import { IColor } from '../../interfaces';

function EventColor({ colors }: { colors: IColor[] }) {
  return (
    <>
      {colors.map((color, index) => {
        const factor = colors.length;
        const width = 100 / factor;
        return (
          <div className={'h-full border-[0.5px] border-transparent'} style={{ width: `${width}%`, backgroundColor: color }} key={index} />
        );
      })}
    </>
  );
}

export default EventColor;
