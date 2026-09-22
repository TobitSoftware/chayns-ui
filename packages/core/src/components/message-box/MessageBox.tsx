import { forwardRef } from 'react';

import type { MessageBoxProps } from './MessageBox.types.js';

const MessageBox = forwardRef<HTMLElement, MessageBoxProps>(function MessageBox(
  { children, className, tone = 'neutral', ...asideProps },
  ref,
) {
  const resolvedClassName = ['chayns-message-box', `chayns-message-box--${tone}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <aside {...asideProps} className={resolvedClassName} ref={ref} role="note">
      {children}
    </aside>
  );
});

export default MessageBox;
