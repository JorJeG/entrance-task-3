import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {FloorRow, RoomRow, OnlyRoom} from '../';

const RoomList = (props) => {
	const rows = [];
	let lastFloor = null;
	console.log(props.rooms);
	props.rooms.forEach((room) => {
		console.log(room);
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
};

const ROOMS_QUERY = gql`
	query FeedQeury {
		rooms {
			id
			title
			capacity
			floor
		}
	}
`;


export default graphql(ROOMS_QUERY, {name: 'roomsQuery'})(RoomList);
