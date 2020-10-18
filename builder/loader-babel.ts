import { babelOptions } from './config';

export const flatBabelLoader = () => {
  const loader = {
    test: /\.(js|jsx|tsx|ts)$/,
    // Don't exclude anythings because of we need to import node_modules from `@flatjs`
    // exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'babel-loader',
        options: babelOptions(),
      },
    ],
  };
  return loader;
};
