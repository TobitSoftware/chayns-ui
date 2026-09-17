import { createRef } from 'react';

import Switch from '../src/components/switch/Switch.js';

export const validSwitch = (
  <Switch
    data-purpose="notifications"
    defaultChecked
    name="notifications"
    ref={createRef<HTMLInputElement>()}
  >
    E-Mail-Benachrichtigungen
  </Switch>
);

// @ts-expect-error visible label is required
export const missingLabel = <Switch />;
// @ts-expect-error Switch owns its input type
export const customType = <Switch type="radio">Option</Switch>;
