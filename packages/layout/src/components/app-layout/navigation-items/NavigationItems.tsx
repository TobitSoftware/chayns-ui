import AppLayoutIcon from '../app-layout-icon/AppLayoutIcon.js';
import type { AppLayoutItem } from '../AppLayout.types.js';

interface NavigationItemsProps {
  items: AppLayoutItem[];
  activeItemId?: string | undefined;
  collapsed: boolean;
  onClick: (id: string) => void;
  expandedIds: ReadonlySet<string>;
  onToggle: (id: string) => void;
  parentId?: string;
}

const NavigationItems = ({
  activeItemId,
  collapsed,
  expandedIds,
  items,
  onClick,
  onToggle,
  parentId,
}: NavigationItemsProps) => (
  <ul className="chayns-app-layout__list">
    {items.map((item) => {
      const hasChildren = Boolean(item.children?.length);
      const isExpanded = expandedIds.has(item.id);
      const panelId = `${parentId ?? 'root'}-${item.id}-children`;

      return (
        <li
          className={`chayns-app-layout__item${
            activeItemId === item.id ? ' chayns-app-layout__item--active' : ''
          }`}
          key={item.id}
        >
          <div className="chayns-app-layout__row">
            <button
              aria-current={activeItemId === item.id ? 'page' : undefined}
              aria-label={item.name}
              className="chayns-app-layout__action"
              onClick={() => onClick(item.id)}
              type="button"
            >
              <AppLayoutIcon icon={item.icon} />
              <span
                className={`chayns-app-layout__label${
                  collapsed ? ' chayns-app-layout__label--hidden' : ''
                }`}
              >
                {item.name}
              </span>
            </button>
            {hasChildren && !collapsed ? (
              <button
                aria-controls={panelId}
                aria-expanded={isExpanded}
                aria-label={item.name}
                className="chayns-app-layout__disclosure"
                onClick={() => onToggle(item.id)}
                type="button"
              >
                <AppLayoutIcon icon="fa-chevron-down" />
              </button>
            ) : null}
          </div>
          {hasChildren && !collapsed ? (
            <div
              aria-hidden={!isExpanded}
              className={`chayns-app-layout__children${
                isExpanded ? ' chayns-app-layout__children--open' : ''
              }`}
              id={panelId}
              inert={!isExpanded}
            >
              <NavigationItems
                activeItemId={activeItemId}
                collapsed={collapsed}
                expandedIds={expandedIds}
                items={item.children ?? []}
                onClick={onClick}
                onToggle={onToggle}
                parentId={item.id}
              />
            </div>
          ) : null}
        </li>
      );
    })}
  </ul>
);

export default NavigationItems;
