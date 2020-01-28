const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require("./webpack.config.js");
const compiler = webpack(config);
const express = require('express');
const app = express();

app.use(
  middleware(compiler, {
    output: config.output.publicPath
  })
);

app.listen(3000, () => console.log('Example app listening on port 3000!'));