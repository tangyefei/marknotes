const path = require('path');
const webpack  = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
  mode: "production",
	entry,
	output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano')
    }),
    ...htmlWebpackPlugins,

    // new HtmlWebpackPlugin({ 
    //   template: path.join(__dirname, 'src/search.html'), 
    //   filename: 'search.html', 
    //   chunks: ['search'], 
    //   inject: true, 
    //   minify: { 
    //     html5: true, 
    //     collapseWhitespace: true, 
    //     preserveLineBreaks: false, 
    //     minifyCSS: true, 
    //     minifyJS: true, 
    //     removeComments: false        
    //   }
    // }),
    // new HtmlWebpackPlugin({ 
    //   template: path.join(__dirname, 'src/index.html'), 
    //   filename: 'index.html', 
    //   chunks: ['index'], 
    //   inject: true, 
    //   minify: { 
    //     html5: true, 
    //     collapseWhitespace: true, 
    //     preserveLineBreaks: false, 
    //     minifyCSS: true, 
    //     minifyJS: true, 
    //     removeComments: false 
    //   } 
    // }),
	  new CleanWebpackPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/, use: 'babel-loader'
    },
    {
      test: /\.css$/, use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        {
          loader: 'px2rem-loader',
          options: 
          {
            remUnit: 16,
            remPrecision: 8
          }
        }
      ]
    }, 
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash:8].[ext]'
        }
      }]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash:8].[ext]'
        }
      }]
    }
  ]
  }
}	
