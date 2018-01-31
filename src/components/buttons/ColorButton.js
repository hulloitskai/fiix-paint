// @flow
import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

class ColorButton extends Button {
  constructor(props) {
    super(props);
    this.state.selected = props.selected;
    this.state.color = props.color;
    this.id = props.id;
  }

  componentWillReceiveProps(props) {
    this.setState(state => state.selected = props.selected);
  }

  callback(event: Object) {
    event.sender = "ColorButton";
    event.state = {
      color: this.state.color
    };
    event.id = this.id;
    super.callback(event);
  }

  render() {
    return (
        <div className="button-root">
          <button style={{backgroundColor: this.state.color}}
                  onClick={this.handleClick}
                  className={this.state.selected ? "active" : "inactive"}/>
        </div>
    );
  }
}

ColorButton.propTypes.color = PropTypes.string.isRequired;
ColorButton.propTypes.id = PropTypes.number.isRequired;
ColorButton.propTypes.selected = PropTypes.bool;

export default ColorButton;
