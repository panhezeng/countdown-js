module.exports = {
  output: {
    filename: 'countdown.min.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'Countdown',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
}
