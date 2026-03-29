import { toJpeg, toPng } from 'html-to-image';
import type { ExportFormat } from '../types';

const triggerDownload = (dataUrl: string, fileName: string) => {
  const anchor = document.createElement('a');
  anchor.download = fileName;
  anchor.href = dataUrl;
  anchor.click();
};

export const exportNodeAsImage = async (
  node: HTMLElement,
  format: ExportFormat,
  fileName: string,
) => {
  const options = {
    cacheBust: false,
    pixelRatio: 1,
  };

  const dataUrl =
    format === 'png'
      ? await toPng(node, options)
      : await toJpeg(node, {
          ...options,
          quality: 0.96,
        });

  triggerDownload(dataUrl, fileName);
};
