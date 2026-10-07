import { StrictMode } from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Tabs } from '../src/components/tabs/Tabs.js';

interface Motion {
  node: HTMLElement;
  keyframes: Keyframe[];
  options: KeyframeAnimationOptions;
  animation: Animation;
  cancel: ReturnType<typeof vi.fn>;
  complete: () => void;
}
const motions: Motion[] = [];
const preference = Object.assign(new EventTarget(), { matches: false });
const previousAnimate = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'animate');

function Example({
  value,
  ref,
}: {
  value: string;
  ref?: (node: HTMLDivElement | null) => (() => void) | void;
}) {
  return (
    <Tabs value={value}>
      <Tabs.List aria-label="Views">
        {['one', 'two', 'three'].map((entry) => (
          <Tabs.Tab key={entry} value={entry}>
            {entry}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {['one', 'two', 'three'].map((entry) => (
        <Tabs.Panel key={entry} value={entry} {...(entry === 'one' && ref ? { ref } : {})}>
          <button>{entry} action</button>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

beforeEach(() => {
  motions.length = 0;
  preference.matches = false;
  vi.stubGlobal('matchMedia', () => preference);
  Object.defineProperty(HTMLElement.prototype, 'animate', {
    configurable: true,
    value: function (this: HTMLElement, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
      let resolve: (() => void) | undefined;
      const finished = new Promise<void>((complete) => {
        resolve = complete;
      });
      const cancel = vi.fn();
      const animation = { finished, cancel, playState: 'running' } as unknown as Animation;
      motions.push({
        node: this,
        keyframes,
        options,
        animation,
        cancel,
        complete: () => {
          Object.defineProperty(animation, 'playState', { value: 'finished' });
          resolve?.();
        },
      });
      return animation;
    },
  });
});
afterEach(() => {
  vi.unstubAllGlobals();
  if (previousAnimate) Object.defineProperty(HTMLElement.prototype, 'animate', previousAnimate);
  else Reflect.deleteProperty(HTMLElement.prototype, 'animate');
});

async function finish(motion: Motion) {
  await act(async () => {
    motion.complete();
    await motion.animation.finished;
  });
}

describe('Tabs panel crossfade', () => {
  it('does not animate an invalid initial view or schedule observation frames indefinitely without enabled tabs', async () => {
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frames.push(callback);
      return frames.length;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    const { container } = render(
      <Tabs appearance="underline" defaultValue="one">
        <Tabs.List aria-label="Unavailable views">
          <Tabs.Tab value="one" disabled>
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" disabled>
            Two
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">Invalid initial content</Tabs.Panel>
        <Tabs.Panel value="two">Other content</Tabs.Panel>
      </Tabs>,
    );
    expect(container.querySelector('[role=tabpanel]')).toBeNull();
    expect(motions).toHaveLength(0);
    const list = screen.getByRole('tablist');
    await act(async () => {
      list.setAttribute('data-layout-probe', 'changed');
      await Promise.resolve();
    });
    expect(frames).toHaveLength(1);
    await act(async () => {
      frames[0]?.(0);
      await Promise.resolve();
    });
    expect(frames).toHaveLength(1);
  });

  it('does not animate the initial panel during StrictMode effect replay', () => {
    const { rerender } = render(
      <StrictMode>
        <Example value="one" />
      </StrictMode>,
    );
    expect(motions).toHaveLength(0);
    rerender(
      <StrictMode>
        <Example value="two" />
      </StrictMode>,
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('two action');
    expect(motions.some((motion) => motion.options.duration === 220)).toBe(true);
  });

  it('keeps initial content immediate and hides the outgoing panel from interaction and AT', async () => {
    const { rerender } = render(<Example value="one" />);
    expect(motions).toHaveLength(0);
    rerender(<Example value="two" />);
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('two action');
    const outgoing = screen.getByText('one action').closest('[role=tabpanel]');
    expect(outgoing).toHaveAttribute('inert');
    expect(outgoing).toHaveAttribute('aria-hidden', 'true');
    expect(outgoing).toHaveAttribute('tabindex', '-1');
    expect(motions.map((motion) => motion.options.duration)).toEqual([200, 220]);
    expect(motions[0]?.keyframes).toEqual([{ opacity: '1' }, { opacity: '0' }]);
    await finish(motions[0]!);
    expect(screen.queryByText('one action')).toBeNull();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('two action');
  });

  it('bounds rapid switches to one exit and prevents obsolete completion from removing the latest view', async () => {
    const { rerender } = render(<Example value="one" />);
    rerender(<Example value="two" />);
    const oldExit = motions[0]!;
    rerender(<Example value="three" />);
    expect(screen.queryByText('one action')).toBeNull();
    expect(screen.getByText('two action').closest('[role=tabpanel]')).toHaveAttribute('inert');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('three action');
    expect(oldExit.cancel).toHaveBeenCalled();
    await finish(oldExit);
    expect(screen.getByText('two action')).toBeInTheDocument();
    await finish(
      motions.find(
        (motion) => motion.node.textContent === 'two action' && motion.options.duration === 200,
      )!,
    );
    expect(screen.queryByText('two action')).toBeNull();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('three action');
  });

  it('switches immediately with Reduced Motion', () => {
    preference.matches = true;
    const { rerender } = render(<Example value="one" />);
    rerender(<Example value="two" />);
    expect(motions).toHaveLength(0);
    expect(screen.queryByText('one action')).toBeNull();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('two action');
  });

  it('finishes an existing exit when Reduced Motion becomes enabled', () => {
    const { rerender } = render(<Example value="one" />);
    rerender(<Example value="two" />);
    act(() => {
      preference.matches = true;
      preference.dispatchEvent(new Event('change'));
    });
    expect(screen.queryByText('one action')).toBeNull();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('two action');
    for (const motion of motions) expect(motion.cancel).toHaveBeenCalled();
  });

  it('retains the native ref through exit and invokes its cleanup exactly on unmount', async () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { rerender } = render(<Example value="one" ref={ref} />);
    const native = screen.getByRole('tabpanel');
    expect(ref).toHaveBeenCalledWith(native);
    rerender(<Example value="two" ref={ref} />);
    expect(ref).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();
    await finish(motions[0]!);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it('cancels owned transitions when the root unmounts', () => {
    const { rerender, unmount } = render(<Example value="one" />);
    rerender(<Example value="two" />);
    unmount();
    for (const motion of motions) expect(motion.cancel).toHaveBeenCalled();
  });
});
