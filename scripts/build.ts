import webpack, { Configuration } from 'webpack';
import { merge } from 'lodash';
import { webpackConfig } from '../builder';

interface WebpackEntryObject {
  [index: string]: string[];
}

function splitToMultiCompiler(webpackConfig: Configuration): Configuration[] {
  const result: WebpackEntryObject[] = [];
  for (const [entryChunkName, entryItem] of Object.entries(webpackConfig.entry as any)) {
    result.push({
      [entryChunkName]: entryItem as string[],
    });
  }
  return result.map((newEntry) => {
    return merge({}, webpackConfig, {
      name: Object.keys(newEntry)[0],
      entry: newEntry,
    });
  });
}
const compile = () => {
  return new Promise((resolve, reject) => {
    // Run build.
    webpack(splitToMultiCompiler(webpackConfig), (err, multiStats) => {
      if (err) {
        // Handle errors here
        return reject(err);
      }
      const errorStats = multiStats?.stats.find((s) => {
        return s.toJson().errors.length > 0;
      });
      if (errorStats) {
        return reject(errorStats.toJson().errors);
      }
      const warningStats = multiStats?.stats.find((s) => {
        return s.toJson().warnings.length > 0;
      });

      if (warningStats) {
        return reject(warningStats.toJson().warnings);
      }
      resolve({ warningStats });
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
