const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TSLintPlugin = require('tslint-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  new Dotenv(),
  new webpack.NamedModulesPlugin(),
  new NodemonPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new UglifyJSPlugin(),
  new TSLintPlugin({
    files: ['./src/**/*.ts'],
  }),
];

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
  externals: [
    nodeExternals(),
  ],
  name: 'server',
  plugins: plugins,
  target: 'node',
  entry: [path.resolve(__dirname, 'src/index.ts')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].js',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.ts'],
    modules: ['node_modules'],
    alias: {
      'utils': path.resolve('./src/utils'),
      'middleware': path.resolve('./src/middleware'),
      'templates': path.resolve('./src/templates'),
      'models': path.resolve('./src/models'),
      'services': path.resolve('./src/services'),
      'database': path.resolve('./src/database'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: true,
  },
};

