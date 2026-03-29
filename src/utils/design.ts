import type { DesignInputs, TemplateVariant } from '../types';

const formatMissingFields = (missingFields: string[]) => {
  if (missingFields.length === 1) {
    return missingFields[0];
  }

  if (missingFields.length === 2) {
    return `${missingFields[0]} and ${missingFields[1]}`;
  }

  return `${missingFields.slice(0, -1).join(', ')}, and ${
    missingFields[missingFields.length - 1]
  }`;
};

export const isExportReady = (inputs: DesignInputs) =>
  Boolean(
    inputs.backgroundImage.url &&
      inputs.title.trim() &&
      inputs.priceText.trim(),
  );

export const getExportValidationMessage = (inputs: DesignInputs) => {
  const missingFields: string[] = [];

  if (!inputs.backgroundImage.url) {
    missingFields.push('a background image');
  }

  if (!inputs.title.trim()) {
    missingFields.push('a title');
  }

  if (!inputs.priceText.trim()) {
    missingFields.push('a price');
  }

  if (missingFields.length === 0) {
    return null;
  }

  return `Add ${formatMissingFields(missingFields)} to unlock export.`;
};

export const buildExportFilename = (
  title: string,
  variant: TemplateVariant,
  format: 'png' | 'jpg',
) => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const safeTitle = slug || 'esim-offer';

  return `${safeTitle}-${variant}.${format}`;
};
