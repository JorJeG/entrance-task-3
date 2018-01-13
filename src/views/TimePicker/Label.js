import React from 'react';
import arrow from '../../assets/touch/arrow.svg';

const Label = (props) => (
	<div className='PickerLabel'>
		<button className='PickerButton' onClick={props.previusDay}>
			<img className='previus' src={arrow} alt='previus day' />
		</button>
		<button className='data' onClick={props.selectCalendar}>
			{props.selectedTime.calendar(null, {
				lastDay: 'D MMM · [Вчера]',
				sameDay: 'D MMM · [Сегодня]',
				nextDay: 'D MMM · [Завтра]',
				lastWeek: 'D MMM · dddd',
				nextWeek: 'D MMM · dddd',
				sameElse: 'D MMM · dddd',
			})}
		</button>
		<button className='PickerButton' onClick={props.nextDay}>
			<img className='next' src={arrow} alt='next day' />
		</button>
	</div>
);

export default Label;
