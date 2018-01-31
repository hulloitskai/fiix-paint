import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onButtonClick: props.onButtonClick,
      saveButtonMode: 'default',
    };

    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.handleUndoButtonClick = this.handleUndoButtonClick.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.onSaveCompletion = this.onSaveCompletion.bind(this);
  }

  handleClearButtonClick(event) {
    event.preventDefault();
    this.callbackWithRequest("clear-drawings");
  }

  handleUndoButtonClick(event) {
    event.preventDefault();
    this.callbackWithRequest("undo-drawing");
  }

  handleSaveButtonClick(event) {
    event.preventDefault();
    this.state.onButtonClick({
      sender: "Header",
      state: {
        request: "save-drawings",
        callback: this.onSaveCompletion
      }
    });
  }

  onSaveCompletion(success) {
    this.setState(state => state.saveButtonMode = 'green');
    this.setState = this.setState.bind(this);
    setTimeout(() => {
      this.setState(state => state.saveButtonMode = 'default');
    }, 750);
  }

  callbackWithRequest(request) {
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
              <button className={"other-button " + this.state.saveButtonMode}
                      onClick={this.handleSaveButtonClick}>save</button>
              <button className="other-button"
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