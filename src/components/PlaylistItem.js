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
    var image;
    if (track.artwork_url) {
      image = <img src={track.artwork_url} />
    } else {
      image = <div />;
    }

    return (
      <li>
        <div className='track'>
          {image}
          <div className='voteButtons'>
            <a
              href='#'
              onClick={::this.handleClick}
              className={`liked-${this.state.liked}`}
            >
                ❤
            </a>
          </div>
          <div className='info'>
            <p><a href={track.permalink_url}>{track.title}</a></p>
          </div>
        </div>
      </li>
    );
  }
}
