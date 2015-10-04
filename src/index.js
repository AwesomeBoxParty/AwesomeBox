import 'babel-core/polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './components/App';
import apiUtils from './utils/apiUtils.js';
import socketUtils from './utils/socketUtils.js';

// Because we're using webpack, importing css/scss from js will include them in the build
// In development, the css is added to the page dynamically.
// In prod, it is extracted into a separate css file for better loading performance.
import './index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

socketUtils.init();