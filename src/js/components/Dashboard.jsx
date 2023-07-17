'use strict';

import React, {Component} from 'react';

import {DashboardItem} from '.';

export default class Dashboard extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    const {users} = this.props;

    const rows = [];

    users.forEach(function(user) {
      if (user.name !== `admin`) {
        rows.push(<DashboardItem naam={user.name} punten={user.seconds} key={user.socketId} />);
      }
    });

    return (
      <section className='dashboard'>
        <h1><img className='logoMain' src='../assets/img/logo-sarlat.png' /></h1>

        <div className='users'>
          {rows}
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  users: React.PropTypes.array,
  socket: React.PropTypes.object
};
