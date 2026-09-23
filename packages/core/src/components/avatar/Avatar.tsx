import { forwardRef, useState, type CSSProperties } from 'react';

import type { AvatarProps } from './Avatar.types.js';

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return '';
  }

  const first = words[0]?.charAt(0) ?? '';
  const last = words.length > 1 ? (words.at(-1)?.charAt(0) ?? '') : '';
  return `${first}${last}`.toUpperCase();
};

export const getColorFromInitials = (input: string): string => {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = input.charCodeAt(index) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 65% var(--chayns-avatar-initials-lightness))`;
};

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { alt, badge, className, name, size = 'default', src, style, ...spanProps },
  ref,
) {
  const [failedSource, setFailedSource] = useState<string>();
  const showImage = Boolean(src) && failedSource !== src;
  const initials = getInitials(name);
  const initialsColorStyle: CSSProperties & Record<'--chayns-avatar-initials-color', string> = {
    '--chayns-avatar-initials-color': getColorFromInitials(name),
    ...style,
  };

  return (
    <span
      {...spanProps}
      aria-label={alt ?? name}
      className={[
        'chayns-avatar',
        `chayns-avatar--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="img"
      ref={ref}
      style={initialsColorStyle}
    >
      {showImage ? (
        <img
          alt=""
          className="chayns-avatar__image"
          onError={() => setFailedSource(src)}
          src={src}
        />
      ) : (
        <span aria-hidden="true" className="chayns-avatar__initials">
          {initials}
        </span>
      )}
      {badge ? (
        <span aria-hidden="true" className="chayns-avatar__badge">
          {badge}
        </span>
      ) : null}
    </span>
  );
});

export default Avatar;
