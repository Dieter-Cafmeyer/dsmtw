'use strict';

import React, {Component} from 'react';

import {SidebarItem, Input} from '../components/';

export default class Sidebar extends Component {

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
      rows.push(<SidebarItem naam={user.name} punten={user.seconds} key={user.socketId} />);
    });

    return (
      <section className='sidebar'>
        <Input />
        <h1><img className='logoMain' src='../assets/img/logo-full.png' /></h1>

        <div className='users'>
          {rows}
        </div>



      </section>
    );
  }
}

Sidebar.propTypes = {
  users: React.PropTypes.array,
  socket: React.PropTypes.object
};
