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
      seconds: ``,
      error: ``
    };

    localStorage.removeItem(`name`, `seconds`);
  }

  validate() {
    const {name} = this.state;
    const {seconds} = this.state;

    let error = ``;

    if (!name && !seconds) {
      error = `vul een gebruikersnaam in`;
    }

    return error;
  }

  submitHandler(e) {

    e.preventDefault();

    const error = this.validate();

    if (isEmpty(error)) {
      localStorage.setItem(`name`, this.state.name);
      localStorage.setItem(`seconds`, this.state.seconds);
      this.context.router.transitionTo(`/game`);

    } else {
      this.setState({error, name: ``, seconds: ``});
      document.querySelector(`.name-input`).classList.add(`input-error`);
      document.querySelector(`.seconds-input`).classList.add(`input-error`);
    }
  }

  changeHandler() {

    const name = document.querySelector(`.name-input`);
    const seconds = document.querySelector(`.seconds-input`);

    this.setState({
      name: name.value,
      seconds: seconds.value,
    });
  }

  render() {

    const {name, seconds, error} = this.state;

    return (
        <div className='login-page'>
          <div className='login-field'>
          <img src='../assets/img/logo.png' />
           <form action='' method='post' acceptCharset='utf-8' onSubmit={e => this.submitHandler(e)}>
              <p className='naam-form'>Wat is jouw naam?</p>
              <input type='text' name='name' className='name-input' maxLength='15' placeholder='Gebruikersnaam' value={name} onChange={() => this.changeHandler()}  />

              

              <p className='naam-form'><br /><br /><br />Aantal seconden?</p>
              <input type='number' name='seconds' className='seconds-input' min='0' placeholder='Seconden' value={seconds} onChange={() => this.changeHandler()}  />
              <div className='error'>{error}</div>

              <button type='submit' value='Verder'>Verder</button>
            </form>
          </div>
        </div>

    );
  }
}
