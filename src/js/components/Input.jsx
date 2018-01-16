'use strict';

import React, {Component} from 'react';
let show = false;

export default class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: `0`
    };
  }

  handleInputChange(e) {
    const value = e.target.value.toLowerCase();
    this.setState({value: value});
  }

  show() {
    if (show === false) {
      document.querySelector(`.round1`).style.display = `flex`;
      show = true;
    } else {
      document.querySelector(`.round1`).style.display = `none`;
      show = false;
    }

  }

  question(number) {
    const quests = document.querySelectorAll(`.quests`);

    [].forEach.call(quests, function(el) {
      el.classList.remove(`active`);
    });

    const el = number.currentTarget;
    el.classList.add(`active`);
  }

  render() {

    return (
      <div className='round'>
        <div className='roundBtn'>
          <button onClick={this.show}>1</button>
        </div>

        <ul id='holder-q' className='round1'>
          <li className='quests q1 active' onClick={this.question.bind(1)}>1</li>
          <li className='quests q2' onClick={this.question.bind(1)}>2</li>
          <li className='quests q3' onClick={this.question.bind(1)}>3</li>
          <li className='quests q4' onClick={this.question.bind(1)}>4</li>
          <li className='quests q5' onClick={this.question.bind(1)}>5</li>
          <li className='quests q6' onClick={this.question.bind(1)}>6</li>
          <li className='quests q7' onClick={this.question.bind(1)}>7</li>
          <li className='quests q8' onClick={this.question.bind(1)}>8</li>
          <li className='quests q9' onClick={this.question.bind(1)}>9</li>
          <li className='quests q10' onClick={this.question.bind(1)}>10</li>
          <li className='quests q11' onClick={this.question.bind(1)}>11</li>
          <li className='quests q12' onClick={this.question.bind(1)}>12</li>
          <li className='quests q13' onClick={this.question.bind(1)}>13</li>
          <li className='quests q14' onClick={this.question.bind(1)}>14</li>
          <li className='quests q15' onClick={this.question.bind(1)}>15</li>
        </ul>
      </div>
    );
  }
}

Input.propTypes = {
  answer: React.PropTypes.func
};
