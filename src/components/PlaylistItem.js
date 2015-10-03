import React, {Component} from 'react';

export default class PlaylistItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const track = this.props.track;

    return (
      <li>
        Title: {track.title}
        Duration: {track.duration}
        Stream_url: {track.stream_url}
      </li>
    );
  }
}
