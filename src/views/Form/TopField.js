import React from 'react';
import Moment from 'moment';
import {DatePicker, TimePicker} from 'antd';
import './TopField.css';

const TopField = (props) => (
	<div className='top-container'>
		<div className='container-header'>
			<h2 className='container-header__title'>{props.title}</h2>
			<button className='container-close hiddenMobile'/>
		</div>
		<div className='event-title'>
			<div>
				<h3>Тема</h3>
				<div className='event-title-container'>
					<input
						name='title'
						value={props.eventTitle}
						onChange={props.handleTitle}
						className='event-title__input'
						placeholder='О чём будете говорить?' />
					{props.eventTitle.length > 0 &&
						<button
							className='event-title__close'
							onClick={props.handleClearTitle} />}
				</div>
			</div>
		</div>
		<div className='event-data-container'>
			<div className='event-data-inner'>
				<h3>Дата и время</h3>
				<DatePicker
					className='antd-DatePicker'
					format='D MMMM, YYYY'
					defaultValue={Moment().startOf('day')}
					onChange={props.handleDate} />
			</div>
			<div className='event-data-inner'>
				<div className='event-data-hour'>
					<h3 className='hiddenMobile'>Начало</h3>
					<TimePicker
						format='HH:mm'
						minuteStep={60}
						value={props.hourStart}
						defaultValue={Moment().startOf('hour')}
						onChange={props.handleHourStart} />
				</div>
				<div className='event-data-hour'>
					<h3 className='hiddenMobile'>Конец</h3>
					<TimePicker
						format='HH:mm'
						minuteStep={15}
						value={props.hourEnd}
						defaultValue={Moment().add(1, 'hour').startOf('hour')}
						onChange={props.handleHourEnd} />
				</div>
			</div>
		</div>
	</div>
);

export default TopField;
