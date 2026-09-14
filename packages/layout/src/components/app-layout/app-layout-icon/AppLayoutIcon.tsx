import type { AppLayoutItem } from '../AppLayout.types.js';

const AppLayoutIcon = ({ icon }: { icon: AppLayoutItem['icon'] }) => (
  <span aria-hidden="true" className="chayns-app-layout__icon">
    <span className="chayns-app-layout__weight">
      <i className={`far ${icon}`} />
    </span>
    <span className="chayns-app-layout__weight chayns-app-layout__weight--active">
      <i className={`fas ${icon}`} />
    </span>
  </span>
);

export default AppLayoutIcon;
