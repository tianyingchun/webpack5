import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from 'webpack';
import { lessLoaderOptions, postcssLoaderOptions } from './config';

/**
 * Preparing configurations for `less-loader`
 * @param lessOptions The Options for Less.
 * @param postcssPixelOptions The value indicates we will enable px2rem using `@flatjs/forge-plugin-postcss-pixel`
 */
export const flatLessLoader = (lessOptions = {}) => {
  const ruleSet: RuleSetRule = {
    test: /\.less$/i,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // https://github.com/webpack-contrib/mini-css-extract-plugin/releases/tag/v1.0.0
          esModule: true,
        },
      },
      { loader: 'css-loader', options: { sourceMap: false } },
    ],
  };

  if (Array.isArray(ruleSet.use)) {
    ruleSet.use.push(
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: postcssLoaderOptions(),
          sourceMap: false,
        },
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: lessLoaderOptions(lessOptions),
        },
      },
    );
  }
  return ruleSet;
};
