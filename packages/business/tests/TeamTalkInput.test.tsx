import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import TeamTalkInput from '../src/components/team-talk-input/TeamTalkInput.js';
import type { TeamTalkInputProps } from '../src/components/team-talk-input/TeamTalkInput.types.js';

const labels = {
  input: 'Kommentar schreiben',
  placeholder: 'Stimme zu',
  agree: 'Zustimmen',
  send: 'Senden',
  addPerson: 'Personen hinzufügen',
  leave: 'TeamTalk verlassen',
  participants: (names: readonly string[]) => `Im TeamTalk: ${names.join(', ')}`,
};
const base: TeamTalkInputProps = {
  labels,
  members: [
    { id: '1', name: 'Ada Lovelace', avatarSrc: 'ada.png' },
    { id: '2', name: 'Grace Hopper' },
  ],
  value: '',
  onValueChange: () => undefined,
  onSend: () => undefined,
};

describe('TeamTalkInput', () => {
  it('renders controlled participants, optional leave and a disabled add action', () => {
    const onLeave = vi.fn();
    render(<TeamTalkInput {...base} onLeave={onLeave} />);
    expect(
      screen.getByRole('group', { name: 'Im TeamTalk: Ada Lovelace, Grace Hopper' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Personen hinzufügen' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'TeamTalk verlassen' }));
    expect(onLeave).toHaveBeenCalledOnce();
  });

  it('does not render Leave when its callback is absent', () => {
    render(<TeamTalkInput {...base} />);
    expect(screen.queryByRole('button', { name: 'TeamTalk verlassen' })).not.toBeInTheDocument();
  });

  it('offers agree only when enabled and sends an empty agree payload', () => {
    const onSend = vi.fn();
    const { rerender } = render(<TeamTalkInput {...base} onSend={onSend} />);
    const disabledSend = screen.getByRole('button', { name: 'Senden' });
    expect(disabledSend).toBeDisabled();
    expect(disabledSend.querySelector('.fa-arrow-up')).toBeInTheDocument();
    rerender(<TeamTalkInput {...base} allowAgree onSend={onSend} />);
    const agreeButton = screen.getByRole('button', { name: 'Zustimmen' });
    expect(agreeButton.querySelector('.fa-thumbs-up')).toBeInTheDocument();
    fireEvent.click(agreeButton);
    expect(onSend).toHaveBeenCalledWith({ type: 'agree', text: '' });
    expect(screen.getByRole('textbox', { name: 'Kommentar schreiben' })).toHaveValue('');
  });

  it('submits trimmed non-empty text with a message discriminator and leaves clearing to the consumer', () => {
    const onSend = vi.fn();
    const onValueChange = vi.fn();
    render(
      <TeamTalkInput
        {...base}
        value="  Hallo Team  "
        onSend={onSend}
        onValueChange={onValueChange}
      />,
    );
    expect(screen.getByRole('button', { name: 'Senden' })).toBeEnabled();
    fireEvent.submit(screen.getByRole('form', { name: 'Kommentar schreiben' }));
    expect(onSend).toHaveBeenCalledWith({ type: 'message', text: 'Hallo Team' });
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('reports controlled textarea changes and forwards native textarea ref/props', () => {
    const onValueChange = vi.fn();
    const textareaRef = { current: null as HTMLTextAreaElement | null };
    const { rerender } = render(
      <TeamTalkInput
        {...base}
        textareaProps={{ id: 'team-draft', title: 'Draft title', ref: textareaRef }}
        onValueChange={onValueChange}
      />,
    );
    const textbox = screen.getByRole('textbox', { name: 'Kommentar schreiben' });
    expect(textbox).toHaveAttribute('id', 'team-draft');
    expect(textbox).toHaveAttribute('title', 'Draft title');
    expect(textbox).toHaveValue('');
    expect(textareaRef.current).toBe(textbox);
    expect(textbox.tagName).toBe('TEXTAREA');
    fireEvent.change(textbox, { target: { value: 'Hallo' } });
    expect(onValueChange).toHaveBeenCalledWith('Hallo');
    rerender(<TeamTalkInput {...base} disabled onValueChange={onValueChange} />);
    expect(screen.getByRole('textbox', { name: 'Kommentar schreiben' })).toBeDisabled();
  });

  it('keeps Shift+Enter for a newline and submits on Enter', () => {
    const onSend = vi.fn();
    render(<TeamTalkInput {...base} value={'Hallo\nTeam'} onSend={onSend} />);
    const textarea = screen.getByRole('textbox', { name: 'Kommentar schreiben' });
    const shiftEnter = fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    expect(shiftEnter).toBe(true);
    expect(onSend).not.toHaveBeenCalled();
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith({ type: 'message', text: 'Hallo\nTeam' });
  });

  it('does not dispatch an empty submit without agree, or when disabled', () => {
    const onSend = vi.fn();
    const { rerender } = render(<TeamTalkInput {...base} onSend={onSend} />);
    fireEvent.submit(screen.getByRole('form', { name: 'Kommentar schreiben' }));
    expect(onSend).not.toHaveBeenCalled();
    rerender(<TeamTalkInput {...base} allowAgree disabled onSend={onSend} />);
    fireEvent.submit(screen.getByRole('form', { name: 'Kommentar schreiben' }));
    expect(onSend).not.toHaveBeenCalled();
  });

  it('does not invoke internal Leave behavior when a consumer click handler prevents default', () => {
    const onLeave = vi.fn();
    const onClick = vi.fn((event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault());
    render(<TeamTalkInput {...base} onLeave={onLeave} leaveButtonProps={{ onClick }} />);
    fireEvent.click(screen.getByRole('button', { name: 'TeamTalk verlassen' }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(onLeave).not.toHaveBeenCalled();
  });
});
