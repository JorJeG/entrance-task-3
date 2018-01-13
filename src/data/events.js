import Moment from 'moment';

export const events = [
	{
		id: 1,
		title: 'Рассуждение о высоком',
		dateStart: Moment(),
		dateEnd: Moment().add(1, 'hours'),
		users: [],
		room: {
			id: 3, title: 'Жёлтый дом', capacity: 10, floor: 7
		}
	}
];
