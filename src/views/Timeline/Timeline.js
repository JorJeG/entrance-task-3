import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { day } from '../../helpers/date';
import './Timeline.css';
import { ListFloor, RoomList, TimePicker } from '../';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }
  componentDidMount() {
    let height = document.getElementById('root').clientHeight - 133;
    // eslint-disable-next-line no-undef
    if (window.screen.width >= 1280) {
      height += 133;
    }
    this.setState({ height });
  }
  render() {
    const offsetMobile = this.props.offset - 485;
    const offsetDesktop = this.props.offset - 389;
    return (
      <div
        hidden={this.props.newEvent || this.props.editEvent || this.props.withData}
        ref={this.props.scrollingRef}
        className="timeline-container"
      >
        <TimePicker
          newEvent={this.props.newEvent}
          selectCalendar={this.props.selectCalendar}
          previusDay={this.props.previusDay}
          nextDay={this.props.nextDay}
          selectedTime={this.props.selectedDay}
          selectedDay={this.props.selectedDay}
          selectDay={this.props.selectDay}
          calendar={this.props.calendar}
        />
        <div className="timeline-hour-container">
          {day().map(hour => (
            <div key={`hour-${hour.format('HH')}`} className="timeline-hour-inner">
              <div className="timeline-hour">
                <span className="timeline-span">{hour.format('H')}</span>
              </div>
              <div className="timeline-line" style={{ height: `${this.state.height}px` }} />
            </div>
          ))}
          {this.props.offset > 419 && <div
            hidden={!this.props.today}
            className="timeMobile hiddenDesktop"
            data-current-hour={this.props.now}
            style={{ left: offsetMobile, height: `${this.state.height}px` }}
          />}
          {this.props.offset > 419 && <div
            hidden={!this.props.today}
            className="timeDesktop hiddenMobile"
            data-current-hour={this.props.now}
            style={{ left: offsetDesktop, height: `${this.state.height}px` }}
          />}
        </div>
        <ListFloor
          confirmDelete={this.props.confirmDelete}
          newEvent={this.props.newEvent}
          withData={this.props.withData}
          editEvent={this.props.editEvent}
          height={this.state.height}
          onEvent={this.props.onEvent}
          popover={this.props.popover}
          handlePopover={this.props.handlePopover}
          selectedDay={this.props.selectedDay}
          createEvent={this.props.createEvent}
        />
        {this.props.hidd &&
        <ul className="list-container-fix">
          <RoomList only />
        </ul>
      }
      </div>
    );
  }
}

Timeline.propTypes = {
  offset: PropTypes.number.isRequired,
  scrollingRef: PropTypes.func.isRequired,
  newEvent: PropTypes.bool.isRequired,
  withData: PropTypes.bool.isRequired,
  confirmDelete: PropTypes.bool.isRequired,
  editEvent: PropTypes.bool.isRequired,
  calendar: PropTypes.bool.isRequired,
  today: PropTypes.bool.isRequired,
  hidd: PropTypes.bool.isRequired,
  onEvent: PropTypes.bool.isRequired,
  selectCalendar: PropTypes.func.isRequired,
  previusDay: PropTypes.func.isRequired,
  nextDay: PropTypes.func.isRequired,
  selectDay: PropTypes.func.isRequired,
  selectedDay: PropTypes.object.isRequired,
  popover: PropTypes.object.isRequired,
  createEvent: PropTypes.func.isRequired,
  handlePopover: PropTypes.func.isRequired,
  now: PropTypes.string.isRequired,
};

export default Timeline;
