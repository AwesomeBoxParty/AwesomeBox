import React, {Component} from 'react';
import { PlayButton, Progress, Timer, Icons, Cover } from 'react-soundplayer/components';


export default class SoundPlayerControls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songEnded: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.playing) {
      prevProps.soundCloudAudio.play();
    }
  }

  getProgressValue(attrs) {
    return 100 * (this.props.currentTime / this.props.duration);
  }

  handleSongEnd() {
    if (!this.state.songEnded) {
      this.setState({
        songEnded: true
      }, socketUtils.nextSong);
    }
  }

  render() {
    return (
      <div>
        <PlayButton
          className="play-button"
          soundCloudAudio={this.props.soundCloudAudio}
          playing={this.props.playing}
          seeking={this.props.seeking} />
        <Progress
          className="progress-bar"
          innerClassName="progress-bar-inner"
          soundCloudAudio={this.props.soundCloudAudio}
          value={this.getProgressValue()} />
        <Timer
          className="play-timer"
          duration={this.props.duration}
          currentTime={this.props.currentTime}/>
      </div>
    );
  }
}
