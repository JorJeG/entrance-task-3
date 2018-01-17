import Moment from 'moment';
import { nearestFutureMinutes } from '../helpers/date';

const now = Moment();
const afterHour = Moment().add(1, 'hours');
const events = [
  {
    id: 1,
    title: 'Рассуждение о высоком',
    dateStart: nearestFutureMinutes(15, now),
    dateEnd: nearestFutureMinutes(15, afterHour),
    users: [
      {
        id: '2rewaf2',
        login: 'Томас Андерсон',
        homeFloor: 2,
        avatarUrl: 'https://avatars0.githubusercontent.com/u/27224?s=400&v=4',
      },
      {
        id: '4fdsavht5',
        login: 'Кларк Кент',
        homeFloor: 2,
        avatarUrl: 'https://avatars3.githubusercontent.com/u/788678?s=400&v=4',
      },
    ],
    room: {
      id: '32dsa5t', title: 'Джокер', capacity: 6, floor: 6,
    },
  },
];

export { events as default };
