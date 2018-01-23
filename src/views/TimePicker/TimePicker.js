import React from 'react';
import PropTypes from 'prop-types';
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

TimePicker.propTypes = {
  newEvent: PropTypes.bool.isRequired,
  calendar: PropTypes.bool.isRequired,
  selectedDay: PropTypes.object.isRequired,
  selectCalendar: PropTypes.func.isRequired,
  previusDay: PropTypes.func.isRequired,
  nextDay: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
};

export default TimePicker;
