import Moment from 'moment';
import {nearestFutureMinutes} from '../helpers/date';

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
		sameDay: '[Сегодня]'
	}
});

export const generateId = () => Math.floor(Math.random() * 100000);

export const range = (start, end) => {
	const result = [0, 1, 2, 3, 4, 5, 6, 7];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
};

export const removeUser = (event, id) => {
	const removeIndex = event.users.findIndex((user) => user.id === id);
	return Object.assign({}, event, {
		users: [
			...event.users.slice(0, removeIndex),
			...event.users.slice(removeIndex + 1)
		]
	});
};

export const addUser = (event, user) => (
	Object.assign({}, event, {
		users: [
			...event.users, user
		]
	})
);

export const addRoom = (event, room) => {
	return Object.assign({}, event, {
		room
	});
};

export const removeRoom = (event) => {
	return Object.assign({}, event, {
		room: {}
	});
};

export const renameEvent = (event, value) => {
	return Object.assign({}, event, {
		title: value
	});
};

export const mockEvent = (event) => {
	return Object.assign({}, event, {
		id: generateId(),
		title: '',
		dateStart: nearestFutureMinutes(15, now),
		dateEnd: nearestFutureMinutes(15, afterHour),
		users: [],
		room: {}
	});
};

export const newEventWithTime = (event, dateStart, room) => {
	return Object.assign({}, event, {
		id: generateId(),
		title: '',
		dateStart: Moment(dateStart),
		dateEnd: Moment(dateStart).add(1, 'hours'),
		users: [],
		room
	});
};

export const changeEventDateStart = (event, dateStart) => {
	return Object.assign({}, event, {
		dateStart
	});
};

export const changeEventDateEnd = (event, dateEnd) => {
	return Object.assign({}, event, {
		dateEnd
	});
};

export const changeEventDay = (event, date) => {
	const dateHourStart = event.dateStart.format('HH');
	const dateMinutesStart = event.dateStart.format('mm');
	const dateHourEnd = event.dateEnd.format('HH');
	const dateMinutesEnd = event.dateEnd.format('mm');
	return Object.assign({}, event, {
		dateStart: date.clone().hours(dateHourStart).minutes(dateMinutesStart),
		dateEnd: date.clone().hours(dateHourEnd).minutes(dateMinutesEnd)
	});
};

export const addNewEvent = (events, event) => {
	return [...events, event];
};

export const deleteEvent = (events, id) => {
	const removeIndex = events.findIndex((event) => event.id === id);
	return [
			...events.slice(0, removeIndex),
			...events.slice(removeIndex + 1)
		];
};

export const saveEvent = (events, changedEvent) => {
	const removeIndex = events.findIndex((event) => event.id === changedEvent.id);
	return [
		...events.slice(0, removeIndex),
		...events.slice(removeIndex + 1),
		changedEvent
	];
}

export const updateBox = (oldBox, newBox) => {
	// Выравнивает на мобильном
	let left = null;
	const rootB = document.getElementById('root').clientWidth;
	const listFloorB = document.getElementById('listFloor').clientWidth;
	const allWidth = window.screen.availWidth;
	let diff = allWidth - listFloorB;
	if (rootB > 1280) {
		if (newBox.left - diff > 780) {
			left = newBox.left + newBox.width/2 - 360;
		} else {
			left = newBox.left + newBox.width/2 - 180;
		}
	} else if (rootB > 360) {
		// Пока так чтобы не вылезало
		left = newBox.left + newBox.width/2 - 360;
	} else {
		left = 0;
	}
	const top = window.scrollY + newBox.top;
	return Object.assign({}, oldBox, {
		top: top,
		bottom: newBox.bottom,
		left: left,
		right: newBox.right
	});
};
