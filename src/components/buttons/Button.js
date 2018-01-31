// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Button.css'

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: props.onClick
    };

    this.handleClick = this.handleClick.bind(this);
    this.callback = this.callback.bind(this);
  }

  handleClick(event: MouseEvent) {
    event.preventDefault();
    this.callback({}); // Sends empty object to create callback.
  }

  callback(event: Object) {
    if (!event.hasOwnProperty("sender")) event.sender = "Button";
    this.state.onClick(event);
  }

  render() {
    return (
        <div className="button-root">
          <button onClick={this.handleClick} />
        </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Button;
