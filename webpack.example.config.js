const path = require('path')
module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'example.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {},
}

