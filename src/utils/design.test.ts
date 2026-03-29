import { buildExportFilename, getExportValidationMessage, isExportReady } from './design';
import { createEmptyAsset } from '../constants';
import type { DesignInputs } from '../types';

const buildInputs = (overrides: Partial<DesignInputs> = {}): DesignInputs => ({
  title: '',
  priceText: '',
  description: '',
  backgroundImage: createEmptyAsset(),
  logoImage: createEmptyAsset(),
  ...overrides,
});

describe('design helpers', () => {
  it('requires background, title, and price before export', () => {
    const message = getExportValidationMessage(buildInputs());

    expect(message).toBe(
      'Add a background image, a title, and a price to unlock export.',
    );
    expect(isExportReady(buildInputs())).toBe(false);
  });

  it('returns ready state when required inputs exist', () => {
    const inputs = buildInputs({
      title: 'Europe eSIM',
      priceText: 'EUR 9.99',
      backgroundImage: {
        file: null,
        name: 'background.png',
        url: 'blob:background',
      },
    });

    expect(isExportReady(inputs)).toBe(true);
    expect(getExportValidationMessage(inputs)).toBeNull();
  });

  it('builds stable export filenames', () => {
    expect(buildExportFilename('Europe Summer Plan', 'glass-card', 'png')).toBe(
      'europe-summer-plan-glass-card.png',
    );
  });
});
