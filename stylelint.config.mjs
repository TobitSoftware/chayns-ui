export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'custom-property-pattern':
      '^(chayns|sf|u|sp|btn|ctrl|fs|accent|on-accent|surface|text|muted|danger|disabled|focus-ring|shadow-btn)(-[a-z0-9]+)*$',
    'selector-class-pattern': '^chayns-[a-z0-9-]+(?:__[a-z0-9]+)?(?:--[a-z0-9]+)?$',
  },
};
