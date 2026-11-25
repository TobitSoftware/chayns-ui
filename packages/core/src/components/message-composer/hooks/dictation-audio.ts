export interface DictationAudioCapture {
  readonly stream: MediaStream;
  sample(): number;
  dispose(): void;
}

export function supportsDictationAudio() {
  return (
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    !!navigator.mediaDevices?.getUserMedia &&
    !!(
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    )
  );
}

export async function startDictationAudio(
  onTrackEnded: () => void,
): Promise<DictationAudioCapture> {
  const AudioContextConstructor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia || !AudioContextConstructor)
    throw new Error('not-supported');

  const context = new AudioContextConstructor();
  let stream: MediaStream | null = null;
  let source: MediaStreamAudioSourceNode | null = null;
  let streamRequest: Promise<MediaStream> | null = null;
  let disposed = false;
  const analyser = context.createAnalyser();
  analyser.fftSize = 256;
  const samples = new Uint8Array(analyser.fftSize);

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    source?.disconnect();
    analyser.disconnect();
    stream?.getTracks().forEach((track) => {
      track.onended = null;
      track.stop();
    });
    void context.close();
  };

  try {
    streamRequest = navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const resumed =
      context.state === 'suspended'
        ? context.resume().then(
            () => undefined,
            (error: unknown) => error,
          )
        : Promise.resolve(undefined);
    stream = await streamRequest;
    source = context.createMediaStreamSource(stream);
    source.connect(analyser);
    const resumeFailure = await resumed;
    if (resumeFailure)
      throw new Error(
        resumeFailure instanceof Error ? resumeFailure.message : 'audio-context-resume-failed',
      );
    if (context.state !== 'running') throw new Error('audio-context-unavailable');

    const capture: DictationAudioCapture = {
      stream,
      sample() {
        if (disposed) return 0;
        analyser.getByteTimeDomainData(samples);
        let sum = 0;
        for (const sample of samples) {
          const normalized = (sample - 128) / 128;
          sum += normalized * normalized;
        }
        return Math.min(1, Math.sqrt(sum / samples.length) * 4);
      },
      dispose,
    };

    stream.getTracks().forEach((track) => {
      track.onended = onTrackEnded;
    });
    return capture;
  } catch (error) {
    dispose();
    if (!stream && streamRequest)
      void streamRequest.then(
        (lateStream) => lateStream.getTracks().forEach((track) => track.stop()),
        () => undefined,
      );
    throw error;
  }
}
