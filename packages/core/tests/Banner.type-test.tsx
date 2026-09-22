import Banner from '../src/components/banner/Banner.js';

export const validBanner = (
  <Banner
    closeLabel="Meldung schließen"
    icon="fa-circle-info"
    onClose={() => undefined}
    tone="neutral"
  >
    Hinweis
  </Banner>
);

// @ts-expect-error closeLabel is required when a close handler is used
export const missingCloseLabel = <Banner onClose={() => undefined}>Hinweis</Banner>;
// @ts-expect-error arbitrary tones are not part of the public value set
export const invalidTone = <Banner tone="critical">Hinweis</Banner>;
