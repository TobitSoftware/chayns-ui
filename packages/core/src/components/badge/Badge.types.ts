import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Named configuration values; existing literal props and value lists remain supported. */
export enum BadgeSizes {
  Small = 'sm',
  Medium = 'md',
}

/** Named configuration values; existing literal props and value lists remain supported. */
export enum BadgeTones {
  Neutral = 'neutral',
  Accent = 'accent',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

export const BADGE_TONES = ['neutral', 'accent', 'success', 'warning', 'danger'] as const;
export type BadgeTone = (typeof BADGE_TONES)[number];

export const BADGE_SIZES = ['sm', 'md'] as const;
export type BadgeSize = (typeof BADGE_SIZES)[number];

export interface BadgeProps extends Omit<ComponentPropsWithRef<'span'>, 'children' | 'role'> {
  children: Exclude<ReactNode, boolean | null | undefined>;
  tone?: BadgeTone;
  size?: BadgeSize;
  'aria-label'?: string;
  role?: never;
}
