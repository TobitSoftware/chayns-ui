import { StoryRecognition } from '../stories/mocks/native-capture.js';
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useComposerCapture } from '../src/components/message-composer/hooks/useComposerCapture.js';
import type {
  MessageComposerProps,
  VoiceOptions,
} from '../src/components/message-composer/MessageComposer.types.js';
import { composerLabels } from '../stories/examples/ComposerLabels.js';

const base: MessageComposerProps = {
  'aria-label': 'Draft',
  labels: composerLabels,
  layout: 'twoLine',
  value: { version: 1, content: [] },
  onValueChange: () => undefined,
};
function media() {
  const track = { enabled: true, stop: vi.fn(), onended: null as (() => void) | null };
  const stream = {
    getTracks: () => [track],
    getAudioTracks: () => [track],
  } as unknown as MediaStream;
  return { track, stream };
}
function permission() {
  let resolve!: (stream: MediaStream) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<MediaStream>((success, failure) => {
    resolve = success;
    reject = failure;
  });
  const getUserMedia = vi.fn(() => promise);
  vi.stubGlobal('isSecureContext', true);
  vi.stubGlobal('navigator', { mediaDevices: { getUserMedia } });
  return { resolve, reject, getUserMedia };
}
function voice(): VoiceOptions {
  return { state: 'idle', onStream: vi.fn(), onEnd: vi.fn() };
}
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('component-owned voice capture', () => {
  it('never requests permission on mount and detects support after mounting', async () => {
    const request = permission();
    const { result } = renderHook(() =>
      useComposerCapture(
        { ...base, voice: voice() },
        () => undefined,
        () => undefined,
      ),
    );
    await waitFor(() => expect(result.current.support.voice).toBe(true));
    expect(request.getUserMedia).not.toHaveBeenCalled();
  });
  it('hands out one stream, mutes tracks and ends exactly once', async () => {
    const request = permission();
    const owned = media();
    const options = voice();
    const focus = vi.fn();
    const { result, rerender } = renderHook(
      (props: MessageComposerProps) => useComposerCapture(props, () => undefined, focus),
      { initialProps: { ...base, voice: options } },
    );
    let start!: Promise<void>;
    act(() => {
      start = result.current.startVoice();
    });
    expect(request.getUserMedia).toHaveBeenCalledWith({ audio: true, video: false });
    await act(async () => {
      request.resolve(owned.stream);
      await start;
    });
    expect(options.onStream).toHaveBeenCalledExactlyOnceWith(owned.stream);
    rerender({ ...base, voice: { ...options, state: 'connected' } });
    act(() => result.current.toggleMute());
    expect(owned.track.enabled).toBe(false);
    act(() => result.current.toggleMute());
    expect(owned.track.enabled).toBe(true);
    act(() => result.current.endVoice());
    act(() => result.current.endVoice());
    expect(options.onEnd).toHaveBeenCalledOnce();
    expect(owned.track.stop).toHaveBeenCalledOnce();
    expect(focus).toHaveBeenCalled();
  });
  it.each(['end', 'unmount'] as const)(
    'stops late permission success after %s without handing out the stream',
    async (kind) => {
      const request = permission();
      const owned = media();
      const options = voice();
      const { result, unmount } = renderHook(() =>
        useComposerCapture(
          { ...base, voice: options },
          () => undefined,
          () => undefined,
        ),
      );
      let start!: Promise<void>;
      act(() => {
        start = result.current.startVoice();
      });
      if (kind === 'end') act(() => result.current.endVoice());
      else unmount();
      await act(async () => {
        request.resolve(owned.stream);
        await start;
      });
      expect(options.onStream).not.toHaveBeenCalled();
      expect(owned.track.stop).toHaveBeenCalledOnce();
    },
  );
  it('reports a native permission error without exposing an exception as display text', async () => {
    const request = permission();
    const onCaptureError = vi.fn();
    const { result } = renderHook(() =>
      useComposerCapture(
        { ...base, voice: voice(), onCaptureError },
        () => undefined,
        () => undefined,
      ),
    );
    let start!: Promise<void>;
    act(() => {
      start = result.current.startVoice();
    });
    await act(async () => {
      request.reject(new DOMException('permission denied', 'NotAllowedError'));
      await start;
    });
    expect(onCaptureError).toHaveBeenCalledWith({ source: 'voice', code: 'NotAllowedError' });
    expect(result.current.isActive).toBe(false);
  });
  it('cleans up a handed-out stream on unmount and notifies transport exactly once', async () => {
    const request = permission();
    const owned = media();
    const options = voice();
    const { result, unmount } = renderHook(() =>
      useComposerCapture(
        { ...base, voice: options },
        () => undefined,
        () => undefined,
      ),
    );
    let start!: Promise<void>;
    act(() => {
      start = result.current.startVoice();
    });
    await act(async () => {
      request.resolve(owned.stream);
      await start;
    });
    unmount();
    expect(options.onEnd).toHaveBeenCalledOnce();
    expect(owned.track.stop).toHaveBeenCalledOnce();
  });
  it('ends capture when a handed-out track ends', async () => {
    const request = permission();
    const owned = media();
    const options = voice();
    const { result } = renderHook(() =>
      useComposerCapture(
        { ...base, voice: options },
        () => undefined,
        () => undefined,
      ),
    );
    let start!: Promise<void>;
    act(() => {
      start = result.current.startVoice();
    });
    await act(async () => {
      request.resolve(owned.stream);
      await start;
    });
    act(() => owned.track.onended?.());
    expect(options.onEnd).toHaveBeenCalledOnce();
    expect(result.current.isActive).toBe(false);
  });
  it('releases microphone tracks if the consumer stream callback throws', async () => {
    const request = permission();
    const owned = media();
    const options = {
      ...voice(),
      onStream: () => {
        throw new Error('consumer failed');
      },
    };
    const { result } = renderHook(() =>
      useComposerCapture(
        { ...base, voice: options },
        () => undefined,
        () => undefined,
      ),
    );
    let start!: Promise<void>;
    act(() => {
      start = result.current.startVoice();
    });
    await act(async () => {
      request.resolve(owned.stream);
      await expect(start).rejects.toThrow('consumer failed');
    });
    expect(owned.track.stop).toHaveBeenCalledOnce();
    expect(result.current.isActive).toBe(false);
  });
  it('ignores repeated start requests before permission resolves', async () => {
    const request = permission();
    const owned = media();
    const options = voice();
    const { result } = renderHook(() =>
      useComposerCapture(
        { ...base, voice: options },
        () => undefined,
        () => undefined,
      ),
    );
    let start!: Promise<void>;
    act(() => {
      start = result.current.startVoice();
      void result.current.startVoice();
    });
    await act(async () => {
      request.resolve(owned.stream);
      await start;
    });
    expect(request.getUserMedia).toHaveBeenCalledOnce();
    expect(options.onStream).toHaveBeenCalledOnce();
  });
  it.each(['disabled', 'readOnly', 'replacement', 'removed', 'error'] as const)(
    'releases handed-out tracks after %s and notifies the original transport',
    async (change) => {
      const request = permission();
      const owned = media();
      const options = voice();
      const props: MessageComposerProps = { ...base, voice: options };
      const { result, rerender, unmount } = renderHook(
        (next: MessageComposerProps) =>
          useComposerCapture(
            next,
            () => undefined,
            () => undefined,
          ),
        { initialProps: props },
      );
      let start!: Promise<void>;
      act(() => {
        start = result.current.startVoice();
      });
      await act(async () => {
        request.resolve(owned.stream);
        await start;
      });
      if (change === 'replacement')
        rerender({
          ...props,
          value: { version: 1, content: [{ type: 'text', text: 'Restored draft' }] },
        });
      else if (change === 'removed') {
        const { voice: removed, ...rest } = props;
        void removed;
        rerender(rest);
      } else if (change === 'error') rerender({ ...props, voice: { ...options, state: 'error' } });
      else rerender({ ...props, [change]: true });
      expect(owned.track.stop).toHaveBeenCalledOnce();
      expect(options.onEnd).toHaveBeenCalledOnce();
      expect(result.current.isActive).toBe(false);
      unmount();
      expect(options.onEnd).toHaveBeenCalledOnce();
    },
  );
  it('unlocks and releases tracks even when the transport end callback throws', async () => {
    const request = permission();
    const owned = media();
    const options = {
      ...voice(),
      onEnd: vi.fn(() => {
        throw new Error('transport end failed');
      }),
    };
    const { result, unmount } = renderHook(() =>
      useComposerCapture(
        { ...base, voice: options },
        () => undefined,
        () => undefined,
      ),
    );
    let start!: Promise<void>;
    act(() => {
      start = result.current.startVoice();
    });
    await act(async () => {
      request.resolve(owned.stream);
      await start;
    });
    act(() => {
      expect(() => result.current.endVoice()).toThrow('transport end failed');
    });
    expect(result.current.isActive).toBe(false);
    expect(owned.track.stop).toHaveBeenCalledOnce();
    unmount();
    expect(options.onEnd).toHaveBeenCalledOnce();
  });
});

