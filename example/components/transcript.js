import React, { Component } from 'react'
import './style.css'

export default class Transcipt extends Component {
  render() {
    if (!this.props.show) return null;

    const pip = startTime => {
      const styles = {
        left: `${startTime / this.props.duration * 100}%`
      };

      return (
        <pip key={startTime} style={styles}>
          ☻
        </pip>
      );
    };

    const row = ({ startTime, content, duration, actor }) => {
      const highlight =
        this.props.pos > startTime && this.props.pos < startTime + duration
          ? "highlight"
          : "";

      const secondsToTime = seconds =>
        new Date(null,null,null,null,null,seconds).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

      return (
        <div
          key={startTime}
          className={highlight}
          onClick={() => this.props.handleSubtitleClick(startTime)}
        >
          <p className="content">
            {pip(startTime)}
            <span className='btn-link'>
              {secondsToTime(startTime)}
            </span>
            <strong>
              &nbsp;&nbsp;{actor}
            </strong>
            {" "}{content}{" "}
          </p>
        </div>
      );
    };

    return (
      <div className="transcript-baseline">
        {this.props.transcript.captions.map(caption => row(caption))}
        <br/>
      </div>
    );
  }
}
