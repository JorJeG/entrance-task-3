import React from 'react';
import {dayInMinutes} from '../../helpers/date';
const dayInM = dayInMinutes();

const RoomRow = (props) => {
	const {room, only} = props;
	const columns = [];
	dayInM.forEach((hour) => (
		columns.push(<div key={hour.format()} value={hour.format()} className='minutesCell'>
		</div>)));

	if (only) {
		return (
			<li className='styledLi-fix'>
					<div className='styledRoom-fix'>
						<h2 className='styledRoomTitle-fix'>{room.title}
						</h2>
					</div>
			</li>
		)
	}

	return (
		<li className='styledLi'>
				<div className='styledRoom'>
					<h2 className='styledRoomTitle'>{room.title}
					</h2>
					<p>до {room.capacity} человек</p>
				</div>
			{columns}
		</li>
	);
}

export default RoomRow;
