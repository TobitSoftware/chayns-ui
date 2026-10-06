import { createRef } from 'react';

import SegmentedControl from '../src/components/segmented-control/SegmentedControl.js';

export const validSegmentedControl = (
  <SegmentedControl defaultValue="week" label="Zeitraum" ref={createRef<HTMLDivElement>()}>
    <SegmentedControl.Segment
      data-purpose="range"
      icon="fa-calendar-week"
      ref={createRef<HTMLButtonElement>()}
      value="week"
    >
      Woche
    </SegmentedControl.Segment>
  </SegmentedControl>
);

export const controlledSegmentedControl = (
  <SegmentedControl label="Zeitraum" onValueChange={() => undefined} value="week">
    <SegmentedControl.Segment value="week">Woche</SegmentedControl.Segment>
  </SegmentedControl>
);

// Omitted initial selection now uses the confirmed automatic initialization.
export const missingSelection = <SegmentedControl label="Zeitraum">Inhalt</SegmentedControl>;
export const missingControlledCallback = (
  // @ts-expect-error a controlled selection requires its callback
  <SegmentedControl label="Zeitraum" value="week">
    Inhalt
  </SegmentedControl>
);
export const customSegmentRole = (
  <SegmentedControl.Segment
    // @ts-expect-error SegmentedControl owns the radio role
    role="button"
    value="week"
  >
    Woche
  </SegmentedControl.Segment>
);
