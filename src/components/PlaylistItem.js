import React, {Component} from 'react';

export default class PlaylistItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const track = this.props.track;
    return (
      <li>
        title: {track.title}
        duration: {track.duration}
        stream_url: {track.stream_url}
      </li>
    );
  }
}
