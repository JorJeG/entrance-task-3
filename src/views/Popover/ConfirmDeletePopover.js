import React from 'react';
import './ConfirmDeletePopover.css';
import emoji from '../../assets/touch/emoji1.svg';

const ConfirmDeletePopover = props => (
  <div className="overlay">
    <div className="delete-container">
      <img className="delete-confirm" src={emoji} alt="condolence" />
      <h2 className="delete-title">
					Встреча будет удалена безвозвратно
      </h2>
      <div>
        <button
          className="button-delete"
          onMouseUp={props.onDeleteCancel}
        >
          Отмена
        </button>
        <button
          className="button-delete"
          onMouseUp={props.onDeleteEvent}
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDeletePopover;
