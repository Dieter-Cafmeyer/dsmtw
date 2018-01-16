'use strict';

import React, {Component} from 'react';

export default class Keyword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ``
    };
  }

  componentDidMount() {
    this.setState({
      keyword: this.props.keyword
    });

  }

  render() {
    const {keyword} = this.props;

    return (
      <div className='keyword'>
       <img src={`/assets/img/${keyword}.jpg`} width='200' className='back-button' />
      </div>
    );
  }
}

Keyword.propTypes = {
  keyword: React.PropTypes.string
};
