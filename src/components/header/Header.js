import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onButtonClick: props.onButtonClick
    };

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.handleUndoButtonClick = this.handleUndoButtonClick.bind(this);
  }

  handleClearButtonClick(event) {
    event.preventDefault();
    this.callbackWithRequest("clear-drawings");
  }

  handleUndoButtonClick(event) {
    event.preventDefault();
    this.callbackWithRequest("undo-drawing");
  }

  callbackWithRequest(request: string) {
    this.state.onButtonClick({
      sender: "Header",
      state: { request: request }
    });
  }

  render() {
    return (
        <div className="header-root">
          <header className="app-header">
            <h1><a href={"http://github.com/steven-xie/fiix-paint"}>
              Fiix Paint
            </a></h1>
            <div className="command-buttons">
              <button className="undo-button"
                      onClick={this.handleUndoButtonClick}>undo</button>
              <button className="clear-button"
                      onClick={this.handleClearButtonClick}>clear</button>
            </div>
          </header>
        </div>
    )
  }
}

Header.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};

export default Header;