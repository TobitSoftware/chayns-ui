import type { ListProps } from './List.types.js';

function List({ children, className, ...listProps }: ListProps) {
  const resolvedClassName = ['chayns-list', className].filter(Boolean).join(' ');

  return (
    <ul {...listProps} className={resolvedClassName}>
      {children}
    </ul>
  );
}

export default List;
