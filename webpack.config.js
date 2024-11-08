const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.debug.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'Flytrap',
      type: 'umd',
      export: 'default',
    },
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false,
      path: require.resolve("path-browserify")
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /tests/],
      },
    ],
  },
  mode: 'development', // Sets Webpack to output unminified code
  devtool: 'source-map', // Generates source maps for easier debugging
};
