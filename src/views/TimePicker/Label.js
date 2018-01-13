import React from 'react';
import arrow from '../../assets/touch/arrow.svg';

const Label = (props) => {
  return (
    <div className='PickerLabel'>
      <a className='button' onClick={props.previusDay}>
        <img className='previus' src={arrow} alt='previus day' />
      </a>
      <p onClick={props.selectCalendar}>
        {props.selectedTime.calendar(null, {
          lastDay: 'D MMM · [Вчера]',
          sameDay: 'D MMM · [Сегодня]',
          nextDay: 'D MMM · [Завтра]',
          lastWeek: 'D MMM · dddd',
          nextWeek: 'D MMM · dddd',
          sameElse: 'D MMM · dddd'
        })}
      </p>
      <a className='button' onClick={props.nextDay}>
        <img className='next' src={arrow} alt='next day'/>
      </a>
    </div>
  )
}

export default Label;