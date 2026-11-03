export interface RecognitionResult {
  readonly isFinal: boolean;
  readonly 0: { readonly transcript: string };
}
export interface RecognitionEvent {
  readonly results: ArrayLike<RecognitionResult>;
}
export interface NativeRecognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: (() => void) | null;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
export type RecognitionConstructor = new () => NativeRecognition;
export type DictationState = 'idle' | 'starting' | 'listening' | 'pausing' | 'paused' | 'ending';
const STOP_TIMEOUT = 2000;

export function recognitionConstructor(): RecognitionConstructor | undefined {
  if (typeof window === 'undefined') return undefined;
  const browser = window as Window & {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
}

/** Owns one dictation session across explicit recognition runs, including late events. */
export class DictationSession {
  private recognition: NativeRecognition | null = null;
  private committed = '';
  private state: DictationState = 'idle';
  private generation = 0;
  private deadline: ReturnType<typeof setTimeout> | undefined;
  private disposed = false;

  constructor(
    private callbacks: {
      value(text: string): void;
      state(state: DictationState): void;
      error(code: string): void;
    },
  ) {}

  private transition(state: DictationState) {
    this.state = state;
    if (!this.disposed) this.callbacks.state(state);
  }

  start(language: string) {
    if (this.state !== 'idle' && this.state !== 'paused') return;
    const Constructor = recognitionConstructor();
    if (!Constructor) {
      this.fail('not-supported');
      return;
    }
    let recognition: NativeRecognition;
    try {
      recognition = new Constructor();
    } catch {
      this.fail('start-failed');
      return;
    }
    this.recognition = recognition;
    const generation = ++this.generation;
    const base = this.committed;
    const isCurrent = () => !this.disposed && generation === this.generation;
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = () => {
      if (isCurrent() && this.state === 'starting') this.transition('listening');
    };
    recognition.onresult = (event) => {
      if (!isCurrent()) return;
      let final = base;
      let interim = '';
      for (const result of Array.from(event.results)) {
        if (result.isFinal) final += result[0].transcript;
        else interim += result[0].transcript;
      }
      this.committed = final;
      this.callbacks.value(final + interim);
    };
    recognition.onend = () => {
      if (!isCurrent()) return;
      clearTimeout(this.deadline);
      ++this.generation;
      this.recognition = null;
      this.callbacks.value(this.committed);
      this.transition(this.state === 'ending' ? 'idle' : 'paused');
    };
    recognition.onerror = (event) => {
      if (isCurrent()) this.fail(event.error);
    };
    this.transition('starting');
    try {
      recognition.start();
    } catch (error) {
      this.fail(error instanceof Error ? error.name : 'start-failed');
    }
  }

  pause() {
    if (this.state === 'listening' || this.state === 'starting') this.stop('pausing');
  }

  end() {
    if (this.state === 'paused') this.transition('idle');
    else if (this.state !== 'idle') this.stop('ending');
  }

  private stop(next: 'pausing' | 'ending') {
    this.transition(next);
    clearTimeout(this.deadline);
    this.deadline = setTimeout(() => this.fail('stop-timeout'), STOP_TIMEOUT);
    try {
      this.recognition?.stop();
    } catch (error) {
      this.fail(error instanceof Error ? error.name : 'stop-failed');
    }
  }

  private fail(code: string) {
    this.cancel();
    if (!this.disposed) {
      this.callbacks.value(this.committed);
      this.callbacks.error(code);
    }
  }

  cancel() {
    ++this.generation;
    clearTimeout(this.deadline);
    const recognition = this.recognition;
    this.recognition = null;
    try {
      recognition?.abort();
    } catch {
      /* Cleanup must still complete if a browser rejects abort. */
    }
    this.transition('idle');
  }

  dispose() {
    this.disposed = true;
    this.cancel();
  }
}
