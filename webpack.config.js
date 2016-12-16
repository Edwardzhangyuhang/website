var webpack = require('webpack');


module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8888',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: 'dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8888
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
    
};
