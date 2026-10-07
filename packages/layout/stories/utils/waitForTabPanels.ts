import { within } from 'storybook/test';

/** Run the final-state a11y audit after real panel animations settle, without guessed delays. */
export default async function waitForTabPanels(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await Promise.allSettled(
    canvas
      .getAllByRole('tabpanel', { hidden: true })
      .flatMap((panel) => panel.getAnimations().map((animation) => animation.finished)),
  );
}
