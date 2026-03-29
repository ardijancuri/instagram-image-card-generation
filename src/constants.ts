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
    priceLabel: 'From',
  },
  {
    id: 'glass-card',
    name: 'Glass Card',
    priceLabel: 'From',
  },
  {
    id: 'split-promo',
    name: 'Split Promo',
    priceLabel: 'From',
  },
  {
    id: 'bottom-band',
    name: 'Bottom Band',
    priceLabel: 'From',
  },
  {
    id: 'top-frame',
    name: 'Top Frame',
    priceLabel: 'From',
  },
  {
    id: 'centered-focus',
    name: 'Centered Focus',
    priceLabel: 'From',
  },
];
