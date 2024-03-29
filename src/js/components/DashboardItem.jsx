'use strict';

import React, {Component} from 'react';

export default class DashboardItem extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {naam, punten} = this.props;

    return (
      <div className={`dashboard-item ${naam}`}>
        <h1>{naam}</h1>
        <h2>{punten}</h2>
      </div>
    );
  }
}

DashboardItem.propTypes = {
  naam: React.PropTypes.string,
  punten: React.PropTypes.number
};
