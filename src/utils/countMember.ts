import { Member } from '../types/member';

const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

export const counts = (data: Member[], startDaysAgo: number): Record<string, number> => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - startDaysAgo);

  const dateArray: string[] = [];
  for (let d = new Date(startDate); d <= new Date(); d.setDate(d.getDate() + 1)) {
    dateArray.push(`${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`);
  }

  const initialAccumulator = dateArray.reduce<Record<string, number>>((acc, curDate) => {
    acc[curDate] = 0;
    return acc;
  }, {});

  return data.reduce((acc, member) => {
    const dateObj = new Date(member.updatedAt);
    if (dateObj >= startDate) {
      const dateKey = `${dateObj.getFullYear()}-${padZero(dateObj.getMonth() + 1)}-${padZero(
        dateObj.getDate()
      )}`;
      if (acc[dateKey] !== undefined) {
        acc[dateKey]++;
      }
    }
    return acc;
  }, initialAccumulator);
};

export const countFromSpecificDate = (
  data: Member[],
  year: number,
  month: number,
  day: number
): number => {
  const specificDate = new Date(year, month - 1, day);

  return data.reduce((count, member) => {
    const memberDate = new Date(member.updatedAt);
    if (memberDate >= specificDate) {
      count++;
    }
    return count;
  }, 0);
};
