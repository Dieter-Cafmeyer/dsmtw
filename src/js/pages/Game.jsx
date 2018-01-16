`use strict`;
import React, {Component, PropTypes} from 'react';
import {Sidebar} from '../components/';
import {isEmpty} from 'lodash';

import io from 'socket.io-client';


const countdown = document.getElementById(`countdown`);
const countdownPause = document.getElementById(`countdownPause`);
const countdownComplete = document.getElementById(`countdownComplete`);
const addsubtract = document.getElementById(`addsubtract`);

countdown.pause();
countdownPause.pause();
countdownComplete.pause();
addsubtract.pause();

countdown.muted = false;
countdownPause.muted = false;
countdownComplete.muted = false;
addsubtract.muted = false;


let socket = ``;
let running = false;
let counter;

export default class Game extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      seconden: `60`,
      users: [],
      me: [],
      name: ``,
      showModal: false
    };
  }

  componentDidMount() {

    counter = setInterval(this.timer.bind(this), 1000);

    if (isEmpty(localStorage.name)) {
      this.context.router.transitionTo(`/`);
    } else {

      const name = localStorage.getItem(`name`);
      socket = io(`/`, {query: `name=${name}`});
      socket.on(`init`, this.handleWSInit);

      socket.on(`join`, this.handleWSJoin);
      socket.on(`leave`, this.handleWSLeave);

      socket.on(`updateUsers`, this.handleWSUpdateUsers);
    }
  }

  timer() {
    if (running) {
      let voorlopig = this.state.seconden;
      voorlopig --;
      this.setState({seconden: voorlopig});
      this.sendTimes();
    }

    console.log(this.state.seconden);

    if (this.state.seconden <= 0) {
      countdown.pause();
      countdownComplete.play();
      clearTimeout(counter);
    }
  }

  handleWSInit = data => {
    this.setState({users: data.users, me: data.user});

    if (!localStorage.getItem(`modal`)) {
      this.setState({
        showModal: true
      });

      localStorage.setItem(`modal`, 1);
    }
  }

  handleWSJoin = user => {
    const {users} = this.state;
    users.push(user);
    this.setState({users});
  }

  handleWSLeave = socketId => {
    let {users} = this.state;
    users = users.filter(u => u.socketId !== socketId);
    this.setState({users});
  }

  handleWSUpdateUsers = users => {
    console.log(users);
    this.setState({
      users: users
    });
  }


  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  isEmptyObject(obj) {
    for (const key in obj) {
      return false;
    }
    return true;
  }

  sendTimes(getal) {
    const {me, seconden} = this.state;

    if (getal) {
      socket.emit(`userPoints`, {
        socketId: me.socketId,
        seconds: getal
      });
    } else {
      socket.emit(`userPoints`, {
        socketId: me.socketId,
        seconds: seconden
      });
    }
  }

  checkIfRunning() {
    if (running) {
      running = false;
      countdown.pause();
      countdown.currentTime = 0;
      countdownPause.play();
    } else {
      running = true;
      countdown.play();
      countdownPause.currentTime = 0;
      countdownPause.pause();
    }
  }

  plus() {
    let voorlopig = parseInt(this.state.seconden);
    this.sendTimes(voorlopig + 20);
    voorlopig += 20;
    this.setState({seconden: voorlopig});
    addsubtract.pause();
    addsubtract.currentTime = 0;
    addsubtract.play();

  }

  minus() {
    let voorlopig = parseInt(this.state.seconden);
    this.sendTimes(voorlopig - 20);
    voorlopig -= 20;
    this.setState({seconden: voorlopig});
    addsubtract.pause();
    addsubtract.currentTime = 0;
    addsubtract.play();
  }

  logout() {
    clearTimeout(counter);
    location.reload();
    this.context.router.transitionTo(`/`);
  }

  question(number) {
    //this.setState({question: number});
    console.log(`test`);
  }

  render() {
    const {users, seconden} = this.state;
    return (
      <section className='game-page'>

        <Sidebar users={users} socket={socket} />

        <div className='back'>
            <img src='../assets/svg/logout.svg' onClick={this.logout.bind(this)} /> <p onClick={this.logout.bind(this)}>Terug</p>
        </div>

        <div className='console'>

          <div className='fake-screen'>
          <h1 id='time'>{seconden}</h1>
          </div>

          <div className='actions'>
            <div className='plus' onClick={this.plus.bind(this)}></div>
            <div className='start' onClick={this.checkIfRunning.bind(this)}></div>
            <div className='minus' onClick={this.minus.bind(this)}></div>
          </div>

        </div>

      </section>

    );
  }
}
