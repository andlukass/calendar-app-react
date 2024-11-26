import { useEffect, useRef, useState } from 'react';

import { getNeedlePos } from '../utils/getNeedlePos';

function Needle({ currentDate }: { currentDate: Date }) {
  const needleRef = useRef<HTMLDivElement>(null);
  const [needlePos, setNeedlePos] = useState(getNeedlePos());

  const scrollToRef = () => {
    if (!needleRef.current) return;
    needleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      scrollToRef();
    }, 100);
    return () => {
      interval;
    };
  }, [currentDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNeedlePos(getNeedlePos());
    }, 60 * 5000); // 5 minutos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute h-0.5 w-full bg-red-500 cursor-pointer z-[90]" style={{ top: `${needlePos}px` }}>
      <div ref={needleRef} className="absolute" />
      <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-[3px] -left-1 z-[90] cursor-pointer" />
    </div>
  );
}

export default Needle;
