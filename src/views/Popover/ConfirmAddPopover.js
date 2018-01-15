import React from 'react';
import './ConfirmAddPopover.css';

const ConfirmAddPopover = (props) => {
	return (
		<div className='overlay'>
			<div className='confirm-container'>
				<div className='confirm-pic' />
				<h2 className='confirm-title'>Встреча создана!</h2>
				<p className='confirm-desc'>
					{props.event.dateStart.format('D MMMM, HH:mm – ')}
					{props.event.dateEnd.format('HH:mm')}</p>
				<p className='confirm-desc'>
					{props.event.room.title} · {props.event.room.floor}  этаж</p>
				<button
					className='button-confirm'
					onMouseUp={props.handleConfrimPopover}>
					Хорошо
				</button>
			</div>
		</div>
	)
}

export default ConfirmAddPopover;
