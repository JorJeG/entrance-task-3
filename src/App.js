import React, { Component } from 'react';
import Moment from 'moment';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Timeline,
  Form,
  EventPopover,
  ConfirmAddPopover,
  ConfirmDeletePopover,
} from './views';
import {
  removeUser,
  addUser,
  addRoom,
  removeRoom,
  renameEvent,
  mockEvent,
  newEventWithTime,
  changeEventDateStart,
  changeEventDateEnd,
  changeEventDay,
  addNewEvent,
  deleteEvent,
  saveEvent,
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
      member: '',
      newEvent: false,
      editEvent: false,
      event: {},
      checked: false,
      filledTitle: false,
      filledUser: false,
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
    this.handleTitle = this.handleTitle.bind(this);
    this.handleClearTitle = this.handleClearTitle.bind(this);
    this.handleHourStart = this.handleHourStart.bind(this);
    this.handleHourEnd = this.handleHourEnd.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleUnCheck = this.handleUnCheck.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.onAddNewEvent = this.onAddNewEvent.bind(this);
    this.handlePopover = this.handlePopover.bind(this);
    this.handleConfrimPopover = this.handleConfrimPopover.bind(this);
    this.handleDeletePopover = this.handleDeletePopover.bind(this);
    this.onEditEvent = this.onEditEvent.bind(this);
    this.onSaveEvent = this.onSaveEvent.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
  }
  componentDidMount() {
    // this.container.addEventListener('scroll', this.handleScroll);
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
    // this.container.removeEventListener('scroll', this.handleScroll);
    clearInterval(this.timerID);
  }
  // Обработчик включения редактирования
  onEditEvent() {
    this.setState({
      editEvent: true,
      onEvent: false,
      checked: true,
      filledUser: true,
      filledTitle: true,
    });
  }
  // Обработчик для добавления новой встречи
  onAddNewEvent() {
    const { events, event } = this.state;
    const addedEvent = addNewEvent(events, event);
    this.setState({
      events: addedEvent,
      newEvent: false,
      confirmAdd: true,
      filledUser: false,
      checked: false,
      filledTitle: false,
    });
  }
  // Обработчик для сохранения изменений во встречи
  onSaveEvent() {
    const { events, event } = this.state;
    const savedEvent = saveEvent(events, event);
    this.setState({
      events: savedEvent,
      editEvent: false,
      filledUser: false,
      filledTitle: false,
      checked: false,
    });
  }
  // Обработчик для удаления встречи
  onDeleteEvent() {
    const { events, event } = this.state;
    const removedEvents = deleteEvent(events, event.id);
    this.setState({
      events: removedEvents,
      confirmDelete: false,
      checked: false,
    });
  }
  // Обработчик удаления пользователя из встречи
  onDeleteUser(id) {
    const { event } = this.state;
    const updateUsers = removeUser(event, id);
    if (updateUsers.users.length > 0) {
      this.setState({
        event: updateUsers,
        filledUser: true,
      });
    } else {
      this.setState({
        event: updateUsers,
        filledUser: false,
      });
    }
  }
  // Обработчик добавления пользователя к встрече
  onAddUser(login) {
    const { event } = this.state;
    const { feedQuery } = this.props;
    const currentUser = feedQuery.users.find(user =>
      (user.login).toLowerCase() === login.toLowerCase());
    const addedUser = addUser(event, currentUser);
    this.setState({
      event: addedUser,
      filledUser: true,
    }, () => this.setState({ member: '' }));
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
  // Обработчик ввода названия встречи
  handleTitle(e) {
    const { event } = this.state;
    const renamedTitleEvent = renameEvent(event, e.target.value);
    if (e.target.value.length > 0) {
      this.setState({
        event: renamedTitleEvent,
        filledTitle: true,
      });
    } else {
      this.setState({
        event: renamedTitleEvent,
        filledTitle: false,
      });
    }
  }
  // Обработчик сброса названия события
  handleClearTitle() {
    const { event } = this.state;
    const clearedTitleEvent = renameEvent(event, '');
    this.setState({
      event: clearedTitleEvent,
      filledTitle: false,
    });
  }
  // Обработчик на изменение времени начала встречи
  handleHourStart(time) {
    const { event } = this.state;
    const changedEventDateStart = changeEventDateStart(event, Moment(time));
    this.setState({
      event: changedEventDateStart,
    });
  }
  // Обработчик на изменение времени окончания встречи
  handleHourEnd(time) {
    const { event } = this.state;
    const a = event.dateStart;
    if (Moment(a).diff(Moment(time)) > 0) {
      return;
    }
    const changedEventDateEnd = changeEventDateEnd(event, Moment(time));
    this.setState({
      event: changedEventDateEnd,
    });
  }
  // Обработчик на изменение даты
  handleDate(time) {
    const { event } = this.state;
    const changedEventDay = changeEventDay(event, Moment(time).startOf('day'));
    this.setState({
      event: changedEventDay,
    });
  }
  // Обработчик на поиск пользователя
  handleChange(event) {
    this.setState({
      member: event,
    });
  }
  // Обработчик на выбор комнаты
  handleCheck(e) {
    const { event } = this.state;
    const curentRoom = this.props.feedQuery.rooms.find(room => room.id === e.target.value);
    const addedRoom = addRoom(event, curentRoom);
    this.setState({
      event: addedRoom,
      checked: true,
    });
  }
  // Обработчик на снятие выбора комнаты
  handleUnCheck() {
    const { event } = this.state;
    const removedRoom = removeRoom(event);
    this.setState({
      event: removedRoom,
      checked: false,
    });
  }
  // Обработчик переключения на создание встречи
  createEvent(e, id) {
    if (typeof e === 'string') {
      const currentRoom = this.props.feedQuery.rooms.find(room => room.id === id);
      const eventWithTime = newEventWithTime(this.state.event, e, currentRoom);

      this.setState({
        newEvent: true,
        event: eventWithTime,
        onEvent: false,
        checked: true,
      });
    } else {
      const emptyEvent = mockEvent(this.state.event);
      this.setState({
        newEvent: true,
        event: emptyEvent,
        onEvent: false,
      });
    }
  }
  // Обработчик кнопки Отмена
  cancelButton() {
    this.setState({
      newEvent: false,
      editEvent: false,
      checked: false,
      filledUser: false,
      filledTitle: false,
    });
  }
  // Обработчик поповера для встреч
  handlePopover(e) {
    const { popover } = this.state;
    const { feedQuery: { events } } = this.props;
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
  // Обработчик включения поздравления о создании встречи
  handleConfrimPopover() {
    const { event } = this.state;
    const emptyedEvent = mockEvent(event);
    this.setState({
      event: emptyedEvent,
      confirmAdd: false,
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
      checked,
      filledUser,
      filledTitle,
      member
    } = this.state;
    const {
      feedQuery: {
        loading, rooms, users, events,
      },
    } = this.props;
    if (loading) {
      return <p>loading...</p>;
    }
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
          newEvent={newEvent}
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
          events={events}
          rooms={rooms}
          createEvent={this.createEvent}
          scrollingRef={el => this.container = el}
          scrolling={this.scrolling}
        />
        {newEvent &&
        <Form
          title="Новая встреча"
          eventTitle={event.title}
          rooms={rooms}
          users={users}
          newEvent={newEvent}
          event={event}
          checked={checked}
          filledTitle={filledTitle}
          filledUser={filledUser}
          member={member}
          handleTitle={this.handleTitle}
          handleClearTitle={this.handleClearTitle}
          handleDate={this.handleDate}
          handleHourStart={this.handleHourStart}
          handleHourEnd={this.handleHourEnd}
          handleCheck={this.handleCheck}
          handleUnCheck={this.handleUnCheck}
          handleChange={this.handleChange}
          handleCancel={this.cancelButton}
          handleDeletePopoverr={this.handleDeletePopover}
          onDeleteUser={this.onDeleteUser}
          onAddNewEvent={this.onAddNewEvent}
          onAddUser={e => this.onAddUser(e)}
        />}
        {editEvent &&
        <Form
          title="Редактирование встречи"
          eventTitle={event.title}
          rooms={rooms}
          users={users}
          editEvent={editEvent}
          event={event}
          checked={checked}
          filledTitle={filledTitle}
          filledUser={filledUser}
          member={member}
          handleTitle={this.handleTitle}
          handleClearTitle={this.handleClearTitle}
          handleDate={this.handleDate}
          handleHourStart={this.handleHourStart}
          handleHourEnd={this.handleHourEnd}
          handleCheck={this.handleCheck}
          handleUnCheck={this.handleUnCheck}
          handleChange={this.handleChange}
          handleCancel={this.cancelButton}
          handleDeletePopover={this.handleDeletePopover}
          onSaveEvent={this.onSaveEvent}
          onDeleteUser={this.onDeleteUser}
          onAddUser={e => this.onAddUser(e)}
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

const FEED_QUERY = gql`
  query FeedQeury {
    users {
      id
      login
      avatarUrl
    }
    rooms {
      id
      title
      capacity
      floor
    }
    events {
      id
      title
      dateStart
      dateEnd
      users {
        id
        login
        homeFloor
        avatarUrl
      }
      room {
        id
        title
        capacity
        floor
      }
    }
  }
`;

export default graphql(FEED_QUERY, { name: 'feedQuery' })(App);
