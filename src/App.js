import React, {Component} from 'react';
import ColorPanel from './components/panels/ColorPanel.js';
import Canvas from './components/canvas/Canvas.js';
import Header from './components/header/Header.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawColor: "lightblue"
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(event) {
    if (event.hasOwnProperty("sender")) {
      switch (event.sender) {
        case "ColorButton":
          this.setState(state => state.drawColor = event.state.color);
          break;
        case "Header":
          switch (event.state.request) {
            case "clear-drawings": this.canvas.clear(); break;
            case "undo-drawing": this.canvas.undoDrawing(); break;
            case "save-drawings":
              this.canvas.saveDrawings(event.state.callback);
              break;
            default: alert("unknown request");
          }
          break;
        default: alert("unknown request");
      }
    }
  }

  render() {
    return (
        <div className="app-root">
          <Header onButtonClick={this.handleEvent}/>
          <div className="left-panel">
            <ColorPanel onNewEvent={this.handleEvent}/>
          </div>
          <div className="canvas">
            <Canvas drawColor={this.state.drawColor}
                    ref={ref => { this.canvas = ref; }}/>
          </div>
        </div>
    );
  }
}

export default App;
