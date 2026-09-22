import type { ButtonIcon as ButtonIconName } from '../Button.types.js';

interface ButtonIconProps {
  icon: ButtonIconName;
}

const ButtonIcon = ({ icon }: ButtonIconProps) => {
  const isBrandIcon = icon.startsWith('fab ');

  return (
    <span aria-hidden="true" className="chayns-button-icon">
      {isBrandIcon ? (
        <span className="chayns-button-icon__weight">
          <i className={icon} />
        </span>
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

export default ButtonIcon;
