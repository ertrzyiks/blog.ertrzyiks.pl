require('dotenv').load()

const webpack = require('webpack')
const path = require('path')
const ExtractCssBlockPlugin = require('extract-css-block-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    output: path.resolve(__dirname, './content/themes/nono/assets/index.js'),
    raven: path.resolve(__dirname, './content/themes/nono/assets/raven.js')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({ use:[
          'css-loader?minimize=true',
          'postcss-loader',
          'sass-loader'
        ], fallback: 'style-loader' })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
            publicPath: process.env.NODE_ENV == 'production' ? '/assets/css/' : ''
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'compiled.css'
    }),
    new ExtractCssBlockPlugin(),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        SENTRY_PUBLIC_DSN: JSON.stringify(process.env.SENTRY_PUBLIC_DSN),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
}
