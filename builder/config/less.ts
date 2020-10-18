import cssnano from 'cssnano';

/**
 * Normalize less-loader options.
 * @param lessOptions The configurations of `less`
 */
export const lessLoaderOptions = (lessOptions) => {
  return Object.assign({ sourceMap: false, javascriptEnabled: true }, lessOptions);
};

/**
 * Normalize postcss-loader options.
 * @param postCssOptions The configurations of `postcss`
 */
export const postcssLoaderOptions = (postCssOptions = {}) => {
  // Use cssnano to minify css styles.
  // https://cssnano.co/docs/config-file
  const postCssPlugins = [
    cssnano({
      // https://www.npmjs.com/package/cssnano-preset-advanced#autoprefixer-external
      preset: [
        'advanced',
        {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          // Should Autoprefixer [remove outdated] prefixes.
          // https://github.com/cssnano/cssnano/tree/master/packages/cssnano-preset-advanced
          autoprefixer: {
            add: false,
          },
        },
      ],
    }),
  ];
  return Object.assign(
    {
      plugins: postCssPlugins,
    },
    postCssOptions,
  );
};
