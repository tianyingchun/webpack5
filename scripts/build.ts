import webpack from 'webpack';
import { webpackConfig } from '../builder';

const compile = () => {
  return new Promise((resolve, reject) => {
    // Run build.
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        // Handle errors here
        return reject(err);
      }
      if (err) {
        return reject(err);
      }
      const { errors, warnings } = stats?.toJson();
      if (errors.length) {
        return reject(errors);
      }
      if (warnings.length) {
        return reject(warnings);
      }
      resolve({});
    });
  });
};

compile()
  .then((result) => {
    console.log('success', result);
  })
  .catch((err) => {
    console.error(err);
  });
