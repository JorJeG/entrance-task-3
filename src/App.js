import React, {Component} from 'react';
import Moment from 'moment';
import {TimePicker, Timeline} from './views';
import logo from './assets/touch/logo.svg';
import './App.css';
import {rooms} from './data/rooms';


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
			hidden: false
		};
		this.selectCalendar = this.selectCalendar.bind(this);
		this.selectDay = this.selectDay.bind(this);
		this.nextDay = this.nextDay.bind(this);
		this.previusDay = this.previusDay.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount() {
    this.container.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.handleScroll);
  }
	shouldComponentUpdate(nextState) {
		if (this.state.hidden !== nextState.hidden) {
			return true;
		}
		return false;
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
			});
		}
	}
	// Обработчик кнопки день вперед
	nextDay() {
		const {selectedDay} = this.state;
		this.setState({
			selectedDay: selectedDay.add(1, 'days'),
		});
	}
	// Обработчик кнопкидень назад
	previusDay() {
		const {selectedDay} = this.state;
		this.setState({
			selectedDay: selectedDay.subtract(1, 'days'),
		});
	}
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
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<button className='App-createEvent'>Создать встречу</button>
				</header>
				<TimePicker
					selectCalendar={this.selectCalendar}
					previusDay={this.previusDay}
					nextDay={this.nextDay}
					selectedTime={this.state.selectedDay}
					selectedDay={this.state.selectedDay}
					selectDay={this.selectDay}
					calendar={this.state.calendar} />
				<Timeline
					rooms={rooms}
					left={this.state.left}
					hidd={this.state.hidden}
					scrollingRef={(el) => this.container = el}
					scrolling={this.scrolling} />
			</div>
		);
	}
}

export default App;
