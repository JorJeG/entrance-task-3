import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { UserCard } from '../';
import './EventPopover.css';
import Edit from './Edit';

const EventPopover = (props) => {
  const {
    popoverEvent: {
      dateStart,
      dateEnd,
      room,
      users,
      title,
    },
    popover,
    onEditEvent,
  } = props;
  const adjustTop = popover.top + 29;
  return (
    <div
      className="popover-container"
      style={{
        top: `${adjustTop}px`,
        left: `${popover.left}px`,
      }}
    >
      <div className="popover-item popover-item__title">
        <h2 className="popover-title">{title}</h2>
        <button
          className="edit-button"
          onMouseUp={onEditEvent}
        >
          <Edit />
        </button>
      </div>
      <p className="popover-item popover-item__data">
        <span>
          {Moment(dateStart).format('D MMMM, HH:mm – ')}
          {Moment(dateEnd).format('HH:mm · ')}
          {room.title}
        </span>
      </p>
      <div className="popover-item">
        <UserCard
          type="popover"
          login={users[0].login}
          avatarUrl={users[0].avatarUrl}
        />
        <span className="popover-other-users">
          и {users.length - 1} участников
        </span>
      </div>
    </div>
  );
};

EventPopover.propTypes = {
  popover: PropTypes.object.isRequired,
  onEditEvent: PropTypes.func.isRequired,
  popoverEvent: PropTypes.shape({
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    room: PropTypes.object,
    users: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
  }).isRequired,
};

export default EventPopover;
