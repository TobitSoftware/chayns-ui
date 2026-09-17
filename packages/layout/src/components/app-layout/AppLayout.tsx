import { createContext, forwardRef, useContext, useState } from 'react';
import type { ComponentPropsWithRef } from 'react';
import type {
  AppLayoutCollapseToggleProps,
  AppLayoutContentProps,
  AppLayoutHeaderProps,
  AppLayoutLogoProps,
  AppLayoutNavigationItemProps,
  AppLayoutNavigationProps,
  AppLayoutProps,
} from './AppLayout.types.js';

interface LayoutState {
  collapsed: boolean;
  toggle: () => void;
}
const LayoutContext = createContext<LayoutState | null>(null);
const NavigationContext = createContext(false);
function useLayout(part: string) {
  const context = useContext(LayoutContext);
  if (context === null) throw new Error(`AppLayout.${part} must be rendered within AppLayout.`);
  return context;
}

const Header = forwardRef<HTMLElement, AppLayoutHeaderProps>(function Header(
  { children, className, ...props },
  ref,
) {
  useLayout('Header');
  return (
    <header
      {...props}
      className={['chayns-app-layout__header', className].filter(Boolean).join(' ')}
      ref={ref}
    >
      {children}
    </header>
  );
});
const Logo = forwardRef<HTMLImageElement, AppLayoutLogoProps>(function Logo(
  { alt = '', className, ...props },
  ref,
) {
  useLayout('Logo');
  return (
    <img
      {...props}
      alt={alt}
      className={['chayns-app-layout__logo', className].filter(Boolean).join(' ')}
      ref={ref}
    />
  );
});
const Navigation = forwardRef<HTMLElement, AppLayoutNavigationProps>(function Navigation(
  { children, className, ...props },
  ref,
) {
  useLayout('Navigation');
  return (
    <NavigationContext.Provider value>
      <nav
        {...props}
        className={['chayns-app-layout__navigation', className].filter(Boolean).join(' ')}
        ref={ref}
      >
        <ul className="chayns-app-layout__list">{children}</ul>
      </nav>
    </NavigationContext.Provider>
  );
});
function NavigationItem({
  children,
  className,
  href,
  isActive = false,
  label,
  ...props
}: AppLayoutNavigationItemProps) {
  if (!useContext(NavigationContext))
    throw new Error('AppLayout.Navigation.Item must be rendered within AppLayout.Navigation.');
  const { collapsed } = useLayout('Navigation.Item');
  const [expanded, setExpanded] = useState(false);
  const hasChildren = children !== undefined;
  const content = (
    <span
      className={`chayns-app-layout__label${collapsed ? ' chayns-app-layout__label--hidden' : ''}`}
    >
      {label}
    </span>
  );
  const actionClass = ['chayns-app-layout__action', className].filter(Boolean).join(' ');
  return (
    <li className={`chayns-app-layout__item${isActive ? ' chayns-app-layout__item--active' : ''}`}>
      <div className="chayns-app-layout__row">
        {href ? (
          <a
            {...(props as ComponentPropsWithRef<'a'>)}
            aria-current={isActive ? 'page' : undefined}
            className={actionClass}
            href={href}
          >
            {content}
          </a>
        ) : (
          <button
            {...props}
            aria-current={isActive ? 'page' : undefined}
            className={actionClass}
            type="button"
          >
            {content}
          </button>
        )}
        {hasChildren && !collapsed ? (
          <button
            aria-label={typeof label === 'string' ? label : undefined}
            aria-expanded={expanded}
            className="chayns-app-layout__disclosure"
            onClick={() => setExpanded((current) => !current)}
            type="button"
          >
            ⌄
          </button>
        ) : null}
      </div>
      {hasChildren && !collapsed ? (
        <div
          aria-hidden={!expanded}
          className={`chayns-app-layout__children${expanded ? ' chayns-app-layout__children--open' : ''}`}
          inert={!expanded}
        >
          <ul className="chayns-app-layout__list">{children}</ul>
        </div>
      ) : null}
    </li>
  );
}
const Content = forwardRef<HTMLElement, AppLayoutContentProps>(function Content(
  { children, className, ...props },
  ref,
) {
  useLayout('Content');
  return (
    <main
      {...props}
      className={['chayns-app-layout__content', className].filter(Boolean).join(' ')}
      ref={ref}
    >
      {children}
    </main>
  );
});
const CollapseToggle = forwardRef<HTMLButtonElement, AppLayoutCollapseToggleProps>(
  function CollapseToggle(
    { children = '☰', className, collapseLabel, expandLabel, onClick, ...props },
    ref,
  ) {
    const layout = useLayout('CollapseToggle');
    return (
      <button
        {...props}
        aria-label={layout.collapsed ? expandLabel : collapseLabel}
        className={['chayns-app-layout__collapse', className].filter(Boolean).join(' ')}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) layout.toggle();
        }}
        ref={ref}
        type="button"
      >
        {children}
      </button>
    );
  },
);
const Root = forwardRef<HTMLDivElement, AppLayoutProps>(function Root(
  { children, className, collapsed, defaultCollapsed = false, onCollapsedChange, ...props },
  ref,
) {
  const [internal, setInternal] = useState(defaultCollapsed);
  const isCollapsed = collapsed ?? internal;
  const toggle = () => {
    const next = !isCollapsed;
    if (collapsed === undefined) setInternal(next);
    onCollapsedChange?.(next);
  };
  return (
    <LayoutContext.Provider value={{ collapsed: isCollapsed, toggle }}>
      <div
        {...props}
        className={['chayns-app-layout', isCollapsed && 'chayns-app-layout--collapsed', className]
          .filter(Boolean)
          .join(' ')}
        ref={ref}
      >
        {children}
      </div>
    </LayoutContext.Provider>
  );
});
export const AppLayout = Object.assign(Root, {
  CollapseToggle,
  Content,
  Header,
  Logo,
  Navigation: Object.assign(Navigation, { Item: NavigationItem }),
});
