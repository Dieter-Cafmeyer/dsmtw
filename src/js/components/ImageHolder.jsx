'use strict';

import React, {Component} from 'react';

export default class ImageHolder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: ``,
      listening: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({url: this.props.url});
  }

  handleClick(event) {

    const {canClick} = this.props;

    event.preventDefault();

    if (canClick === true) {
      this.setState({
        listening: true
      });

      const {id} = this.props;
      this.props.handleClick(id);

      event.currentTarget.style.backgroundImage = `url('../assets/svg/listening.gif')`;
    }


    const {id} = this.props;
    this.props.handleClick(id);
  }

  render() {
    let message, listenMessage;
    const {url, id} = this.props;

    if (this.state.listening === true) {
      message = <p className='message'>Geef uw tip</p>;
      listenMessage = <p className='listenMessage'>Aan het luisteren..</p>;
    }

    if (url !== ``) {
      console.log(`Image was filled`);
      message = ``;
      listenMessage = ``;
    }

    return (
      <div className='image-holder'>
        <div onClick={this.handleClick} id={id}>
          {listenMessage}
          <img src={url} />
          {message}
        </div>
      </div>
    );
  }
}

ImageHolder.propTypes = {
  url: React.PropTypes.string,
  id: React.PropTypes.number,
  handleClick: React.PropTypes.func,
  canClick: React.PropTypes.bool
};
