import type { ComponentPropsWithRef } from 'react';

export const SKELETON_SHAPES = ['square', 'rounded', 'circular'] as const;
export type SkeletonShape = (typeof SKELETON_SHAPES)[number];

export interface SkeletonProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'aria-hidden' | 'children' | 'role' | 'tabIndex'
> {
  shape?: SkeletonShape;
  children?: never;
  role?: never;
  tabIndex?: never;
  'aria-hidden'?: never;
}
