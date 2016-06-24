const webpack = require('webpack');

const config = {
  devtool: "inline-source-map",
  entry: {
    'react-toggle-buttonDemo': ["./src/react-toggle-buttonDemo.js"]
  },
  output: {
    path: __dirname + '/demo',
    filename: "[name].js",
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015","react","stage-0"]
      }
    }]
  },
  devServer: {
    contentBase: "./demo",
    colors: true,
    historyApiFallback: true,
    inline: true
  },

}

if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
