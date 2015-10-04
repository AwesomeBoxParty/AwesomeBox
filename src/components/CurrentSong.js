import React, {Component} from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';

export default class CurrentSong extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="current-song">
        Now Playing:
        <div className="song-title">Hard-Coded Song Title, feat. Aaliyah</div>
      </div>
    )
  }
}