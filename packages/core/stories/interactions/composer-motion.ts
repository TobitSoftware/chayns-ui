import { expect, userEvent, waitFor, within } from 'storybook/test';

function sample(root: HTMLElement, duration: number) {
  const selector = root.querySelector<HTMLElement>('.chayns-message-composer__selector')!;
  const controls = root.querySelector<HTMLElement>('.chayns-message-composer__controls')!;
  const surface = root.querySelector<HTMLElement>('.chayns-message-composer__surface')!;
  const start = performance.now();
  const frames: { selector: number; controls: number; width: number; height: number }[] = [];
  return new Promise<typeof frames>((resolve) => {
    function frame() {
      frames.push({
        selector: selector.getBoundingClientRect().left,
        controls: controls.getBoundingClientRect().left,
        width: controls.getBoundingClientRect().width,
        height: surface.getBoundingClientRect().height,
      });
      if (performance.now() - start < duration) requestAnimationFrame(frame);
      else resolve(frames);
    }
    requestAnimationFrame(frame);
  });
}

/** Real browser frames catch layout displacement that final-state assertions miss. */
export async function checkComposerActionMotion(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const editor = canvas.getByRole('textbox');
  const microphone = await canvas.findByRole('button', { name: 'Diktieren' });
  const voice = canvas.getByRole('button', { name: 'Voice-Chat starten' });
  const selector = canvas.getByRole('button', { name: 'KI-Kontext: Automatisch' });
  const root = editor.closest<HTMLElement>('.chayns-message-composer')!;
  await document.fonts.ready;
  const initial = (await sample(root, 250)).at(-1)!;
  const errors: string[] = [];
  const handleError = (event: ErrorEvent) => errors.push(event.message);
  window.addEventListener('error', handleError);
  try {
    const recording = sample(root, 350);
    await userEvent.type(editor, 'a');
    const frames = await recording;
    const final = frames.at(-1)!;
    for (const [index, frame] of frames.entries()) {
      await expect(frame.controls).toBeCloseTo(initial.controls, 1);
      await expect(frame.width).toBeCloseTo(initial.width, 1);
      await expect(frame.height).toBeCloseTo(initial.height, 1);
      await expect(frame.selector).toBeGreaterThanOrEqual(initial.selector - 0.1);
      await expect(frame.selector).toBeLessThanOrEqual(final.selector + 0.1);
      if (index)
        await expect(frame.selector).toBeGreaterThanOrEqual(frames[index - 1]!.selector - 0.1);
    }
    await expect(final.selector - initial.selector).toBeCloseTo(
      microphone.offsetWidth + parseFloat(getComputedStyle(microphone.parentElement!).columnGap),
      1,
    );
    await expect(microphone).toBeDisabled();
    await expect(microphone).toHaveAttribute('aria-hidden', 'true');
    await expect(microphone).toHaveAttribute('tabindex', '-1');
    await expect(voice).toBeDisabled();
    await expect(getComputedStyle(microphone).opacity).toBe('0');
    const reversing = sample(root, 400);
    await userEvent.keyboard('{Backspace}');
    await userEvent.type(editor, 'b');
    await userEvent.keyboard('{Backspace}');
    for (const frame of await reversing) {
      await expect(frame.selector).toBeGreaterThanOrEqual(initial.selector - 0.1);
      await expect(frame.selector).toBeLessThanOrEqual(final.selector + 0.1);
      await expect(frame.controls).toBeCloseTo(initial.controls, 1);
      await expect(frame.height).toBeCloseTo(initial.height, 1);
    }
    await waitFor(() => expect(canvas.getByRole('button', { name: 'Diktieren' })).toBe(microphone));
    await expect(canvas.getByRole('button', { name: 'Voice-Chat starten' })).toBe(voice);
    await expect(canvas.getByRole('button', { name: 'KI-Kontext: Automatisch' })).toBe(selector);
    await expect(editor).toHaveFocus();
    await expect(errors).toEqual([]);
  } finally {
    window.removeEventListener('error', handleError);
  }
}
