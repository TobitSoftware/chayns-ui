import type { MessageBoxProps } from './MessageBox.types.js';

function MessageBox({ children, className, tone = 'neutral', ...asideProps }: MessageBoxProps) {
  const resolvedClassName = ['chayns-message-box', `chayns-message-box--${tone}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <aside {...asideProps} className={resolvedClassName} role="note">
      {children}
    </aside>
  );
}

export default MessageBox;
