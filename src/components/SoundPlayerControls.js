import React, {Component} from 'react';
import { PlayButton, Progress, Timer, Icons, Cover } from 'react-soundplayer/components';
import AppStore from '../stores/app-store';


var context;

var getData = function(){
  return {
    playing: AppStore.getPlaying()
  };
};


export default class SoundPlayerControls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songEnded: false,
      playing: false
    };
  }

  _onChange() {
    // update state from stores
    this.setState(getData());
  }

  componentDidMount() {
    context = this;
    AppStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(context));
  }

  //This block enables auto-play
  componentDidUpdate(prevProps, prevState) {
    if ((this.state.playing) && (this.state.playing !== prevState.playing)) {
      prevProps.soundCloudAudio.play();
    }
  }

  getProgressValue(attrs) {
    return 100 * (this.props.currentTime / this.props.duration);
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
