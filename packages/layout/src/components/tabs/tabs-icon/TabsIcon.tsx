type TabsIconName = `fa-${string}`;

const TabsIcon = ({ icon }: { icon: TabsIconName }) => (
  <span aria-hidden="true" className="chayns-tabs__icon">
    <i className={`far ${icon}`} />
  </span>
);

Object.assign(TabsIcon, { displayName: 'TabsIcon' });

export default TabsIcon;
