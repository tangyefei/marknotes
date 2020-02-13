const path = require('path');
const webpack  = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
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
      chunks: ['commons', pageName], 
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
  entry: entry,
  output: {
    path:path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js"
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        common: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
    //       global: 'ReactDOM',
    //     }
    //   ]
    // })
  ].concat(htmlWebpackPlugins),
  module: {
    rules: [{
      // , 'eslint-loader'
      test: /\.js$/, use: ['babel-loader']
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
