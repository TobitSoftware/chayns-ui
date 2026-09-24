import Spinner from '../src/components/spinner/Spinner.js';

export const validSpinner = <Spinner data-purpose="loading" />;

// @ts-expect-error Spinner cannot receive children
export const invalidChildren = <Spinner>Loading</Spinner>;
// @ts-expect-error Spinner owns its decorative semantics
export const invalidAriaHidden = <Spinner aria-hidden={false} />;
// @ts-expect-error Spinner cannot become an interactive focus target
export const invalidTabIndex = <Spinner tabIndex={0} />;
