import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { RichTextDocument } from '../../rich-text-editor/RichTextEditor.types.js';
import type { MessageComposerProps, ComposerCaptureError } from '../MessageComposer.types.js';
import {
  documentText,
  normalizeDocument,
  textDocument,
} from '../../rich-text-editor/utils/document.js';
import { DictationSession, recognitionConstructor } from './speech-recognition.js';
import type { DictationState } from './speech-recognition.js';
import { startDictationAudio, supportsDictationAudio } from './dictation-audio.js';
import type { DictationAudioCapture } from './dictation-audio.js';

export function useComposerCapture(
  props: MessageComposerProps,
  focusEditor: () => void,
  focusVoice: () => void,
  editorElement?: RefObject<HTMLDivElement | null>,
) {
  const latest = useRef(props);
  useLayoutEffect(() => {
    latest.current = props;
  });
  const expectedValue = useRef<string | null>(null);
  const session = useRef<DictationSession | null>(null);
  const dictationAudio = useRef<DictationAudioCapture | null>(null);
  const dictationGeneration = useRef(0);
  const dictationHandedOut = useRef(false);
  const dictationEnd = useRef<(() => void) | undefined>(undefined);
  const initialDocument = useRef<RichTextDocument | null>(null);
  const sessionLanguage = useRef('');
  const restoreDictationFocus = useRef(false);
  const stream = useRef<MediaStream | null>(null);
  const generation = useRef(0);
  const handedOut = useRef(false);
  const voiceEnd = useRef<(() => void) | undefined>(undefined);
  const voiceRequested = useRef(false);
  const restoreVoiceFocus = useRef(false);
  const cancelling = useRef(false);
  const mounted = useRef(false);
  const initialVoiceState = useRef(props.voice?.state ?? 'idle');
  const [dictationState, setDictationState] = useState<DictationState>('idle');
  const [voiceState, setVoiceState] = useState<'idle' | 'requesting' | 'active'>('idle');
  const [isMuted, setMuted] = useState(false);
  const [support, setSupport] = useState({ dictation: false, voice: false });
  const [error, setError] = useState<ComposerCaptureError | null>(null);
  const isActive = dictationState !== 'idle' || voiceState !== 'idle';

  function report(source: ComposerCaptureError['source'], code: string) {
    const captureError = { source, code };
    setError(captureError);
    latest.current.onCaptureError?.(captureError);
  }

  function endVoice(restoreFocus = true) {
    ++generation.current;
    voiceRequested.current = false;
    const owned = stream.current;
    stream.current = null;
    owned?.getTracks().forEach((track) => {
      track.onended = null;
      track.stop();
    });
    const notify = handedOut.current ? voiceEnd.current : undefined;
    handedOut.current = false;
    voiceEnd.current = undefined;
    if (mounted.current) {
      setVoiceState('idle');
      setMuted(false);
      restoreVoiceFocus.current = restoreFocus;
    }
    notify?.();
  }

  useLayoutEffect(() => {
    if (voiceState === 'idle' && restoreVoiceFocus.current) {
      restoreVoiceFocus.current = false;
      const active = document.activeElement;
      if (!active || active === document.body || active.closest('.chayns-message-composer'))
        focusVoice();
    }
  });

  const sampleDictationLevel = useCallback(() => dictationAudio.current?.sample() ?? 0, []);

  function endDictationAudio(notify = true) {
    ++dictationGeneration.current;
    const owned = dictationAudio.current;
    dictationAudio.current = null;
    try {
      owned?.dispose();
    } finally {
      const callback = dictationHandedOut.current ? dictationEnd.current : undefined;
      dictationHandedOut.current = false;
      dictationEnd.current = undefined;
      if (notify) callback?.();
    }
  }

  function cancel() {
    cancelling.current = true;
    session.current?.cancel();
    session.current = null;
    endDictationAudio();
    if (voiceRequested.current || stream.current) endVoice(false);
    expectedValue.current = null;
    cancelling.current = false;
  }

  async function startDictation() {
    const options = latest.current.dictation;
    if (
      options?.disabled ||
      latest.current.disabled ||
      latest.current.readOnly ||
      isActive ||
      session.current !== null ||
      voiceRequested.current ||
      documentText(latest.current.value).trim()
    )
      return;
    setError(null);
    const token = ++dictationGeneration.current;
    setDictationState('starting');
    const next = new DictationSession({
      value(text) {
        const document = textDocument(text);
        expectedValue.current = JSON.stringify(document);
        latest.current.onValueChange(document);
      },
      state(state) {
        if (!mounted.current) return;
        setDictationState(state);
        if (state === 'idle') {
          session.current = null;
          endDictationAudio();
          if (!cancelling.current) restoreDictationFocus.current = true;
        }
      },
      error(code) {
        if (mounted.current) report('dictation', code);
      },
    });
    session.current = next;
    initialDocument.current = normalizeDocument(latest.current.value);
    sessionLanguage.current =
      [
        options?.language,
        latest.current.lang,
        editorElement?.current?.closest('[lang]:not([lang=""])')?.getAttribute('lang'),
        document.documentElement.lang,
        navigator.language,
      ]
        .find((language) => language?.trim())
        ?.trim() ?? '';
    expectedValue.current = JSON.stringify(normalizeDocument(latest.current.value));
    focusEditor();
    if (latest.current.value.content.length) {
      const empty = textDocument('');
      expectedValue.current = JSON.stringify(empty);
      latest.current.onValueChange(empty);
    }
    let streamCallbackFailed = false;
    try {
      const audio = await startDictationAudio(() => {
        if (dictationGeneration.current !== token || !mounted.current) return;
        session.current?.cancel();
        session.current = null;
        endDictationAudio();
        if (mounted.current) report('dictation', 'track-ended');
      });
      if (token !== dictationGeneration.current || !mounted.current) {
        audio.dispose();
        return;
      }
      dictationAudio.current = audio;
      dictationEnd.current = options?.onEnd;
      try {
        dictationHandedOut.current = typeof options?.onStream === 'function';
        options?.onStream?.(audio.stream);
        next.start(sessionLanguage.current);
      } catch (failure) {
        streamCallbackFailed = true;
        next.cancel();
        session.current = null;
        endDictationAudio();
        throw failure;
      }
    } catch (failure) {
      if (streamCallbackFailed) throw failure;
      if (token === dictationGeneration.current && mounted.current) {
        session.current = null;
        setDictationState('idle');
        endDictationAudio();
        report(
          'dictation',
          failure &&
            typeof failure === 'object' &&
            'name' in failure &&
            typeof failure.name === 'string'
            ? failure.name
            : failure instanceof Error && failure.message
              ? failure.message
              : 'capture-failed',
        );
      }
    }
  }

  async function startVoice() {
    const options = latest.current.voice;
    if (
      typeof options?.onStream !== 'function' ||
      options.disabled ||
      (options.state ?? 'idle') !== 'idle' ||
      latest.current.disabled ||
      latest.current.readOnly ||
      isActive ||
      session.current !== null ||
      voiceRequested.current ||
      documentText(latest.current.value).trim()
    )
      return;
    setError(null);
    const token = ++generation.current;
    initialVoiceState.current = options.state ?? 'idle';
    voiceRequested.current = true;
    expectedValue.current = JSON.stringify(normalizeDocument(latest.current.value));
    setVoiceState('requesting');
    focusEditor();
    let next: MediaStream;
    try {
      next = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch (failure) {
      if (token === generation.current && mounted.current) {
        voiceRequested.current = false;
        setVoiceState('idle');
        report(
          'voice',
          failure &&
            typeof failure === 'object' &&
            'name' in failure &&
            typeof failure.name === 'string'
            ? failure.name
            : 'capture-failed',
        );
      }
      return;
    }
    if (token !== generation.current || !mounted.current) {
      next.getTracks().forEach((track) => track.stop());
      return;
    }
    stream.current = next;
    handedOut.current = true;
    voiceEnd.current = options.onEnd;
    next.getTracks().forEach((track) => {
      track.onended = () => endVoice();
    });
    setVoiceState('active');
    try {
      options.onStream(next);
    } catch (failure) {
      endVoice(false);
      throw failure;
    }
  }

  useEffect(() => {
    mounted.current = true;
    queueMicrotask(() => {
      if (mounted.current)
        setSupport({
          dictation: !!recognitionConstructor() && supportsDictationAudio(),
          voice: !!window.isSecureContext && !!navigator.mediaDevices?.getUserMedia,
        });
    });
    return () => {
      mounted.current = false;
      session.current?.dispose();
      endDictationAudio();
      endVoice(false);
    };
  }, []);

  useEffect(() => {
    if (!isActive) expectedValue.current = null;
  }, [isActive, props.value]);

  useEffect(() => {
    const serialized = JSON.stringify(normalizeDocument(props.value));
    if (isActive && expectedValue.current !== null && serialized !== expectedValue.current)
      cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  useEffect(() => {
    if (props.disabled || props.readOnly) cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.disabled, props.readOnly]);

  const hasDictationStreamCallback = typeof props.dictation?.onStream === 'function';
  const hasDictationEndCallback = typeof props.dictation?.onEnd === 'function';
  useEffect(() => {
    if (session.current) cancel();
    // The session owns its lifecycle; current props are read through latest.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.dictation?.language,
    props.dictation?.disabled,
    hasDictationStreamCallback,
    hasDictationEndCallback,
  ]);

  useEffect(() => {
    if (
      typeof props.voice?.onStream !== 'function' ||
      props.voice.disabled ||
      props.voice.state === 'error' ||
      (initialVoiceState.current !== 'idle' && (props.voice.state ?? 'idle') === 'idle')
    )
      endVoice(false);
    initialVoiceState.current = props.voice?.state ?? 'idle';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.voice?.disabled, props.voice?.state, typeof props.voice?.onStream]);

  useEffect(() => {
    if (dictationState === 'idle' && restoreDictationFocus.current) {
      restoreDictationFocus.current = false;
      focusEditor();
    }
  });

  function cancelDictation() {
    const original = initialDocument.current;
    cancel();
    initialDocument.current = null;
    if (original) latest.current.onValueChange(original);
    restoreDictationFocus.current = true;
  }

  function toggleMute() {
    const next = !isMuted;
    stream.current?.getAudioTracks().forEach((track) => {
      track.enabled = !next;
    });
    setMuted(next);
  }

  return {
    expectedValue,
    isActive,
    dictationState,
    voiceState,
    isMuted,
    support,
    error,
    startDictation,
    startVoice,
    endVoice,
    toggleMute,
    pause: () => session.current?.pause(),
    resume: () => session.current?.start(sessionLanguage.current),
    cancelDictation,
    endDictation: () => session.current?.end(),
    sampleDictationLevel,
  };
}
