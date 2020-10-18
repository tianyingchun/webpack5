import { merge } from 'lodash';

/**
 * https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
 * @param newOptions
 */
export const terserOptions = (terserOption = {}) => {
  return {
    parallel: true,
    // Disable Extract all or some (use /^\**!|@preserve|@license|@cc_on/i RegExp) comments.
    extractComments: false,
    // Terser minify options.
    terserOptions: merge(
      {
        ecma: undefined,
        parse: {},
        compress: {},
        mangle: true, // Note `mangle.properties` is `false` by default.
        module: false,
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      },
      terserOption,
    ),
  };
};
