import React from 'react';
import Arrow from './Arrow';

const Label = (props) => {
  const {
    previusDay,
    calendar,
    selectedTime,
    selectCalendar,
    nextDay
  } = props;
  return (
    <div className="PickerLabel">
      <button className="PickerButton" onClick={previusDay}>
        <Arrow />
      </button>
      <button
        className="data"
        style={calendar ? { color: '#0070E0' } : { color: '#000' }}
        onClick={selectCalendar}
      >
        {selectedTime.calendar(null, {
          lastDay: 'D MMM · [Вчера]',
          sameDay: 'D MMM · [Сегодня]',
          nextDay: 'D MMM · [Завтра]',
          lastWeek: 'D MMM · ddd',
          nextWeek: 'D MMM · ddd',
          sameElse: 'D MMM · ddd',
        })}
      </button>
      <button className="PickerButton" onClick={nextDay}>
        <Arrow />
      </button>
    </div>
  );
};

export default Label;
