import React, { Component } from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, Progress, Icons } from 'react-soundplayer/components';


// import Playlist from './Playlist';
import AwesomePlayer from './AwesomePlayer';
import SearchSidebar from './SearchSidebar';

import clientId from '../constants/secrets.js';
const streamUrl = 'https://api.soundcloud.com/tracks/219980056/stream';

import './App.scss';

export class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="masthead">
          <h1>
            <a className="logo" href="/">
              <div>AwesomeBox.party</div>
            </a>
          </h1>
        </header>
        <div className="content-container">

          <main className="main">
            <SoundPlayerContainer
              streamUrl={streamUrl}
              clientId={clientId}
            >
              <PlayButton
              />

            </SoundPlayerContainer>
          </main>

          <aside className="sidebar">
            <SearchSidebar />
          </aside>

        </div>
      </div>
    );
  }
}
