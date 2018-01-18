import React from 'react';
import './Footer.css';

const Footer = (props) => {
  const {
    checked,
    handleCancel,
    handleDeletePopover,
    filledTitle,
    filledUser,
    onAddNewEvent,
    onSaveEvent,
    editEvent
  } = props;
  return (
    <div className="footer-container">
      {!props.checked && <p className="attentionField hiddenDesktop">Выберите переговорку</p>}
      <div className="buttonField">
        <button
          onMouseUp={handleCancel}
          className="button-cancel"
        >
          Отмена
        </button>
        {editEvent &&
        <button
          onMouseUp={handleDeletePopover}
          className="button-delete hiddenMobile"
        >
          Удалить
        </button>}
        {editEvent &&
        <button
          disabled={!checked || !filledTitle || !filledUser}
          onMouseUp={onSaveEvent}
          className="button-create"
        >
          Сохранить
        </button>}
        {!editEvent &&
        <button
          disabled={!checked || !filledTitle || !filledUser}
          onMouseUp={onAddNewEvent}
          className="button-create"
        >
          Создать встречу
        </button>}
      </div>
    </div>
  );
};

export default Footer;
