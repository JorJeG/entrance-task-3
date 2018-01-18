import React from 'react';
import {UserCard} from '../';
import './EventPopover.css';
import Edit from './Edit.js';

const EventPopover = (props) => {
	const adjustTop = props.popover.top + 29;
	return (
		<div
			className='popover-container'
			style={{
				top: adjustTop,
				left: props.popover.left,
			}}
			>
			<div className='popover-item popover-item__title'>
				<h2 className='popover-title'>{props.popoverEvent.title}</h2>
				<button
					className='edit-button'
					onMouseUp={props.onEditEvent}>
							<Edit />
				</button>
			</div>
			<p className='popover-item popover-item__data'>
				<span>
					{props.popoverEvent.dateStart.format('D MMMM, HH:mm – ')}
					{props.popoverEvent.dateEnd.format('HH:mm · ')}
					{props.popoverEvent.room.title}
				</span>
			</p>
			<div className='popover-item'>
				<UserCard
					type='popover'
					login={props.popoverEvent.users[0].login}
					avatarUrl={props.popoverEvent.users[0].avatarUrl}
					/>
				<span className='popover-other-users'>
					и {props.popoverEvent.users.length - 1} участников
				</span>
			</div>
		</div>
	)
};

export default EventPopover;
