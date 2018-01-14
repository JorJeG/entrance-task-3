import Moment from 'moment';

export const events = [
	{
		id: 1,
		title: 'Рассуждение о высоком',
		dateStart: Moment(),
		dateEnd: Moment().add(1, 'hours'),
		users: [
			{
				id: '2rewaf2',
				login: 'Томас Андерсон',
				homeFloor: 2,
				avatarUrl: 'https://avatars0.githubusercontent.com/u/27224?s=400&v=4'
			}
		],
		room: {
			id: '3iuggewf90', title: 'Жёлтый дом', capacity: 10, floor: 7
		}
	}
];
