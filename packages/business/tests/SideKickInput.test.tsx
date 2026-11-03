import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SideKickInput from '../src/components/sidekick-input/SideKickInput.js';
import type { SideKickInputProps } from '../src/components/sidekick-input/SideKickInput.types.js';
import { composerLabels } from '../stories/ComposerLabels.js';

const document = {
  version: 1 as const,
  content: [
    { type: 'text' as const, text: '  Bitte frage ' },
    { type: 'mention' as const, id: 'agent', label: 'Support' },
    { type: 'lineBreak' as const },
  ],
};
const base: SideKickInputProps = {
  'aria-label': 'Draft',
  value: document,
  onValueChange: () => undefined,
  onSend: () => undefined,
  labels: composerLabels,
  layout: 'twoLine',
};

describe('optimistic Business draft dispatch', () => {
  it('hands off a detached, complete snapshot before requesting the controlled clear', () => {
    const order: string[] = [];
    const onSend = vi.fn(() => {
      order.push('snapshot');
    });
    const onValueChange = vi.fn(() => {
      order.push('clear');
    });
    render(
      <SideKickInput
        {...base}
        attachments={[{ id: 'attachment', content: 'Report', removeLabel: 'Remove' }]}
        onAttachmentRemove={() => undefined}
        onSend={onSend}
        onValueChange={onValueChange}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Senden' }));
    expect(order).toEqual(['snapshot', 'clear']);
    const draft = onSend.mock.calls[0] as unknown as [
      { document: typeof document; attachmentIds: string[]; selection: { kind: string } },
    ];
    expect(draft[0]).toEqual({
      document,
      attachmentIds: ['attachment'],
      selection: { kind: 'automatic' },
    });
    expect(draft[0].document).not.toBe(document);
    expect(draft[0].document.content[0]).not.toBe(document.content[0]);
    expect(onValueChange).toHaveBeenCalledWith({ version: 1, content: [] });
    fireEvent.click(screen.getByRole('button', { name: 'Senden' }));
    expect(onSend).toHaveBeenCalledOnce();
  });
  it('allows a new revision after the consumer acknowledges clearing and keeps retry ownership external', () => {
    const onSend = vi.fn();
    const { rerender } = render(<SideKickInput {...base} onSend={onSend} />);
    fireEvent.click(screen.getByRole('button', { name: 'Senden' }));
    rerender(<SideKickInput {...base} value={{ version: 1, content: [] }} onSend={onSend} />);
    rerender(<SideKickInput {...base} onSend={onSend} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(onSend).toHaveBeenCalledTimes(2);
  });
  it('does not clear the draft when synchronous consumer dispatch fails', () => {
    const onValueChange = vi.fn();
    const failure = new Error('consumer dispatch failed');
    const errors: Error[] = [];
    const handleError = (event: ErrorEvent) => {
      errors.push(event.error as Error);
      event.preventDefault();
    };
    window.addEventListener('error', handleError);
    try {
      render(
        <SideKickInput
          {...base}
          onSend={() => {
            throw failure;
          }}
          onValueChange={onValueChange}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Senden' }));
      expect(errors).toContain(failure);
      expect(onValueChange).not.toHaveBeenCalled();
    } finally {
      window.removeEventListener('error', handleError);
    }
  });
  it('keeps prompt actions separate from draft submission and disables both during pending', () => {
    const onSend = vi.fn();
    const onPrompt = vi.fn();
    const onValueChange = vi.fn();
    const props = {
      ...base,
      onSend,
      onPrompt,
      onValueChange,
      prompts: [{ id: 'prompt', label: 'Prompt' }],
    };
    const { rerender } = render(<SideKickInput {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'Prompt' }));
    expect(onPrompt).toHaveBeenCalledWith('prompt');
    expect(onSend).not.toHaveBeenCalled();
    expect(onValueChange).not.toHaveBeenCalled();
    rerender(<SideKickInput {...props} pending />);
    expect(screen.getByRole('button', { name: 'Prompt' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Senden' })).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveAttribute('contenteditable', 'true');
  });
  it('acknowledges clearing an attachment-only draft before allowing another dispatch', () => {
    const onSend = vi.fn();
    const props: SideKickInputProps = {
      ...base,
      value: { version: 1, content: [] },
      allowAttachmentOnly: true,
      attachments: [{ id: 'file', content: 'File', removeLabel: 'Remove' }],
      onAttachmentRemove: () => undefined,
      onSend,
    };
    const { rerender } = render(<SideKickInput {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'Senden' }));
    fireEvent.click(screen.getByRole('button', { name: 'Senden' }));
    expect(onSend).toHaveBeenCalledOnce();
    rerender(<SideKickInput {...props} value={{ version: 1, content: [] }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Senden' }));
    expect(onSend).toHaveBeenCalledTimes(2);
  });
  it('keeps agent and model identities with the same external ID distinct', async () => {
    const onValueChange = vi.fn();
    const identity = { id: 'same', label: 'Agent', shortLabel: 'A' };
    const selection = { kind: 'agent' as const, id: 'same' };
    const props: SideKickInputProps = {
      ...base,
      agentSelector: {
        value: selection,
        selectedIdentity: identity,
        automatic: { label: 'Automatic', shortLabel: 'Auto' },
        recentAgents: [identity],
        recentModels: [{ ...identity, label: 'Model' }],
        recentAgentsLabel: 'Agents',
        recentModelsLabel: 'Models',
        onValueChange,
      },
    };
    render(<SideKickInput {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'KI-Kontext: Agent' }));
    const model = await screen.findByRole('menuitemradio', { name: 'Model' });
    expect(model).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('menuitemradio', { name: 'Agent' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    fireEvent.click(model);
    expect(onValueChange).toHaveBeenCalledWith({ kind: 'model', id: 'same' });
  });
});
