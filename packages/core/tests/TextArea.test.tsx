import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TextArea from '../src/components/text-area/TextArea.js';

describe('TextArea', () => {
  it('renders a labelled native textarea and forwards native props, events and ref', async () => {
    const ref = createRef<HTMLTextAreaElement>();
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TextArea
        className="consumer-class"
        data-purpose="message"
        aria-label="Nachricht"
        maxLength={500}
        onChange={onChange}
        placeholder="Schreibe eine Nachricht"
        ref={ref}
        required
        rows={4}
      />,
    );

    const textarea = screen.getByRole('textbox', { name: 'Nachricht' });
    expect(textarea).toBe(ref.current);
    expect(textarea).toHaveAttribute('maxlength', '500');
    expect(textarea).toHaveAttribute('rows', '4');
    expect(textarea).toHaveAttribute('data-purpose', 'message');
    expect(textarea).toHaveClass('consumer-class', 'chayns-text-area__input');
    expect(textarea).toBeRequired();

    await user.type(textarea, 'Hallo');
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('links help and error content while owning aria-invalid', () => {
    render(
      <TextArea
        counter="3 / 500"
        error="Pflichtfeld"
        helpText="Maximal 500 Zeichen"
        aria-label="Nachricht"
      />,
    );

    const textarea = screen.getByRole('textbox', { name: 'Nachricht' });
    const descriptionIds = textarea.getAttribute('aria-describedby')?.split(' ');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(descriptionIds).toHaveLength(2);
    expect(screen.getByText('Maximal 500 Zeichen')).toHaveAttribute('id', descriptionIds?.[0]);
    expect(screen.getByText('Pflichtfeld')).toHaveAttribute('id', descriptionIds?.[1]);
    expect(screen.getByText('3 / 500')).not.toHaveAttribute('id');
  });

  it('uses placeholder as the associated Bodywork floating label', async () => {
    const user = userEvent.setup();

    render(<TextArea placeholder="Nachricht" />);

    const textarea = screen.getByRole('textbox', { name: 'Nachricht' });
    expect(textarea).toHaveAttribute('placeholder', ' ');
    expect(screen.getByText('Nachricht')).toHaveAttribute('for', textarea.id);

    await user.type(textarea, 'Hallo');
    expect(textarea).toHaveValue('Hallo');
  });

  it('preserves native controlled, disabled and readonly behaviour', () => {
    const { rerender } = render(
      <TextArea aria-label="Nachricht" defaultValue="Initial" readOnly />,
    );
    const textarea = screen.getByRole('textbox', { name: 'Nachricht' });
    expect(textarea).toHaveValue('Initial');
    expect(textarea).toHaveAttribute('readonly');

    rerender(
      <TextArea aria-label="Nachricht" disabled value="Controlled" onChange={() => undefined} />,
    );
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveValue('Controlled');
  });

  it('renders safely on the server', () => {
    const markup = renderToString(<TextArea aria-label="Nachricht" helpText="Optional" />);
    expect(markup).toContain('<textarea');
    expect(markup).toContain('Nachricht');
  });
});
