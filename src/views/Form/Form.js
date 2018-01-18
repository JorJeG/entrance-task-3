import React from 'react';
import { TopField, MiddleField, Footer } from '../';
import './Form.css';

const Form = (props) => {
  const rootB = document.getElementById('root');
  let margin = props.checked ? '65px' : '110px';
  margin = rootB.clientWidth >= 1280 ? '0' : margin;
  return (
    <div
      style={{ marginBottom: margin }}
      className="form-wrapper"
    >
      <TopField
        title={props.title}
        event={props.event}
        eventTitle={props.eventTitle}
        handleCancel={props.handleCancel}
        handleTitle={props.handleTitle}
        handleClearTitle={props.handleClearTitle}
        handleDate={props.handleDate}
        handleHourStart={props.handleHourStart}
        handleHourEnd={props.handleHourEnd}
      />
      <MiddleField
        users={props.users}
        event={props.event}
        rooms={props.rooms}
        member={props.member}
        onAddUser={props.onAddUser}
        handleChange={props.handleChange}
        handleCheck={props.handleCheck}
        onDeleteUser={props.onDeleteUser}
        handleUnCheck={props.handleUnCheck}
        editEvent={props.editEvent}
        checked={props.checked}
      />
      {props.editEvent &&
      <button
        onMouseUp={props.handleDeletePopover}
        className="button-delete__mobile hiddenDesktop"
      >
					Удалить встречу
      </button>}
      <Footer
        editEvent={props.editEvent}
        checked={props.checked}
        filledTitle={props.filledTitle}
        filledUser={props.filledUser}
        onAddNewEvent={props.onAddNewEvent}
        handleDeletePopover={props.handleDeletePopover}
        onSaveEvent={props.onSaveEvent}
        handleCancel={props.handleCancel}
      />
    </div>
  );
};

export default Form;
