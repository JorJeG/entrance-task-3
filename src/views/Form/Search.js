import React from 'react';
import { Select } from 'antd';
import { UserCard } from '../';
import './Search.css';

const { Option } = Select;

const Search = (props) => {
  const {
    users,
    member,
    onAddUser,
    handleChange
  } = props;
  const options = users.map(d => (
    <Option key={d.login} className="option-container">
      <UserCard
        type="search"
        login={d.login}
        avatarUrl={d.avatarUrl}
      />
      · {d.homeFloor} этаж
    </Option>));
  return (
    <Select
      mode="combobox"
      value={member}
      placeholder="Например, Тор Одинович"
      dropdownStyle={{ overflow: 'hidden' }}
      defaultActiveFirstOption={false}
      defaultValue=""
      showArrow={false}
      filterOption
      onChange={handleChange}
      onSelect={onAddUser}
    >
      {options}
    </Select>
  );
};

export default Search;
