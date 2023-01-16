const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@api': path.resolve(__dirname, 'src', 'api'),
      '@config': path.resolve(__dirname, 'src', 'config'),
      '@controllers': path.resolve(__dirname, 'src', 'controllers'),
      '@core': path.resolve(__dirname, 'src', 'core'),
      '@data': path.resolve(__dirname, 'src', 'data'),
      '@hocs': path.resolve(__dirname, 'src', 'hocs'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@typings': path.resolve(__dirname, 'src', 'types'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@vendor': path.resolve(__dirname, 'src', 'vendor'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: 'ts-loader',
      },
      {
        test: /\.hbs$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'handlebars-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src'),
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: path.resolve(__dirname, 'src'),
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'static/images'),
          to: 'images',
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
