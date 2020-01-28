const path = require('path');
const webpack  = require('webpack');
module.exports = {
  mode: "production",
	entry: {
		index: "./src/index",	
		search: "./src/search"
	},
	output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./dist"
  },
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()],
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
