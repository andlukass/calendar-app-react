export const getNeedlePos = () => {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const hoursSize = hours * 50;
  const minutesSize = (minutes * 52) / 60;
  return hoursSize + minutesSize;
};
