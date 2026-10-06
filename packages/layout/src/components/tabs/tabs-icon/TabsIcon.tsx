type TabsIconName = `fa-${string}`;

const TabsIcon = ({ icon }: { icon: TabsIconName }) => (
  <span aria-hidden="true" className="chayns-tabs__icon">
    <span className="chayns-tabs__weight">
      <i className={`far ${icon}`} />
    </span>
    <span className="chayns-tabs__weight chayns-tabs__weight--active">
      <i className={`fas ${icon}`} />
    </span>
  </span>
);

Object.assign(TabsIcon, { displayName: 'TabsIcon' });

export default TabsIcon;
