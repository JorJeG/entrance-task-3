import React from 'react';
import {day} from '../../helpers/date';
import './Timeline.css';
import {generateId} from '../../helpers/helpers';

const Timeline = () => {
	return (
		<div className='timeline-container'>
			{day().map((hour) => (
				<div key={generateId()} className='timeline-hour'>
					<span className='timeline-span'>{hour.format('H')}</span></div>
			))}
		</div>
	)
};

export default Timeline;
