import React, {Component} from 'react';
import {day} from '../../helpers/date';
import './Timeline.css';
import {ListFloor, RoomList, TimePicker} from '../';

class Timeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 0
		}
	}
	componentDidMount() {
		let height = document.getElementById('root').clientHeight - 133;
		if (window.screen.width >= 1280) {
			height += 133;
		}
		this.setState({height});
	}
	render() {
		const offsetMobile = this.props.offset - 485;
		const offsetDesktop = this.props.offset - 389;
		return (
			<div
				hidden={this.props.newEvent || this.props.editEvent}
				ref={this.props.scrollingRef}
				className='timeline-container'
				onTouchMove={this.props.scrolling} >
				<TimePicker
					newEvent={this.props.newEvent}
					selectCalendar={this.props.selectCalendar}
					previusDay={this.props.previusDay}
					nextDay={this.props.nextDay}
					selectedTime={this.props.selectedDay}
					selectedDay={this.props.selectedDay}
					selectDay={this.props.selectDay}
					calendar={this.props.calendar} />
				<div className='timeline-hour-container'>
					{day().map((hour, index) => (
						<div key={`${index}acs`} className='timeline-hour-inner'>
							<div className='timeline-hour'>
								<span className='timeline-span'>{hour.format('H')}</span>
							</div>
							<div className='timeline-line' style={{height: `${this.state.height}px`}}>
							</div>
						</div>
						))}
					{this.props.offset > 419 && <div
						hidden={!this.props.today}
						className='timeMobile hiddenDesktop'
						data-current-hour={this.props.now}
						style={{left: offsetMobile, height: `${this.state.height}px`}}></div>}
					{this.props.offset > 419 && <div hidden={!this.props.today} className='timeDesktop hiddenMobile'
						data-current-hour={this.props.now}
						style={{left: offsetDesktop, height: `${this.state.height}px`}}></div>}
				</div>
				<ListFloor
					height={this.state.height}
					onEvent={this.props.onEvent}
					popover={this.props.popover}
					popoverRef={this.props.popoverRef}
					handlePopover={this.props.handlePopover}
					selectedDay={this.props.selectedDay}
					createEvent={this.props.createEvent}
					events={this.props.events}
					rooms={this.props.rooms} />
				{this.props.hidd &&
						<ul  className='list-container-fix'>
							<RoomList rooms={this.props.rooms} only />
						</ul>
					}
			</div>
		)
	}
}

// const Timeline = (props) => {
// 	const offsetMobile = props.offset - 485;
// 	const offsetDesktop = props.offset - 389;
// 	return (
// 		<div
// 			hidden={props.newEvent || props.editEvent}
// 			ref={props.scrollingRef}
// 			className='timeline-container'
// 			onTouchMove={props.scrolling} >
// 			<TimePicker
// 				newEvent={props.newEvent}
// 				selectCalendar={props.selectCalendar}
// 				previusDay={props.previusDay}
// 				nextDay={props.nextDay}
// 				selectedTime={props.selectedDay}
// 				selectedDay={props.selectedDay}
// 				selectDay={props.selectDay}
// 				calendar={props.calendar} />
// 			<div className='timeline-hour-container'>
// 				{day().map((hour) => (
// 					<div key={generateId()} className='timeline-hour'>
// 						<span className='timeline-span'>{hour.format('H')}</span>
// 					</div>
// 					))}
// 				{props.offset > 419 && <br
// 					hidden={!props.today}
// 					className='timeMobile hiddenDesktop'
// 					data-current-hour={props.now}
// 					style={{left: offsetMobile}}/>}
// 				{props.offset > 419 && <br hidden={!props.today} className='timeDesktop hiddenMobile'
// 					data-current-hour={props.now}
// 					style={{left: offsetDesktop}}/>}
// 			</div>
// 			<ListFloor
// 				onEvent={props.onEvent}
// 				popover={props.popover}
// 				popoverRef={props.popoverRef}
// 				handlePopover={props.handlePopover}
// 				selectedDay={props.selectedDay}
// 				createEvent={props.createEvent}
// 				events={props.events}
// 				rooms={props.rooms} />
// 			{props.hidd &&
// 					<ul  className='list-container-fix'>
// 						<RoomList rooms={props.rooms} only />
// 					</ul>
// 				}
// 		</div>
// 	)
// };



export default Timeline;
