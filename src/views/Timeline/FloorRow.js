import React from 'react';

const FloorRow = (props) => {
  const {
    floor,
    only,
  } = props;
  if (only) {
    return (
      <li className="styledFloor styledFloor-fix">
        <small className="styledFloor-small">{floor}</small> этаж
      </li>
    );
  }
  return (
    <li className="styledFloor">
      <span className="styledFloor-small">{floor}</span> этаж
    </li>
  );
};

export default FloorRow;
