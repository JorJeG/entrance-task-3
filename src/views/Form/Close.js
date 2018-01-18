import React from 'react';

const Close = (props) => {
  if (props.type === 'touch') {
    return (
      <svg width={13} height={13} viewBox="0 0 13 13" {...props}>
        <title>close</title>
        <g fill="none" fillRule="evenodd">
          <path d="M-6-5h24v24H-6z" />
          <path
            d="M6.364 4.95L2.121.707A1 1 0 0 0 .707 2.121L4.95 6.364.707 10.607a1 1 0 1 0 1.414 1.414l4.243-4.243 4.243 4.243a1 1 0 0 0 1.414-1.414L7.778 6.364l4.243-4.243A1 1 0 1 0 10.607.707L6.364 4.95z"
            fill="#AFB4B8"
          />
        </g>
      </svg>
    );
  } else if (props.type === 'desktop') {
    return (
      <svg width={10} height={10} viewBox="0 0 10 10" {...props}>
        <title>close</title>
        <g fill="none" fillRule="evenodd">
          <path d="M-3-3h16v16H-3z" />
          <path
            d="M5.02 3.621L2.193.793A1 1 0 1 0 .778 2.207l2.829 2.829L.778 7.864a1 1 0 1 0 1.414 1.414L5.021 6.45l2.828 2.828a1 1 0 0 0 1.414-1.414L6.435 5.036l2.828-2.829A1 1 0 1 0 7.85.793L5.021 3.62z"
            fill="#AFB4B8"
          />
        </g>
      </svg>
    );
  }
};

export default Close;
