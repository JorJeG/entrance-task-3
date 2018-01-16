import React, {Component} from 'react';
import Moment from 'moment';
import {
	Timeline,
	Form,
	EventPopover,
	ConfirmAddPopover,
	ConfirmDeletePopover
} from './views';
import {
	removeUser,
	addUser,
	addRoom,
	removeRoom,
	renameEvent,
	mockEvent,
	newEventWithTime,
	changeEventDateStart,
	changeEventDateEnd,
	changeEventDay,
	addNewEvent,
	deleteEvent,
	saveEvent,
	updateBox
} from './helpers/helpers';
import logo from './assets/touch/logo.svg';
import './App.css';
import {rooms} from './data/rooms';
import {events} from './data/events';
import {users} from './data/users';

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
			events: [],
			event: {},
			users: [],
			rooms: [],
			checked: false,
			filledTitle: false,
			filledUser: false,
			today: true,
			now: Moment().format('HH:mm'),
			offset: Moment.duration(Moment().format('HH:mm')).asMinutes(),
			popover: {},
			onEvent: false,
			confirmAdd: false,
			confirmDelete: false
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
		this.onAddNewEvent = this.onAddNewEvent.bind(this);
		this.handlePopover = this.handlePopover.bind(this);
		this.handleConfrimPopover = this.handleConfrimPopover.bind(this);
		this.handleDeletePopover = this.handleDeletePopover.bind(this);
		this.onEditEvent = this.onEditEvent.bind(this);
		this.onSaveEvent = this.onSaveEvent.bind(this);
		this.onDeleteEvent = this.onDeleteEvent.bind(this);
		this.onDeleteCancel = this.onDeleteCancel.bind(this);
	}
	componentDidMount() {
		this.setState({
			rooms,
			users,
			events
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
				today: false,
				calendar: false
			});
		}
		if (Moment(Moment()).isSame(Moment(data), 'day')) {
			this.setState({
				today: true,
				calendar: false
			});
		}
	}
	// Обработчик кнопки день вперед
	nextDay() {
		this.setState(prevState => {
			const today = Moment().isSame(prevState.selectedDay.clone().add(1, 'days'), 'day') ? true : false
			return {
				selectedDay: prevState.selectedDay.clone().add(1, 'days'),
				today
			}
		});
	}
	// Обработчик кнопки день назад
	previusDay() {
		this.setState(prevState => {
			const today = Moment().isSame(prevState.selectedDay.clone().subtract(1, 'days'), 'day') ? true : false
			return {
				selectedDay: prevState.selectedDay.clone().subtract(1, 'days'),
				today
			}
		});
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
		if (e.target.value.length > 0) {
			this.setState({
				event: renamedTitleEvent,
				filledTitle: true
			});
		} else {
			this.setState({
				event: renamedTitleEvent,
				filledTitle: false
			});
		}
	}
	// Обработчик сброса названия события
	handleClearTitle() {
		const {event} = this.state;
		const clearedTitleEvent = renameEvent(event, '');
		this.setState({
			event: clearedTitleEvent,
			filledTitle: false
		});
	}
	// Обработчик на изменение времени начала встречи
	handleHourStart(time, timeString) {
		const {event} = this.state;
		const changedEventDateStart = changeEventDateStart(event, Moment(time));
		this.setState({
			event: changedEventDateStart
		});
	}
	// Обработчик на изменение времени окончания встречи
	handleHourEnd(time, timeString) {
		const {event} = this.state;
		const a = event.dateStart;
		if (a.diff(Moment(time)) > 0) {
			return;
		}
		const changedEventDateEnd = changeEventDateEnd(event, Moment(time));
		this.setState({
			event: changedEventDateEnd
		});
	}
	// Обработчик на изменение даты
	handleDate(time, timeString) {
		const {event} = this.state;
		const changedEventDay = changeEventDay(event, Moment(time).startOf('day'));
		this.setState({
			event: changedEventDay
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
		const {event} = this.state;
		const updateUsers = removeUser(event, id);
		console.log(updateUsers.users.length);
		if (updateUsers.users.length > 0) {
			this.setState({
					event: updateUsers,
					filledUser: true
			});
		} else {
			this.setState({
					event: updateUsers,
					filledUser: false
			});
		}
	}
	// Обработчик добавления пользователя к встрече
	onAddUser(login) {
		const {users, event} = this.state;
		const user = users.find((user) => (user.login).toLowerCase() === login.toLowerCase());
		const addedUser = addUser(event, user);
		this.setState({
			event: addedUser,
			filledUser: true
		}, () => this.setState({member: ''}));
	}
	// Обработчик переключения на создание встречи
	createEvent(e, id) {
		console.log(id);
		if (typeof e === 'string') {
			const currentRoom = this.state.rooms.find((room) => room.id === id);
			const eventWithTime = newEventWithTime(this.state.event, e, currentRoom);

			this.setState({
				newEvent: true,
				event: eventWithTime,
				onEvent: false,
				checked: true
			})
		} else {
			const emptyEvent = mockEvent(this.state.event);
			this.setState({
				newEvent: true,
				event: emptyEvent,
				onEvent: false
			});
		}
	}
	// Обработчик кнопки Отмена
	cancelButton() {
		this.setState({
			newEvent: false,
			editEvent: false,
			checked: false,
			filledUser: false,
			filledTitle: false
		});
	}
	// Обработчик для добавления новой встречи
	onAddNewEvent() {
		const {events, event} = this.state;
		const addedEvent = addNewEvent(events, event);
		this.setState({
			events: addedEvent,
			newEvent: false,
			confirmAdd: true,
			filledUser: false,
			checked: false,
			filledTitle: false
		});
	}
	// Обработчик для сохранения изменений во встречи
	onSaveEvent() {
		const {events, event} = this.state;
		const savedEvent = saveEvent(events, event);
		this.setState({
			events: savedEvent,
			editEvent: false,
			filledUser: false,
			filledTitle: false,
			checked: false
		});
	}
	// Обработчик для удаления встречи
	onDeleteEvent() {
		const {events, event} = this.state;
		const removedEvents = deleteEvent(events, event.id);
		this.setState({
			events: removedEvents,
			confirmDelete: false,
			checked: false
		})
	}
	// Обработчик для отмены удаления встречи
	onDeleteCancel() {
		this.setState({
			confirmDelete: false,
			editEvent: true
		});
	}
	// Обработчик поповера для встреч
	handlePopover(e) {
		const selectedCell = e.target;
		const newPlace = updateBox(this.state.popover, selectedCell.getBoundingClientRect());
		console.log(selectedCell.getBoundingClientRect());
		console.log(window.screen);
		// console.log(id);
		const clickedEvent = this.state.events.find((event) => event.id === Number(selectedCell.dataset.id));
		// console.log(this.popover.getBoundingClientRect());
		// console.log(window.scrollY);
		this.setState(prevState => {
			return {
				popover: newPlace,
				onEvent: !prevState.onEvent,
				event: clickedEvent,
			}
		});
	}
	// Обработчик включения поздравления о создании встречи
	handleConfrimPopover() {
		const {event} = this.state;
		const emptyedEvent = mockEvent(event);
		this.setState({
			event: emptyedEvent,
			confirmAdd: false
		});
	}
	// Обработчик включения подтверждения удаления
	handleDeletePopover() {
		this.setState({
			confirmDelete: true,
			editEvent: false
		});
	}
	// Обработчик включения редактирования
	onEditEvent() {
		this.setState({
			editEvent: true,
			onEvent: false,
			checked: true,
			filledUser: true,
			filledTitle: true
		})
	}
	render() {
		const {
			popover,
			event,
			onEvent,
			newEvent,
			editEvent,
			confirmAdd,
			confirmDelete} = this.state;
		const scroll = onEvent ? "fixed" : 'static';
		return (
			<div
				// style={{position: scroll}}
				className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<button hidden={this.state.newEvent || editEvent} onMouseUp={this.createEvent} className='App-createEvent'>Создать встречу</button>
				</header>
				<Timeline
					onEvent={this.state.onEvent}
					popover={this.state.popover}
					handlePopover={this.handlePopover}
					newEvent={this.state.newEvent}
					editEvent={this.state.editEvent}
					selectCalendar={this.selectCalendar}
					previusDay={this.previusDay}
					nextDay={this.nextDay}
					selectedTime={this.state.selectedDay}
					selectDay={this.selectDay}
					calendar={this.state.calendar}
					selectedDay={this.state.selectedDay}
					events={this.state.events}
					today={this.state.today}
					now={this.state.now}
					offset={this.state.offset}
					createEvent={this.createEvent}
					rooms={rooms}
					left={this.state.left}
					hidd={this.state.hidden}
					scrollingRef={(el) => this.container = el}
					scrolling={this.scrolling} />
				{newEvent &&
					<Form
						title='Новая встреча'
						newEvent={this.state.newEvent}
						event={this.state.event}
						rooms={this.state.rooms}
						users={this.state.users}
						checked={this.state.checked}
						filledTitle={this.state.filledTitle}
						filledUser={this.state.filledUser}
						member={this.state.member}
						eventTitle={this.state.event.title}
						handleTitle={this.handleTitle}
						handleClearTitle={this.handleClearTitle}
						handleDate={this.handleDate}
						handleHourStart={this.handleHourStart}
						handleHourEnd={this.handleHourEnd}
						handleCheck={this.handleCheck}
						handleUnCheck={this.handleUnCheck}
						handleChange={this.handleChange}
						handleCancel={this.cancelButton}
						handleDeletePopoverr={this.handleDeletePopover}
						onAddNewEvent={this.onAddNewEvent}
						onAddUser={(e) => this.onAddUser(e)} />}
				{editEvent &&
					<Form
						title='Редактирование встречи'
						editEvent={editEvent}
						event={this.state.event}
						rooms={this.state.rooms}
						users={this.state.users}
						checked={this.state.checked}
						filledTitle={this.state.filledTitle}
						filledUser={this.state.filledUser}
						member={this.state.member}
						eventTitle={this.state.event.title}
						handleTitle={this.handleTitle}
						handleClearTitle={this.handleClearTitle}
						handleDate={this.handleDate}
						handleHourStart={this.handleHourStart}
						handleHourEnd={this.handleHourEnd}
						handleCheck={this.handleCheck}
						handleUnCheck={this.handleUnCheck}
						handleChange={this.handleChange}
						handleCancel={this.cancelButton}
						handleDeletePopover={this.handleDeletePopover}
						onSaveEvent={this.onSaveEvent}
						onDeleteUser={this.onDeleteUser}
						onAddUser={(e) => this.onAddUser(e)}
					/>}
				{onEvent &&
					<EventPopover
						onEditEvent={this.onEditEvent}
						popover={popover}
						popoverEvent={this.state.event}
						/>}
				{confirmAdd &&
					<ConfirmAddPopover
						event={event}
						handleConfrimPopover={this.handleConfrimPopover} />
				}
				{confirmDelete &&
					<ConfirmDeletePopover
						onDeleteEvent={this.onDeleteEvent}
						onDeleteCancel={this.onDeleteCancel} />
				}
			</div>
		);
	}
}

export default App;
