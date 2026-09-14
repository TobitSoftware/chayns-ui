import type { ReactNode } from 'react';

const ListItemBody = ({
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
}) => (
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

export default ListItemBody;
