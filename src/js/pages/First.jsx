`use strict`;

import React, {Component, PropTypes} from 'react';
import {Input} from '../components/';

export default class First extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      round: `1`
    };
  }

  render() {
    return (
        <section className='game-page'>
            <section className='dashboard'>
                <h1><img className='logoMain' src='../assets/img/logo-sarlat.png' /></h1>

                <Input />
            </section>
        </section>
    );
  }
}

