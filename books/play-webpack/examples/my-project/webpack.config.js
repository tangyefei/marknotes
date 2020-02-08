const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

function setMPA() {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, 'src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/\/src\/(.*)\/index.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;

    htmlWebpackPlugins.push(new HtmlWebpackPlugin({ 
      template: path.join(__dirname, `src/${pageName}/index.html`), 
      filename: `${pageName}.html`, 
      chunks: [pageName], 
      inject: true, 
      minify: { 
        html5: true, 
        collapseWhitespace: true, 
        preserveLineBreaks: false, 
        minifyCSS: true, 
        minifyJS: true, 
        removeComments: false        
      }
    }));
    console.log(pageName);
  })
  return {entry, htmlWebpackPlugins}
}

const {entry, htmlWebpackPlugins} =setMPA();

module.exports = {
  mode: "none",
	entry,
	output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./dist"
  },
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ].concat(htmlWebpackPlugins),
  module: {
    rules: [{
      test: /\.js$/, use: 'babel-loader'
    },
    {
      test: /\.css$/, use: ['style-loader','css-loader']
    }, 
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024000
        }
      }]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }]
    }
  ]
  }
}	
