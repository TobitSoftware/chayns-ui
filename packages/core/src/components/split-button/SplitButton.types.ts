import type { ComponentPropsWithRef } from 'react';

import type { ButtonContent, ButtonIcon, ButtonVariant } from '../button/Button.types.js';
export { BUTTON_VARIANTS } from '../button/Button.types.js';
import type { PopupListItem } from '../popup/Popup.types.js';

export interface SplitButtonProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'children' | 'onClick'
> {
  variant: ButtonVariant;
  children: ButtonContent;
  items: PopupListItem[];
  icon?: ButtonIcon;
  onClick?: ComponentPropsWithRef<'button'>['onClick'];
  disabled?: boolean;
}
