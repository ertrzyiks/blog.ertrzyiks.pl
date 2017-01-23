const path = require('path')
const ExtractCssBlockPlugin = require('extract-css-block-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './content/themes/nono/assets/index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'output.js'
  },
  module: {
    loaders: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({ use:['css-loader', 'postcss-loader', 'sass-loader'], fallback: 'style-loader' })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('compiled.css'),
    new ExtractCssBlockPlugin()
  ]
}
