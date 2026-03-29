import type { ChangeEvent } from 'react';
import type { TemplateDefinition, TemplateVariant } from '../types';

interface VariantSelectorProps {
  templates: TemplateDefinition[];
  selectedVariant: TemplateVariant;
  onChange: (variant: TemplateVariant) => void;
}

export function VariantSelector({
  templates,
  selectedVariant,
  onChange,
}: VariantSelectorProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as TemplateVariant);
  };

  return (
    <section className="panel panel--layouts">
      <div className="layout-toolbar">
        <div className="layout-toolbar__title">
          <h2>Choose a layout</h2>
        </div>

        <label className="layout-select" htmlFor="layout-select">
          <span className="sr-only">Choose a layout</span>
          <select
            id="layout-select"
            value={selectedVariant}
            onChange={handleChange}
            aria-label="Choose a layout"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
