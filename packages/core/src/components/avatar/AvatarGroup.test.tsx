import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Avatar from './Avatar.js';
import AvatarGroup from './AvatarGroup.js';

describe('AvatarGroup', () => {
  it('overlaps avatars and renders the remaining count as the last tile', () => {
    render(
      <AvatarGroup max={3}>
        <Avatar name="Eva Fischer" />
        <Avatar name="Thomas Müller" />
        <Avatar name="Klaus Peters" />
        <Avatar name="Peter Schmidt" />
        <Avatar name="Maria Sommer" />
      </AvatarGroup>,
    );

    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByText('+3')).toHaveClass('chayns-avatar-group__overflow');
  });

  it('applies the group size to every visible avatar and the overflow tile', () => {
    render(
      <AvatarGroup max={2} size="small">
        <Avatar name="Eva Fischer" size="default" />
        <Avatar name="Thomas Müller" />
        <Avatar name="Klaus Peters" />
      </AvatarGroup>,
    );

    expect(screen.getByRole('img', { name: 'Eva Fischer' })).toHaveClass('chayns-avatar--small');
    expect(screen.getByText('+2')).toHaveClass('chayns-avatar-group__overflow');
  });
});
