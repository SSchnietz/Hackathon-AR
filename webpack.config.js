var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

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
    devtool: 'cheap-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'game.js'
    },
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 9000,
            server: {
                baseDir: ['./', './build']
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
            //,{ test: /ar\.js/, use: ['expose-loader?THREEx'] }
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
