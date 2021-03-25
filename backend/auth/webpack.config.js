const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const isLocal = slsw.lib.webpack.isLocal

const swcOptions = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: false,
      decorators: true,
      dynamicImport: true,
    },
    transform: {
      legacyDecorator: true,
      decoratorMetadata: true,
    },
  },
}

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: false,
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
    }),
  ],
  mode: isLocal ? 'development' : 'production',
  performance: {
    hints: false,
  },
  resolve: {
    symlinks: false,
    extensions: [
      '.wasm',
      '.mjs',
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx',
      '.graphql',
      '.gql',
    ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.paths.json',
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'swc-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: swcOptions,
      },
    ],
  },
  plugins: [],
  optimization: isLocal
    ? {
        splitChunks: false,
        removeEmptyChunks: false,
        removeAvailableModules: false,
      }
    : { minimize: false },
  node: {
    __dirname: false,
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
}
