import type { ComponentPropsWithRef, ReactNode } from 'react';

/**
 * @description Supported visual emphasis levels for {@link ButtonProps} and
 * `IconButtonProps`. Milestone 1 supports exactly these four values; there is
 * no default variant and no fifth value.
 * @see {@link https://tappqa.tobit.com/Bodywork/DesignSystem/#buttons | DesignSystem — Buttons & Aktionen}
 */
export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

/**
 * @description A FontAwesome Classic icon name in its Regular form (e.g.
 * `fa-plus`). Button and IconButton resolve the matching Solid weight
 * internally and cross-fade between the two on hover/active; consumers must
 * not pass a pre-resolved weight and must supply a name that has both a
 * Regular and a Solid glyph available.
 */
export type ButtonIcon = `fa-${string}`;

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
   * @description Optional leading FontAwesome Classic icon name. Always
   * rendered before `children`; there is no trailing-icon or icon-only mode
   * on `Button` itself — use `IconButton` for an icon-only action.
   */
  icon?: ButtonIcon;

  /**
   * @description Visible, non-empty content used as the button label. Loading
   * state, polymorphism (rendering as something other than a native button)
   * and navigation are explicitly not part of the Milestone 1 API.
   */
  children: ButtonContent;
}
