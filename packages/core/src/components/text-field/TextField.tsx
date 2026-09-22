import { forwardRef, useId } from 'react';

import type { TextFieldProps } from './TextField.types.js';

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { className, counter, error, helpText, id, placeholder, ...inputProps },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = error !== undefined;
  const helpId = helpText !== undefined ? `${inputId}-help` : undefined;
  const errorId = hasError ? `${inputId}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;
  const inputClassName = ['chayns-text-field__input', className].filter(Boolean).join(' ');

  return (
    <div className={`chayns-text-field${hasError ? ' chayns-text-field--error' : ''}`}>
      <input
        {...inputProps}
        aria-describedby={describedBy}
        aria-invalid={hasError || undefined}
        className={inputClassName}
        id={inputId}
        placeholder={placeholder === undefined ? undefined : ' '}
        ref={ref}
      />
      {placeholder !== undefined ? (
        <label className="chayns-text-field__label" htmlFor={inputId}>
          {placeholder}
        </label>
      ) : null}
      {helpText !== undefined || hasError || counter !== undefined ? (
        <div className="chayns-text-field__help">
          <div>
            {helpText !== undefined ? <div id={helpId}>{helpText}</div> : null}
            {hasError ? (
              <div className="chayns-text-field__error" id={errorId}>
                {error}
              </div>
            ) : null}
          </div>
          {counter !== undefined ? <div>{counter}</div> : null}
        </div>
      ) : null}
    </div>
  );
});

export default TextField;
