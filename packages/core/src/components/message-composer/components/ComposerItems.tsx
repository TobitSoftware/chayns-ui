import { useEffect, useRef } from 'react';
import Button from '../../button/Button.js';
import ButtonIcon from '../../button/button-icon/ButtonIcon.js';
import IconButton from '../../icon-button/IconButton.js';
import type { DictationState } from '../hooks/speech-recognition.js';
import type { useComposerCapture } from '../hooks/useComposerCapture.js';
import type {
  ComposerAction,
  ComposerAttachment,
  ComposerSnippet,
} from '../MessageComposer.types.js';

export function ComposerSnippets({
  items: snippets,
  isLocked,
  insertText,
}: {
  items: readonly ComposerSnippet[];
  isLocked: boolean;
  insertText: (text: string) => void;
}) {
  return (
    <>
      {snippets.length ? (
        <div className="chayns-message-composer__snippets">
          {snippets.map((snippet) => (
            <Button
              disabled={isLocked || snippet.disabled}
              key={snippet.id}
              onClick={() => insertText(snippet.text)}
              variant="ghost"
            >
              {snippet.label}
            </Button>
          ))}
        </div>
      ) : null}
    </>
  );
}
ComposerSnippets.displayName = 'ComposerSnippets';

export function ComposerAttachments({
  items: attachments,
  isLocked,
  onRemove,
  preserveRemovedFocus,
}: {
  items: readonly ComposerAttachment[];
  isLocked: boolean;
  onRemove: ((id: string) => void) | undefined;
  preserveRemovedFocus: (target: HTMLButtonElement, action: () => void) => void;
}) {
  return (
    <>
      {attachments.length ? (
        <ul className="chayns-message-composer__attachments">
          {attachments.map((attachment) => (
            <li key={attachment.id}>
              <div>{attachment.content}</div>
              <IconButton
                aria-label={attachment.removeLabel}
                disabled={isLocked || attachment.disabled}
                icon="fa-xmark"
                onClick={(event) =>
                  preserveRemovedFocus(event.currentTarget, () => onRemove?.(attachment.id))
                }
                variant="ghost"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
ComposerAttachments.displayName = 'ComposerAttachments';

export function ComposerPrompts({
  prompts,
  isLocked,
  pending,
  onPrompt,
  preserveRemovedFocus,
  isDictating,
  capture,
}: {
  prompts: readonly ComposerAction[];
  isLocked: boolean;
  pending: boolean;
  onPrompt: ((id: string) => void) | undefined;
  preserveRemovedFocus: (target: HTMLButtonElement, action: () => void) => void;
  isDictating: boolean;
  capture: ReturnType<typeof useComposerCapture>;
}) {
  return (
    <>
      {' '}
      {isDictating ? (
        <DictationWaveform
          sampleLevel={capture.sampleDictationLevel}
          state={capture.dictationState}
        />
      ) : prompts.length ? (
        <div
          className="chayns-message-composer__prompts"
          onScroll={(event) => {
            const element = event.currentTarget;
            element.dataset.atStart = String(element.scrollLeft <= 1);
            element.dataset.atEnd = String(
              element.scrollLeft + element.clientWidth >= element.scrollWidth - 1,
            );
          }}
        >
          {prompts.map((prompt) => (
            <button
              className="chayns-message-composer__chip"
              disabled={isLocked || pending || prompt.disabled}
              key={prompt.id}
              onClick={(event) =>
                preserveRemovedFocus(event.currentTarget, () => onPrompt?.(prompt.id))
              }
              onFocus={(event) =>
                event.currentTarget.scrollIntoView?.({
                  block: 'nearest',
                  inline: 'nearest',
                })
              }
              type="button"
            >
              {prompt.icon ? <ButtonIcon icon={prompt.icon} /> : null}
              {prompt.label}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
ComposerPrompts.displayName = 'ComposerPrompts';

function DictationWaveform({
  sampleLevel,
  state,
}: {
  sampleLevel: () => number;
  state: DictationState;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const history = useRef<number[]>([]);
  const rendered = useRef(0);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!element || !context) return;

    const height = 24;
    const barWidth = 3;
    const gap = 1;
    const step = barWidth + gap;
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let frame = 0;
    let lastSample = 0;
    const paused = state === 'paused' || state === 'pausing';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const updateSize = () => {
      const nextWidth = element.getBoundingClientRect().width;
      if (nextWidth === width) return;
      width = nextWidth;
      element.width = Math.round(width * dpr);
      element.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);
    updateSize();

    const animate = (now: number) => {
      if (!width) {
        frame = window.requestAnimationFrame(animate);
        return;
      }

      const bars = Math.max(1, Math.floor(width / step));
      if (!paused && now - lastSample >= 33) {
        const target = sampleLevel();
        rendered.current += (target - rendered.current) * (target > rendered.current ? 0.32 : 0.14);
        if (reducedMotion) history.current = Array.from({ length: bars }, () => rendered.current);
        else {
          history.current.push(rendered.current);
          if (history.current.length > bars) history.current.shift();
        }
        lastSample = now;
      } else if (!paused && !reducedMotion && state !== 'listening') {
        rendered.current *= 0.94;
        if (history.current.length) history.current.shift();
        history.current.push(rendered.current);
      }

      context.clearRect(0, 0, width, height);
      context.fillStyle = getComputedStyle(element).color;
      const visibleHistory = history.current.slice(-bars);
      const levels = Array.from({ length: bars - visibleHistory.length }, () => 0.035).concat(
        visibleHistory,
      );
      levels.forEach((level, index) => {
        const fade = Math.min(1, (index + 1) / 3, (bars - index) / 3);
        const barHeight = Math.max(2, level * (height - 4)) * fade;
        const x = index * step;
        const y = (height - barHeight) / 2;
        context.beginPath();
        context.roundRect(x, y, barWidth, barHeight, 1.5);
        context.fill();
      });
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [sampleLevel, state]);

  return (
    <canvas
      aria-hidden="true"
      className="chayns-message-composer__dictation-waveform"
      ref={canvas}
      width="44"
      height="24"
    />
  );
}
DictationWaveform.displayName = 'DictationWaveform';
