import React from 'react';

const OnlyRoom = props => (
  <li className="styledLi-fix">
    <div className="styledRoom-fix">
      <h2 className="styledRoomTitle-fix">{props.room.title}
      </h2>
    </div>
  </li>
);

export default OnlyRoom;
