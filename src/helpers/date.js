import Moment from 'moment';
import {extendMoment} from 'moment-range';
const arrayFrom = require('array-from');

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
const moment = extendMoment(Moment);

export const nearestFutureMinutes = (interval, someMoment) => {
	const roundedMinutes = Math.ceil(someMoment.minutes() / interval) * interval;
	return someMoment.clone().minutes(roundedMinutes).second(0);
}

function firstMonth() {
	const start = Moment().subtract(1, 'months').startOf('month');
	const end = Moment().subtract(1, 'months').endOf('month');
	return arrayFrom(moment.range(start, end).by('day'));
}
function secondMonth() {
	const start = Moment().startOf('month');
	const end = Moment().endOf('month');
	return arrayFrom(moment.range(start, end).by('day'));
}
function thirdMonth() {
	const start = Moment().add(1, 'months').startOf('month');
	const end = Moment().add(1, 'months').endOf('month');
	return arrayFrom(moment.range(start, end).by('day'));
}

export const day = () => {
	const start = Moment().startOf('day').add(7, 'hours');
	const end = Moment().endOf('day');
	return arrayFrom(moment.range(start, end).by('hours'));
}

export const dayInMinutes = (selectedDay) => {
	const start = Moment(selectedDay).startOf('day').add(7, 'hours');
	const end = Moment(selectedDay).endOf('day');
	return arrayFrom(moment.range(start, end).by('minutes', {step: 15}));
}

export const eventDuration = (dateStart, dateEnd) => {
	return arrayFrom(moment.range(dateStart, dateEnd.clone().subtract(1, 'minutes')).by('minutes')).length;
}

export const isSame = (day) => Moment(Moment()).isSame(day, 'day');
export const isSelected = (day, selected) => selected.isSame(day, 'day');
export const isSelectedTime = (time, selected) => selected.isSame(time, 'minute');
export const isSelectedHour = (time, selected) => selected.isSame(time, 'hours');

const months = [firstMonth(), secondMonth(), thirdMonth()];

export default months;
