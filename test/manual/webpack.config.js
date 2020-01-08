
module.exports = {
  devtool: 'source-map',
  mode: 'development',
  output: {
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: require.resolve('../../dist/cjs.js'),
            options: { esModule: true },
          },
          {
            loader: 'css-loader',
            options: { modules: false,esModule:true }
          },
        ],
      }
    ],
  },
  devServer: {
    hot: true,
    contentBase: __dirname,
  },
};
