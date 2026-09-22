import type { ComponentPropsWithRef, ReactNode } from 'react';

/**
 * @description Supported visual emphasis levels for {@link ButtonProps} and
 * `IconButtonProps`. Milestone 1 supports exactly these four values; there is
 * no default variant and no fifth value.
 * @see {@link https://tappqa.tobit.com/Bodywork/DesignSystem/#buttons | DesignSystem — Buttons & Aktionen}
 */
export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

/**
 * Runtime representation of the finite Button variant contract.
 * Keep this list as the single source for Storybook controls and iteration.
 */
export const BUTTON_VARIANTS = [
  'primary',
  'outline',
  'ghost',
  'danger',
] as const satisfies readonly ButtonVariant[];

/**
 * @description A FontAwesome Classic icon name (e.g. `fa-plus`) or a
 * FontAwesome Brands icon including its style prefix (e.g. `fab fa-github`).
 * Classic icons resolve the matching Regular and Solid weights internally;
 * Brands icons are rendered as a single icon and must not be combined with
 * `far` or `fas`.
 */
export type ButtonIcon = `fa-${string}` | `fab fa-${string}`;

/**
 * @description Visible content that gives a `Button` its accessible name.
 * Excludes `boolean`, `null` and `undefined` so a `Button` can never be
 * rendered without real, visible label content.
 */
export type ButtonContent = Exclude<ReactNode, boolean | null | undefined>;

/**
 * @description Props for a visible-label native action button. Renders a
 * native `<button>` and forwards all remaining native button props, events,
 * `className` and `ref`.
 */
export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  /**
   * @description Visual emphasis that communicates the action's role within
   * its action scope. At most one `primary` action should exist per closed
   * action scope (page, card, dialog, drawer, form, wizard step, or closed
   * accordion content).
   */
  variant: ButtonVariant;

  /**
   * @description Optional leading FontAwesome Classic or Brands icon name.
   * Always rendered before `children`; there is no trailing-icon or icon-only
   * mode on `Button` itself — use `IconButton` for an icon-only action.
   */
  icon?: ButtonIcon;

  /**
   * Shows a spinner while preserving the button label and prevents repeated
   * activation through the native disabled state.
   */
  loading?: boolean;

  /**
   * @description Visible, non-empty content used as the button label. Loading
   * preserves this content while adding a spinner.
   */
  children: ButtonContent;
}
