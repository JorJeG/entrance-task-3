import React from 'react';
import {FloorRow, RoomRow} from '../';

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
		rows.push(<RoomRow
			only={props.only}
			room={room}
			key={room.title} />);
		lastFloor = room.floor;
	});
	return (
		<React.Fragment>
			{rows}
		</React.Fragment>
	);
}

export default RoomList;
