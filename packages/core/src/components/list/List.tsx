import { forwardRef } from 'react';

import { ListContext, ListItemContext, useListContext, useListItemContext } from './ListContext.js';
import type {
  ListItemActionProps,
  ListItemPartProps,
  ListItemProps,
  ListItemStatusProps,
  ListProps,
} from './List.types.js';

const Item = forwardRef<HTMLLIElement, ListItemProps>(function Item(
  { children, className, ...itemProps },
  ref,
) {
  useListContext();
  const resolvedClassName = ['chayns-list-item', className].filter(Boolean).join(' ');

  return (
    <ListItemContext.Provider value>
      <li {...itemProps} className={resolvedClassName} ref={ref}>
        {children}
      </li>
    </ListItemContext.Provider>
  );
});

function Action(props: ListItemActionProps) {
  useListItemContext('Action');

  if (props.href !== undefined) {
    const { children, className, href, ...anchorProps } = props;
    const resolvedClassName = ['chayns-list-item__action', className].filter(Boolean).join(' ');

    return (
      <a {...anchorProps} className={resolvedClassName} href={href}>
        {children}
      </a>
    );
  }

  const { children, className, ...buttonProps } = props;
  const resolvedClassName = ['chayns-list-item__action', className].filter(Boolean).join(' ');

  return (
    <button {...buttonProps} className={resolvedClassName} type="button">
      {children}
    </button>
  );
}

function createPart(name: 'Leading' | 'Body' | 'Title' | 'Description' | 'Trailing') {
  const className = `chayns-list-item__${name.toLowerCase()}`;

  return function ListItemPart({ children, className: consumerClassName }: ListItemPartProps) {
    useListItemContext(name);
    const resolvedClassName = [className, consumerClassName].filter(Boolean).join(' ');

    return <span className={resolvedClassName}>{children}</span>;
  };
}

function Status({ label }: ListItemStatusProps) {
  useListItemContext('Status');

  return (
    <span className="chayns-list-item__status">
      <span aria-hidden="true" className="chayns-list-item__status-dot" />
      <span className="chayns-visually-hidden">{label}</span>
    </span>
  );
}

const ListRoot = forwardRef<HTMLUListElement, ListProps>(function List(
  { children, className, ...listProps },
  ref,
) {
  const resolvedClassName = ['chayns-list', className].filter(Boolean).join(' ');

  return (
    <ListContext.Provider value>
      <ul {...listProps} className={resolvedClassName} ref={ref}>
        {children}
      </ul>
    </ListContext.Provider>
  );
});

const List = Object.assign(ListRoot, {
  Item: Object.assign(Item, {
    Action,
    Body: createPart('Body'),
    Description: createPart('Description'),
    Leading: createPart('Leading'),
    Status,
    Title: createPart('Title'),
    Trailing: createPart('Trailing'),
  }),
});

export default List;
