import Skeleton from '../src/components/skeleton/Skeleton.js';

export const validSkeleton = <Skeleton shape="circular" style={{ height: 48, width: 48 }} />;

// @ts-expect-error arbitrary shapes are not part of the public value set
export const invalidShape = <Skeleton shape="pill" />;
// @ts-expect-error Skeleton cannot receive children
export const invalidChildren = <Skeleton>Loading</Skeleton>;
// @ts-expect-error Skeleton owns its decorative semantics
export const invalidAriaHidden = <Skeleton aria-hidden={false} />;
// @ts-expect-error Skeleton cannot become an interactive focus target
export const invalidTabIndex = <Skeleton tabIndex={0} />;
