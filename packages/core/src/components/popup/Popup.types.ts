import type { ReactElement, ReactNode } from 'react';

import type { ButtonIcon } from '../button/Button.types.js';

export interface PopupListItem {
  icon: ButtonIcon;
  text: string;
  onClick: () => void;
}

export interface PopupProps {
  trigger: ReactElement;
  children: ReactNode;
  className?: string;
}

export interface PopupListProps {
  trigger: ReactElement;
  items: PopupListItem[];
  className?: string;
}
