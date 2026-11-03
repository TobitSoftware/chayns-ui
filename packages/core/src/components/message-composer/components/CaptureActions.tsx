import Button from '../../button/Button.js';
import type { ComposerLabels, VoiceOptions } from '../MessageComposer.types.js';
import type { useComposerCapture } from '../hooks/useComposerCapture.js';

interface CaptureActionsProps {
  capture: ReturnType<typeof useComposerCapture>;
  labels: ComposerLabels;
}

function CaptureActions({ capture, labels }: CaptureActionsProps) {
  if (capture.voiceState !== 'idle')
    return (
      <>
        <Button
          aria-pressed={capture.isMuted}
          disabled={capture.voiceState !== 'active'}
          onClick={capture.toggleMute}
          variant="ghost"
        >
          {capture.isMuted ? labels.unmuteVoice : labels.muteVoice}
        </Button>
        <Button onClick={() => capture.endVoice()} variant="ghost">
          {labels.endVoice}
        </Button>
      </>
    );
  return null;
}
CaptureActions.displayName = 'CaptureActions';
export default CaptureActions;

export function captureStatus(
  capture: ReturnType<typeof useComposerCapture>,
  labels: ComposerLabels,
  voice: VoiceOptions | undefined,
): string | undefined {
  const states = {
    starting: labels.dictationStarting,
    listening: labels.dictationListening,
    pausing: labels.dictationPausing,
    paused: labels.dictationPaused,
    ending: labels.dictationEnding,
  };
  if (capture.dictationState !== 'idle') return states[capture.dictationState];
  if (capture.voiceState === 'requesting') return labels.voiceRequesting;
  if (capture.voiceState === 'active')
    return voice?.state === 'connected' ? labels.voiceConnected : labels.voiceConnecting;
  return undefined;
}
