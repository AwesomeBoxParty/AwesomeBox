import React, {Component} from 'react';
import AppActions from '../actions/app-actions';

export default class PlaylistItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  handleClick(event) {
    var track_id = this.props.track.id;
    
    // if state.liked is false & it's clicked, send an upvote
    this.state.liked ? AppActions.downVote(track_id) : AppActions.upVote(track_id);
    
    this.setState({
      liked: !this.state.liked
    });
  }

  render() {
    const track = this.props.track;
    var image;
    if (track.artwork_url) {
      image = <img src={track.artwork_url} />
    } else {
      image = <div />;
    }

    var voteCount = this.props.track.votes ? this.props.track.voteSum : 0;

    return (
      <li>
        <div className='track'>
          {image}
          <div className='voteButtons'>
            <span className='voteCount'>{voteCount}</span>
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
