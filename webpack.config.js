const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
      images: path.resolve(__dirname, 'src/images'),
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 3000,
    watchContentBase: true,
    progress: true,
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/env",
                {
                  targets: {
                    esmodules: true
                  }
                }
              ],
              [
                "@babel/preset-react",
                {
                  runtime: "automatic"
                }
              ]
            ],
            plugins: [
              "babel-plugin-styled-components"
            ]
          }
        }
      },
      {
        test: /\.(css|less)$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
    ]
  }
}