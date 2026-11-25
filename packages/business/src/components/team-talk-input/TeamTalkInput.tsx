import { Avatar, AvatarGroup, Button, Checkbox, IconButton, Popup } from '@chayns-ui/core';
import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent, Ref } from 'react';

import type {
  TeamTalkInputProps,
  TeamTalkPerson,
  TeamTalkSendPayload,
} from './TeamTalkInput.types.js';

const TeamTalkInput = forwardRef<HTMLDivElement, TeamTalkInputProps>(function TeamTalkInput(
  {
    addButtonProps,
    allowAgree = false,
    applyButtonProps,
    className,
    disabled = false,
    textareaProps,
    labels,
    leaveButtonProps,
    members,
    onAddPeople,
    onLeave,
    onPeopleQueryChange,
    onSend,
    onValueChange,
    peopleLoading = false,
    peopleQuery,
    peopleSuggestions,
    value,
    ...rootProps
  },
  ref,
) {
  const generatedId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const peopleSearchRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const peopleQueryDirtyRef = useRef(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<ReadonlyMap<string, TeamTalkPerson>>(
    () => new Map(),
  );
  const hasText = value.trim().length > 0;
  const showSendIcon = hasText || !allowAgree;
  const canSend = hasText || allowAgree;
  const participantNames = members.map(({ name }) => name);
  const currentMemberIds = new Set(members.map(({ id }) => id));
  const availablePeople = peopleSuggestions.filter(({ id }) => !currentMemberIds.has(id));
  const selectedPeopleDetails = [...selectedPeople.values()].filter(
    ({ id }) => !currentMemberIds.has(id),
  );

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

  useEffect(() => {
    if (peopleOpen) peopleSearchRef.current?.focus();
  }, [peopleOpen]);

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

  function handlePeopleOpenChange(open: boolean) {
    setPeopleOpen(open);
    if (open) {
      peopleQueryDirtyRef.current = false;
      setSelectedPeople(new Map());
      return;
    }
    setSelectedPeople(new Map());
    if (peopleQueryDirtyRef.current || peopleQuery !== '') onPeopleQueryChange('');
    peopleQueryDirtyRef.current = false;
  }

  function togglePerson(id: string, checked: boolean) {
    const person = availablePeople.find((candidate) => candidate.id === id);
    if (!person) return;
    setSelectedPeople((previous) => {
      const next = new Map(previous);
      if (checked) next.set(id, person);
      else next.delete(id);
      return next;
    });
  }

  function applyPeople() {
    if (selectedPeopleDetails.length === 0) return;
    onAddPeople(selectedPeopleDetails);
    handlePeopleOpenChange(false);
    queueMicrotask(() => addButtonRef.current?.focus());
  }

  function renderPerson(person: TeamTalkPerson) {
    return (
      <Checkbox
        checked={selectedPeople.has(person.id)}
        className="chayns-team-talk-input__person-checkbox"
        key={person.id}
        onChange={(event) => togglePerson(person.id, event.currentTarget.checked)}
      >
        <span className="chayns-team-talk-input__person">
          <Avatar
            alt=""
            className="chayns-team-talk-input__person-avatar"
            name={person.name}
            {...(person.avatarSrc === undefined ? {} : { src: person.avatarSrc })}
          />
          <span className="chayns-team-talk-input__person-copy">
            <span className="chayns-team-talk-input__person-name">{person.name}</span>
            {person.description ? (
              <span className="chayns-team-talk-input__person-description">
                {person.description}
              </span>
            ) : null}
          </span>
        </span>
      </Checkbox>
    );
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
          <Popup onOpenChange={handlePeopleOpenChange} open={peopleOpen}>
            <Popup.Trigger asChild>
              <IconButton
                {...addButtonProps}
                aria-haspopup="dialog"
                aria-label={labels.addPerson}
                className={['chayns-team-talk-input__action', addButtonProps?.className]
                  .filter(Boolean)
                  .join(' ')}
                disabled={disabled || addButtonProps?.disabled}
                icon="fa-user-plus"
                ref={addButtonRef}
                type="button"
                variant="ghost"
              />
            </Popup.Trigger>
            <Popup.Content
              aria-label={labels.addPerson}
              className="chayns-team-talk-input__people-popup"
              onBlur={(event) => {
                if (
                  event.relatedTarget instanceof Node &&
                  !event.currentTarget.contains(event.relatedTarget)
                )
                  handlePeopleOpenChange(false);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Tab') event.stopPropagation();
              }}
              role="dialog"
            >
              <label className="chayns-team-talk-input__people-search">
                <i aria-hidden="true" className="far fa-magnifying-glass" />
                <input
                  aria-label={labels.peopleSearch}
                  autoComplete="off"
                  onChange={(event) => {
                    peopleQueryDirtyRef.current = true;
                    onPeopleQueryChange(event.currentTarget.value);
                  }}
                  placeholder={labels.peopleSearchPlaceholder}
                  ref={peopleSearchRef}
                  type="search"
                  value={peopleQuery}
                />
              </label>
              <div
                aria-busy={peopleLoading}
                aria-live="polite"
                className="chayns-team-talk-input__people-list"
              >
                {peopleLoading ? (
                  <div className="chayns-team-talk-input__people-status" role="status">
                    {labels.peopleLoading}
                  </div>
                ) : availablePeople.length > 0 ? (
                  availablePeople.map(renderPerson)
                ) : (
                  <div className="chayns-team-talk-input__people-status">
                    {labels.peopleNoResults}
                  </div>
                )}
              </div>
              <div className="chayns-team-talk-input__people-footer">
                <span aria-live="polite" className="chayns-team-talk-input__people-count">
                  {labels.peopleSelectionCount(selectedPeopleDetails.length)}
                </span>
                <Button
                  {...applyButtonProps}
                  className={['chayns-team-talk-input__people-apply', applyButtonProps?.className]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={selectedPeopleDetails.length === 0 || disabled}
                  icon="fa-user-plus"
                  onClick={(event) => {
                    applyButtonProps?.onClick?.(event);
                    if (!event.defaultPrevented) applyPeople();
                  }}
                  type="button"
                  variant="primary"
                >
                  {labels.peopleApply}
                </Button>
              </div>
            </Popup.Content>
          </Popup>
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
