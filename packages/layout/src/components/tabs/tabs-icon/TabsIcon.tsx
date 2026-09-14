import type { TabsEntry } from '../Tabs.types.js';

const TabsIcon = ({ icon }: { icon: TabsEntry['icon'] }) => (
  <span aria-hidden="true" className="chayns-tabs__icon">
    <i className={`far ${icon}`} />
  </span>
);

export default TabsIcon;
