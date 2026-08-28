import type { ReactNode } from 'react';

import type { ListItemProps } from './List.types.js';

function ListItemBody({
  leading,
  subtitle,
  title,
  unread,
  unreadLabel,
}: {
  leading?: ReactNode;
  subtitle?: ReactNode;
  title: ReactNode;
  unread?: boolean;
  unreadLabel?: string | undefined;
}) {
  return (
    <>
      {unread ? (
        <span className="chayns-list-item__unread" aria-hidden={unreadLabel ? undefined : true}>
          {unreadLabel ? <span className="chayns-visually-hidden">{unreadLabel}</span> : null}
        </span>
      ) : null}
      {leading ? <span className="chayns-list-item__leading">{leading}</span> : null}
      <span className="chayns-list-item__body">
        <span className="chayns-list-item__title">{title}</span>
        {subtitle ? <span className="chayns-list-item__subtitle">{subtitle}</span> : null}
      </span>
    </>
  );
}

function ListItem({
  className,
  disabled = false,
  href,
  id,
  leading,
  onClick,
  subtitle,
  title,
  trailing,
  unread = false,
  unreadLabel,
}: ListItemProps) {
  const interactive = Boolean(href) || Boolean(onClick);
  const actionClassName = [
    'chayns-list-item__action',
    interactive ? 'chayns-list-item__action--interactive' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const body = (
    <ListItemBody
      leading={leading}
      subtitle={subtitle}
      title={title}
      unread={unread}
      unreadLabel={unreadLabel}
    />
  );

  let action: ReactNode;
  if (href) {
    action = (
      <a className={actionClassName} href={href}>
        {body}
      </a>
    );
  } else if (onClick) {
    action = (
      <button className={actionClassName} disabled={disabled} onClick={onClick} type="button">
        {body}
      </button>
    );
  } else {
    action = <div className={actionClassName}>{body}</div>;
  }

  return (
    <li className={['chayns-list-item', className].filter(Boolean).join(' ')} id={id}>
      {action}
      {trailing ? <span className="chayns-list-item__trailing">{trailing}</span> : null}
    </li>
  );
}

export default ListItem;
