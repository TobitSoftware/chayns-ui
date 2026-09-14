import { useState } from 'react';

import type { AvatarProps } from './Avatar.types.js';

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return '';
  }

  const first = words[0]?.charAt(0) ?? '';
  const last = words.length > 1 ? (words.at(-1)?.charAt(0) ?? '') : '';
  return `${first}${last}`.toUpperCase();
}

function getTone(name: string) {
  let hash = 0;
  for (const character of name) {
    hash = (hash * 31 + character.codePointAt(0)!) >>> 0;
  }

  return hash % 3;
}

function Avatar({ alt, badge, className, id, name, size = 'default', src }: AvatarProps) {
  const [failedSource, setFailedSource] = useState<string>();
  const showImage = Boolean(src) && failedSource !== src;
  const initials = getInitials(name);
  const tone = getTone(name);

  return (
    <span
      aria-label={alt ?? name}
      className={[
        'chayns-avatar',
        `chayns-avatar--tone-${tone}`,
        size === 'small' ? 'chayns-avatar--small' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      id={id}
      role="img"
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
}

export default Avatar;
