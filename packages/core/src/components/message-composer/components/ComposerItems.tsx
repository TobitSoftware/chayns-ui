import ButtonIcon from '../../button/button-icon/ButtonIcon.js';
import Button from '../../button/Button.js';
import IconButton from '../../icon-button/IconButton.js';
import type {
  ComposerAction,
  ComposerAttachment,
  ComposerSnippet,
} from '../MessageComposer.types.js';

export function ComposerSnippets({
  items: snippets,
  isLocked,
  insertText,
}: {
  items: readonly ComposerSnippet[];
  isLocked: boolean;
  insertText: (text: string) => void;
}) {
  return (
    <>
      {snippets.length ? (
        <div className="chayns-message-composer__snippets">
          {snippets.map((snippet) => (
            <Button
              disabled={isLocked || snippet.disabled}
              key={snippet.id}
              onClick={() => insertText(snippet.text)}
              variant="ghost"
            >
              {snippet.label}
            </Button>
          ))}
        </div>
      ) : null}
    </>
  );
}
ComposerSnippets.displayName = 'ComposerSnippets';

export function ComposerAttachments({
  items: attachments,
  isLocked,
  onRemove,
  preserveRemovedFocus,
}: {
  items: readonly ComposerAttachment[];
  isLocked: boolean;
  onRemove: ((id: string) => void) | undefined;
  preserveRemovedFocus: (target: HTMLButtonElement, action: () => void) => void;
}) {
  return (
    <>
      {attachments.length ? (
        <ul className="chayns-message-composer__attachments">
          {attachments.map((attachment) => (
            <li key={attachment.id}>
              <div>{attachment.content}</div>
              <IconButton
                aria-label={attachment.removeLabel}
                disabled={isLocked || attachment.disabled}
                icon="fa-xmark"
                onClick={(event) =>
                  preserveRemovedFocus(event.currentTarget, () => onRemove?.(attachment.id))
                }
                variant="ghost"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
ComposerAttachments.displayName = 'ComposerAttachments';

export function ComposerPrompts({
  prompts,
  isLocked,
  pending,
  onPrompt,
  preserveRemovedFocus,
}: {
  prompts: readonly ComposerAction[];
  isLocked: boolean;
  pending: boolean;
  onPrompt: ((id: string) => void) | undefined;
  preserveRemovedFocus: (target: HTMLButtonElement, action: () => void) => void;
}) {
  return (
    <>
      {' '}
      {prompts.length ? (
        <div
          className="chayns-message-composer__prompts"
          onScroll={(event) => {
            const element = event.currentTarget;
            element.dataset.atStart = String(element.scrollLeft <= 1);
            element.dataset.atEnd = String(
              element.scrollLeft + element.clientWidth >= element.scrollWidth - 1,
            );
          }}
        >
          {prompts.map((prompt) => (
            <button
              className="chayns-message-composer__chip"
              disabled={isLocked || pending || prompt.disabled}
              key={prompt.id}
              onClick={(event) =>
                preserveRemovedFocus(event.currentTarget, () => onPrompt?.(prompt.id))
              }
              onFocus={(event) =>
                event.currentTarget.scrollIntoView?.({
                  block: 'nearest',
                  inline: 'nearest',
                })
              }
              type="button"
            >
              {prompt.icon ? <ButtonIcon icon={prompt.icon} /> : null}
              {prompt.label}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
ComposerPrompts.displayName = 'ComposerPrompts';
