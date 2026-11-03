import { forwardRef, useLayoutEffect, useMemo, useRef } from 'react';
import { composeNativeRefs } from '../../../utils/native-ref.js';
import type { ComponentPropsWithoutRef } from 'react';

interface ComposerActionButtonProps extends ComponentPropsWithoutRef<'button'> {
  isVisible: boolean;
}

/** Stable overlapping action: CSS transitions reverse without a mount or timer. */
const ComposerActionButton = forwardRef<HTMLButtonElement, ComposerActionButtonProps>(
  function ComposerActionButton({ isVisible, disabled, className, ...props }, ref) {
    const control = useRef<HTMLButtonElement>(null);
    const nativeRef = useMemo(() => composeNativeRefs(control, ref), [ref]);
    useLayoutEffect(() => {
      const button = control.current;
      if (!isVisible && button && document.activeElement === button) {
        button
          .closest('.chayns-message-composer')
          ?.querySelector<HTMLElement>('.chayns-rich-text-editor__control')
          ?.focus();
      }
    }, [isVisible]);
    return (
      <button
        {...props}
        aria-hidden={isVisible ? undefined : true}
        className={[
          className,
          'chayns-message-composer__action',
          !isVisible && 'chayns-message-composer__action--hidden',
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled === true || !isVisible}
        tabIndex={isVisible ? props.tabIndex : -1}
        ref={nativeRef}
      />
    );
  },
);
ComposerActionButton.displayName = 'ComposerActionButton';
export default ComposerActionButton;
