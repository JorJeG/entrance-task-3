import React from 'react';
import {TopField, MiddleField, Footer} from '../';
import './Form.css';

const Form = (props) => {
	return (
		<div className='form-wrapper'>
			<TopField
				title='Новая встреча'
				eventTitle={props.eventTitle}
				handleTitle={props.handleTitle}
				handleClearTitle={props.handleClearTitle}
				handleDate={props.handleDate}
				handleHourStart={props.handleHourStart}
				handleHourEnd={props.handleHourEnd}
			 	hourStart={props.hourStart}
				hourEnd={props.hourEnd} />
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
				checked={props.checked} />
			<Footer
				checked={props.checked}
				handleCancel={props.handleCancel} />
		</div>
	)
};

export default Form;
