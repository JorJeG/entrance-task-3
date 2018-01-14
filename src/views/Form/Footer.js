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
				<button
					disabled={!props.checked}
					className='button-create'>
					Создать встречу
				</button>
			</div>
		</div>
	)
};

export default Footer;
