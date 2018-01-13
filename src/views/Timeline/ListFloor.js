import React from 'react';
import {RoomList} from '../';
import './ListFloor.css';

const ListFloor = (props) => {
	return (
		<div className='roomContainer'>
			<ul className='list-container'>
					<RoomList
						rooms={props.rooms} />
			</ul>
		</div>
	)
}


export default ListFloor;
