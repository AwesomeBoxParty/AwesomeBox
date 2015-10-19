import React, {Component} from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import AppActions from '../actions/app-actions';

import clientId from '../constants/secrets.js';

import SoundPlayerControls from './SoundPlayerControls';

export default class Player extends Component {

  constructor(props) {
    super(props);
  }

  handleStart() {
    AppActions.togglePlaying(true);
  }

  handlePause() {
    AppActions.togglePlaying(false);
  }

  render() {
    return (
      <div className="player">
        <SoundPlayerContainer
          streamUrl={this.props.track ? this.props.track.stream_url : null}
          clientId={clientId}
          onStartTrack={this.handleStart}
          onPauseTrack={this.handlePause}
          onStopTrack={this.props.handleSongEnd}
        >
          <SoundPlayerControls/>
        </SoundPlayerContainer>
      </div>
    )
  }
}
