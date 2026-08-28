export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'custom-property-pattern':
      '^(chayns|sf|u|sp|k[0-9]+|btn|ctrl|fs|accent|on-accent|surface|page|text|muted|danger|disabled|border|hover|icon|input|focus-ring|shadow)(-[a-z0-9]+)*$',
    'selector-class-pattern': '^chayns-[a-z0-9-]+(?:__[a-z0-9]+)?(?:--[a-z0-9]+)?$',
  },
};
