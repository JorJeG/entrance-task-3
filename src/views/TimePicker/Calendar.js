import React from 'react';
import './calendar.css'
import months, {isSame, isSelected} from '../../helpers/date';
import {generateId} from '../../helpers/helpers';

const Calendar = (props) => {
  return (
    <div className={props.calendar ? 'calendar' : 'disabled'}>
      {months.map((month) => {
        return (
          <div className='month' key={month[0].format('MMMM')}>
            {month.map((day, index) => {
              // Создаёт первую неделю, если день начинается не с понедельника, то добавляет пустые ячейки
              if (day.format('E') > 1 && index === 0) {
                const emptyDays = [];
                for (let empty = 1; empty < day.format('E'); empty = empty + 1) {
                  emptyDays.push(<div key={generateId()}  className='emptyDays'></div>)
                }
                return (
                  <React.Fragment key={generateId()}>
                    {emptyDays}
                    <div
                      onClick={() => props.selectDay(day.format())}
                      value={`${day.format()}`}
                      key={`${day.format()}`}
                      className={isSame(day) ? 'currentDay' : 'day'}>
                      {day.format('DD')}
                    </div>
                  </React.Fragment>
                )
              }
              // Выводит дни
              return (
                <div 
                  onClick={() => props.selectDay(day.format())}
                  value={`${day.format()}`}
                  key={`${day.format()}`}
                  className={isSelected(day, props.selectedDay) ? 'selected' : isSame(day) ? 'currentDay' : 'day'}>
                  {day.format('DD')}
                </div>)
              })}
          </div>
        )
      })}
  </div>
  )
}

export default Calendar;