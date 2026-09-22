import type { ComponentPropsWithRef, ReactNode } from 'react';

import type { ButtonIcon } from '../button/Button.types.js';

export const BANNER_TONES = ['neutral', 'success', 'warning', 'danger'] as const;
export type BannerTone = (typeof BANNER_TONES)[number];

interface BannerBaseProps extends Omit<ComponentPropsWithRef<'aside'>, 'children' | 'role'> {
  children: Exclude<ReactNode, boolean | null | undefined>;
  tone?: BannerTone;
  icon?: ButtonIcon;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  role?: never;
}

export interface StaticBannerProps extends BannerBaseProps {
  onClose?: never;
  closeLabel?: never;
}

export interface ClosableBannerProps extends BannerBaseProps {
  onClose: () => void;
  closeLabel: string;
}

export type BannerProps = StaticBannerProps | ClosableBannerProps;
