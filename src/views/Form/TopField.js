import React from 'react';
import {DatePicker, TimePicker} from 'antd';
import moment from 'moment';
import Close from './Close';
import './TopField.css';
import {range} from '../../helpers/helpers';
import {isSame} from '../../helpers/date';

const TopField = (props) => {
	let rootB = document.getElementById('root');
	return (
		<div className='top-container'>
			<div className='container-header'>
				<h2 className='container-header__title'>{props.title}</h2>
				<button
					onMouseUp={props.handleCancel}
					className='container-close hiddenMobile'>
					<Close type='desktop' />
				</button>
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
									onClick={props.handleClearTitle}>
									{rootB.clientWidth >= 1280 ? <Close type='desktop' /> : <Close type='touch' />}
								</button>}
							</div>
						</div>
					</div>
					<div className='event-data-container'>
						<div className='event-data-inner'>
							<h3>Дата и время</h3>
							<DatePicker
								className='antd-DatePicker'
								format='D MMMM, YYYY'
								showToday={false}
								disabledDate={(cur) => cur < moment().subtract(1, 'days').endOf('day')}
								value={props.event.dateStart}
								onChange={props.handleDate} />
							</div>
							<div className='event-data-inner'>
								<div className='event-data-hour'>
									<h3 className='hiddenMobile'>Начало</h3>
									<TimePicker
										format='HH:mm'
										minuteStep={15}
										disabledHours={() => (isSame(props.event.dateStart) ?
											range(7, moment().format('HH')) : range(7, moment().startOf('day').format('HH')))}
											value={props.event.dateStart}
											onChange={props.handleHourStart} />
										</div>
										<div className='event-data-hour'>
											<h3 className='hiddenMobile'>Конец</h3>
											<TimePicker
												format='HH:mm'
												minuteStep={15}
												disabledHours={() => range(7, moment(props.event.dateStart).format('HH'))}
												value={props.event.dateEnd}
												onChange={props.handleHourEnd} />
											</div>
										</div>
									</div>
								</div>
	);
};

export default TopField;
