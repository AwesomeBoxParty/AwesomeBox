import React, {Component} from 'react';
import PlaylistItem from './PlaylistItem';

export default class Playlist extends Component {

  constructor(props) {
    super(props);
  }

  renderTrack(track) {
    return (
      <PlaylistItem
        key={track.id}
        track={track}
      />
    )
  }

  render() {
    const tracks = this.props.playlist.map(::this.renderTrack);

    return (
      <ul className="playlist">
        {tracks}
      </ul>
    )
  }
}
