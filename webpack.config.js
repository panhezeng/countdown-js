module.exports = {
  output: {
    filename: 'countdown.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: 'Countdown',
    libraryExport: 'Countdown'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}
