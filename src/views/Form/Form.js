import React from 'react';
import {TopField, MiddleField, Footer} from '../';
import './Form.css';

const Form = (props) => {
	const margin = !props.checked ? '115px' : '0';
	return (
		<div
			style={{marginBottom: margin}}
			className='form-wrapper'>
			<TopField
				title={props.title}
				event={props.event}
				eventTitle={props.eventTitle}
				handleCancel={props.handleCancel}
				handleTitle={props.handleTitle}
				handleClearTitle={props.handleClearTitle}
				handleDate={props.handleDate}
				handleHourStart={props.handleHourStart}
				handleHourEnd={props.handleHourEnd} />
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
				checked={props.checked} />
			{props.editEvent &&
				<button
					className='button-delete__mobile hiddenDesktop'
					>
					Удалить встречу
				</button>}
			<Footer
				editEvent={props.editEvent}
				checked={props.checked}
				onAddNewEvent={props.onAddNewEvent}
				onSaveEvent={props.onSaveEvent}
				handleCancel={props.handleCancel} />
		</div>
	)
};

export default Form;
