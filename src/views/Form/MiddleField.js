import React from 'react';
import Moment from 'moment';
import { UserCard, Search } from '../';
import './MiddleField.css';
import Close from './Close';

const MiddleField = (props) => {
  const {
    event: {
      dateStart,
      dateEnd,
      users,
      room,
    },
    users: usersAll,
    rooms,
    member,
    checked,
    handleCheck,
    handleUnCheck,
    onDeleteUser,
    handleChange,
    onAddUser,
  } = props;
  const rootB = document.getElementById('root');
  const filteredUserList = usersAll.filter((user) => {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].id === user.id) {
        return false;
      }
    }
    return true;
  });
  const userList = users.map(user => (
    <UserCard
      key={`userid_${user.id}`}
      value={user.id}
      // Вроде нужно передавать контекст, чтобы ссылалось обратно в этот класс
      // Без этого ошибка, не видит состояние users
      onDeleteUser={onDeleteUser}
      login={user.login}
      avatarUrl={user.avatarUrl}
    />
  ));
  const checkboxes = rooms.map(room => (
    <div
      key={`roomid_${room.id}`}
      className="event-room-checkbox"
    >
      <input
        id={`roomid_${room.id}`}
        value={room.id}
        checked={checked}
        onChange={handleCheck}
        type="checkbox"
      />
      <label htmlFor={`roomid_${room.id}`}>
        <span className="event-room-data">
          {Moment(dateStart).format('HH:mm – ')}
          {Moment(dateEnd).format('HH:mm')}
        </span>
        <span className="event-room-desc">{room.title} · {room.floor} этаж</span>
      </label>
    </div>
  ));
  return (
    <div
      className="mid-container"
    >
      <div className="user-search-wrapper">
        <div className="user-search-input">
          <h3>Участники</h3>
          <Search
            users={filteredUserList}
            member={member}
            handleChange={handleChange}
            onAddUser={onAddUser}
          />
        </div>
        <div className="user-list">
          {userList}
        </div>
      </div>
      <div className="room-container">
        <div className="room-header">
          <h3>{checked ? 'Ваша переговорка' : 'Рекомендованные переговорки'}</h3>
        </div>
        {props.checked ? (
          <div className="event-room-checkbox event-room-checkbox__checked">
            <input
              type="checkbox"
            />
            <label htmlFor={`roomid_${room.id}`}>
              <span
                className="event-room-data"
              >
                {Moment(dateStart).format('HH:mm – ')}
                {Moment(dateEnd).format('HH:mm')}
              </span>
              <span
                className="event-room-desc"
              >
                {room.title} · {room.floor} этаж
              </span>
            </label>
            <button
              className="room-uncheck"
              onClick={handleUnCheck}
            >
              {rootB.clientWidth >= 1280 ? <Close type="desktop" /> : <Close type="touch" />}
            </button>
          </div>
        ) : (
          checkboxes
        )}
      </div>
    </div>);
};

export default MiddleField;
