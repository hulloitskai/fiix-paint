import React, {Component} from 'react';
import ColorPanel from './components/panels/ColorPanel.js'
import Canvas from './components/canvas/Canvas.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawColor: "lightblue"
    };

    this.handlePanelEvent = this.handlePanelEvent.bind(this);
  }

  handlePanelEvent(event: Object) {
    if (event.hasOwnProperty("sender") && event.sender === "ColorButton") {
      this.setState(state => state.drawColor = event.state.color);
    }
  }

  render() {
    return (
        <div className="app-root">
          <header className="app-header">
            <h1>Fiix Paint</h1>
          </header>
          <div className="left-panel">
            <ColorPanel onNewEvent={this.handlePanelEvent}/>
          </div>
          <div className="canvas">
            <Canvas drawColor={this.state.drawColor} />
          </div>
        </div>
    );
  }
}

export default App;
