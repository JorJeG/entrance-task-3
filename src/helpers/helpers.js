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
  title: '',
  dateStart: Moment(dateStart).format('YYYY-MM-DDTHH:mm:ss.SSS'),
  dateEnd: Moment(dateStart).add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSS'),
  users: [],
  room,
});

export const changeEventDateStart = (event, dateStart) => Object.assign({}, event, {
  dateStart: dateStart.format('YYYY-MM-DDTHH:mm:ss.SSS'),
});

export const changeEventDateEnd = (event, dateEnd) => Object.assign({}, event, {
  dateEnd: dateEnd.format('YYYY-MM-DDTHH:mm:ss.SSS'),
});

export const changeEventDay = (event, date) => {
  const dateHourStart = Moment(event.dateStart).format('HH');
  const dateMinutesStart = Moment(event.dateStart).format('mm');
  const dateHourEnd = Moment(event.dateEnd).format('HH');
  const dateMinutesEnd = Moment(event.dateEnd).format('mm');
  return Object.assign({}, event, {
    dateStart: date
      .clone()
      .hours(dateHourStart)
      .minutes(dateMinutesStart)
      .format('YYYY-MM-DDTHH:mm:ss.SSS'),
    dateEnd: date
      .clone()
      .hours(dateHourEnd)
      .minutes(dateMinutesEnd)
      .format('YYYY-MM-DDTHH:mm:ss.SSS'),
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
  let left = null;
  const rootB = document.getElementById('root').clientWidth;
  const listFloorB = document.getElementById('listFloor').clientWidth;
  // eslint-disable-next-line no-undef
  const allWidth = window.screen.availWidth;
  const diff = allWidth - listFloorB;
  if (rootB > 1280) {
    if (newBox.left - diff > 780) {
      left = (newBox.left + (newBox.width / 2)) - 360;
    } else {
      left = (newBox.left + (newBox.width / 2)) - 180;
    }
  } else if (rootB > 360) {
    // Пока так чтобы не вылезало
    left = (newBox.left + (newBox.width / 2)) - 360;
  } else {
    left = 0;
  }
  // eslint-disable-next-line no-undef
  const top = window.scrollY + newBox.top;
  return Object.assign({}, oldBox, {
    top,
    bottom: newBox.bottom,
    left,
    right: newBox.right,
  });
};
