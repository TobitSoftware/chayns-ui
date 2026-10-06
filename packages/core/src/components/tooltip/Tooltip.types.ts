import type { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  disabled?: boolean;
}

/** Explains one existing enabled trigger without changing its native action. */
export interface TooltipProps extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'content'> {
  children: ReactElement<TooltipTriggerProps>;
  /** Already localized non-interactive explanation; never essential instructions or actions. */
  content: ReactNode;
}
