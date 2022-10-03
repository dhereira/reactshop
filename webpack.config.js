const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    mode: 'development',
    resolve:{
        extensions: ['.js', '.jsx'], 
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@routes': path.resolve(__dirname, 'src/routes/'),
            '@containers': path.resolve(__dirname, 'src/containers/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@icons': path.resolve(__dirname, 'src/assets/icons/'),
            '@logos': path.resolve(__dirname, 'src/assets/logos/'),
            '@context': path.resolve(__dirname, 'src/context/'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
        }       
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:[
                    {
                    loader: 'babel-loader'
                    }
                ]
            },
            {
                test:/\.html$/,
                use:[
                    {
                       loader: 'html-loader' 
                    }

                ]
            },
            {
                test:/\.(css|s[ac]ss)$/i,
                use: [
                    devMode ? 'style-loader': MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: 'images/[hash]-[name].[ext]',
                      },
                    },
                  ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    devServer:{
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9009,
        historyApiFallback: true
    },
}