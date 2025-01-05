// webpack.config.js
const path = require('path');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js',
        output: {
            filename: 'podlove-popup.bundle.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'PodlovePopup',
            libraryTarget: 'umd',
            globalObject: 'this', // Ensures compatibility in various environments
            clean: true, // Cleans the output directory before emit
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader', // Transpile ES6+ to ES5
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name].[hash][ext][query]'
                    }
                },
                // Add other loaders as needed (e.g., for images)
            ],
        },
        resolve: {
            extensions: ['.js'],
        },
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'inline-source-map', // Source maps for easier debugging
        optimization: {
            minimize: isProduction, // Disable minification in development
        },
    };
};
