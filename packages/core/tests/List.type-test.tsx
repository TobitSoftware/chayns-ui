import { createRef } from 'react';
import List from '../src/components/list/List.js';

export const validList = (
  <List ref={createRef<HTMLUListElement>()}>
    <List.Item ref={createRef<HTMLLIElement>()}>
      <List.Item.Action data-purpose="row" onClick={() => undefined}>
        <List.Item.Body>
          <List.Item.Title>Titel</List.Item.Title>
          <List.Item.Description>Beschreibung</List.Item.Description>
        </List.Item.Body>
      </List.Item.Action>
    </List.Item>
  </List>
);
export const validLink = <List.Item.Action href="#target">Navigation</List.Item.Action>;
export const validButton = <List.Item.Action>Aktion</List.Item.Action>;
// @ts-expect-error Status needs an accessible label
export const missingStatusLabel = <List.Item.Status />;
