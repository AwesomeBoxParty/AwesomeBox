import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import urls from '../constants/urls';

import GifBoard from './GifBoard';
import SearchSidebar from './SearchSidebar';

import './App.scss';

@DragDropContext(HTML5Backend)
export class App extends Component {

  render() {
    const logoUrl = require('../../static/images/logo.svg');

    return (
      <div className="App">
        <header className="masthead">
          <h1>
            <a className="logo" href="/">
              <div>AwesomeBox.party</div>
            </a>
          </h1>
        </header>
        <div className="content-container">

          <main className="main">
            // player
            // playlist sorted by votes
              // votable list items
          </main>

          <aside className="sidebar">
            <SearchSidebar />
          </aside>

        </div>
        <footer className="footer">
          {<a href={urls.expediteHomepage} target="_blank">About Expedite</a>}
          {' | '}
          {<a href={urls.expediteCareers} target="_blank">Work at Expedite</a>}
          {' | '}
          {<a href={urls.expediteChallenge} target="_blank">The Expedite challenge</a>}
        </footer>
      </div>
    );
  }
}
