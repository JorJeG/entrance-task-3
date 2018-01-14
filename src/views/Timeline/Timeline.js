import React from 'react';
import {day} from '../../helpers/date';
import './Timeline.css';
import {generateId} from '../../helpers/helpers';
import {ListFloor, RoomList} from '../';

const Timeline = (props) => {
	const offsetMobile = props.offset - 485;
	const offsetDesktop = props.offset - 389;
	return (
		<div
			hidden={props.newEvent}
			ref={props.scrollingRef}
			className='timeline-container'
			onTouchMove={props.scrolling} >
			<div className='timeline-hour-container'>
				{day().map((hour) => (
					<div key={generateId()} className='timeline-hour'>
						<span className='timeline-span'>{hour.format('H')}</span>
					</div>
					))}
				<br
					hidden={!props.today}
					className='timeMobile hiddenDesktop'
					data-current-hour={props.now}
					style={{left: offsetMobile}}/>
				<br hidden={!props.today} className='timeDesktop hiddenMobile'
					data-current-hour={props.now}
					style={{left: offsetDesktop}}/>
			</div>
			<ListFloor rooms={props.rooms} />
			{props.hidd &&
					<ul  className='list-container-fix'>
						<RoomList rooms={props.rooms} only />
					</ul>
				}
		</div>
	)
};



export default Timeline;
