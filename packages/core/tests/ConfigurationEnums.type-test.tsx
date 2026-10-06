import {
  AccordionAppearances,
  AvatarSizes,
  BadgeSizes,
  BadgeTones,
  BannerTones,
  ButtonVariants,
  DateTimePickerMinuteSteps,
  DateTimePickerModes,
  SkeletonShapes,
} from '../src/index.js';
import type {
  AccordionAppearance,
  AvatarSize,
  BadgeSize,
  BadgeTone,
  BannerTone,
  ButtonVariant,
  DateTimePickerMinuteStep,
  DateTimePickerMode,
  SkeletonShape,
} from '../src/index.js';

// Enum members remain assignable to the existing consumer-facing literal types.
export const appearance: AccordionAppearance = AccordionAppearances.List;
export const avatar: AvatarSize = AvatarSizes.Large;
export const badgeSize: BadgeSize = BadgeSizes.Small;
export const badgeTone: BadgeTone = BadgeTones.Accent;
export const bannerTone: BannerTone = BannerTones.Warning;
export const variant: ButtonVariant = ButtonVariants.Primary;
export const minuteStep: DateTimePickerMinuteStep = DateTimePickerMinuteSteps.Fifteen;
export const mode: DateTimePickerMode = DateTimePickerModes.Time;
export const shape: SkeletonShape = SkeletonShapes.Rounded;

// Existing literal annotations remain valid, too.
export const literalVariant: ButtonVariant = 'primary';
export const literalMinuteStep: DateTimePickerMinuteStep = 15;
