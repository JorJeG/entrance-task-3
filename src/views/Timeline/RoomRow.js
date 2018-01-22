import React, { Component } from 'react';
import {
  dayInMinutes,
  isSelectedTime,
  eventDuration,
  eventDurationToEnd,
} from '../../helpers/date';

class RoomRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayInM: [],
      eventNumber: 0,
    };
  }
  componentDidMount() {
    const dayInM = dayInMinutes(this.props.selectedDay);
    this.setState({
      dayInM,
      selectedDay: this.props.selectedDay,
      events: this.props.event,
    });
  }
  componentWillReceiveProps(nextProps) {
    const dayInM = dayInMinutes(nextProps.selectedDay);
    this.setState({
      dayInM,
      selectedDay: nextProps.selectedDay,
      eventNumber: nextProps.events.length,
      events: nextProps.events,
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.selectedDay !== nextProps.selectedDay) {
      return true;
    }
    if (nextProps.events.length !== this.state.eventNumber) {
      return true;
    }
    return false;
  }
  handleCreate(e) {
    this.props.createEvent(e.target.value, e.target.dataset.room);
  }
  handlerPopover(e) {
    this.props.handlePopover(e, this.props.events);
  }
  render() {
    const { room, events } = this.props;
    const { dayInM } = this.state;
    const columns = [];
    let minutes = 0;
    dayInM.forEach((hour, index) => {
      // Пропускаем занятые ячейки
      if (minutes > index) {
        return null;
      }
      // Проверяем есть ли встречи на данную дату
      if (events.length > 0) {
        const findEvent = events.find(event => isSelectedTime(hour, event.dateStart));
        if (findEvent) {
          // Высчитывает ширину ячеек, последние обрезает чтобы не выставлялись
          let width = eventDuration(findEvent.dateStart, findEvent.dateEnd);
          const lastHours = eventDurationToEnd(findEvent.dateStart);
          switch (lastHours) {
            case 15:
              width = 15;
              break;
            case 30:
              width = 30;
              break;
            case 45:
              width = 45;
              break;
            default:
              break;
          }
          // Нужно для того, чтобы пропустить занятое время
          minutes = index + (width / 15);
          return columns.push(<div
            key={`${room.title}-${hour.format('HH:mm')}`}
            className="event-container"
          >
            <button
              style={{ width: `${width}px` }}
              data-id={findEvent.id}
              className="eventCell"
              onMouseUp={e => this.handlerPopover(e)}
              value={hour.format()}
            />
          </div>);
        }
      }
      return columns.push(<button
        onMouseUp={e => this.handleCreate(e)}
        data-room={room.id}
        key={`${room.title}-${hour.format('HH:mm')}`}
        value={hour.format()}
        className="minutesCell"
      />);
    });

    return (
      <li className="styledLi">
        <div className="styledRoom">
          <h2 className="styledRoomTitle">{room.title}
          </h2>
          <p>до {room.capacity} человек</p>
        </div>
        {columns}
      </li>
    );
  }
}

export default RoomRow;
