import { forwardRef } from 'react';
import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import type { BreadcrumbProps } from './Breadcrumb.types.js';

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, items, ...navProps },
  ref,
) {
  if (
    items.some((item, index) =>
      index === items.length - 1 ? item.href !== undefined : item.href === undefined,
    )
  ) {
    throw new Error('Breadcrumb ancestors require href; only the last item is the current page.');
  }

  return (
    <nav
      {...navProps}
      className={['chayns-breadcrumb', className].filter(Boolean).join(' ')}
      ref={ref}
    >
      <ol className="chayns-breadcrumb__list">
        {items.map((item, index) => (
          <li className="chayns-breadcrumb__item" key={item.href ?? 'current'}>
            {index > 0 ? (
              <i aria-hidden="true" className="chayns-breadcrumb__separator far fa-chevron-right" />
            ) : null}
            {item.href !== undefined ? (
              <a className="chayns-breadcrumb__link" href={item.href}>
                {item.icon ? <ButtonIcon icon={item.icon} /> : null}
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="chayns-breadcrumb__current">
                {item.icon ? <ButtonIcon icon={item.icon} /> : null}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
});
Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;
