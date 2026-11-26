import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { ComponentPropsWithRef, ReactNode, Ref } from 'react';
import type {
  AppLayoutCollapseToggleProps,
  AppLayoutContentProps,
  AppLayoutFooterItemProps,
  AppLayoutFooterProps,
  AppLayoutHeaderProps,
  AppLayoutLogoProps,
  AppLayoutNavigationItemProps,
  AppLayoutNavigationProps,
  AppLayoutProps,
} from './AppLayout.types.js';
import AppLayoutIcon from './app-layout-icon/AppLayoutIcon.js';

interface LayoutState {
  collapsed: boolean;
  labelsHidden: boolean;
  toggle: () => void;
}
interface LayoutMotionSnapshot {
  rects: Map<string, DOMRect>;
  columns: string;
}
const LayoutContext = createContext<LayoutState | null>(null);
const NavigationContext = createContext<'navigation' | 'footer' | null>(null);
const FooterContext = createContext(false);
function getTextContent(value: ReactNode): string | undefined {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) {
    const text = value.map(getTextContent).filter(Boolean).join(' ');
    return text || undefined;
  }
  if (isValidElement<{ children?: ReactNode }>(value)) return getTextContent(value.props.children);
  return undefined;
}
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
    <NavigationContext.Provider value="navigation">
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
const NavigationItem = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  AppLayoutNavigationItemProps
>(function NavigationItem(
  { children, className, href, icon, isActive = false, isHidden = false, label, ...props },
  ref,
) {
  const placement = useContext(NavigationContext);
  if (placement === null)
    throw new Error('AppLayout.Navigation.Item must be rendered within AppLayout.Navigation or AppLayout.Footer.');
  const { labelsHidden } = useLayout('Navigation.Item');
  const [expanded, setExpanded] = useState(false);
  const childrenId = useId();
  const hasChildren = children !== undefined;
  if (isHidden) return null;
  const footerItem = placement === 'footer';
  const labelText = getTextContent(label);
  const actionTitle = props.title ?? labelText;
  const content = (
    <span
      id={`${childrenId}-label`}
      className={`chayns-app-layout__label${labelsHidden || footerItem ? ' chayns-app-layout__label--hidden' : ''}`}
    >
      {label}
    </span>
  );
  const actionClass = ['chayns-app-layout__action', footerItem && 'chayns-app-layout__footer-item', className].filter(Boolean).join(' ');
  const ItemWrapper = footerItem ? 'div' : 'li';
  return (
    <ItemWrapper className={`chayns-app-layout__item${footerItem ? ' chayns-app-layout__footer-item-wrapper' : ''}${isActive ? ' chayns-app-layout__item--active' : ''}`}>
      <div className="chayns-app-layout__row">
        {href !== undefined ? (
          <a
            {...(props as ComponentPropsWithRef<'a'>)}
            aria-current={isActive ? 'page' : undefined}
            className={actionClass}
            href={href}
            title={actionTitle}
            ref={ref as Ref<HTMLAnchorElement>}
          >
            {icon ? <AppLayoutIcon icon={icon} /> : null}
            {content}
          </a>
        ) : (
          <button
            {...(props as ComponentPropsWithRef<'button'>)}
            aria-label={footerItem ? (props as ComponentPropsWithRef<'button'>)['aria-label'] ?? labelText : (props as ComponentPropsWithRef<'button'>)['aria-label']}
            title={actionTitle}
            ref={ref as Ref<HTMLButtonElement>}
            className={actionClass}
            type="button"
          >
            {icon ? <AppLayoutIcon icon={icon} /> : null}
            {content}
          </button>
        )}
        {hasChildren && !collapsed && !footerItem ? (
          <button
            aria-labelledby={`${childrenId}-label`}
            aria-controls={childrenId}
            aria-expanded={expanded}
            className="chayns-app-layout__disclosure"
            onClick={() => setExpanded((current) => !current)}
            type="button"
          >
            <AppLayoutIcon icon="fa-chevron-down" />
          </button>
        ) : null}
      </div>
      {hasChildren && !collapsed && !footerItem ? (
        <div
          aria-hidden={!expanded}
          className={`chayns-app-layout__children${expanded ? ' chayns-app-layout__children--open' : ''}`}
          id={childrenId}
          inert={!expanded}
        >
          <ul className="chayns-app-layout__list">{children}</ul>
        </div>
      ) : null}
    </ItemWrapper>
  );
});
const FooterItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, AppLayoutFooterItemProps>(
  function FooterItem(props, ref) {
    useLayout('Footer.Item');
    if (!useContext(FooterContext))
      throw new Error('AppLayout.Footer.Item must be rendered within AppLayout.Footer.');
    return (
      <NavigationContext.Provider value="footer">
        <NavigationItem {...props} ref={ref} />
      </NavigationContext.Provider>
    );
  },
);
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
const Footer = forwardRef<HTMLElement, AppLayoutFooterProps>(function Footer(
  { children, className, ...props },
  ref,
) {
  useLayout('Footer');
  const parts = Children.toArray(children);
  const items = parts.filter(
    (child) =>
      isValidElement(child) &&
      child.type === FooterItem &&
      !(child.props as AppLayoutFooterItemProps).isHidden,
  );
  const toggle = parts.find((child) => isValidElement(child) && child.type === CollapseToggle);
  const other = parts.filter(
    (child) =>
      !items.includes(child) &&
      child !== toggle &&
      !(isValidElement(child) && child.type === FooterItem),
  );
  return (
    <FooterContext.Provider value>
    <footer
      {...props}
      className={['chayns-app-layout__footer', className].filter(Boolean).join(' ')}
      ref={ref}
    >
      <span
        aria-hidden="true"
        className="chayns-app-layout__footer-divider"
        data-footer-motion-key="divider"
      />
      {other.map((child, index) => (
        <div className="chayns-app-layout__footer-custom" key={isValidElement(child) ? child.key ?? index : index}>
          {child}
        </div>
      ))}
      <div className="chayns-app-layout__footer-items">
        {items.map((item, index) => (
          <div className="chayns-app-layout__footer-motion" data-footer-motion-key={`item-${isValidElement(item) && item.key ? item.key : index}`} key={isValidElement(item) ? item.key ?? index : index}>
            {item}
          </div>
        ))}
      </div>
      {isValidElement(toggle) ? (
        <div className="chayns-app-layout__footer-motion chayns-app-layout__footer-toggle" data-footer-motion-key="toggle">
          {toggle}
        </div>
      ) : toggle}
    </footer>
    </FooterContext.Provider>
  );
});
const CollapseToggle = forwardRef<HTMLButtonElement, AppLayoutCollapseToggleProps>(
  function CollapseToggle(
    { children, className, collapseLabel, expandLabel, onClick, ...props },
    ref,
  ) {
    const layout = useLayout('CollapseToggle');
    return (
      <button
        {...props}
        aria-label={layout.collapsed ? expandLabel : collapseLabel}
        title={props.title ?? (layout.collapsed ? expandLabel : collapseLabel)}
        aria-expanded={!layout.collapsed}
        className={['chayns-app-layout__collapse', className].filter(Boolean).join(' ')}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) layout.toggle();
        }}
        ref={ref}
        type="button"
      >
        {children ?? <AppLayoutIcon icon={layout.collapsed ? 'fa-arrow-right-to-line' : 'fa-arrow-left-to-line'} />}
      </button>
    );
  },
);
const Root = forwardRef<HTMLDivElement, AppLayoutProps>(function Root(
  { children, className, collapsed, defaultCollapsed = false, onCollapsedChange, ...props },
  ref,
) {
  const [internal, setInternal] = useState(defaultCollapsed);
  const [labelsHidden, setLabelsHidden] = useState(collapsed ?? defaultCollapsed);
  const rootElement = useRef<HTMLDivElement>(null);
  const motionSnapshot = useRef<LayoutMotionSnapshot | null>(null);
  const isCollapsed = collapsed ?? internal;
  useLayoutEffect(() => {
    if (isCollapsed) {
      const durationValue = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--dur-spring')
        .trim();
      const duration = durationValue.endsWith('ms')
        ? Number.parseFloat(durationValue)
        : durationValue.endsWith('s')
          ? Number.parseFloat(durationValue) * 1000
          : Number.parseFloat(durationValue) || 450;
      const reduceMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) setLabelsHidden(true);
      else {
        const timeout = window.setTimeout(() => setLabelsHidden(true), duration);
        return () => window.clearTimeout(timeout);
      }
    } else {
      setLabelsHidden(false);
    }
  }, [isCollapsed]);
  const toggle = () => {
    const root = rootElement.current;
    const rects = new Map<string, DOMRect>();
    root?.querySelectorAll<HTMLElement>('[data-footer-motion-key]').forEach((node) => {
      const key = node.dataset.footerMotionKey;
      if (key) rects.set(key, node.getBoundingClientRect());
    });
    motionSnapshot.current = {
      rects,
      columns: root ? window.getComputedStyle(root).gridTemplateColumns : '',
    };
    const next = !isCollapsed;
    if (collapsed === undefined) setInternal(next);
    onCollapsedChange?.(next);
  };
  useLayoutEffect(() => {
    const root = rootElement.current;
    const snapshot = motionSnapshot.current;
    motionSnapshot.current = null;
    if (!root || !snapshot) return;
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof root.animate !== 'function') return;
    const durationValue = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--dur-spring')
      .trim();
    const duration = durationValue.endsWith('ms')
      ? Number.parseFloat(durationValue)
      : durationValue.endsWith('s')
        ? Number.parseFloat(durationValue) * 1000
        : Number.parseFloat(durationValue) || 450;
    const easing =
      window.getComputedStyle(document.documentElement).getPropertyValue('--spring-default').trim() ||
      'ease-out';
    if (snapshot.columns) {
      root.animate(
        [
          { gridTemplateColumns: snapshot.columns },
          { gridTemplateColumns: window.getComputedStyle(root).gridTemplateColumns },
        ],
        { duration, easing },
      );
    }
    root.querySelectorAll<HTMLElement>('[data-footer-motion-key]').forEach((node) => {
      const key = node.dataset.footerMotionKey;
      const previous = key ? snapshot.rects.get(key) : undefined;
      if (!previous || typeof node.animate !== 'function') return;
      const rect = node.getBoundingClientRect();
      const x = previous.left - rect.left;
      const y = previous.top - rect.top;
      if (x || y) {
        node.animate(
          [
            { transform: `translate3d(${x}px, ${y}px, 0)` },
            { transform: 'translate3d(0, 0, 0)' },
          ],
          { duration, easing },
        );
      }
    });
  }, [isCollapsed]);
  const childParts = Children.toArray(children);
  const sidebarParts = childParts.filter(
    (child) =>
      isValidElement(child) &&
      (child.type === Navigation || child.type === Footer || child.type === CollapseToggle),
  );
  const sidebarPartSet = new Set(sidebarParts);
  const firstSidebar = childParts.find((child) => sidebarPartSet.has(child));
  return (
    <LayoutContext.Provider value={{ collapsed: isCollapsed, labelsHidden, toggle }}>
      <div
        {...props}
        className={['chayns-app-layout', isCollapsed && 'chayns-app-layout--collapsed', className]
          .filter(Boolean)
          .join(' ')}
        ref={(node) => {
          rootElement.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
      >
        {childParts.map((child) => {
          if (sidebarPartSet.has(child)) {
            if (child !== firstSidebar) return null;
            return (
              <aside className="chayns-app-layout__sidebar" key="sidebar">
                {sidebarParts}
              </aside>
            );
          }
          return child;
        })}
      </div>
    </LayoutContext.Provider>
  );
});
Header.displayName = 'AppLayout.Header';
Logo.displayName = 'AppLayout.Logo';
Navigation.displayName = 'AppLayout.Navigation';
Object.assign(NavigationItem, { displayName: 'AppLayout.Navigation.Item' });
Content.displayName = 'AppLayout.Content';
Footer.displayName = 'AppLayout.Footer';
FooterItem.displayName = 'AppLayout.Footer.Item';
CollapseToggle.displayName = 'AppLayout.CollapseToggle';
Root.displayName = 'AppLayout';

export const AppLayout = Object.assign(Root, {
  CollapseToggle,
  Content,
  Footer: Object.assign(Footer, { Item: FooterItem }),
  Header,
  Logo,
  Navigation: Object.assign(Navigation, { Item: NavigationItem }),
});
