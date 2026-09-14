import { useId } from 'react';

import Button from '../button/Button.js';
import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import PopupList from '../popup/PopupList.js';
import type { SplitButtonProps } from './SplitButton.types.js';

const SplitButton = ({
  children,
  className,
  disabled,
  icon,
  items,
  onClick,
  variant,
  ...containerProps
}: SplitButtonProps) => {
  const labelId = useId();

  return (
    <div {...containerProps} className={['chayns-split-button', className].filter(Boolean).join(' ')}>
      {icon ? (
        <Button
          aria-labelledby={labelId}
          className="chayns-split-button__primary"
          {...(disabled ? { disabled: true } : {})}
          icon={icon}
          {...(onClick ? { onClick } : {})}
          variant={variant}
        >
          <span id={labelId}>{children}</span>
        </Button>
      ) : (
        <Button
          aria-labelledby={labelId}
          className="chayns-split-button__primary"
          {...(disabled ? { disabled: true } : {})}
          {...(onClick ? { onClick } : {})}
          variant={variant}
        >
          <span id={labelId}>{children}</span>
        </Button>
      )}
      <PopupList
        items={items}
        trigger={
          <button
            aria-labelledby={labelId}
            className={`chayns-split-button__trigger chayns-button--${variant}`}
            {...(disabled ? { disabled: true } : {})}
            type="button"
          >
            <span aria-hidden="true" className="chayns-split-button__chevron">
              <ButtonIcon icon="fa-chevron-down" />
            </span>
          </button>
        }
      />
    </div>
  );
};

export default SplitButton;
