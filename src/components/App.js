import React, { Component } from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, Progress, Timer, Icons, Cover } from 'react-soundplayer/components';


// import Playlist from './Playlist';
import SearchSidebar from './SearchSidebar';
import Playlist from './Playlist';
import Player from './Player';

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

    this.state.track = {"download_url":null,"key_signature":"","user_favorite":false,"likes_count":1,"release":"","attachments_uri":"https://api.soundcloud.com/tracks/219980056/attachments","waveform_url":"https://w1.sndcdn.com/81CI4v0kDano_m.png","purchase_url":null,"video_url":null,"streamable":true,"artwork_url":"https://i1.sndcdn.com/artworks-000126874557-nlvp8i-large.jpg","comment_count":0,"commentable":true,"description":"Recorded on the streets of Berlin on the 15th of August, 2015.","download_count":0,"downloadable":false,"embeddable_by":"all","favoritings_count":1,"genre":"busking","isrc":null,"label_id":null,"label_name":null,"license":"cc-by-sa","original_content_size":35280058,"original_format":"aiff","playback_count":61,"purchase_title":null,"release_day":null,"release_month":null,"release_year":null,"reposts_count":0,"state":"finished","tag_list":"Berlin fonografie phonography \"field recording\" live","track_type":null,"user":{"avatar_url":"https://i1.sndcdn.com/avatars-000002738654-s7istq-large.jpg","id":2928,"kind":"user","permalink_url":"http://soundcloud.com/raaphorst","uri":"https://api.soundcloud.com/users/2928","username":"Raaphorst","permalink":"raaphorst","last_modified":"2015/10/02 08:49:46 +0000"},"bpm":null,"user_playback_count":null,"id":219980056,"kind":"track","created_at":"2015/08/19 18:46:48 +0000","last_modified":"2015/08/19 18:46:49 +0000","permalink":"berlin-buskers","permalink_url":"https://soundcloud.com/raaphorst/berlin-buskers","title":"Berlin Buskers","duration":200090,"sharing":"public","stream_url":"https://api.soundcloud.com/tracks/219980056/stream","uri":"https://api.soundcloud.com/tracks/219980056","user_id":2928,"policy":"ALLOW","monetization_model":"NOT_APPLICABLE"}

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
            <Player song={this.state.track}/>
          </main>

          <aside className="sidebar">
            <SearchSidebar />
          </aside>

        </div>
      </div>
    );
  }
}
