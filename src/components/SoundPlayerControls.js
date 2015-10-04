import React, {Component} from 'react';
import { PlayButton, Progress, Timer, Icons, Cover } from 'react-soundplayer/components';


export default class SoundPlayerControls extends Component {

  constructor(props) {
    super(props);
  }

  getProgressValue(attrs) {
    return 100 * (this.props.currentTime / this.props.duration);
  }


  render() {
    console.log('rendering controls');
    return (
      <div>
        <PlayButton
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
    )
  }
}
