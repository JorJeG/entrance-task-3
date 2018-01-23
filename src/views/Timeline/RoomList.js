import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { FloorRow, RoomRow, OnlyRoom } from '../';

class RoomList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.newEvent === false ||
      nextProps.confirmDelete === false ||
      nextProps.withData === false ||
      nextProps.editEvent === false) {
      this.props.feedQuery.refetch();
    }
  }
  render() {
    const {
      feedQuery: {
        loading, rooms, events,
      },
      onEvent,
      only,
      editEvent,
      handlePopover,
      createEvent,
      selectedDay,
    } = this.props;
    const rows = [];
    let lastFloor = null;
    if (loading) {
      return <p>loading...</p>;
    }
    rooms.forEach((room) => {
      if (room.floor !== lastFloor) {
        rows.push(<FloorRow
          only={only}
          floor={room.floor}
          key={`floor_${room.floor}`}
        />);
      }
      if (only) {
        rows.push(<OnlyRoom
          only={only}
          room={room}
          key={room.title}
        />);
      } else {
        const filteredEvents = events.filter(event => event.room.id === room.id);
        rows.push(<RoomRow
          onEvent={onEvent}
          editEvent={editEvent}
          handlePopover={handlePopover}
          selectedDay={selectedDay}
          createEvent={createEvent}
          events={filteredEvents}
          room={room}
          key={room.title}
        />);
      }
      lastFloor = room.floor;
    });
    return (
      <React.Fragment>
        {rows}
      </React.Fragment>
    );
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    rooms {
      id
      title
      capacity
      floor
    }
    events {
      id
      title
      dateStart
      dateEnd
      users {
        id
        login
        homeFloor
        avatarUrl
      }
      room {
        id
        title
        capacity
        floor
      }
    }
  }
`;

RoomList.propTypes = {
  onEvent: PropTypes.bool,
  newEvent: PropTypes.bool,
  withData: PropTypes.bool,
  confirmDelete: PropTypes.bool,
  editEvent: PropTypes.bool,
  selectedDay: PropTypes.object,
  createEvent: PropTypes.func,
  handlePopover: PropTypes.func,
  only: PropTypes.bool,
  feedQuery: PropTypes.object,
};

RoomList.defaultProps = {
  only: false,
  onEvent: false,
  newEvent: false,
  withData: false,
  confirmDelete: false,
  editEvent: false,
  createEvent: null,
  handlePopover: null,
  selectedDay: null,
  feedQuery: null,
};

export default graphql(FEED_QUERY, { name: 'feedQuery' })(RoomList);
