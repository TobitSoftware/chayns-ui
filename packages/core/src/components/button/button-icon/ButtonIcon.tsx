import type { ButtonIcon as ButtonIconName } from '../Button.types.js';

interface ButtonIconProps {
  icon: ButtonIconName;
}

const ButtonIcon = ({ icon }: ButtonIconProps) => {
  const isPlainIcon = icon.startsWith('fab ') || icon.startsWith('ts-');

  return (
    <span aria-hidden="true" className="chayns-button-icon">
      {isPlainIcon ? (
        <>
          <span className="chayns-button-icon__weight">
            <i className={icon} />
          </span>
          <span className="chayns-button-icon__weight chayns-button-icon__weight--active">
            <i className={icon} />
          </span>
        </>
      ) : (
        <>
          <span className="chayns-button-icon__weight">
            <i className={`far ${icon}`} />
          </span>
          <span className="chayns-button-icon__weight chayns-button-icon__weight--active">
            <i className={`fas ${icon}`} />
          </span>
        </>
      )}
    </span>
  );
};

Object.assign(ButtonIcon, { displayName: 'ButtonIcon' });

export default ButtonIcon;
