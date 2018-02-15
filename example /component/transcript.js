import React, { Component } from 'react';

export default class Transcipt extends Component {
  constructor(props) {
    super(props);

    this.getColor = this.getColor.bind(this);
  }

  getColor(pos, startTime, duration) {
    if (pos >= startTime && pos <= startTime + duration) {
      return 'red';
    } else if (pos >= startTime) {
      return 'inherit';
    }
    return '#bbb';
  }

  onClickSubtitle(startTime) {
    this.props.handleSubtitleClick(startTime);
  }

  render() {
    const allContent = [];

    const pip = ({ startTime, content, duration, actor }) => {
      const styles = {
        left: `${startTime / this.props.duration * 100}%`,
        color: this.getColor(this.props.pos, startTime, duration)
      };

      allContent.push({ actor, content, startTime, duration });

      return (
        <pip key={startTime} style={styles}>
          ☻
        </pip>
      );
    };

    return (
      <div>
        <div className="transcript-baseline">
          {this.props.transcript.captions.map(caption => pip(caption))}
        </div>
        <div className="transcript-subtitles">
          {allContent.map(caption =>
            <div
              key={caption.startTime}
              style={{
                color: this.getColor(
                  this.props.pos,
                  caption.startTime,
                  caption.duration
                )
              }}
            >
              <strong>
                <a
                  href="#"
                  onClick={() => this.onClickSubtitle(caption.startTime)}
                >
                  {caption.actor}:{' '}
                </a>
              </strong>
              {caption.content}
            </div>
          )}
        </div>
      </div>
    );
  }
}
