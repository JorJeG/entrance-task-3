import Moment from 'moment';
import { nearestFutureMinutes } from '../helpers/date';

const now = Moment();
const afterHour = Moment().add(1, 'hours');
Moment.locale('ru', {
  monthsShort: [
    'Янв',
    'Фев',
    'Март',
    'Апр',
    'Май',
    'Июнь',
    'Июль',
    'Авг',
    'Сент',
    'Окт',
    'Нояб',
    'Дек',
  ],
  weekdaysShort: [
    'Воскр',
    'Пон',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  weekdaysMin: [
    'Воск',
    'Пон',
    'Вт',
    'Ср',
    'Чет',
    'Пят',
    'Суб',
  ],
  calendar: {
    sameDay: '[Сегодня]',
  },
});

export const generateId = () => Math.floor(Math.random() * 100000);

export const range = (start, end) => {
  const result = [0, 1, 2, 3, 4, 5, 6, 7];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
};

export const removeUser = (event, id) => {
  const removeIndex = event.users.findIndex(user => user.id === id);
  return Object.assign({}, event, {
    users: [
      ...event.users.slice(0, removeIndex),
      ...event.users.slice(removeIndex + 1),
    ],
  });
};

export const addUser = (event, user) => (
  Object.assign({}, event, {
    users: [
      ...event.users, user,
    ],
  })
);

export const addRoom = (event, room) => Object.assign({}, event, {
  room,
});

export const removeRoom = event => Object.assign({}, event, {
  room: {},
});

export const renameEvent = (event, value) => Object.assign({}, event, {
  title: value,
});

export const mockEvent = event => Object.assign({}, event, {
  id: generateId(),
  title: '',
  dateStart: nearestFutureMinutes(15, now),
  dateEnd: nearestFutureMinutes(15, afterHour),
  users: [],
  room: {},
});

export const newEventWithTime = (event, dateStart, room) => Object.assign({}, event, {
  id: generateId(),
  title: '',
  dateStart: Moment(dateStart),
  dateEnd: Moment(dateStart).add(1, 'hours'),
  users: [],
  room,
});

export const changeEventDateStart = (event, dateStart) => Object.assign({}, event, {
  dateStart,
});

export const changeEventDateEnd = (event, dateEnd) => Object.assign({}, event, {
  dateEnd,
});

export const changeEventDay = (event, date) => {
  const dateHourStart = event.dateStart.format('HH');
  const dateMinutesStart = event.dateStart.format('mm');
  const dateHourEnd = event.dateEnd.format('HH');
  const dateMinutesEnd = event.dateEnd.format('mm');
  return Object.assign({}, event, {
    dateStart: date.clone().hours(dateHourStart).minutes(dateMinutesStart),
    dateEnd: date.clone().hours(dateHourEnd).minutes(dateMinutesEnd),
  });
};

export const addNewEvent = (events, event) => [...events, event];

export const deleteEvent = (events, id) => {
  const removeIndex = events.findIndex(event => event.id === id);
  return [
    ...events.slice(0, removeIndex),
    ...events.slice(removeIndex + 1),
  ];
};

export const saveEvent = (events, changedEvent) => {
  const removeIndex = events.findIndex(event => event.id === changedEvent.id);
  return [
    ...events.slice(0, removeIndex),
    ...events.slice(removeIndex + 1),
    changedEvent,
  ];
};

export const updateBox = (oldBox, newBox) => {
  // Выравнивает на мобильном
  // const left = window.screen.width > 360 ? newBox.left + newBox.width/2 - 180 : 0;
  let left = null;
  if (window.screen.width > 360) {
    if (newBox.left > 920) {
      left = (newBox.left + (newBox.width / 2)) - 360;
    } else {
      left = (newBox.left + (newBox.width / 2)) - 180;
    }
  } else {
    left = 0;
  }
  const top = window.scrollY + newBox.top;
  return Object.assign({}, oldBox, {
    top,
    bottom: newBox.bottom,
    left,
    right: newBox.right,
  });
};
