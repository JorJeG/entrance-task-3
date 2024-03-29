import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Timeline,
  Form,
  WithDataForm,
  EditForm,
  EventPopover,
  ConfirmAddPopover,
  ConfirmDeletePopover,
} from './views';
import {
  newEventWithTime,
  updateBox,
} from './helpers/helpers';
import logo from './assets/touch/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: false,
      selectedDay: Moment(),
      hidden: false,
      newEvent: false,
      editEvent: false,
      withData: false,
      event: {},
      today: true,
      now: Moment().format('HH:mm'),
      offset: Moment.duration(Moment().format('HH:mm')).asMinutes(),
      popover: {},
      onEvent: false,
      confirmAdd: false,
      confirmDelete: false,
    };
    this.selectCalendar = this.selectCalendar.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.previusDay = this.previusDay.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.handlePopover = this.handlePopover.bind(this);
    this.handleConfrimPopover = this.handleConfrimPopover.bind(this);
    this.handleDeletePopover = this.handleDeletePopover.bind(this);
    this.onEditEvent = this.onEditEvent.bind(this);
    this.onSaveEvent = this.onSaveEvent.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.handleConfirmAdd = this.handleConfirmAdd.bind(this);
  }
  componentDidMount() {
    this.container.addEventListener('scroll', this.handleScroll);
    this.timerID = setInterval(
      () => this.tick(),
      60000,
    );
  }
  shouldComponentUpdate(nextState) {
    if (this.state.hidden !== nextState.hidden) {
      return true;
    }
    return false;
  }
  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.timerID);
  }
  // Обработчик включения редактирования
  onEditEvent() {
    this.setState({
      editEvent: true,
      onEvent: false,
    });
  }
  // Обработчик для сохранения изменений во встречи
  onSaveEvent(event) {
    const usersIds = [];
    event.users.forEach(user => usersIds.push(user.id));
    this.props.updateEvent({
      variables: {
        id: event.id,
        input: {
          title: event.title,
          dateStart: Moment(event.dateStart).format('YYYY-MM-DDTHH:mm:ss.SSS'),
          dateEnd: Moment(event.dateEnd).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        },
        usersIds,
        roomId: event.room.id,
      },
    }).then(() => {
      this.setState({
        event: {},
        editEvent: false,
      });
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }
  // Обработчик для удаления встречи
  onDeleteEvent() {
    const { event: { id } } = this.state;
    this.props.removeEvent({
      variables: {
        id,
      },
    }).then(() => {
      this.setState({
        confirmDelete: false,
      });
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }
  // Обработчик для отмены удаления встречи
  onDeleteCancel() {
    this.setState({
      confirmDelete: false,
      editEvent: true,
    });
  }
  // Время
  tick() {
    this.setState({
      now: Moment().format('HH:mm'),
      offset: Moment.duration(Moment().format('HH:mm')).asMinutes(),
    });
  }
  // Обработчик для вызова календаря
  selectCalendar() {
    this.setState({
      calendar: !this.state.calendar,
    });
  }
  // Обработчик для выбора дня
  selectDay(data) {
    const { selectedDay } = this.state;
    if (!Moment(selectedDay).isSame(Moment(data), 'day')) {
      this.setState({
        selectedDay: Moment(data),
        today: false,
        calendar: false,
      });
    }
    if (Moment(Moment()).isSame(Moment(data), 'day')) {
      this.setState({
        today: true,
        calendar: false,
      });
    }
  }
  // Обработчик кнопки день вперед
  nextDay() {
    this.setState((prevState) => {
      const today = !!Moment().isSame(prevState.selectedDay.clone().add(1, 'days'), 'day');
      return {
        selectedDay: prevState.selectedDay.clone().add(1, 'days'),
        today,
      };
    });
  }
  // Обработчик кнопки день назад
  previusDay() {
    this.setState((prevState) => {
      const today = !!Moment().isSame(prevState.selectedDay.clone().subtract(1, 'days'), 'day');
      return {
        selectedDay: prevState.selectedDay.clone().subtract(1, 'days'),
        today,
      };
    });
  }
  // Обработчик скролла
  handleScroll(e) {
    e.stopPropagation();
    if (e.target.scrollLeft > 140) {
      this.setState({
        hidden: true,
      });
    } if (e.target.scrollLeft < 140) {
      this.setState({
        hidden: false,
      });
    }
  }
  // Обработчик переключения на создание встречи
  createEvent(e, selectedRoom) {
    if (typeof e === 'string') {
      const eventWithTime = newEventWithTime(this.state.event, e, selectedRoom);
      this.setState({
        withData: true,
        event: eventWithTime,
        onEvent: false,
      });
    } else {
      // const emptyEvent = mockEvent(this.state.event);
      this.setState({
        newEvent: true,
        // event: emptyEvent,
        onEvent: false,
      });
    }
  }
  // Обработчик кнопки Отмена
  cancelButton() {
    this.setState({
      newEvent: false,
      withData: false,
      editEvent: false,
      event: {},
    });
  }
  // Обработчик поповера для встреч
  handlePopover(e, events) {
    const { popover } = this.state;
    // const { feedQuery: { events } } = this.props;
    const selectedCell = e.target;
    const newPlace = updateBox(popover, selectedCell.getBoundingClientRect());
    const clickedEvent = events.find(event => Number(event.id) === Number(selectedCell.dataset.id));
    // console.log(this.popover.getBoundingClientRect());
    // console.log(window.scrollY);
    this.setState(prevState => ({
      popover: newPlace,
      onEvent: !prevState.onEvent,
      event: clickedEvent,
    }));
  }
  // Обработчик выключения поздравления о создании встречи
  handleConfrimPopover() {
    this.setState({
      event: {},
      confirmAdd: false,
    });
  }
  // Обработчик появления поздравления о создании встречи
  handleConfirmAdd(data) {
    this.setState({
      newEvent: false,
      withData: false,
      event: data.createEvent,
      confirmAdd: true,
    });
  }
  // Обработчик включения подтверждения удаления
  handleDeletePopover() {
    this.setState({
      confirmDelete: true,
      editEvent: false,
    });
  }
  render() {
    const {
      popover,
      event,
      onEvent,
      newEvent,
      withData,
      editEvent,
      confirmAdd,
      confirmDelete,
      selectedDay,
      calendar,
      hidden,
      offset,
      left,
      now,
      today,
    } = this.state;
    return (
      <div
        className="App"
      >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button
            hidden={newEvent || editEvent}
            onMouseUp={this.createEvent}
            className="App-createEvent"
          >
            Создать встречу
          </button>
        </header>
        <Timeline
          onEvent={onEvent}
          popover={popover}
          confirmDelete={confirmDelete}
          newEvent={newEvent}
          withData={withData}
          editEvent={editEvent}
          selectedTime={selectedDay}
          selectedDay={selectedDay}
          calendar={calendar}
          hidd={hidden}
          offset={offset}
          left={left}
          now={now}
          today={today}
          handlePopover={this.handlePopover}
          selectCalendar={this.selectCalendar}
          previusDay={this.previusDay}
          nextDay={this.nextDay}
          selectDay={this.selectDay}
          createEvent={this.createEvent}
          // eslint-disable-next-line no-return-assign
          scrollingRef={el => this.container = el}
          scrolling={this.scrolling}
        />
        {newEvent &&
        <Form
          title="Новая встреча"
          onConfirmAdd={this.handleConfirmAdd}
          handleCancel={this.cancelButton}
          handleDeletePopover={this.handleDeletePopover}
          onAddNewEvent={this.onAddNewEvent}
        />}
        {withData &&
        <WithDataForm
          title="Новая встреча"
          event={event}
          onConfirmAdd={this.handleConfirmAdd}
          handleCancel={this.cancelButton}
          handleDeletePopover={this.handleDeletePopover}
          onAddNewEvent={this.onAddNewEvent}
        />}
        {editEvent &&
        <EditForm
          title="Редактирование встречи"
          event={event}
          eventId={event.id}
          editEvent={editEvent}
          handleCancel={this.cancelButton}
          handleDeletePopover={this.handleDeletePopover}
          onSaveEvent={this.onSaveEvent}
        />}
        {onEvent &&
        <EventPopover
          onEditEvent={this.onEditEvent}
          popover={popover}
          popoverEvent={event}
        />}
        {confirmAdd &&
        <ConfirmAddPopover
          event={event}
          handleConfrimPopover={this.handleConfrimPopover}
        />
      }
        {confirmDelete &&
        <ConfirmDeletePopover
          onDeleteEvent={this.onDeleteEvent}
          onDeleteCancel={this.onDeleteCancel}
        />
      }
      </div>
    );
  }
}

const UPDATE_EVENT = gql`
  mutation updateEvent($id: ID!, $input: EventInput!, $roomId: ID!, $usersIds: [ID]) {
    updateEvent(id: $id, input: $input, usersIds: $usersIds, roomId: $roomId) {
      id
    }
  }
`;

const REMOVE_EVENT = gql`
  mutation removeEvent($id: ID!) {
    removeEvent(id: $id) {
      title
    }
  }
`;

App.propTypes = {
  removeEvent: PropTypes.func,
  updateEvent: PropTypes.func,
};

App.defaultProps = {
  removeEvent: null,
  updateEvent: null,
};

export default compose(
  graphql(REMOVE_EVENT, { name: 'removeEvent' }),
  graphql(UPDATE_EVENT, { name: 'updateEvent' }),
)(App);
