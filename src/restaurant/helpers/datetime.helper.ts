import { OpenHour } from './../entities/openhours.entity';
import { DaysOfWeek } from '../enums';

const enumToDay = [
  DaysOfWeek.Sunday,
  DaysOfWeek.Monday,
  DaysOfWeek.TuesDay,
  DaysOfWeek.Wednesday,
  DaysOfWeek.Thursday,
  DaysOfWeek.Friday,
  DaysOfWeek.Saturday,
];

const getVietnamTimezoneDate = (): Date =>
  new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }),
  );
const getDay = (day: number): DaysOfWeek => {
  return enumToDay[day];
};

const encodeOpenHour = ({
  day,
  fromHour,
  fromMinute,
  toHour,
  toMinute,
}: OpenHour): { gte: number; lt: number } => {
  const dayIndex = enumToDay.findIndex((e) => e == day) + 1;
  const start = dayIndex * 10000 + fromHour * 60 + fromMinute;
  const end = dayIndex * 10000 + toHour * 60 + toMinute;
  return { gte: start, lt: end };
};

const encodeDate = (date: Date = getVietnamTimezoneDate()): number => {
  const dayIndex = date.getDay() + 1;
  const hour = date.getHours();
  const minute = date.getMinutes();
  const current = dayIndex * 10000 + hour * 60 + minute;
  return current;
};

const getCurrentWeekDay = (): DaysOfWeek => {
  return getDay(getVietnamTimezoneDate().getDay());
};

const getOpenStatus = (openHour: OpenHour): boolean => {
  const current = getVietnamTimezoneDate();
  const currentHours = current.getHours();
  const currentMinutes = current.getMinutes();
  const { fromHour, fromMinute, toHour, toMinute } = openHour;
  const laterThanOpening =
    currentHours > fromHour ||
    (currentHours == fromHour && currentMinutes >= fromMinute);
  const soonerThanClosing =
    currentHours < toHour ||
    (currentHours == toHour && currentMinutes <= toMinute);
  const isOpen = laterThanOpening && soonerThanClosing;
  return isOpen;
};

const getCurrentOpenHours = (openHours: OpenHour[]): OpenHour[] => {
  const currentDay = getCurrentWeekDay();
  return openHours.filter(({ day }) => day == currentDay);
};

const getIsOpeningCondition = (
  alias: string,
): { condition: string; params: any } => {
  // console.log({laterThanOpening,soonerThanClosing,  isOpen: (laterThanOpening && soonerThanClosing)});

  // raw query
  //   select r.name, o."day", o."fromHour", o."fromMinute", o."toHour", o."toMinute"
  // from restaurant r
  // 	join open_hour o
  // 	on r.id = o."restaurantId"
  // 		and o."day" = 'Monday'
  // 		and (22 > o."fromHour" or (22 = o."fromHour" and  20 > "fromMinute"))
  // 		and (22 < o."toHour" or (22 = o."toHour" and 20 < "toMinute"))
  const current = new Date();
  const currentHours = current.getHours();
  const currentMinutes = current.getHours();
  const currentWeekDay = getDay(current.getDay());
  return {
    condition: `${alias}.day = :currentDay and (:currentHour > ${alias}.fromHour or (:currentHour = ${alias}.fromHour and :currentMinute > ${alias}.fromMinute)) and (:currentHour < ${alias}.toHour or (:currentHour = ${alias}.toHour and :currentMinute < ${alias}.toMinute))`,
    params: {
      currentDay: currentWeekDay,
      currentHour: currentHours,
      currentMinute: currentMinutes,
    },
  };
};

export const DateTimeHelper = {
  getCurrentWeekDay,
  getIsOpeningCondition,
  getOpenStatus,
  getCurrentOpenHours,
  encodeOpenHour,
  encodeDate,
};
