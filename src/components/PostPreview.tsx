import { templateDefinitions } from '../constants';
import type { DesignInputs, TemplateVariant } from '../types';
import { TemplateCanvas } from './templates/TemplateCanvas';

interface PostPreviewProps {
  inputs: DesignInputs;
  variant: TemplateVariant;
}

export function PostPreview({ inputs, variant }: PostPreviewProps) {
  const activeTemplate = templateDefinitions.find((template) => template.id === variant);

  return (
    <section className="panel panel--preview">
      <div className="panel__header panel__header--tight">
        <div>
          <p className="eyebrow">Preview</p>
          <h2>{activeTemplate?.name ?? 'Preview'}</h2>
        </div>
        <p className="preview-meta">1080 x 1350</p>
      </div>

      <div className="preview-shell">
        <TemplateCanvas inputs={inputs} variant={variant} />
      </div>
    </section>
  );
}
