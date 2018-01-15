import React from 'react';
import {FloorRow, RoomRow, OnlyRoom} from '../';

const RoomList = (props) => {
	const rows = [];
	let lastFloor = null;
	props.rooms.forEach((room) => {
		if (room.floor !== lastFloor) {
			rows.push(<FloorRow
				only={props.only}
				floor={room.floor}
				key={room.floor} />);
		}
		if (props.only) {
			rows.push(<OnlyRoom
				only={props.only}
				room={room}
				key={room.title} />);
		} else {
			const filteredEvents = props.events.filter((event) => event.room.id === room.id);
			rows.push(<RoomRow
				onEvent={props.onEvent}
				handlePopover={props.handlePopover}
				selectedDay={props.selectedDay}
				createEvent={props.createEvent}
				events={filteredEvents}
				room={room}
				key={room.title} />);
		}
		lastFloor = room.floor;
	});
	return (
		<React.Fragment>
			{rows}
		</React.Fragment>
	);
}

export default RoomList;
