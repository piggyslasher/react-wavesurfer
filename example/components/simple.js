import React from "react";
import Wavesurfer from "../../src/react-wavesurfer";
import Minimap from "../../src/plugins/minimap";
import Timeline from "../../src/plugins/timeline";
import Transcript from "./transcript";
import mocks from "./dialogue.mocks.json";

/**
 * Simple example of a React component with a Wavesurfer
 */
class SimpleExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // audioFile: '/audio?eventID=fc906340-e6e9-cd39-bf32-991d122014f7',
      // audioFile: '../../resources/demo.mp3',
      audioFile: null,
      playing: false,
      pos: 0,
      volume: 0.5,
      audioRate: 1,
      zoom: 0,
    };
    this.handleZoom = this.handleZoom.bind(this);
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.handleReady = this.handleReady.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleAudioRateChange = this.handleAudioRateChange.bind(this);
    this.updatePos = this.updatePos.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleAudioRateChange(e) {
    this.setState({
      audioRate: +e.target.value
    });
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs ? e.originalArgs[0] : +e.target.value
    });
  }

  updatePos(pos) {
    this.setState({ pos });
  }

  handleReady(wf) {
    this.setState({
      pos: 0,
      duration: wf.wavesurfer.getDuration()
    });
  }

  handleVolumeChange(e) {
    this.setState({
      volume: +e.target.value
    });
  }

  handleZoom(e) {
    this.setState({
      zoom: Number(e.target.value)
    });
  }

  renderWavesurfer() {
    const minimapOptions = {
      height: 50,
      waveColor: "#ddd",
      progressColor: "#999",
      cursorColor: "#999"
    };
    const waveOptions = {
      scrollParent: true,
      height: 140,
      progressColor: "#6c718c",
      waveColor: "#c4c8dc",
      normalize: true,
      barWidth: 4,
      audioRate: this.state.audioRate
    };
    const timelineOptions = {
      timeInterval: 0.5,
      height: 30,
      primaryFontColor: "#00f",
      primaryColor: "#00f"
    };

    return (
      <div className="example col-xs-12">
        <div className="row">
          <div className="col-xs-1">
            <button
              onClick={this.handleTogglePlay}
              className="btn btn-primary btn-block btn-circle"
            >
              {this.state.playing ? "❚❚" : "►"}
            </button>
          </div>
          <div className="col-xs-9">
            <strong>Recording-Kane-Abel</strong>
            <p>Lorem Epsum Lorem Epsum</p>
          </div>
          <div className="col-xs-2">&nbsp;</div>
        </div>
        <div className="row">
          <div className="form-group col-xs-4">
            <label htmlFor="simple-volume">Volume:</label>
            <input
              name="simple-volume"
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={this.state.volume}
              onChange={this.handleVolumeChange}
              className="form-control"
            />
            {/* <input
              className="form-control prop-value"
              type="text"
              placeholder={String(this.state.volume)}
              readOnly
            /> */}
          </div>

          <div className="form-group col-xs-4">
            <label htmlFor="zoom-value">Zoom:</label>
            <input
              name="zoom-value"
              type="range"
              value={this.state.zoom}
              onChange={this.handleZoom}
              className="form-control"
            />
            {/* <input
              className="form-control prop-value"
              type="number"
              placeholder={String(this.state.zoom)}
              readOnly
            /> */}
          </div>
          {/* <div className="form-group col-xs-4">
            <label htmlFor="simple-pos">Position:</label>
            <input
              name="simple-pos"
              type="number"
              step="0.01"
              value={this.state.pos}
              onChange={this.handlePosChange}
              className="form-control"
            />
            <p>Should set to 5 seconds on load.</p>
          </div> */}
          <div className="form-group col-xs-4">
            <label htmlFor="simple-audiorate">Audio rate:</label>
            <input
              name="simple-audiorate"
              type="range"
              min="0"
              max="10"
              step="0.001"
              value={this.state.audioRate}
              onChange={this.handleAudioRateChange}
              className="form-control"
            />
          </div>
        </div>
        <Wavesurfer
          volume={this.state.volume}
          pos={this.state.pos}
          duration={this.state.duration}
          options={waveOptions}
          onPosChange={this.handlePosChange}
          audioFile={this.state.audioFile}
          playing={this.state.playing}
          onReady={this.handleReady}
          zoom={this.state.zoom}
        >
          <Timeline />
          <Minimap options={minimapOptions} />
          <Transcript
            pos={this.state.pos}
            transcript={mocks}
            duration={this.state.duration}
            handleSubtitleClick={this.updatePos}
            show={location.search.substring(1).split('=')[0] === 'transcripts'}
          />
        </Wavesurfer>
      </div>
    );
  }

  onSubmit(evt) {
    const val = this.inputEl.value;
    evt.preventDefault();
    this.setState({ audioFile: val });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-inline" onSubmit={this.onSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="staticEmail2" className="sr-only">Email</label>
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword2" className="sr-only">Password</label>
                <input
                  type="text"
                  name="eventID"
                  placeholder="Please enter an eventID"
                  className="form-control"
                  aria-describedby="basic-addon2"
                  ref={(el) => this.inputEl = el}
                />
              </div>
              <button className="btn btn-primary mb-2">Get audio</button>
            </form>
          </div>
        </div>

        { this.state.audioFile && this.renderWavesurfer() }
      </div>
    );
  }
}

module.exports = SimpleExample;
