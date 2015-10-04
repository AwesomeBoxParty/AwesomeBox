import React, {Component} from 'react';
import PlaylistItem from './PlaylistItem';

export default class Playlist extends Component {

  constructor(props) {
    super(props);
  }

  renderTrack(track) {
    return <PlaylistItem track={track} key={track.id} />
  }

  render() {
    const tracks = this.props.playlist.map(::this.renderTrack);

    return (
      <div>
        <h3>Playlist</h3>
        <ul>
          {tracks}
        </ul>
      </div>
    )
  }
}
