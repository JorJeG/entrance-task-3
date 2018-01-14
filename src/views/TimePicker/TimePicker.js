import React from 'react';
import {Calendar, Label} from '../';
import './TimePicker.css';

const TimePicker = (props) => (
	<div hidden={props.newEvent} className='TimePicker'>
		<Label
			selectCalendar={props.selectCalendar}
			previusDay={props.previusDay}
			nextDay={props.nextDay}
			selectedTime={props.selectedDay} />
		<Calendar
			selectedDay={props.selectedDay}
			selectDay={props.selectDay}
			calendar={props.calendar} />
	</div>
);

export default TimePicker;
