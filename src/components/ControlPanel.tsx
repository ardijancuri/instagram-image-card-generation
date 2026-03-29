import type { ChangeEvent } from 'react';
import type { DesignInputs, ExportFormat, ImageAsset } from '../types';

type TextField = 'title' | 'priceText' | 'description';
type ImageField = 'backgroundImage' | 'logoImage';

interface ControlPanelProps {
  inputs: DesignInputs;
  isExporting: ExportFormat | null;
  validationMessage: string | null;
  onTextChange: (field: TextField, value: string) => void;
  onImageChange: (field: ImageField, file: File | null) => void;
  onExport: (format: ExportFormat) => void;
}

interface AssetFieldProps {
  accept: string;
  asset: ImageAsset;
  label: string;
  required?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

function AssetField({
  accept,
  asset,
  label,
  required = false,
  onChange,
  onClear,
}: AssetFieldProps) {
  const inputId = `${label.toLowerCase().replace(/\s+/g, '-')}-input`;

  return (
    <div className="field field--file">
      <span className="field__label">
        {label}
        {required ? <span className="field__required">*</span> : null}
      </span>
      <div className="field__file-row">
        <input
          id={inputId}
          className="field__file-input sr-only"
          type="file"
          accept={accept}
          aria-label={label}
          onChange={onChange}
        />
        <label className="field__file-trigger" htmlFor={inputId}>
          Choose file
        </label>
        {asset.url ? (
          <button
            className="field__clear"
            type="button"
            aria-label={`Delete ${label.toLowerCase()}`}
            onClick={onClear}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16" />
              <path d="M9 4h6" />
              <path d="M7 7l1 12h8l1-12" />
              <path d="M10 11v5" />
              <path d="M14 11v5" />
            </svg>
          </button>
        ) : null}
      </div>
      <span className="field__file-name">
        {asset.name ?? 'No file selected'}
      </span>
    </div>
  );
}

export function ControlPanel({
  inputs,
  isExporting,
  validationMessage,
  onTextChange,
  onImageChange,
  onExport,
}: ControlPanelProps) {
  const handleFileChange =
    (field: ImageField) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextFile = event.target.files?.[0] ?? null;
      onImageChange(field, nextFile);
      event.target.value = '';
    };

  return (
    <section className="panel panel--form">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Builder</p>
          <h1>Create a 4:5 post</h1>
        </div>
        <p className="panel__lede">
          Add content, choose a layout, export.
        </p>
      </div>

      <div className="form-grid">
        <AssetField
          label="Background"
          required
          asset={inputs.backgroundImage}
          accept="image/*"
          onChange={handleFileChange('backgroundImage')}
          onClear={() => onImageChange('backgroundImage', null)}
        />

        <AssetField
          label="Logo"
          asset={inputs.logoImage}
          accept="image/*"
          onChange={handleFileChange('logoImage')}
          onClear={() => onImageChange('logoImage', null)}
        />

        <label className="field field--full" htmlFor="title-input">
          <span className="field__label">
            Title
            <span className="field__required">*</span>
          </span>
          <input
            id="title-input"
            name="title"
            type="text"
            maxLength={80}
            placeholder="Stay connected anywhere"
            value={inputs.title}
            onChange={(event) => onTextChange('title', event.target.value)}
          />
        </label>

        <label className="field" htmlFor="price-input">
          <span className="field__label">
            Price
            <span className="field__required">*</span>
          </span>
          <input
            id="price-input"
            name="price"
            type="text"
            maxLength={32}
            placeholder="$9.99"
            value={inputs.priceText}
            onChange={(event) => onTextChange('priceText', event.target.value)}
          />
        </label>

        <label className="field field--full" htmlFor="description-input">
          <span className="field__label">Description</span>
          <textarea
            id="description-input"
            name="description"
            rows={4}
            maxLength={140}
            placeholder="Flexible data plans with instant activation for modern travelers."
            value={inputs.description}
            onChange={(event) => onTextChange('description', event.target.value)}
          />
        </label>
      </div>

      <div className="export-bar">
        <div>
          <p className="export-bar__label">Export</p>
          <p className="export-bar__hint">
            {validationMessage ?? 'Ready.'}
          </p>
        </div>

        <div className="export-bar__actions">
          <button
            type="button"
            className="button button--ghost"
            onClick={() => onExport('png')}
            disabled={Boolean(validationMessage) || isExporting !== null}
          >
            {isExporting === 'png' ? 'Exporting PNG...' : 'Download PNG'}
          </button>

          <button
            type="button"
            className="button"
            onClick={() => onExport('jpg')}
            disabled={Boolean(validationMessage) || isExporting !== null}
          >
            {isExporting === 'jpg' ? 'Exporting JPG...' : 'Download JPG'}
          </button>
        </div>
      </div>
    </section>
  );
}
