const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const PORT = process.env.PORT || 3020;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`✅  Listening at http://localhost:${PORT}`);
});