describe('default capture configuration', () => {
  it('starts voice with only a stream callback and releases tracks without an end callback', async () => {
    const request = permission();
    const owned = media();
    const onStream = vi.fn();
    const { result } = renderHook(() =>
      useComposerCapture(
        { ...base, voice: { onStream } },
        () => undefined,
        () => undefined,
      ),
    );
    let start!: Promise<void>;
    act(() => {
      start = result.current.startVoice();
    });
    await act(async () => {
      request.resolve(owned.stream);
      await start;
    });
    expect(onStream).toHaveBeenCalledExactlyOnceWith(owned.stream);
    act(() => result.current.endVoice());
    expect(owned.track.stop).toHaveBeenCalledOnce();
    expect(result.current.isActive).toBe(false);
  });
});

describe('native dictation defaults', () => {
  it.each([
    {
      name: 'explicit override',
      override: 'de-DE',
      editorLanguage: 'fr-FR',
      ancestorLanguage: 'it-IT',
      documentLanguage: 'es-ES',
      expected: 'de-DE',
    },
    {
      name: 'editor language',
      editorLanguage: 'fr-FR',
      ancestorLanguage: 'it-IT',
      documentLanguage: 'es-ES',
      expected: 'fr-FR',
    },
    {
      name: 'ancestor language',
      ancestorLanguage: 'it-IT',
      documentLanguage: 'es-ES',
      expected: 'it-IT',
    },
    { name: 'document language', documentLanguage: 'es-ES', expected: 'es-ES' },
    { name: 'browser language', expected: 'en-GB' },
  ])('resolves $name without requiring a dictation configuration', async (test) => {
    vi.stubGlobal('SpeechRecognition', StoryRecognition);
    vi.stubGlobal('navigator', { language: 'en-GB' });
    const previous = document.documentElement.lang;
    const ancestor = document.createElement('div');
    ancestor.lang = 'ancestorLanguage' in test ? test.ancestorLanguage : '';
    const editor = document.createElement('div');
    ancestor.append(editor);
    document.body.append(ancestor);
    document.documentElement.lang = 'documentLanguage' in test ? test.documentLanguage : '';
    try {
      const { result } = renderHook(() =>
        useComposerCapture(
          {
            ...base,
            ...('editorLanguage' in test ? { lang: test.editorLanguage } : {}),
            ...('override' in test ? { dictation: { language: test.override } } : {}),
          },
          () => undefined,
          () => undefined,
          { current: editor },
        ),
      );
      await waitFor(() => expect(result.current.support.dictation).toBe(true));
      act(() => result.current.startDictation());
      expect(StoryRecognition.current!.lang).toBe(test.expected);
      act(() => result.current.pause());
      act(() => result.current.resume());
      expect(StoryRecognition.current!.lang).toBe(test.expected);
    } finally {
      ancestor.remove();
      document.documentElement.lang = previous;
    }
  });
});
