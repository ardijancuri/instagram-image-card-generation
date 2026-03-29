export type TemplateVariant =
  | 'hero-overlay'
  | 'glass-card'
  | 'split-promo'
  | 'bottom-band'
  | 'top-frame'
  | 'centered-focus';

export type ExportFormat = 'png' | 'jpg';

export interface ImageAsset {
  file: File | null;
  url: string | null;
  name: string | null;
}

export interface DesignInputs {
  title: string;
  priceText: string;
  description: string;
  backgroundImage: ImageAsset;
  logoImage: ImageAsset;
}

export interface TemplateDefinition {
  id: TemplateVariant;
  name: string;
  priceLabel: string;
}
