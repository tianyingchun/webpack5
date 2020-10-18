import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { loadLoaders } from './loaders';
import { join } from 'path';
import { terserOptions } from './config';
import { Configuration } from 'webpack';

const ensureSlash = (str: string, slashEndfix = false): string => {
  str = str.replace(/\/$/, '');
  return slashEndfix ? str + '/' : str;
};

export const webpackConfig: Configuration = {
  mode: 'production',
  target: 'web',
  stats: 'minimal',
  devtool: false,
  entry: {
    'webpack5/test': ['./src/index'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `[name]/bundle[contenthash].css`,
      // the chunkFilename option can be a function for webpack@5
      chunkFilename: '[id].[contenthash].css',
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['webpack5/test'].map((s) => `${join(ensureSlash(s, true), '**/*')}`),
    }),
    // if we remove `htmlWebpackPlugin` the build is works fine.
    // otherwise it will throw error
    new HtmlWebpackPlugin({
      minify: false,
      chunks: ['webpack5/test'],
      title: '',
      inject: 'body',
      template: join(__dirname, './templates/index.html'),
      filename: 'webpack5/test/index.html',
    }),
  ],
  context: process.cwd(),
  cache: {
    type: 'filesystem',
  },

  watchOptions: {
    poll: 1000,
    ignored: /node_modules/,
    aggregateTimeout: 500,
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.html', '.json'],
  },
  module: {
    rules: loadLoaders(),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
  },
  performance: {
    hints: 'warning',
  },
  output: {
    // Replace output.ecmaVersion with output.environment and more detailed
    environment: {},
    // Include comments with information about the modules, Disable it can improved performance.
    pathinfo: false,
    // The output directory as an absolute path.
    path: join(process.cwd(), 'public'),
    // The publicPath specifies the public URL address of the output files when referenced in a browser.
    publicPath: 'http://example.domain.com/public',
    // Specifies the name of each output file on disk. You must not specify an absolute path here!
    filename: `[name]/bundle[contenthash].js`,
    // The filename of non-entry chunks as relative path inside the output.path directory.
    chunkFilename: `[id].[contenthash].js`,
  },
  optimization: {
    nodeEnv: 'production',
    chunkIds: 'deterministic',
    moduleIds: 'deterministic',
    minimize: true,
    minimizer: [new TerserPlugin(terserOptions())],
    splitChunks: {
      name: false,
      chunks: 'all',
      minSize: 2500000,
      cacheGroups: {
        default: false,
        defaultVendors: false,
      },
    },
  },
};
