import React from 'react';
import { Calendar, Label } from '../';
import './TimePicker.css';

const TimePicker = (props) => {
  const {
    newEvent,
    calendar,
    selectCalendar,
    previusDay,
    nextDay,
    selectDay,
    selectedDay,
  } = props;
  return (
    <div hidden={newEvent} className="TimePicker">
      <Label
        calendar={calendar}
        selectCalendar={selectCalendar}
        previusDay={previusDay}
        nextDay={nextDay}
        selectedTime={selectedDay}
      />
      <Calendar
        selectedDay={selectedDay}
        selectDay={selectDay}
        calendar={calendar}
      />
    </div>
  );
};

export default TimePicker;
