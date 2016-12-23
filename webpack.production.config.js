var webpack = require('webpack');


module.exports = {
    entry: [
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
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8888
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
    
};
