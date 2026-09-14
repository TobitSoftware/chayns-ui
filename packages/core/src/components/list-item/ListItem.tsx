import type { ReactNode } from 'react';

import type { ListItemProps } from '../list/List.types.js';
import ListItemBody from './list-item-body/ListItemBody.js';

const ListItem = ({
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
}: ListItemProps) => {
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
};

export default ListItem;
