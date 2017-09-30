var path = require('path')
var webpack = require('webpack')

// Three webpack config
var three = path.join(__dirname, '/node_modules/three/build/three.js')
var arjs = path.join(__dirname, '/node_modules/ar.js/three.js/contribs/npm/build/ar.js') 

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/Game.js')
    ]

  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'game.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      }
    })
  ],
  module: {
    rules: [
        {
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }
        ,{ test: /three\.js/, use: ['expose-loader?THREE'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
        three:three,
        'ar.js':arjs
    }
  }
}
