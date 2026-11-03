import type { RefObject } from 'react';
import ButtonIcon from '../../button/button-icon/ButtonIcon.js';
import Spinner from '../../spinner/Spinner.js';
import ComposerActionButton from './ComposerActionButton.js';
import CaptureActions from './CaptureActions.js';
import type { ComposerLabels, DictationOptions, VoiceOptions } from '../MessageComposer.types.js';
import type { useComposerCapture } from '../hooks/useComposerCapture.js';

interface ComposerControlsProps {
  capture: ReturnType<typeof useComposerCapture>;
  labels: ComposerLabels;
  voice: VoiceOptions | undefined;
  dictation: DictationOptions | undefined;
  canSend: boolean;
  canSubmit: boolean;
  isLocked: boolean;
  pending: boolean;
  submit: () => void;
  voiceStart: RefObject<HTMLButtonElement | null>;
}

function ComposerControls({
  capture,
  labels,
  voice,
  dictation,
  canSend,
  canSubmit,
  isLocked,
  pending,
  submit,
  voiceStart,
}: ComposerControlsProps) {
  const isDictating = capture.dictationState !== 'idle';
  const isPaused = capture.dictationState === 'paused';
  const isSettling = capture.dictationState === 'pausing' || capture.dictationState === 'ending';
  const isVoiceActive = capture.voiceState !== 'idle';
  const canDictate = !dictation?.disabled && capture.support.dictation;
  const canVoice =
    typeof voice?.onStream === 'function' && !voice.disabled && capture.support.voice;
  const isPaired = (canDictate && canVoice) || isDictating;
  const isVisible = canSend || canDictate || canVoice || capture.isActive;
  const microphoneLabel = isPaused ? labels.resumeDictation : labels.pauseDictation;

  function handleMicrophone() {
    if (!isDictating) capture.startDictation();
    else if (isPaused) capture.resume();
    else capture.pause();
  }

  return (
    <div
      className={[
        'chayns-message-composer__controls',
        isPaired && 'chayns-message-composer__controls--paired',
        isVoiceActive && 'chayns-message-composer__controls--voice',
      ]
        .filter(Boolean)
        .join(' ')}
      hidden={!isVisible}
    >
      {isVoiceActive ? <CaptureActions capture={capture} labels={labels} /> : null}
      <ComposerActionButton
        isVisible={isDictating || (!capture.isActive && !canSend && canDictate)}
        aria-label={isDictating ? microphoneLabel : labels.startDictation}
        aria-pressed={isDictating ? !isPaused : undefined}
        className={[
          'chayns-message-composer__dictation',
          isDictating &&
            (isPaused
              ? 'chayns-message-composer__dictation--paused'
              : 'chayns-message-composer__dictation--listening'),
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={isDictating ? isSettling : isLocked}
        onClick={handleMicrophone}
        type="button"
      >
        <ButtonIcon icon="fa-microphone" />
      </ComposerActionButton>
      <ComposerActionButton
        isVisible={!capture.isActive && canSend}
        aria-label={labels.send}
        className="chayns-message-composer__primary chayns-message-composer__send"
        disabled={!canSubmit}
        onClick={submit}
        type="button"
      >
        {pending ? <Spinner /> : <ButtonIcon icon="fa-paper-plane" />}
      </ComposerActionButton>
      <ComposerActionButton
        isVisible={!capture.isActive && !canSend && canVoice && (voice?.state ?? 'idle') === 'idle'}
        aria-label={labels.startVoice}
        className="chayns-message-composer__primary"
        disabled={isLocked}
        onClick={() => {
          void capture.startVoice();
        }}
        ref={voiceStart}
        type="button"
      >
        <ButtonIcon icon="fa-waveform-lines" />
      </ComposerActionButton>
      <ComposerActionButton
        isVisible={isDictating}
        aria-label={labels.endDictation}
        className="chayns-message-composer__dictation chayns-message-composer__accept"
        disabled={isSettling}
        onClick={capture.endDictation}
        type="button"
      >
        <ButtonIcon icon="fa-check" />
      </ComposerActionButton>
    </div>
  );
}
ComposerControls.displayName = 'ComposerControls';
export default ComposerControls;
