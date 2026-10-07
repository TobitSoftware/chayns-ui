import { expect } from 'storybook/test';

/** Check the native animation endpoint before React processes exit completion. */
export default async function checkTabPanelExit(canvasElement: HTMLElement) {
  const outgoing = canvasElement.querySelector<HTMLElement>('[role="tabpanel"][inert]');
  const animation = outgoing?.getAnimations()[0];
  // Reduced Motion and platforms without animation support remove exits immediately.
  if (!outgoing || !animation) return;

  animation.finish();
  const opacityAtCompletion = getComputedStyle(outgoing).opacity;
  await expect(opacityAtCompletion).toBe('0');
}
