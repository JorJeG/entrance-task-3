import React from  'react';
import './Footer.css';

const Footer = (props) => {
	return (
		<div className='footer-container'>
			{!props.checked && <p className='attentionField hiddenDesktop'>Выберите переговорку</p>}
			<div className='buttonField'>
				<button
					onMouseUp={props.handleCancel}
					className='button-cancel'>
					Отмена
				</button>
				{props.editEvent &&
					<button className='button-delete hiddenMobile'>
						Удалить
					</button>}
				{props.editEvent &&
					<button
						disabled={!props.checked}
						onMouseUp={props.onSaveEvent}
						className='button-create'>
						Сохранить
					</button>}
				{!props.editEvent &&
					<button
						disabled={!props.checked}
						onMouseUp={props.onAddNewEvent}
						className='button-create'>
						Создать встречу
					</button>}
			</div>
		</div>
	)
};

export default Footer;
