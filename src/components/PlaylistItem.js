import React, {Component} from 'react';
import socketUtils from '../utils/socketUtils.js';

export default class PlaylistItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  handleClick(event) {
    var track_id = this.props.track.id;
    console.log('LIKED before:', this.state.liked);
    this.setState({
      liked: !this.state.liked
    });
    console.log('LIKED after:', this.state.liked);
    this.state.liked ? socketUtils.addVote(track_id, -1) : socketUtils.addVote(track_id, 1);
  }

  render() {
    const track = this.props.track;

    return (
      <li>
        <div className='track'>
          <img src={track.artwork_url} />
          <div className='voteButtons'>
            <a href='#' onClick={::this.handleClick}>❤</a>
          </div>
          <div className='info'>
            <p>Title: <a href={track.permalink_url}>{track.title}</a></p>
            <p>Artist: <a href={track.user.permalink_url}>{track.user.username}</a></p>
          </div>
        </div>
      </li>
    );
  }
}
