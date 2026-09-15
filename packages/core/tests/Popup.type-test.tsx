import PopupList from '../src/components/popup/PopupList.js';

export const validPopupList = (
  <PopupList
    items={[{ icon: 'fa-clock', onClick: () => undefined, text: 'Later' }]}
    trigger={<button type="button">More</button>}
  />
);

export const invalidPopupItem = (
  <PopupList
    items={[
      {
        // @ts-expect-error Popup icons use the FontAwesome fa- contract
        icon: 'clock',
        onClick: () => undefined,
        text: 'Later',
      },
    ]}
    trigger={<button type="button">More</button>}
  />
);
