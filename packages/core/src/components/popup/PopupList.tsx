import { useRef, type KeyboardEvent } from 'react';

import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import Popup from './Popup.js';
import type { PopupListProps } from './Popup.types.js';

const PopupList = ({ className, items, trigger }: PopupListProps) => {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = itemRefs.current.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0 || items.length === 0) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (index + direction + items.length) % items.length;
      itemRefs.current[nextIndex]?.focus();
    }
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      itemRefs.current[event.key === 'Home' ? 0 : items.length - 1]?.focus();
    }
  };

  return (
    <Popup {...(className ? { className } : {})} trigger={trigger}>
      <div onKeyDown={handleKeyDown} role="menu" tabIndex={-1}>
        {items.map((item, index) => (
          <button
            className="chayns-popup-list__item"
            key={`${item.text}-${index}`}
            onClick={item.onClick}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            role="menuitem"
            type="button"
          >
            <ButtonIcon icon={item.icon} />
            <span>{item.text}</span>
          </button>
        ))}
      </div>
    </Popup>
  );
};

export default PopupList;
