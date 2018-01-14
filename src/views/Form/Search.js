import React from 'react';
import {Select} from 'antd';
import {UserCard} from '../';
import './Search.css';

const {Option} = Select;

const Search = (props) => {
	const options = props.users.map((d) =>	(
		<Option key={d.login} className='option-container' >
			<UserCard
				type='search'
				login={d.login}
				avatarUrl={d.avatarUrl} />
			· {d.homeFloor} этаж
		</Option>));
	return (
		<Select
			mode='combobox'
			value={props.member}
			placeholder='Например, Тор Одинович'
			dropdownStyle={{height: 136, overflow: 'auto'}}
			defaultActiveFirstOption={false}
			defaultValue=''
			showArrow={false}
			filterOption
			onChange={props.handleChange}
			onSelect={props.onAddUser}>
			{options}
		</Select>
	);
};

export default Search;
