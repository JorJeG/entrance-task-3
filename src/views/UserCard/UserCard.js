import React, {Component} from 'react';
import './UserCard.css';

class UserCard extends Component {
	handleDelete() {
		this.props.onDeleteUser(this.props.value);
	}
	render() {
		if (this.props.type === 'search') {
			return (
				<div className='user-search-container'>
					<img className='user-avatar user-avatar-search' src={this.props.avatarUrl} alt={this.props.login} />
					<p className='user-login user-login-search'>{this.props.login}</p>
				</div>
			)
		}
		return (
			<div className='user-container'>
				<div className='user-search-item'>
					<img className='user-avatar' src={this.props.avatarUrl} alt={this.props.login} />
					<p className='user-login'>{this.props.login}</p>
				</div>
				<div className='user-search-item'>
					<button onClick={() => this.handleDelete()} className='remove-user' />
				</div>
			</div>
		)
	}
}

export default UserCard;
