import React from 'react';
import PropTypes from 'prop-types';

const OnlyRoom = props => (
  <li className="styledLi-fix">
    <div className="styledRoom-fix">
      <h2 className="styledRoomTitle-fix">{props.room.title}
      </h2>
    </div>
  </li>
);

OnlyRoom.propTypes = {
  room: PropTypes.object.isRequired,
};

export default OnlyRoom;
