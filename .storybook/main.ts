import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../packages/*/stories/**/*.stories.@(ts|tsx)'],
  staticDirs: ['./public'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: '.storybook/tsconfig.docgen.json',
      setDisplayName: false,
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      skipChildrenPropWithoutDoc: false,
      propFilter: (prop) => {
        const nativeProps = [
          'children',
          'className',
          'style',
          'ref',
          'id',
          'title',
          'disabled',
          'href',
          'aria-label',
          'aria-labelledby',
          'aria-describedby',
          'tabIndex',
          'onClick',
          'onKeyDown',
          'onChange',
        ];
        if (prop.type.name === 'never' || prop.type.name === 'undefined') return false;
        return nativeProps.includes(prop.name) || !prop.parent?.fileName.includes('node_modules');
      },
    },
  },
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
