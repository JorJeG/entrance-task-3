import React from 'react';
import {UserCard, Search} from '../';
import './MiddleField.css';

const MiddleField = (props) => {
	const filteredUserList = props.users.filter((user) => {
		for (let i = 0; i < props.event.users.length; i += 1) {
			if (props.event.users[i].id === user.id) {
				return false;
			}
		}
		return true;
	});
	const userList = props.event.users.map((user) => (
		<UserCard
			key={user.id}
			value={user.id}
			// Вроде нужно передавать контекст, чтобы ссылалось обратно в этот класс
			// Без этого ошибка, не видит состояние users
			onDeleteUser={props.onDeleteUser}
			login={user.login}
			avatarUrl={user.avatarUrl} />
	));
	const checkboxes = props.rooms.map((room) => (
		<div className='event-room-checkbox'>
			<input
				key={room.id}
				id={room.id}
				value={room.id}
				checked={props.checked}
				onChange={props.handleCheck}
				type='checkbox' />
			<label htmlFor={room.id}>
				<span className='event-room-data'>
					{props.event.dateStart.format('HH:mm – ')}
					{props.event.dateEnd.format('HH:mm')}
				</span>
				<span className='event-room-desc'>{room.title} · {room.floor} этаж</span>
			</label>
		</div>
	));
	return (
		<div
			className='mid-container'>
			<div className='user-search-wrapper'>
				<div className='user-search-input'>
					<h3>Участники</h3>
					<Search
						users={filteredUserList}
						member={props.member}
						handleChange={props.handleChange}
						onAddUser={props.onAddUser} />
				</div>
				<div className='user-list'>
					{userList}
				</div>
			</div>
			<div className='room-container'>
				<div className='room-header'>
					<h3>{props.checked ? 'Ваша переговорка' : 'Рекомендованные переговорки'}</h3>
				</div>
				{props.checked ? (
					<div className='event-room-checkbox event-room-checkbox__checked'>
						<input
							key={props.event.room.id}
							id={props.event.room.id}
							value={props.event.room.id}
							checked={props.checked}
							onChange={props.handleCheck}
							type='checkbox' />
						<label htmlFor={props.event.room.id}>
							<span
								className='event-room-data'>
								{props.event.dateStart.format('HH:mm – ')}
								{props.event.dateEnd.format('HH:mm')}
							</span>
							<span
								className='event-room-desc'>
								{props.event.room.title} · {props.event.room.floor} этаж
							</span>
						</label>
						<button
							className='room-uncheck'
							onClick={props.handleUnCheck} />
					</div>
				) : (
					checkboxes
				)}
			</div>
		</div>)
};

export default MiddleField;
