// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Canvas.css';
// import MongoManager from '../../scripts/MongoManager';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawColor: props.drawColor,
      drawings: [],
      drawModeActive: false,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState(state => state.drawColor = props.drawColor);
  }

  onMouseDown(event) {
    event.persist();
    event.preventDefault();
    if (event.button === 0) {
      this.addNewLine(event.clientX, event.clientY);
      document.addEventListener("mousemove", this.onMouseMove, true);
    }
  }

  onTouchStart(event) {
    event.persist();
    event.preventDefault();
    let primaryTouch = event.touches[0];
    this.addNewLine(primaryTouch.clientX, primaryTouch.clientY);
    document.addEventListener("touchmove", this.onTouchMove, true);
  }

  addNewLine(x: number, y: number) {
    this.setState(state => {
      state.drawings.push({
        pos: {
          start: {x: x, y: y},
          end: {x: x, y: y}
        },
        color: state.drawColor
      });
      state.drawModeActive = true;
      return state;
    });
  }

  onMouseUp(event) {
    event.preventDefault();
    this.setState(state => state.drawModeActive = false);
    document.removeEventListener("mousemove", this.onMouseMove, true);
  }

  onTouchEnd(event) {
    event.preventDefault();
    this.setState(state => state.drawModeActive = false);
    document.removeEventListener("touchmove", this.ontouchMove, true);
  }

  onMouseMove(event) {
    this.updateLastLine(event.clientX, event.clientY);
  }

  onTouchMove(event) {
    let primaryTouch = event.touches[0];
    this.updateLastLine(primaryTouch.clientX, primaryTouch.clientY);
  }

  updateLastLine(x: number, y: number) {
    this.setState(state => {
      state.drawings[state.drawings.length - 1].pos.end = {
        x: x, y: y
      };
      return state;
    });
  }

  clear() { this.setState(state => state.drawings = []); }

  undoDrawing() {
    if (this.state.drawings.length > 0)
      this.setState(state => state.drawings.pop());
  }

  saveDrawings() {
    alert("Not yet implemented.");
    // MongoManager.addEntry(this.state.drawings);
  }

  render() {
    return (
        <div className="canvas-root"
             onMouseDown={this.onMouseDown}
             onTouchStart={this.onTouchStart}
             onMouseUp={this.onMouseUp}
             onTouchEnd={this.onTouchEnd}>{
          this.state.drawings.map((drawing, index) => {

            let x1 = drawing.pos.start.x;
            let y1 = drawing.pos.start.y;
            let x2 = drawing.pos.end.x;
            let y2 = drawing.pos.end.y;

            let width = x2 - x1;
            let height = y2 - y1;

            let length = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
            let theta = Math.atan2(height, width);

            return <div key={index}
                        className="drawn-line"
                        style={{
                          left: x1, top: y1,
                          width: length,
                          backgroundColor: drawing.color,
                          transformOrigin: 'left top',
                          transform: 'rotate(' + theta + 'rad)'
                        }}/>;
          })}</div>
    );
  }
}

Canvas.propTypes = {
  drawColor: PropTypes.string.isRequired
};

export default Canvas;
