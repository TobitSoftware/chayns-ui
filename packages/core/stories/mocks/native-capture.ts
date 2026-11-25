import type {
  NativeRecognition,
  RecognitionEvent,
} from '../../src/components/message-composer/hooks/speech-recognition.js';

/** Story-scoped deterministic browser API doubles; never included in package output. */
export class StoryRecognition implements NativeRecognition {
  static current: StoryRecognition | undefined;
  lang = '';
  continuous = false;
  interimResults = false;
  onstart: (() => void) | null = null;
  onresult: ((event: RecognitionEvent) => void) | null = null;
  onend: (() => void) | null = null;
  onerror: ((event: { error: string }) => void) | null = null;
  constructor() {
    StoryRecognition.current = this;
  }
  start() {
    this.onstart?.();
  }
  stop() {
    this.onend?.();
  }
  abort() {
    this.onend?.();
  }
  result(text: string, isFinal: boolean) {
    this.onresult?.({ results: [{ isFinal, 0: { transcript: text } }] });
  }
}
export const storyTrack = {
  enabled: true,
  stopped: false,
  onended: null as (() => void) | null,
  stop() {
    this.stopped = true;
  },
};
export function installCaptureMocks() {
  const recognition = Object.getOwnPropertyDescriptor(window, 'SpeechRecognition');
  const devices = Object.getOwnPropertyDescriptor(navigator, 'mediaDevices');
  const audioContext = Object.getOwnPropertyDescriptor(window, 'AudioContext');
  StoryRecognition.current = undefined;
  storyTrack.enabled = true;
  storyTrack.stopped = false;
  storyTrack.onended = null;
  Object.defineProperty(window, 'SpeechRecognition', {
    configurable: true,
    value: StoryRecognition,
  });
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: {
      getUserMedia: () =>
        Promise.resolve({
          getTracks: () => [storyTrack],
          getAudioTracks: () => [storyTrack],
        }),
    },
  });
  Object.defineProperty(window, 'AudioContext', {
    configurable: true,
    value: class {
      state = 'running';
      createAnalyser() {
        return {
          fftSize: 256,
          getByteTimeDomainData: (samples: Uint8Array) => samples.fill(128),
          connect() {
            return undefined;
          },
          disconnect() {
            return undefined;
          },
        };
      }
      createMediaStreamSource() {
        return {
          connect() {
            return undefined;
          },
          disconnect() {
            return undefined;
          },
        };
      }
      resume() {
        return Promise.resolve();
      }
      close() {
        return Promise.resolve();
      }
    },
  });
  return () => {
    if (recognition) Object.defineProperty(window, 'SpeechRecognition', recognition);
    else Reflect.deleteProperty(window, 'SpeechRecognition');
    if (devices) Object.defineProperty(navigator, 'mediaDevices', devices);
    else Reflect.deleteProperty(navigator, 'mediaDevices');
    if (audioContext) Object.defineProperty(window, 'AudioContext', audioContext);
    else Reflect.deleteProperty(window, 'AudioContext');
  };
}
