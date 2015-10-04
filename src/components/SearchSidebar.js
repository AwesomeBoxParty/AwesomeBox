import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'throttle-debounce';
import api from '../utils/apiUtils.js';

import SongSwatch from './SongSwatch';

export default class SearchSidebar extends Component {

  constructor(props) {
    super(props);
    // debouncing prevents searches while user is typing fast
    this.searchSoundcloud = debounce(200, this.searchSoundcloud);
    this.state = {
      searchString: '',
      searchResults: [],
    };
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.searchInput).focus()
  }

  searchSoundcloud(searchString) {

    if (searchString === '') {
      return this.setState({
        searchResults: []
      });
    }

    api.searchSoundcloud(searchString, (tracks) => {
      this.setState({
        searchResults: tracks
      });
    });
  }

  updateSearchString() {
    this.setState({
      searchString: ReactDOM.findDOMNode(this.refs.searchInput).value
    }, () => {
      this.searchSoundcloud(this.state.searchString);
    });
  }

  clearSearchString() {
    ReactDOM.findDOMNode(this.refs.searchInput).value = '';
    this.updateSearchString();
  }

  renderSwatch(track, index) {

    if (!track.streamable) {
      return null;
    }

    const props = {
      title: track.title,
      artworkUrl: track.artwork_url,
      duration: track.duration,
      genre: track.genre,
      track: track,
      key: index,
      addToPlaylist: this.props.addToPlaylist,
      clearSearchString: ::this.clearSearchString,
    };
    return (

      <SongSwatch {...props} />
    );
  }

  render() {
    const resultSwatches = this.state.searchResults.map(::this.renderSwatch);
    return (
      <div className="SearchSidebar">
        <input
          className="search-input"
          ref="searchInput"
          name="search"
          placeholder="Search Soundcloud"
          autofocus={true}
          onChange={::this.updateSearchString}
        />
        <div className="search-results-container">
          { resultSwatches }
        </div>
      </div>
    );
  }

}
