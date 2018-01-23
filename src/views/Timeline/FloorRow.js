import React from 'react';
import PropTypes from 'prop-types';

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

FloorRow.propTypes = {
  floor: PropTypes.number.isRequired,
  only: PropTypes.bool,
};

FloorRow.defaultProps = {
  only: false,
};

export default FloorRow;
