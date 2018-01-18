import React from 'react';
import { TopField, MiddleField, Footer } from '../';
import './Form.css';

const Form = (props) => {
  const {
    title,
    event,
    eventTitle,
    users,
    rooms,
    member,
    checked,
    filledTitle,
    filledUser,
    handleDate,
    handleHourStart,
    handleHourEnd,
    handleTitle,
    handleClearTitle,
    handleCancel,
    handleChange,
    handleCheck,
    handleUnCheck,
    onAddUser,
    onDeleteUser,
    onAddNewEvent,
    onSaveEvent,
    editEvent,
    handleDeletePopover,
  } = props;
  const rootB = document.getElementById('root');
  let margin = checked ? '65px' : '110px';
  margin = rootB.clientWidth >= 1280 ? '0' : margin;
  return (
    <div
      style={{ marginBottom: margin }}
      className="form-wrapper"
    >
      <TopField
        title={title}
        event={event}
        eventTitle={eventTitle}
        handleCancel={handleCancel}
        handleTitle={handleTitle}
        handleClearTitle={handleClearTitle}
        handleDate={handleDate}
        handleHourStart={handleHourStart}
        handleHourEnd={handleHourEnd}
      />
      <MiddleField
        users={users}
        event={event}
        rooms={rooms}
        member={member}
        checked={checked}
        handleChange={handleChange}
        handleCheck={handleCheck}
        handleUnCheck={handleUnCheck}
        onAddUser={onAddUser}
        onDeleteUser={onDeleteUser}
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
        onAddNewEvent={onAddNewEvent}
        handleDeletePopover={handleDeletePopover}
        onSaveEvent={onSaveEvent}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Form;
