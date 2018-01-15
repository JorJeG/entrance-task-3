import React from 'react';
import {day} from '../../helpers/date';
import './Timeline.css';
import {generateId} from '../../helpers/helpers';
import {ListFloor, RoomList, TimePicker} from '../';

const Timeline = (props) => {
	const offsetMobile = props.offset - 485;
	const offsetDesktop = props.offset - 389;
	return (
		<div
			hidden={props.newEvent || props.editEvent}
			ref={props.scrollingRef}
			className='timeline-container'
			onTouchMove={props.scrolling} >
			<TimePicker
				newEvent={props.newEvent}
				selectCalendar={props.selectCalendar}
				previusDay={props.previusDay}
				nextDay={props.nextDay}
				selectedTime={props.selectedDay}
				selectedDay={props.selectedDay}
				selectDay={props.selectDay}
				calendar={props.calendar} />
			<div className='timeline-hour-container'>
				{day().map((hour) => (
					<div key={generateId()} className='timeline-hour'>
						<span className='timeline-span'>{hour.format('H')}</span>
					</div>
					))}
				{props.offset > 419 && <br
					hidden={!props.today}
					className='timeMobile hiddenDesktop'
					data-current-hour={props.now}
					style={{left: offsetMobile}}/>}
				{props.offset > 419 && <br hidden={!props.today} className='timeDesktop hiddenMobile'
					data-current-hour={props.now}
					style={{left: offsetDesktop}}/>}
			</div>
			<ListFloor
				onEvent={props.onEvent}
				popover={props.popover}
				popoverRef={props.popoverRef}
				handlePopover={props.handlePopover}
				selectedDay={props.selectedDay}
				createEvent={props.createEvent}
				events={props.events}
				rooms={props.rooms} />
			{props.hidd &&
					<ul  className='list-container-fix'>
						<RoomList rooms={props.rooms} only />
					</ul>
				}
		</div>
	)
};



export default Timeline;
