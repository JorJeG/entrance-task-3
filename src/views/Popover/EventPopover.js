import React from 'react';
import Moment from 'moment';
import { UserCard } from '../';
import './EventPopover.css';

const EventPopover = (props) => {
  const { popoverEvent: { dateStart, dateEnd } } = props;
  return (
    <div
      className="popover-container"
      style={{
        top: props.popover.top + 29,
        left: props.popover.left,
      }}
    >
      <div className="popover-item popover-item__title">
        <h2 className="popover-title">{props.popoverEvent.title}</h2>
        <button className="edit-button" onMouseUp={props.onEditEvent} />
      </div>
      <div className="popover-item popover-item__data">
        <span>
          {Moment(dateStart).format('D MMMM, HH:mm – ')}
          {Moment(dateEnd).format('HH:mm · ')}
          {props.popoverEvent.room.title}
        </span>
      </div>
      <div className="popover-item">
        <UserCard
          type="popover"
          login={props.popoverEvent.users[0].login}
          avatarUrl={props.popoverEvent.users[0].avatarUrl}
        />
        <span className="popover-other-users">
          и {props.popoverEvent.users.length - 1} участников
        </span>
      </div>
    </div>
  );
};

export default EventPopover;
