import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, Progress, Timer, Icons, Cover } from 'react-soundplayer/components';
import Sidebar from 'react-sidebar';
import socketUtils from '../utils/socketUtils';
import AppStore from '../stores/app-store';

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
  console.log('Getting role from appStore: ', role);
  return {
    role: role
  };
};

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      currentTrack: null,
      sidebarOpen: false,
      role: 'thrower'
    };
  }

  _onChange() {
    // update state from stores
    console.log('_onChange being called in App');
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
    if (!this.state.currentTrack) {
      this.setState({
        currentTrack: track,
        sidebarOpen: false,
      });
    } else {
      this.setState({
        playlist: this.state.playlist.concat(track),
        sidebarOpen: false,
      });
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
      />
    );

    if (this.state.role === 'goer') {
      player = (
        <CurrentSong
          track={this.state.playlist.length ? this.state.playlist[0] : null}
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
