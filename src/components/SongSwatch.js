import React, { Component } from 'react';

export default class SongSwatch extends Component {


  render() {
    const { title, duration, genre, artworkUrl } = this.props;

    const styles = {
      boxSizing: 'border-box',
      padding: '6px 12px 6px 12px',
      width: '100%',
      background: '#333',
      color: '#ddd'
    };

    return (
      <div style={styles}>
        {title}
        <img
          src={artworkUrl}
        />
      </div>
    );
  }
}
