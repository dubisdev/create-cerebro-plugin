import webpack from  'webpack'
import path from  'path'

import paths from  './paths.js'

export default {
  entry: {
    index: './src/index'
  },

  target: 'electron-renderer',

  output: {
    path: paths.dist,
    library: {
      type: 'commonjs2'
    },
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.jsx', '...'],
    modules: [
      path.resolve('src'),
     'node_modules'
    ]
  },
  target: 'electron19-renderer',
  externals: ['nodobjc'],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              // { targets: "defaults" } Next versions --> Support only from cerebro 1.0.0 (electron 19, chorme 102, node 16...)
            ],
            "@babel/preset-react"
          ]
        }
      },
      resolve: {
        fullySpecified: false
      },
      exclude: "/node_modules/",
    }, {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {modules: true},
      }]
    }, {
      test: /\.png$/,
      type: 'asset/inline'
    }]
  },
  plugins: [
    // Use react and ReactDOM flom global variables 
    // instead of adding them to each plugin separately
    new webpack.ProvidePlugin({
      'window.React': 'react',
      'window.ReactDOM': 'react-dom'
    })
  ]
};
