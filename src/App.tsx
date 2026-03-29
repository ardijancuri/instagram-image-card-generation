import { useEffect, useRef, useState } from 'react';
import { initialInputs, templateDefinitions } from './constants';
import { ControlPanel } from './components/ControlPanel';
import { PostPreview } from './components/PostPreview';
import { VariantSelector } from './components/VariantSelector';
import { TemplateCanvas } from './components/templates/TemplateCanvas';
import type { DesignInputs, ExportFormat, TemplateVariant } from './types';
import {
  buildExportFilename,
  getExportValidationMessage,
} from './utils/design';
import { exportNodeAsImage } from './utils/imageExport';

type TextField = 'title' | 'priceText' | 'description';
type ImageField = 'backgroundImage' | 'logoImage';

export default function App() {
  const [inputs, setInputs] = useState<DesignInputs>(initialInputs);
  const [variant, setVariant] = useState<TemplateVariant>('hero-overlay');
  const [isExporting, setIsExporting] = useState<ExportFormat | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const activeUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    activeUrlsRef.current = [inputs.backgroundImage.url, inputs.logoImage.url].filter(
      (value): value is string => Boolean(value),
    );
  }, [inputs.backgroundImage.url, inputs.logoImage.url]);

  useEffect(
    () => () => {
      activeUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  const validationMessage = getExportValidationMessage(inputs);

  const handleTextChange = (field: TextField, value: string) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [field]: value,
    }));
  };

  const handleImageChange = (field: ImageField, file: File | null) => {
    setInputs((currentInputs) => {
      const previousAsset = currentInputs[field];

      if (previousAsset.url) {
        URL.revokeObjectURL(previousAsset.url);
      }

      return {
        ...currentInputs,
        [field]: file
          ? {
              file,
              url: URL.createObjectURL(file),
              name: file.name,
            }
          : {
              file: null,
              url: null,
              name: null,
            },
      };
    });
  };

  const handleExport = async (format: ExportFormat) => {
    if (!exportRef.current || validationMessage) {
      return;
    }

    setIsExporting(format);

    try {
      await exportNodeAsImage(
        exportRef.current,
        format,
        buildExportFilename(inputs.title, variant, format),
      );
    } catch (error) {
      console.error(error);
      window.alert('Export failed. Please try again.');
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <>
      <main className="app-shell">
        <div className="app-shell__sidebar">
          <ControlPanel
            inputs={inputs}
            isExporting={isExporting}
            validationMessage={validationMessage}
            onTextChange={handleTextChange}
            onImageChange={handleImageChange}
            onExport={handleExport}
          />
        </div>

        <div className="app-shell__content">
          <VariantSelector
            templates={templateDefinitions}
            selectedVariant={variant}
            onChange={setVariant}
          />
          <PostPreview inputs={inputs} variant={variant} />
        </div>
      </main>

      <div className="export-stage" aria-hidden="true">
        <div ref={exportRef} className="export-stage__canvas">
          <TemplateCanvas inputs={inputs} variant={variant} />
        </div>
      </div>
    </>
  );
}
