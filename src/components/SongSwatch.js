import React, { Component } from 'react';

export default class SongSwatch extends Component {

  constructor(props) {
    super(props);
  }


  handleClick(track) {
    this.props.addToPlaylist(track);
  }

  render() {
    const { title, duration, genre, artworkUrl, track } = this.props;

    const styles = {
      boxSizing: 'border-box',
      padding: '6px 12px 6px 12px',
      width: '100%',
      background: '#333',
      color: '#ddd'
    };

    return (
      <div
        style={styles}
        onClick={this.handleClick.bind(this, track)}
      >

        <img
          src={artworkUrl}
        />
      </div>
    );
  }
}
