// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Canvas.css'

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawColor: props.drawColor,
      drawings: [],
      drawModeActive: false,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState(state => state.drawColor = props.drawColor);
  }

  onMouseDown(event) {
    event.persist();
    event.preventDefault();
    if (event.button === 0) {
      this.setState(state => {
        state.drawings.push({
          pos: {
            start: {x: event.clientX, y: event.clientY},
            end: {x: event.clientX, y: event.clientY}
          },
          color: state.drawColor
        });
        state.drawModeActive = true;
        return state;
      });
      document.addEventListener("mousemove", this.onMouseMove, true);
    }
  }

  onMouseUp(event) {
    event.preventDefault();
    this.setState(state => state.drawModeActive = false);
    document.removeEventListener("mousemove", this.onMouseMove, true);
  }

  onMouseMove(event) {
    this.setState(state => {
      state.drawings[state.drawings.length - 1].pos.end = {
        x: event.clientX, y: event.clientY
      };
      return state;
    });
  }

  render() {
    return (
        <div className="canvas-root"
             onMouseDown={this.onMouseDown}
             onMouseUp={this.onMouseUp}>{
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
