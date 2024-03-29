import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import Close from './Close';
import './TopField.css';
import { range } from '../../helpers/helpers';
import { isSame } from '../../helpers/date';

const TopField = (props) => {
  const rootB = document.getElementById('root');
  const {
    title,
    eventTitle,
    handleCancel,
    handleTitle,
    handleClearTitle,
    handleDate,
    handleHourStart,
    handleHourEnd,
    event: {
      dateStart,
      dateEnd,
    },
  } = props;
  return (
    <div className="top-container">
      <div className="container-header">
        <h2 className="container-header__title">{title}</h2>
        <button
          onMouseUp={handleCancel}
          className="container-close hiddenMobile"
        >
          <Close type="desktop" />
        </button>
      </div>
      <div className="event-title">
        <div>
          <h3>Тема</h3>
          <div className="event-title-container">
            <input
              name="title"
              value={eventTitle}
              onChange={handleTitle}
              className="event-title__input"
              placeholder="О чём будете говорить?"
            />
            {eventTitle.length > 0 &&
            <button
              className="event-title__close"
              onClick={handleClearTitle}
            >
              {rootB.clientWidth >= 1280 ? <Close type="desktop" /> : <Close type="touch" />}
            </button>}
          </div>
        </div>
      </div>
      <div className="event-data-container">
        <div className="event-data-inner">
          <h3>Дата и время</h3>
          <DatePicker
            className="antd-DatePicker"
            format="D MMMM, YYYY"
            showToday={false}
            disabledDate={cur => cur < moment().subtract(1, 'days').endOf('day')}
            value={moment(dateStart)}
            onChange={handleDate}
          />
        </div>
        <div className="event-data-inner">
          <div className="event-data-hour">
            <h3 className="hiddenMobile">Начало</h3>
            <TimePicker
              format="HH:mm"
              minuteStep={15}
              disabledHours={() => (isSame(dateStart) ?
                range(7, moment().format('HH')) : range(7, moment().startOf('day').format('HH')))}
              value={moment(dateStart)}
              onChange={handleHourStart}
            />
          </div>
          <div className="event-data-hour">
            <h3 className="hiddenMobile">Конец</h3>
            <TimePicker
              format="HH:mm"
              minuteStep={15}
              disabledHours={() => range(7, moment(dateStart).format('HH'))}
              value={moment(dateEnd)}
              onChange={handleHourEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TopField.propTypes = {
  title: PropTypes.string.isRequired,
  event: PropTypes.shape({
    id: PropTypes.string,
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    title: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.object),
    room: PropTypes.object,
  }).isRequired,
  eventTitle: PropTypes.string.isRequired,
  handleDate: PropTypes.func.isRequired,
  handleHourStart: PropTypes.func.isRequired,
  handleHourEnd: PropTypes.func.isRequired,
  handleTitle: PropTypes.func.isRequired,
  handleClearTitle: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
};

TopField.defaultProps = {
  handleCancel: null,
};

export default TopField;
