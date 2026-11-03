import ComposerIdentity from './ComposerIdentity.js';
import ButtonIcon from '../../button/button-icon/ButtonIcon.js';
import type { ComposerSelector as Selector, ComposerLabels } from '../MessageComposer.types.js';
interface ComposerSelectorProps {
  selector: Selector | undefined;
  labels: ComposerLabels;
  isOpen: boolean;
  isLocked: boolean;
  isEmpty: boolean;
  onOpen: (trigger: HTMLButtonElement) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}
function ComposerSelector({
  selector,
  labels,
  isOpen,
  isLocked,
  isEmpty,
  onOpen,
  onKeyDown,
}: ComposerSelectorProps) {
  return (
    <>
      {' '}
      {selector ? (
        <button
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label={`${labels.selector}: ${selector.selectedItem.label}`}
          className="chayns-message-composer__selector"
          disabled={isLocked || isEmpty}
          onClick={(event) => onOpen(event.currentTarget)}
          onKeyDown={onKeyDown}
          type="button"
        >
          <ComposerIdentity item={selector.selectedItem} />
          <span className="chayns-message-composer__full-label">{selector.selectedItem.label}</span>
          <span className="chayns-message-composer__short-label">
            {selector.selectedItem.shortLabel}
          </span>
          <ButtonIcon icon="fa-chevron-down" />
        </button>
      ) : null}
    </>
  );
}
ComposerSelector.displayName = 'ComposerSelector';
export default ComposerSelector;
