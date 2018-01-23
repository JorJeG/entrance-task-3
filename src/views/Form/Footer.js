import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = (props) => {
  const {
    event,
    checked,
    handleCancel,
    handleDeletePopover,
    filledTitle,
    filledUser,
    onAddNewEvent,
    onSaveEvent,
    editEvent,
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
          onMouseUp={() => onSaveEvent(event)}
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

Footer.propTypes = {
  event: PropTypes.object,
  checked: PropTypes.bool.isRequired,
  filledTitle: PropTypes.bool.isRequired,
  filledUser: PropTypes.bool.isRequired,
  editEvent: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired,
  onAddNewEvent: PropTypes.func,
  onSaveEvent: PropTypes.func,
  handleDeletePopover: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  event: null,
  editEvent: false,
  onSaveEvent: null,
  onAddNewEvent: null,
};

export default Footer;
