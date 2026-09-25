export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'custom-property-pattern':
      '^(chayns|theme|sf|u|sp|k[0-9]+|btn|ctrl|fs|accent|avatar|on-(accent|success|warning|danger)|surface|page|text|muted|success|danger|warning|tint|toggle|disabled|border|hover|icon|input|focus-ring|shadow|z)(-[a-z0-9]+)*$',
    'selector-class-pattern':
      '^(?:chayns-[a-z0-9-]+(?:__[a-z0-9-]+)?(?:--[a-z0-9-]+)?|theme-(?:light|dark|high-contrast|color-deficiency|density-[sml]))$',
  },
};
