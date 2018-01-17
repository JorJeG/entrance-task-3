import React, { Component } from 'react';
import './calendar.css';
import months, { isSame, isSelected } from '../../helpers/date';
import { generateId } from '../../helpers/helpers';

class Calendar extends Component {
  handleSelect(e) {
    this.props.selectDay(e.target.value);
  }
  render() {
    const { calendar, selectedDay } = this.props;
    return (
      <div className={calendar ? 'calendar' : 'disabled'}>
        {months.map(month => (
          <div className="month" key={month[0].format('MMMM')}>
            {month.map((day, index) => {
              // Создаёт первую неделю,
              // если день начинается не с понедельника,
              // то добавляет пустые ячейки
              if (day.format('E') > 1 && index === 0) {
                const emptyDays = [];
                for (let empty = 1; empty < day.format('E'); empty += 1) {
                  emptyDays.push(<div
                    key={generateId()}
                    className="emptyDays"
                  />);
                }
                return (
                  <React.Fragment key={generateId()}>
                    {emptyDays}
                    <button
                      onClick={e => this.handleSelect(e)}
                      value={`${day.format()}`}
                      key={`${day.format()}`}
                      className={isSame(day) ? 'currentDay' : 'day'}
                    >
                      {day.format('DD')}
                    </button>
                  </React.Fragment>
                );
              }
              // Выводит дни
              return (
                <button
                  onClick={e => this.handleSelect(e)}
                  value={`${day.format()}`}
                  key={`${day.format()}`}
                  className={isSelected(day, selectedDay) ? 'selected' : isSame(day) ? 'currentDay' : 'day'}
                >
                  {day.format('DD')}
                </button>);
              })}
          </div>
        ))}
      </div>
    );
  }
}

export default Calendar;
