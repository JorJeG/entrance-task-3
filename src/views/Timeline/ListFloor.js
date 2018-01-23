import React from 'react';
import PropTypes from 'prop-types';
import { RoomList } from '../';
import './ListFloor.css';

const ListFloor = props => (
  <div
    id="listFloor"
    className="roomContainer"
  >
    <ul className="list-container">
      <RoomList
        confirmDelete={props.confirmDelete}
        newEvent={props.newEvent}
        withData={props.withData}
        editEvent={props.editEvent}
        onEvent={props.onEvent}
        handlePopover={props.handlePopover}
        selectedDay={props.selectedDay}
        createEvent={props.createEvent}
      />
    </ul>
  </div>
);

ListFloor.propTypes = {
  newEvent: PropTypes.bool,
  withData: PropTypes.bool,
  confirmDelete: PropTypes.bool,
  editEvent: PropTypes.bool,
  onEvent: PropTypes.bool.isRequired,
  selectedDay: PropTypes.object.isRequired,
  handlePopover: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
};

ListFloor.defaultProps = {
  newEvent: false,
  withData: false,
  confirmDelete: false,
  editEvent: false,
};

export default ListFloor;
