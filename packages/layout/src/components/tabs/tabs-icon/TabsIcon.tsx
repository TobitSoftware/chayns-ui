import type { ButtonIcon } from '@chayns-ui/core';

const TabsIcon = ({ icon }: { icon: ButtonIcon }) => {
  const isPlainIcon = icon.startsWith('fab ') || icon.startsWith('ts-');

  return (
    <span aria-hidden="true" className="chayns-tabs__icon">
      <span className="chayns-tabs__weight">
        <i className={isPlainIcon ? icon : `far ${icon}`} />
      </span>
      <span className="chayns-tabs__weight chayns-tabs__weight--active">
        <i className={isPlainIcon ? icon : `fas ${icon}`} />
      </span>
    </span>
  );
};

Object.assign(TabsIcon, { displayName: 'TabsIcon' });

export default TabsIcon;
