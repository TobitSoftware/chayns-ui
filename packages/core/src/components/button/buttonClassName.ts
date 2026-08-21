import type { ButtonVariant } from './Button.types.js';

export function getButtonClassName(
  componentClassName: 'chayns-button' | 'chayns-icon-button',
  variant: ButtonVariant,
  className?: string,
): string {
  const variantClassName = `${componentClassName}--${variant}`;

  return className
    ? `${componentClassName} ${variantClassName} ${className}`
    : `${componentClassName} ${variantClassName}`;
}
