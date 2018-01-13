import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

function firstMonth() {
	const start = Moment().subtract(1, 'months').startOf('month');
	const end = Moment().subtract(1, 'months').endOf('month');
	return Array.from(moment.range(start, end).by('day'));
}
function secondMonth() {
	const start = Moment().startOf('month');
	const end = Moment().endOf('month');
	return Array.from(moment.range(start, end).by('day'));
}
function thirdMonth() {
	const start = Moment().add(1, 'months').startOf('month');
	const end = Moment().add(1, 'months').endOf('month');
	return Array.from(moment.range(start, end).by('day'));
}

export const day = () => {
	const start = Moment().startOf('day').add(8, 'hours');
	const end = Moment().endOf('day').add(1, 'hours');
	return Array.from(moment.range(start, end).by('hours'));
}

export const isSame = (day) => moment(moment()).isSame(day.format(), 'day');
export const isSelected = (day, selected) => moment(selected).isSame(day.format(), 'day');

const months = [firstMonth(), secondMonth(), thirdMonth()];

export default months;
