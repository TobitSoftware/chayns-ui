import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { KeyboardEvent } from 'react';
import { useComposerOverlayPosition } from '../../../hooks/useComposerOverlayPosition.js';
import ComposerIdentity from './ComposerIdentity.js';
import ButtonIcon from '../../button/button-icon/ButtonIcon.js';
import type { ComposerAction, ComposerSelectionGroup } from '../MessageComposer.types.js';

interface ComposerMenuProps {
  trigger: HTMLButtonElement;
  label: string;
  actions?: readonly ComposerAction[] | undefined;
  groups?: readonly ComposerSelectionGroup[] | undefined;
  selectedId?: string | undefined;
  alignEnd?: boolean | undefined;
  initialLast: boolean;
  onClose: () => void;
  onAction: (id: string) => void;
  onSelect: (id: string) => void;
}

function ComposerMenu({
  trigger,
  label,
  actions = [],
  groups = [],
  selectedId,
  alignEnd,
  initialLast,
  onClose,
  onAction,
  onSelect,
}: ComposerMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useComposerOverlayPosition(ref, trigger, true, alignEnd);

  function entries() {
    return Array.from(
      ref.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [],
    );
  }
  function finish(action: () => void) {
    onClose();
    trigger.focus();
    action();
  }

  useEffect(() => {
    const items = entries();
    (initialLast ? items.at(-1) : items[0])?.focus();
    function outside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target) &&
        !trigger.contains(event.target)
      )
        onClose();
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
    // Opening owns initial focus; subsequent consumer updates must not reset it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const items = entries();
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    let next: HTMLButtonElement | undefined;
    if (event.key === 'ArrowDown') next = items[(index + 1) % items.length];
    else if (event.key === 'ArrowUp') next = items[(index - 1 + items.length) % items.length];
    else if (event.key === 'Home') next = items[0];
    else if (event.key === 'End') next = items.at(-1);
    else if (event.key === 'Escape') {
      event.preventDefault();
      finish(() => undefined);
      return;
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const focusable = Array.from(
        document.querySelectorAll<HTMLElement>(
          'button:not(:disabled),a[href],input:not(:disabled),textarea:not(:disabled),[tabindex="0"]',
        ),
      ).filter((element) => !ref.current?.contains(element) && element.getClientRects().length > 0);
      const triggerIndex = focusable.indexOf(trigger);
      const target = focusable[triggerIndex + (event.shiftKey ? -1 : 1)];
      onClose();
      (target ?? trigger).focus();
      return;
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && event.key !== ' ') {
      const after = [...items.slice(index + 1), ...items.slice(0, index + 1)];
      next = after.find((item) =>
        item.textContent?.trim().toLowerCase().startsWith(event.key.toLowerCase()),
      );
    }
    if (next) {
      event.preventDefault();
      next.focus();
    }
  }

  return createPortal(
    <div
      aria-label={label}
      className={[
        'chayns-message-composer__menu',
        !groups.length && 'chayns-message-composer__menu--actions',
      ]
        .filter(Boolean)
        .join(' ')}
      onKeyDown={handleKey}
      ref={ref}
      role="menu"
      tabIndex={-1}
    >
      {groups
        .filter((group) => group.items.length)
        .map((group, index) => (
          <div
            className="chayns-message-composer__menu-group"
            aria-labelledby={group.label ? `${id}-${index}` : undefined}
            key={group.id}
            role="group"
          >
            {group.label ? (
              <div className="chayns-message-composer__group" id={`${id}-${index}`}>
                {group.label}
              </div>
            ) : null}
            {group.items.map((item) => (
              <button
                aria-checked={item.id === selectedId}
                className="chayns-message-composer__menu-item"
                disabled={item.disabled}
                key={item.id}
                onClick={() => finish(() => onSelect(item.id))}
                role="menuitemradio"
                tabIndex={-1}
                type="button"
              >
                <ComposerIdentity item={item} />
                <span className="chayns-message-composer__menu-text">
                  {item.label}
                  {item.description ? <small>{item.description}</small> : null}
                </span>
                {item.id === selectedId ? <ButtonIcon icon="fa-check" /> : null}
              </button>
            ))}
          </div>
        ))}
      {groups.length && actions.length ? (
        <hr className="chayns-message-composer__menu-separator" />
      ) : null}
      {actions.map((action) => (
        <button
          className="chayns-message-composer__menu-item"
          disabled={action.disabled}
          key={action.id}
          onClick={() => finish(() => onAction(action.id))}
          role="menuitem"
          tabIndex={-1}
          type="button"
        >
          {action.icon ? <ButtonIcon icon={action.icon} /> : null}
          <span className="chayns-message-composer__menu-text">{action.label}</span>
          {groups.length ? <ButtonIcon icon="fa-chevron-right" /> : null}
        </button>
      ))}
    </div>,
    document.body,
  );
}
ComposerMenu.displayName = 'ComposerMenu';
export default ComposerMenu;
