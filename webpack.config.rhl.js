var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?http://localhost:3000/', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname,'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?' + JSON.stringify({
        cacheDirectory: true,
        presets: ['es2015', 'react']
      })],
      exclude: /node_modules/
    }]
  },
  query: {
    presets: ['es2015', 'react']
  },
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
