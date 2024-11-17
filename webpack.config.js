const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'flytrap',
        type: 'umd',
        export: 'default',
      },
      umdNamedDefine: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser'),
        fs: false,
        path: require.resolve('path-browserify'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: [/node_modules/, /tests/],
        },
      ],
    },
    mode: 'production',
  },
];
