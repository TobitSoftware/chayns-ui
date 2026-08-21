import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../packages/core/src/**/*.stories.@(ts|tsx)'],
  staticDirs: ['./public'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    backgrounds: false,
    developmentModeForBuild: true,
  },
};

export default config;
