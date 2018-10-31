const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5 * 1024,
              outputPath: 'images'
            }
          },
        ]
      },
      {
        test: /.js$/,
        enforce: "pre",
        use: [{
          loader: 'eslint-loader',
          options: {
            fix: true,
          }
        }],
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        loader: "babel-loader",
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js'],
    mainFiles: ['index']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      }
    }),
  ],
  optimization: {
    splitChunks: {
      // cacheGroups: {
      //   vendor: {
      //     chunks: "initial",
      //     test: path.resolve(__dirname, "node_modules"), // 路径在 node_modules 目录下的都作为公共部分
      //     name: "vendor", // 使用 vendor 入口作为公共部分
      //     enforce: true,
      //   },
      // },
      chunks: 'all'
    },
  },
}