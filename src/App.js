import React, {Component} from 'react';
import Moment from 'moment';
import {TimePicker, Timeline, Form} from './views';
import logo from './assets/touch/logo.svg';
import './App.css';
import {rooms} from './data/rooms';
import {events} from './data/events';
import {users} from './data/users';
import {removeUser, addUser, addRoom, removeRoom, renameEvent, mockEvent} from './helpers/helpers';


Moment.locale('ru', {
	monthsShort: [
		'Янв',
		'Фев',
		'Март',
		'Апр',
		'Май',
		'Июнь',
		'Июль',
		'Авг',
		'Сент',
		'Окт',
		'Нояб',
		'Дек',
	],
	weekdays: [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
	],
});



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calendar: false,
			selectedDay: Moment(),
			hidden: false,
			member: '',
			newEvent: false,
			editEvent: false,
			event: {},
			users: [],
			rooms: [],
			checked: false,
			today: true,
			date: Moment().startOf('day'),
			now: Moment().format('HH:mm'),
			offset: Moment.duration(Moment().format('HH:mm')).asMinutes(),
			hourStart: Moment(),
			hourEnd: Moment().add(1, 'hours'),
		};
		this.selectCalendar = this.selectCalendar.bind(this);
		this.selectDay = this.selectDay.bind(this);
		this.nextDay = this.nextDay.bind(this);
		this.previusDay = this.previusDay.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleClearTitle = this.handleClearTitle.bind(this);
		this.handleHourStart = this.handleHourStart.bind(this);
		this.handleHourEnd = this.handleHourEnd.bind(this);
		this.handleDate = this.handleDate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onDeleteUser = this.onDeleteUser.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleUnCheck = this.handleUnCheck.bind(this);
		this.createEvent = this.createEvent.bind(this);
		this.cancelButton = this.cancelButton.bind(this);
	}
	componentDidMount() {
		this.setState({
			rooms,
			users
		})
		this.container.addEventListener('scroll', this.handleScroll);
		this.timerID = setInterval(
			() => this.tick(),
			60000
		);
	}
	componentWillUnmount() {
		this.container.removeEventListener('scroll', this.handleScroll);
		clearInterval(this.timerID);
	}
	shouldComponentUpdate(nextState) {
		if (this.state.hidden !== nextState.hidden) {
			return true;
		}
		return false;
	}
	// Время
	tick() {
		this.setState({
			now: Moment().format('HH:mm'),
			offset: Moment.duration(Moment().format('HH:mm')).asMinutes()
		})
	}
	// Обработчик для вызова календаря
	selectCalendar() {
		this.setState({
			calendar: !this.state.calendar,
		});
	}
	// Обработчик для выбора дня
	selectDay(data) {
		const {selectedDay} = this.state;
		if (!Moment(selectedDay).isSame(Moment(data), 'day')) {
			this.setState({
				selectedDay: Moment(data),
				today: false
			});
		}
		if (Moment(Moment()).isSame(Moment(data), 'day')) {
			this.setState({
				today: true
			});
		}
	}
	// Обработчик кнопки день вперед
	nextDay() {
		const {selectedDay} = this.state;
		this.setState({
			selectedDay: selectedDay.add(1, 'days'),
		});
		if (Moment(Moment()).isSame(Moment(selectedDay), 'day')) {
			this.setState({
				today: true
			});
		} else {
			this.setState({
				today: false
			});
		}
	}
	// Обработчик кнопки день назад
	previusDay() {
		const {selectedDay} = this.state;
		this.setState({
			selectedDay: selectedDay.subtract(1, 'days'),
		});
		if (Moment(Moment()).isSame(Moment(selectedDay), 'day')) {
			this.setState({
				today: true
			})
		} else {
			this.setState({
				today: false
			});
		}
	}
	// Обработчик скролла
	handleScroll(e) {
		e.stopPropagation();
		if (e.target.scrollLeft > 140) {
			this.setState(state => ({
				hidden: true
			}));
		} if (e.target.scrollLeft < 140) {
			this.setState(state => ({
				hidden: false
			}));
		}
	}
	// Обработчик ввода названия встречи
	handleTitle(e) {
		const {event} = this.state;
		const renamedTitleEvent = renameEvent(event, e.target.value);
		this.setState({
			event: renamedTitleEvent
		});
	}
	// Обработчик сброса названия события
	handleClearTitle() {
		const {event} = this.state;
		const clearedTitleEvent = renameEvent(event, '');
		this.setState({
			event: clearedTitleEvent
		});
	}
	// Обработчик на изменение времени начала встречи
	handleHourStart(time, timeString) {
		this.setState({
			hourStart: Moment(time).startOf('hour')
		});
	}
	// Обработчик на изменение времени окончания встречи
	handleHourEnd(time, timeString) {
		const a = this.state.hourStart;
		if (a.diff(Moment(time)) > 0) {
			return;
		}
		this.setState({
			hourEnd: Moment(time).startOf('hour')
		});
	}
	// Обработчик на изменение даты
	handleDate(time, timeString) {
		this.setState({
			date: Moment(time).startOf('day')
		});
	}
	// Обработчик на поиск пользователя
	handleChange(event) {
		this.setState({
			member: event
		});
	}
	// Обработчик на выбор комнаты
	handleCheck(e) {
		const {event, rooms} = this.state;
		const room = rooms.find((room) => room.id === e.target.value);
		const addedRoom = addRoom(event, room);
		this.setState({
			event: addedRoom,
			checked: true
		});
	}
	// Обработчик на снятие выбора комнаты
	handleUnCheck() {
		const {event} = this.state;
		const removedRoom = removeRoom(event);
		this.setState({
			event: removedRoom,
			checked: false
		});
	}
	// Обработчик удаления пользователя из встречи
	onDeleteUser(id) {
		const updateUsers = removeUser(this.state.event, id);
		this.setState({
			event: updateUsers
		});
	}
	// Обработчик добавления пользователя к встрече
	onAddUser(login) {
		const {users} = this.state;
		const user = users.find((user) => (user.login).toLowerCase() === login.toLowerCase());
		const addedUser = addUser(this.state.event, user);
		this.setState({
			event: addedUser
		}, () => this.setState({member: ''}));
	}
	// Обработчик переключения на создание встречи
	createEvent() {
		const emptyEvent = mockEvent(this.state.event);
		this.setState({
			newEvent: true,
			event: emptyEvent
		});
	}
	// Обработчик кнопки Отмена
	cancelButton() {
		this.setState({
			newEvent: false
		});
	}
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<button hidden={this.state.newEvent} onMouseUp={this.createEvent} className='App-createEvent'>Создать встречу</button>
				</header>
				<TimePicker
					newEvent={this.state.newEvent}
					selectCalendar={this.selectCalendar}
					previusDay={this.previusDay}
					nextDay={this.nextDay}
					selectedTime={this.state.selectedDay}
					selectedDay={this.state.selectedDay}
					selectDay={this.selectDay}
					calendar={this.state.calendar} />
				<Timeline
					today={this.state.today}
					now={this.state.now}
					offset={this.state.offset}
					newEvent={this.state.newEvent}
					rooms={rooms}
					left={this.state.left}
					hidd={this.state.hidden}
					scrollingRef={(el) => this.container = el}
					scrolling={this.scrolling} />
				{this.state.newEvent &&
					<Form
						event={this.state.event}
						rooms={this.state.rooms}
						users={this.state.users}
						checked={this.state.checked}
						member={this.state.member}
						eventTitle={this.state.event.title}
						hourStart={this.state.hourStart}
						hourEnd={this.state.hourEnd}
						handleTitle={this.handleTitle}
						handleClearTitle={this.handleClearTitle}
						handleDate={this.handleDate}
						handleHourStart={this.handleHourStart}
						handleHourEnd={this.handleHourEnd}
						handleCheck={this.handleCheck}
						handleUnCheck={this.handleUnCheck}
						handleChange={this.handleChange}
						handleCancel={this.cancelButton}
						onDeleteUser={this.onDeleteUser}
						onAddUser={(e) => this.onAddUser(e)} />}
			</div>
		);
	}
}

export default App;
