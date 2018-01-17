const Moment = require('moment');
const { models, sequelize } = require('./models');

// Чтобы выводить ровно по 15 минутному интервалу
const nearestFutureMinutes = (interval, someMoment) => {
	const roundedMinutes = Math.ceil(someMoment.minutes() / interval) * interval;
	return someMoment.clone().minutes(roundedMinutes).second(0);
}

function createData() {
  const usersPromise = models.User.bulkCreate([
    {
      login: 'veged',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
      homeFloor: 0,
    },
    {
      login: 'alt-j',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
      homeFloor: 3,
    },
    {
      login: 'yeti-or',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
      homeFloor: 2,
    },
  ]);

  const roomsPromise = models.Room.bulkCreate([
    {
      title: '404',
      capacity: 5,
      floor: 4,
    },
    {
      title: 'Деньги',
      capacity: 4,
      floor: 2,
    },
    {
      title: 'Карты',
      capacity: 4,
      floor: 2,
    },
    {
      title: 'Ствола',
      capacity: 2,
      floor: 2,
    },
    {
      title: '14',
      capacity: 6,
      floor: 3,
    },
  ]);


	const now = Moment().hour(12);
	const oneHourLater = Moment().hour(12).clone().add(1, 'hour');
	const twoHoursLater = Moment().hour(12).clone().add(2, 'hour');
	const threeHoursLater = Moment().hour(12).clone().add(3, 'hour');

  const eventsPromise = models.Event.bulkCreate([
    {
      title: 'ШРИ 2018 - начало',
      dateStart: nearestFutureMinutes(15, now),
      dateEnd: nearestFutureMinutes(15, oneHourLater),
    },
    {
      title: '👾 Хакатон 👾',
      dateStart: nearestFutureMinutes(15, oneHourLater),
      dateEnd: nearestFutureMinutes(15, twoHoursLater),
    },
    {
      title: '🍨 Пробуем kefir.js',
      dateStart: nearestFutureMinutes(15, twoHoursLater),
      dateEnd: nearestFutureMinutes(15, threeHoursLater),
    },
  ]);

  Promise.all([usersPromise, roomsPromise, eventsPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Room.findAll(),
      models.Event.findAll(),
    ]))
    .then(([users, rooms, events]) => {
      const promises = [];
      promises.push(events[0].setRoom(rooms[0]));
      promises.push(events[1].setRoom(rooms[1]));
      promises.push(events[2].setRoom(rooms[2]));

      promises.push(events[0].setUsers([users[0], users[1]]));
      promises.push(events[1].setUsers([users[1], users[2]]));
      promises.push(events[2].setUsers([users[0], users[2]]));

      return Promise.all(promises);
    });
}

sequelize.sync()
  .then(createData);
