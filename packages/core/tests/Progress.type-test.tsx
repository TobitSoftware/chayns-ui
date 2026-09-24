import Progress from '../src/components/progress/Progress.js';

export const validProgress = <Progress label="Upload" value={64} />;

// @ts-expect-error Progress needs a visible label
export const missingLabel = <Progress value={64} />;
// @ts-expect-error Progress needs a value
export const missingValue = <Progress label="Upload" />;
// @ts-expect-error Progress cannot receive children
export const invalidChildren = (
  <Progress label="Upload" value={64}>
    Loading
  </Progress>
);
// @ts-expect-error Progress owns its progressbar role
export const invalidRole = <Progress label="Upload" role="status" value={64} />;
// @ts-expect-error Progress owns its accessible name
export const invalidAriaLabel = <Progress aria-label="Upload" label="Upload" value={64} />;
// @ts-expect-error Progress cannot become an interactive focus target
export const invalidTabIndex = <Progress label="Upload" tabIndex={0} value={64} />;
