import React, {Component} from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';

export default class CurrentSong extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="current-song">
        <div className="song-title">Now Playing: {this.props.track ? this.props.track.title : null}</div>
      </div>
    )
  }
}