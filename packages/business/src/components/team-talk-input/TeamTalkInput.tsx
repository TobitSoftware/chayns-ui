import { Avatar, AvatarGroup, IconButton } from '@chayns-ui/core';
import { forwardRef, useId, useLayoutEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent, Ref } from 'react';

import type { TeamTalkInputProps, TeamTalkSendPayload } from './TeamTalkInput.types.js';

const TeamTalkInput = forwardRef<HTMLDivElement, TeamTalkInputProps>(function TeamTalkInput(
  {
    addButtonProps,
    allowAgree = false,
    className,
    disabled = false,
    textareaProps,
    labels,
    leaveButtonProps,
    members,
    onLeave,
    onSend,
    onValueChange,
    value,
    ...rootProps
  },
  ref,
) {
  const generatedId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasText = value.trim().length > 0;
  const showSendIcon = hasText || !allowAgree;
  const canSend = hasText || allowAgree;
  const participantNames = members.map(({ name }) => name);

  function send(payload: TeamTalkSendPayload) {
    if (disabled) return;
    onSend(payload);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || !canSend) return;
    if (hasText) {
      send({ type: 'message', text: value.trim() });
    } else {
      send({ type: 'agree', text: '' });
    }
  }

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    if (textarea.scrollHeight > 0) textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    textareaProps?.onChange?.(event);
    if (event.defaultPrevented) return;
    onValueChange(event.currentTarget.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    textareaProps?.onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      event.key !== 'Enter' ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    )
      return;
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  }

  function setTextareaRef(node: HTMLTextAreaElement | null) {
    textareaRef.current = node;
    const consumerRef: Ref<HTMLTextAreaElement> | undefined = textareaProps?.ref;
    if (typeof consumerRef === 'function') consumerRef(node);
    else if (consumerRef) consumerRef.current = node;
  }

  return (
    <div
      {...rootProps}
      className={[
        'chayns-team-talk-input',
        disabled ? 'chayns-team-talk-input--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      ref={ref}
    >
      <div className="chayns-team-talk-input__top">
        <AvatarGroup
          aria-label={labels.participants(participantNames)}
          role="group"
          className="chayns-team-talk-input__participants"
        >
          {members.map(({ avatarSrc, id, name }) => (
            <Avatar
              alt={name}
              key={id}
              name={name}
              {...(avatarSrc === undefined ? {} : { src: avatarSrc })}
            />
          ))}
        </AvatarGroup>
        <div className="chayns-team-talk-input__actions">
          {onLeave ? (
            <IconButton
              {...leaveButtonProps}
              aria-label={labels.leave}
              className={['chayns-team-talk-input__action', leaveButtonProps?.className]
                .filter(Boolean)
                .join(' ')}
              disabled={disabled || leaveButtonProps?.disabled}
              icon="fa-user-minus"
              onClick={(event) => {
                leaveButtonProps?.onClick?.(event);
                if (!event.defaultPrevented) onLeave();
              }}
              type="button"
              variant="ghost"
            />
          ) : null}
          <IconButton
            {...addButtonProps}
            aria-label={labels.addPerson}
            className={['chayns-team-talk-input__action', addButtonProps?.className]
              .filter(Boolean)
              .join(' ')}
            disabled
            icon="fa-user-plus"
            type="button"
            variant="ghost"
          />
        </div>
      </div>

      <form
        aria-label={labels.input}
        className="chayns-team-talk-input__composer"
        onSubmit={submit}
      >
        <textarea
          {...textareaProps}
          aria-label={labels.input}
          className={['chayns-team-talk-input__field', textareaProps?.className]
            .filter(Boolean)
            .join(' ')}
          disabled={disabled}
          id={textareaProps?.id ?? `${generatedId}-input`}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={labels.placeholder}
          ref={setTextareaRef}
          rows={1}
          value={value}
        />
        <IconButton
          aria-label={showSendIcon ? labels.send : labels.agree}
          className={[
            'chayns-team-talk-input__submit',
            showSendIcon ? 'chayns-team-talk-input__submit--send-icon' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          disabled={disabled || !canSend}
          icon={showSendIcon ? 'fa-arrow-up' : 'fa-thumbs-up'}
          type="submit"
          variant="primary"
        />
      </form>
    </div>
  );
});

TeamTalkInput.displayName = 'TeamTalkInput';

export default TeamTalkInput;
