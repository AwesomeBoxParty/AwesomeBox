import React, { Component } from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, Progress, Timer, Icons, Cover } from 'react-soundplayer/components';


// import Playlist from './Playlist';
import SearchSidebar from './SearchSidebar';
import Playlist from './Playlist';

import clientId from '../constants/secrets.js';
const streamUrl = 'https://api.soundcloud.com/tracks/219980056/stream';

import './App.scss';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlist: [
        {
          id: 1,
          title: "Thriller",
          duration: 5000,
          stream_url: "thriller.mp3"
        },
        {
          id: 2,
          title: "Beat It",
          duration: 6000,
          stream_url: "beat_it.mp3"
        },
        {
          id: 3,
          title: "Billy Jean",
          duration: 7000,
          stream_url: "billy_jean.mp3"
        },
      ]
    };
  }

  render() {

  getProgressValue(audioObj) {
    console.log("Audio object: ", audioObj);
    return 50;
  }


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
            <Playlist playlist={this.state.playlist} />
            <SoundPlayerContainer
              streamUrl={streamUrl}
              clientId={clientId}
            >
              <PlayButton />
              <Progress
                className="progress-bar"
                innerClassName="progress-bar-inner"
                value={ this.getProgressValue(this.props) }
                soundCloudAudio={this.props.soundCloudAudio}/>
              <Timer />

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
