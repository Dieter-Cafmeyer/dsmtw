`use strict`;

import React, {Component, PropTypes} from 'react';
import {isEmpty} from 'lodash';

export default class Home extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: ``,
      error: ``
    };

    localStorage.removeItem(`name`);
  }

  validate() {
    const {name} = this.state;

    let error = ``;

    if (!name) {
      error = `vul een gebruikersnaam in`;
    }

    return error;
  }

  submitHandler(e) {

    e.preventDefault();

    const error = this.validate();

    if (isEmpty(error)) {
      localStorage.setItem(`name`, this.state.name);
      this.context.router.transitionTo(`/game`);

    } else {
      this.setState({error, name: ``});
      document.querySelector(`.name-input`).classList.add(`input-error`);
    }
  }

  changeHandler() {

    const name = document.querySelector(`.name-input`);

    this.setState({
      name: name.value,
    });
  }

  render() {

    const {name, error} = this.state;

    return (
        <div className='login-page'>
          <div className='login-field'>
          <img src='../assets/img/logo.png' />
           <form action='' method='post' acceptCharset='utf-8' onSubmit={e => this.submitHandler(e)}>
              <p className='naam-form'>Wat is jouw naam?</p>
              <input type='text' name='name' className='name-input' maxLength='15' placeholder='Gebruikersnaam' value={name} onChange={() => this.changeHandler()}  />
              <div className='error'>{error}</div>

              <button type='submit' value='Verder'>Verder</button>
              <p className='enter-to-enter'>of druk op enter</p>
            </form>
          </div>
        </div>

    );
  }
}
