import React, {Component} from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';

import clientId from '../constants/secrets.js';

import SoundPlayerControls from './SoundPlayerControls';

export default class Player extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="player">
        <SoundPlayerContainer
          streamUrl={this.props.track ? this.props.track.stream_url : null}
          clientId={clientId}
        >
          <SoundPlayerControls />
        </SoundPlayerContainer>
      </div>
    )
  }
}
