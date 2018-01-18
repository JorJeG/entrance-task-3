import React, { Component } from 'react';
import Close from '../Form/Close';
import './UserCard.css';

class UserCard extends Component {
  handleDelete() {
    this.props.onDeleteUser(this.props.value);
  }
  render() {
    if (this.props.type === 'search') {
      return (
        <div className="user-search-container">
          <img className="user-avatar user-avatar-search" src={this.props.avatarUrl} alt={this.props.login} />
          <p className="user-login user-login-search">{this.props.login}</p>
        </div>
      );
    }
    if (this.props.type === 'popover') {
      return (
        <div className="user-popover-container">
          <img className="user-avatar user-avatar-popover" src={this.props.avatarUrl} alt={this.props.login} />
          <p className="user-login user-login-popover">{this.props.login}</p>
        </div>
      );
    }
    const rootB = document.getElementById('root');
    if (rootB.clientWidth >= 1280) {
      return (
        <div className="user-container">
          <div className="user-search-item">
            <img className="user-avatar" src={this.props.avatarUrl} alt={this.props.login} />
            <p className="user-login">{this.props.login}</p>
          </div>
          <div className="user-search-item">
            <button
              onClick={() => this.handleDelete()}
              className="remove-user"
            >
              <Close type="desktop" />
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="user-container">
        <div className="user-search-item">
          <img className="user-avatar" src={this.props.avatarUrl} alt={this.props.login} />
          <p className="user-login">{this.props.login}</p>
        </div>
        <div className="user-search-item">
          <button
            onClick={() => this.handleDelete()}
            className="remove-user"
          >
            <Close type="touch" />
          </button>
        </div>
      </div>
    );
  }
}

export default UserCard;
