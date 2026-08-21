import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const chaynsUiTheme = create({
  base: 'light',
  brandTarget: '_self',
  brandTitle:
    '<span style="display:flex;align-items:center;gap:10px"><img src="/app-icon-main.png" alt="" width="28" height="28"><span>chayns UI</span></span>',
  brandUrl: '/',
  fontBase: "'Roboto', sans-serif",
  fontCode: "'Roboto Mono', monospace",
});

addons.setConfig({ theme: chaynsUiTheme });
