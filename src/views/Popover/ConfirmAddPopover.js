import React from 'react';
import Moment from 'moment';
import './ConfirmAddPopover.css';
import emoji from '../../assets/touch/emoji2.svg';

const ConfirmAddPopover = (props) => {
  const {
    event: {dateStart, dateEnd, room},
    handleConfrimPopover
  } = props;
  return (
    <div className="overlay">
      <div className="confirm-container">
        <img className="confirm-pic" src={emoji} alt="happy" />
        <h1 className="confirm-title">Встреча создана!</h1>
        <p className="confirm-desc">
          {Moment(dateStart).format('D MMMM, HH:mm – ')}
          {Moment(dateEnd).format('HH:mm')}
        </p>
        <p className="confirm-desc">
          {room.title} · {room.floor}  этаж
        </p>
        <button
          className="button-confirm"
          onMouseUp={handleConfrimPopover}
        >
            Хорошо
        </button>
      </div>
    </div>
  );
};

export default ConfirmAddPopover;
