import React from 'react';
import {TopField, MiddleField, Footer} from '../';
import './Form.css';

const Form = (props) => {
	let margin = !props.checked ? '115px' : '65px';
	margin = window.screen.width > 1280 ? '40px' : margin;
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
					style={{marginBottom: '27px'}}
					onMouseUp={props.handleDeletePopover}
					className='button-delete__mobile hiddenDesktop'
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
				handleCancel={props.handleCancel} />
		</div>
	)
};

export default Form;
