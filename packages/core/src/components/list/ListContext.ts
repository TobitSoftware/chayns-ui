import { createContext, useContext } from 'react';

const ListContext = createContext(false);
const ListItemContext = createContext(false);

function useListContext() {
  if (!useContext(ListContext)) {
    throw new Error('List.Item must be rendered within List.');
  }
}

function useListItemContext(part: string) {
  if (!useContext(ListItemContext)) {
    throw new Error(`List.Item.${part} must be rendered within List.Item.`);
  }
}

export { ListContext, ListItemContext, useListContext, useListItemContext };
