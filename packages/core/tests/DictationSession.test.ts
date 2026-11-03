import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DictationSession,
  recognitionConstructor,
} from '../src/components/message-composer/hooks/speech-recognition.js';
import type {
  NativeRecognition,
  RecognitionEvent,
} from '../src/components/message-composer/hooks/speech-recognition.js';

class RecognitionMock implements NativeRecognition {
  static instances: RecognitionMock[] = [];
  lang = '';
  interimResults = false;
  continuous = false;
  onstart: (() => void) | null = null;
  onresult: ((event: RecognitionEvent) => void) | null = null;
  onend: (() => void) | null = null;
  onerror: ((event: { error: string }) => void) | null = null;
  start = vi.fn();
  stop = vi.fn();
  abort = vi.fn();
  constructor() {
    RecognitionMock.instances.push(this);
  }
}
function setup() {
  const callbacks = {
    value: vi.fn<(text: string) => void>(),
    state: vi.fn<(state: string) => void>(),
    error: vi.fn<(code: string) => void>(),
  };
  const session = new DictationSession(callbacks);
  return { session, callbacks };
}
function result(...items: [string, boolean][]): RecognitionEvent {
  return { results: items.map(([transcript, isFinal]) => ({ isFinal, 0: { transcript } })) };
}
function current() {
  return RecognitionMock.instances.at(-1)!;
}

beforeEach(() => {
  RecognitionMock.instances = [];
  vi.stubGlobal('SpeechRecognition', RecognitionMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('native dictation session', () => {
  it('uses the explicit language and replaces provisional results instead of duplicating them', () => {
    const { session, callbacks } = setup();
    session.start('de-DE');
    const recognition = current();
    expect(recognition).toMatchObject({ lang: 'de-DE', continuous: true, interimResults: true });
    recognition.onstart?.();
    recognition.onresult?.(result(['Hal', false]));
    recognition.onresult?.(result(['Hallo', false]));
    recognition.onresult?.(result(['Hallo ', true], ['Welt', false]));
    expect(callbacks.value.mock.calls.map(([value]) => value)).toEqual([
      'Hal',
      'Hallo',
      'Hallo Welt',
    ]);
    recognition.onend?.();
    expect(callbacks.value).toHaveBeenLastCalledWith('Hallo ');
    expect(callbacks.state).toHaveBeenLastCalledWith('paused');
  });
  it('waits for final results before pause, resumes at committed end and ignores old callbacks', () => {
    const { session, callbacks } = setup();
    session.start('de-DE');
    const first = current();
    session.pause();
    expect(callbacks.state).toHaveBeenLastCalledWith('pausing');
    expect(first.stop).toHaveBeenCalledOnce();
    session.start('de-DE');
    expect(RecognitionMock.instances).toHaveLength(1);
    first.onresult?.(result(['Hallo ', true]));
    first.onend?.();
    session.start('de-DE');
    const second = current();
    first.onresult?.(result(['STALE', true]));
    second.onresult?.(result(['Welt', true]));
    expect(callbacks.value).toHaveBeenLastCalledWith('Hallo Welt');
    session.end();
    second.onend?.();
    expect(callbacks.state).toHaveBeenLastCalledWith('idle');
  });
  it('can end immediately from pause without another stop request', () => {
    const { session, callbacks } = setup();
    session.start('en-GB');
    current().onend?.();
    session.end();
    expect(callbacks.state).toHaveBeenLastCalledWith('idle');
    expect(current().stop).not.toHaveBeenCalled();
  });
  it('bounds a missing onend and keeps only finalized content', () => {
    vi.useFakeTimers();
    const { session, callbacks } = setup();
    session.start('en-GB');
    current().onresult?.(result(['Final ', true], ['interim', false]));
    session.end();
    vi.advanceTimersByTime(2000);
    expect(current().abort).toHaveBeenCalledOnce();
    expect(callbacks.value).toHaveBeenLastCalledWith('Final ');
    expect(callbacks.error).toHaveBeenCalledWith('stop-timeout');
    expect(callbacks.state).toHaveBeenLastCalledWith('idle');
  });
  it('reports permission errors once and discards late results', () => {
    const { session, callbacks } = setup();
    session.start('en-GB');
    const recognition = current();
    recognition.onerror?.({ error: 'not-allowed' });
    recognition.onerror?.({ error: 'not-allowed' });
    recognition.onresult?.(result(['late', true]));
    expect(callbacks.error).toHaveBeenCalledExactlyOnceWith('not-allowed');
    expect(callbacks.value).toHaveBeenLastCalledWith('');
  });
  it('aborts on disposal without emitting any further state, value or error callbacks', () => {
    const { session, callbacks } = setup();
    session.start('en-GB');
    const recognition = current();
    session.dispose();
    Object.values(callbacks).forEach((callback) => callback.mockClear());
    recognition.onresult?.(result(['late', true]));
    recognition.onend?.();
    recognition.onerror?.({ error: 'aborted' });
    Object.values(callbacks).forEach((callback) => expect(callback).not.toHaveBeenCalled());
    expect(recognition.abort).toHaveBeenCalledOnce();
  });
  it('supports the prefixed constructor and handles unavailable recognition', () => {
    vi.stubGlobal('SpeechRecognition', undefined);
    vi.stubGlobal('webkitSpeechRecognition', RecognitionMock);
    expect(recognitionConstructor()).toBe(RecognitionMock);
    vi.stubGlobal('webkitSpeechRecognition', undefined);
    const { session, callbacks } = setup();
    session.start('en-GB');
    expect(callbacks.error).toHaveBeenCalledWith('not-supported');
  });
  it('handles synchronous native start and stop failures', () => {
    const { session, callbacks } = setup();
    session.start('en-GB');
    current().stop.mockImplementation(() => {
      throw new Error('failed');
    });
    session.pause();
    expect(callbacks.error).toHaveBeenCalledWith('Error');
  });
});
