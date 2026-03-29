import type { DesignInputs, ImageAsset, TemplateDefinition } from './types';

export const createEmptyAsset = (): ImageAsset => ({
  file: null,
  url: null,
  name: null,
});

export const initialInputs: DesignInputs = {
  title: '',
  priceText: '',
  description: '',
  backgroundImage: createEmptyAsset(),
  logoImage: createEmptyAsset(),
};

export const templateDefinitions: TemplateDefinition[] = [
  {
    id: 'hero-overlay',
    name: 'Hero Overlay',
    eyebrow: 'Image first',
    accent: 'Fast setup',
    priceLabel: 'From',
  },
  {
    id: 'glass-card',
    name: 'Glass Card',
    eyebrow: 'Soft card',
    accent: 'Balanced',
    priceLabel: 'Price',
  },
  {
    id: 'split-promo',
    name: 'Split Promo',
    eyebrow: 'Split view',
    accent: 'Structured',
    priceLabel: 'Price',
  },
  {
    id: 'bottom-band',
    name: 'Bottom Band',
    eyebrow: 'Wide band',
    accent: 'Ready today',
    priceLabel: 'From',
  },
  {
    id: 'top-frame',
    name: 'Top Frame',
    eyebrow: 'Top frame',
    accent: 'Brand first',
    priceLabel: 'Price',
  },
  {
    id: 'centered-focus',
    name: 'Centered Focus',
    eyebrow: 'Centered',
    accent: 'Clean focus',
    priceLabel: 'Price',
  },
];
