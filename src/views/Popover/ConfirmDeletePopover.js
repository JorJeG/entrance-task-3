import React from 'react';
import './ConfirmDeletePopover.css';

const ConfirmDeletePopover = props => (
  <div className="overlay">
    <div className="delete-container">
      <div className="delete-pic" />
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
