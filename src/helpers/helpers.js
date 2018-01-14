import Moment from 'moment';

export const generateId = () => Math.floor(Math.random() * 100000);

export const removeUser = (event, id) => {
	const removeIndex = event.users.findIndex((user) => user.id === id);
	return Object.assign({}, event, {
		users: [
			...event.users.slice(0, removeIndex),
			...event.users.slice(removeIndex + 1)
		]
	});
};

export const addUser = (event, user) => (
	Object.assign({}, event, {
		users: [
			...event.users, user
		]
	})
);

export const addRoom = (event, room) => {
	return Object.assign({}, event, {
		room
	});
};

export const removeRoom = (event) => {
	return Object.assign({}, event, {
		room: {}
	});
};

export const renameEvent = (event, value) => {
	return Object.assign({}, event, {
		title: value
	});
};

export const mockEvent = (event) => {
	return Object.assign({}, event, {
		id: generateId(),
		title: '',
		dateStart: Moment(),
		dateEnd: Moment().add(1, 'hours'),
		users: [],
		room: {}
	})
}
