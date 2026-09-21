import type { ComponentPropsWithRef, ReactNode } from 'react';

export const BADGE_TONES = ['neutral', 'accent', 'success', 'warning', 'danger'] as const;
export type BadgeTone = (typeof BADGE_TONES)[number];

export const BADGE_SIZES = ['sm', 'md'] as const;
export type BadgeSize = (typeof BADGE_SIZES)[number];

interface BadgeBaseProps extends Omit<ComponentPropsWithRef<'span'>, 'children' | 'role'> {
  children: Exclude<ReactNode, boolean | null | undefined>;
  tone?: BadgeTone;
  size?: BadgeSize;
  'aria-label'?: string;
  role?: never;
}

export interface StaticBadgeProps extends BadgeBaseProps {
  onRemove?: never;
  removeLabel?: never;
}

export interface RemovableBadgeProps extends BadgeBaseProps {
  onRemove: () => void;
  removeLabel: string;
}

export type BadgeProps = StaticBadgeProps | RemovableBadgeProps;
