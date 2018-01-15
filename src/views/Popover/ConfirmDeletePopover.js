import React from 'react';

const ConfirmDeletePopover = (props) => {
	return (
		<div>
			<div />
			<h2>Встреча будет удалена безвозвратно</h2>
			<div>
				<button
					onClick={props.onDeleteCancel}>Отмена
				</button>
				<button
					onClick={props.onDeleteEvent}>Удалить
				</button>
			</div>
		</div>
	)
};

export default ConfirmDeletePopover;
