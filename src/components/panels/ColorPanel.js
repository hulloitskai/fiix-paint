// @flow
import React, {Component} from 'react';
import ColorButton from '../buttons/ColorButton';
import PropTypes from 'prop-types';
import './ColorPanel.css'

class ColorPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onNewEvent: props.onNewEvent,
      selectedID: 1
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  // Forward to parent
  handleButtonClick(event) {
    this.setState(state => state.selectedID = event.id);
    this.state.onNewEvent(event);
  }

  render() {
    return (
        <div className="panel-root">
          <ColorButton onClick={this.handleButtonClick}
                       color={"lightblue"} id={1}
                       selected={this.state.selectedID === 1}/>
          <ColorButton onClick={this.handleButtonClick}
                       color={"lightgreen"} id={2}
                       selected={this.state.selectedID === 2}/>
          <ColorButton onClick={this.handleButtonClick}
                       color={"pink"} id={3}
                       selected={this.state.selectedID === 3}/>
        </div>
    );
  }
}

ColorPanel.propTypes = {
  onNewEvent: PropTypes.func.isRequired
};

export default ColorPanel;
