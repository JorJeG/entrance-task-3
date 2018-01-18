import React from 'react';
import Arrow from './Arrow';

const Label = props => (
  <div className="PickerLabel">
    <button className="PickerButton" onClick={props.previusDay}>
      <Arrow />
    </button>
    <button
      className="data"
      style={props.calendar ? { color: '#0070E0' } : { color: '#000' }}
      onClick={props.selectCalendar}
    >
      {props.selectedTime.calendar(null, {
				lastDay: 'D MMM · [Вчера]',
				sameDay: 'D MMM · [Сегодня]',
				nextDay: 'D MMM · [Завтра]',
				lastWeek: 'D MMM · ddd',
				nextWeek: 'D MMM · ddd',
				sameElse: 'D MMM · ddd',
			})}
    </button>
    <button className="PickerButton" onClick={props.nextDay}>
      <Arrow />
    </button>
  </div>
);

export default Label;
