import React, { Component } from 'react';

export default class AwesomePlayer extends Component {

  // constructor(props) {
  //   super(props);
  // }

  play() {
    let { soundCloudAudio, playing } = this.props;
    if (playing) {
      soundCloudAudio.pause();
    } else {
      soundCloudAudio.play();
    }
  }

  render() {
    let { track, playing } = this.props;

    if (!track) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{track.title}</h2>
        <h3>{track.user.username}</h3>
        <button onClick={this.play.bind(this)}>
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    );
  }
}
