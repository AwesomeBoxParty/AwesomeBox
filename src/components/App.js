import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PlayButton, Progress, Timer, Icons, Cover } from 'react-soundplayer/components';
import Sidebar from 'react-sidebar';
import socketUtils from '../utils/socketUtils';
import AppStore from '../stores/app-store';
import AppActions from '../actions/app-actions';

import SearchSidebar from './SearchSidebar';
import Playlist from './Playlist';
import Player from './Player';
import CurrentSong from './CurrentSong';

var clientId = require('../constants/secrets.js');
clientId = process.env.CLIENT_ID || clientId;

import './App.scss';

var context;

var getData = function(){
  var role;

  if (AppStore.getUserRole()){
    role = 'thrower';
  } else {
    role = 'goer';
  }

  return {
    role: role,
    playlist: AppStore.getPlaylist(),
    currentTrack: AppStore.getCurrentTrack()
  };
};

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      role: 'goer',
      playlist: [],
      currentTrack: null,
      sidebarOpen: false
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

  addToPlaylist(track) {
    socketUtils.addSong(track);
    AppActions.addSong(track);
    this.setState({
      sidebarOpen: false
    });
  }

  // we pass this method into SoundPlayerContainer as onStopTrack
  // it gets called when the song ends or when the song pauses
  // so we need to check & only progress to next song when the song has ended
  handleSongEnd(soundCloudAudio) {
    if (soundCloudAudio.audio.currentTime === soundCloudAudio.audio.duration) {
      AppActions.goToNextSong();
    }
  }

  toggleSidebar() {
    const sidebarOpen = !this.state.sidebarOpen;
    this.setState({ sidebarOpen });
  }

  render() {

    let player = (
      <Player
        track={this.state.currentTrack}
        handleSongEnd={this.handleSongEnd.bind(this)}
      />
    );

    if (this.state.role === 'goer') {
      player = (
        <CurrentSong
          track={this.state.currentTrack}
        />
      );
    }

    const searchSidebar = (
      <SearchSidebar
        addToPlaylist={::this.addToPlaylist}
        toggleSidebar={::this.toggleSidebar}
      />
    );
    return (
      <Sidebar
        open={this.state.sidebarOpen}
        sidebar={searchSidebar}
        onSetOpen={::this.toggleSidebar}
        touchHandleWidth={60}
      >
        <div className="App">
          <header className="masthead">
            <h1>awesomebox.party</h1>
            <button onClick={::this.toggleSidebar}>add song</button>
          </header>

          <main className="main">
            {player}
            <Playlist playlist={this.state.playlist} />
          </main>

        </div>
      </Sidebar>
    );
  }
}
