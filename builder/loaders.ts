import { RuleSetRule } from 'webpack';
import { flatBabelLoader } from './loader-babel';
import { flatLessLoader } from './loader-less';

export const loadLoaders = (): RuleSetRule[] => {
  const rules: RuleSetRule[] = [flatLessLoader(), flatBabelLoader()];
  return rules;
};
