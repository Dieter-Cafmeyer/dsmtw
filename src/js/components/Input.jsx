'use strict';

import React, {Component} from 'react';

let question = 1;

export default class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first: `1`
    };
  }


  componentDidMount() {
    document.body.onkeyup = function(e) {
      if (e.key === ` ` || e.code === `Space` || e.keyCode === 32 || e.code === `ArrowRight` || e.keyCode === 39) {
        question += 1;
      } else if (e.code === `ArrowLeft` || e.keyCode === 37) {
        question -= 1;
      }

      const quests = document.querySelectorAll(`.quests`);
      [].forEach.call(quests, function(el) {
        el.classList.remove(`active`);
      });

      const el = document.querySelectorAll(`.q${  question}`);
      el[0].classList.add(`active`);
    };
  }

  handleInputNext() {

    //const current = this.getState({value});

    // [].forEach.call(quests, function(el) {
    //   el.classList.remove(`active`);
    // });

    //console.log(current);

    //this.setState({value: value});
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
