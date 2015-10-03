import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'throttle-debounce';
const giphy = require('giphy-api-without-credentials')();

// import SongSwatch from './SongSwatch';

export default class SearchSidebar extends Component {

  constructor() {
    super();
    // debouncing prevents searches while user is typing fast
    this.searchGiphy = debounce(200, this.searchGiphy);
    this.state = {
      searchString: '',
      searchResults: [],
    };
  }

  searchGiphy(searchString) {

    if (searchString === '') {
      return this.setState({
        searchResults: []
      });
    }

    giphy.search(searchString, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({
          searchResults: response.data
        });
      }
    });
  }

  updateSearchString() {
    this.setState({
      searchString: ReactDOM.findDOMNode(this.refs.searchInput).value
    }, () => {
      this.searchGiphy(this.state.searchString);
    });
  }

  renderSwatch(r) {
    const props = {
      key: r.id,
      id: r.id,
      thumbnailUrl: r.images.fixed_height_small_still.url,
      previewGifUrl: r.images.fixed_height_small.url,
      originalGifUrl: r.images.original.url,
    };
    return (<SongSwatch {...props} />);
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
          onChange={::this.updateSearchString}
        />
        <div className="search-results-container">
          { resultSwatches }
        </div>
      </div>
    );
  }

}
