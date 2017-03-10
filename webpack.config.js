var webpack = require('webpack');
var path = require('path');
//var path = require('path');
//var npmPath = path.resolve(__dirname, '../node_modules');
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'server/dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.DefinePlugin({
      "process.env": {
        HOST: JSON.stringify(process.env.HOST || 'localhost:1337')
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  target: "web"
};
