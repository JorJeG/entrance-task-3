import React from 'react';
import {RoomList} from '../';
import './ListFloor.css';

const ListFloor = (props) => {
	return (
		<div
			id='listFloor'
			className='roomContainer'>
			<ul className='list-container'>
					<RoomList
						onEvent={props.onEvent}
						handlePopover={props.handlePopover}
						selectedDay={props.selectedDay}
						createEvent={props.createEvent}
						events={props.events}
						rooms={props.rooms} />
			</ul>
		</div>
	)
};

export default ListFloor;
