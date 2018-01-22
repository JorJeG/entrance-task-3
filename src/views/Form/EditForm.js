import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Moment from 'moment';
import { TopField, MiddleField, Footer } from '../';
import './Form.css';
import {
  addRoom,
  removeRoom,
  renameEvent,
  changeEventDateStart,
  changeEventDateEnd,
  changeEventDay,
  removeUser,
  addUser,
} from '../../helpers/helpers';
import { nearestFutureMinutes } from '../../helpers/date';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: '',
      filledTitle: true,
      filledUser: true,
      checked: true,
      event: {
        id: this.props.event.id,
        title: this.props.event.title,
        dateStart: this.props.event.dateStart,
        dateEnd: this.props.event.dateEnd,
        users: this.props.event.users,
        room: this.props.event.room,
      },
    };
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleClearTitle = this.handleClearTitle.bind(this);
    this.handleHourStart = this.handleHourStart.bind(this);
    this.handleHourEnd = this.handleHourEnd.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleUnCheck = this.handleUnCheck.bind(this);
    this.onAddNewEvent = this.onAddNewEvent.bind(this);
  }
  // componentDidMount() {
  //   this.props.selectedEvent({
  //     variables: {
  //       id: this.props.event.id,
  //     },
  //   });
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.selectedEvent) {
  //     const currentEvent = Object.assign({}, this.state.event, nextProps.selectedEvent.event)
  //     this.setState({
  //       event: currentEvent,
  //     });
  //   }
  // }
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
    // const { event: { id } } = this.state;
    // const selectedUser = this.props.feedQuery.users.find(user => user.login === login);
    // this.props.addUserToEvent({
    //   variables: {
    //     id,
    //     userId: selectedUser.id,
    //   },
    // }).then(() => {
    //   this.props.selectedEvent.refetch();
    // }).catch((error) => {
    //   console.log('there was an error sending the query', error);
    // });
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
  // Обработчик для добавления новой встречи
  onAddNewEvent() {
    const {
      event: {
        title,
        dateStart,
        dateEnd,
        room,
        users,
      },
    } = this.state;
    const usersIds = [];
    users.forEach(user => usersIds.push(user.id));
    this.props.newEvent({
      variables: {
        input: {
          title,
          dateStart: Moment(dateStart).format('YYYY-MM-DDTHH:mm:ss.SSS'),
          dateEnd: Moment(dateEnd).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        },
        usersIds,
        roomId: room.id,
      },
    }).then(({ data }) => {
      this.props.onConfirmAdd(data);
      console.log(data);
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
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
  render() {
    const {
      feedQuery: {
        loading, rooms, users,
      },
      editEvent,
      title,
      handleCancel,
      onAddNewEvent,
      handleDeletePopover,
      onSaveEvent,
    } = this.props;
    const {
      eventTitle,
      member,
      filledUser,
      filledTitle,
      checked,
      event,
    } = this.state;
    const rootB = document.getElementById('root');
    let margin = checked ? '65px' : '110px';
    margin = rootB.clientWidth >= 1280 ? '0' : margin;
    if (loading) {
      return <p>loading...</p>;
    }
    return (
      <div
        style={{ marginBottom: margin }}
        className="form-wrapper"
      >
        <TopField
          title={title}
          event={event}
          eventTitle={event.title}
          handleCancel={this.handleCancel}
          handleTitle={this.handleTitle}
          handleClearTitle={this.handleClearTitle}
          handleDate={this.handleDate}
          handleHourStart={this.handleHourStart}
          handleHourEnd={this.handleHourEnd}
        />
        <MiddleField
          users={users}
          event={event}
          rooms={rooms}
          member={member}
          checked={checked}
          handleChange={this.handleChange}
          handleCheck={this.handleCheck}
          handleUnCheck={this.handleUnCheck}
          onAddUser={this.onAddUser}
          onDeleteUser={this.onDeleteUser}
          editEvent={editEvent}
        />
        {editEvent &&
        <button
          onMouseUp={handleDeletePopover}
          className="button-delete__mobile hiddenDesktop"
        >
          Удалить встречу
        </button>}
        <Footer
          checked={checked}
          filledTitle={filledTitle}
          filledUser={filledUser}
          editEvent={editEvent}
          onAddNewEvent={this.onAddNewEvent}
          handleDeletePopover={handleDeletePopover}
          onSaveEvent={onSaveEvent}
          handleCancel={handleCancel}
        />
      </div>
    );
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    users {
      id
      login
      avatarUrl
      homeFloor
    }
    rooms {
      id
      title
      capacity
      floor
    }
  }
`;

const CREATE_EVENT = gql`
  mutation createEvent($input: EventInput!, $usersIds: [ID], $roomId: ID!) {
    createEvent(input: $input, usersIds: $usersIds, roomId: $roomId) {
      title
      dateStart
      dateEnd
      users {
        id
        login
        avatarUrl
      }
      room {
        id
        title
        floor
      }
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation updateEvent($id: ID!, $input: EventInput!) {
    updateEvent(id: $id, input: $input) {
      id
    }
  }
`;

const ADD_USER = gql`
  mutation addUserToEvent($id: ID!, $userId: ID!) {
    addUserToEvent(id: $id, userId: $userId) {
      id
    }
  }
`;

const QUERY_EVENT = gql`
  query selectedEvent($id: ID!) {
    event(id: $id) {
      id
      title
      dateStart
      dateEnd
      users {
        id
        login
        avatarUrl
      }
      room {
        id
        title
        floor
      }
    }
  }
`;

export default compose(
  graphql(QUERY_EVENT, { name: 'selectedEvent', options: ({ eventId }) => ({ variables: { id: eventId } }) }),
  graphql(ADD_USER, { name: 'addUserToEvent' }),
  graphql(CREATE_EVENT, { name: 'newEvent' }),
  graphql(FEED_QUERY, { name: 'feedQuery' }),
)(Form);