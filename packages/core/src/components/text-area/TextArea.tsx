import { useId } from 'react';

import type { TextAreaProps } from './TextArea.types.js';

function TextArea({ className, counter, error, helpText, id, ...textareaProps }: TextAreaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hasError = error !== undefined;
  const helpId = helpText !== undefined ? `${textareaId}-help` : undefined;
  const errorId = hasError ? `${textareaId}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;
  const textareaClassName = ['chayns-text-area__input', className].filter(Boolean).join(' ');

  return (
    <div className={`chayns-text-area${hasError ? ' chayns-text-area--error' : ''}`}>
      <textarea
        {...textareaProps}
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
        className={textareaClassName}
        id={textareaId}
        placeholder={textareaProps.placeholder}
      />
      {helpText !== undefined || hasError || counter !== undefined ? (
        <div className="chayns-text-area__help">
          <div>
            {helpText !== undefined ? <div id={helpId}>{helpText}</div> : null}
            {hasError ? (
              <div className="chayns-text-area__error" id={errorId}>
                {error}
              </div>
            ) : null}
          </div>
          {counter !== undefined ? <div>{counter}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

export default TextArea;
