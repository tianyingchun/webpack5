const resolve = require.resolve;
export const babelOptions = () => {
  const baseBabelOption = {
    presets: [
      [
        resolve('@babel/preset-env'),
        {
          loose: true,
          useBuiltIns: false,
          targets: {
            browsers: ['ie >= 11', 'safari > 10'],
          },
          exclude: ['transform-regenerator', 'transform-async-to-generator'],
        },
      ],
      [
        resolve('@babel/preset-typescript'),
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      [resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      [resolve('@babel/plugin-syntax-dynamic-import')],
      [resolve('fast-async'), { spec: true }],
    ].filter(Boolean),
  };

  return Object.assign(
    {
      babelrc: false,
    },
    baseBabelOption,
  );
};
