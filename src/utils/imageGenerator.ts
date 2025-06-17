import html2canvas from 'html2canvas';
import { Quote } from '../types/Quote';

export interface ImageGenerationOptions {
  width?: number;
  height?: number;
  format?: 'png' | 'jpeg';
  quality?: number;
  backgroundColor?: string;
}

export const generateQuoteImage = async (
  quote: Quote,
  options: ImageGenerationOptions = {}
): Promise<string> => {
  const {
    width = 800,
    height = 600,
    format = 'png',
    quality = 0.9,
    backgroundColor = '#1e1b4b'
  } = options;

  // Create a temporary container for the quote
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  container.style.padding = '60px';
  container.style.boxSizing = 'border-box';
  container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  container.style.color = 'white';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.textAlign = 'center';
  container.style.background = quote.category === 'inspirational' 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
  container.style.borderRadius = '20px';
  container.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';

  // Add quote text
  const quoteText = document.createElement('div');
  quoteText.style.fontSize = '28px';
  quoteText.style.lineHeight = '1.4';
  quoteText.style.marginBottom = '40px';
  quoteText.style.fontWeight = '300';
  quoteText.style.maxWidth = '100%';
  quoteText.style.wordWrap = 'break-word';
  quoteText.innerHTML = `"${quote.text}"`;

  // Add author
  const author = document.createElement('div');
  author.style.fontSize = '20px';
  author.style.fontWeight = '600';
  author.style.opacity = '0.9';
  author.style.marginBottom = '20px';
  author.innerHTML = `— ${quote.author}`;

  // Add category badge
  const category = document.createElement('div');
  category.style.fontSize = '14px';
  category.style.fontWeight = '500';
  category.style.textTransform = 'uppercase';
  category.style.letterSpacing = '1px';
  category.style.padding = '8px 16px';
  category.style.borderRadius = '20px';
  category.style.backgroundColor = 'rgba(255,255,255,0.2)';
  category.style.border = '1px solid rgba(255,255,255,0.3)';
  category.innerHTML = quote.category;

  // Add watermark
  const watermark = document.createElement('div');
  watermark.style.position = 'absolute';
  watermark.style.bottom = '20px';
  watermark.style.right = '30px';
  watermark.style.fontSize = '14px';
  watermark.style.opacity = '0.6';
  watermark.style.fontWeight = '500';
  watermark.innerHTML = 'Quotopia';

  container.appendChild(quoteText);
  container.appendChild(author);
  container.appendChild(category);
  container.appendChild(watermark);

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      backgroundColor: backgroundColor,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      width: width,
      height: height
    });

    document.body.removeChild(container);

    return canvas.toDataURL(`image/${format}`, quality);
  } catch (error) {
    document.body.removeChild(container);
    throw error;
  }
};

export const downloadImage = (dataUrl: string, filename: string): void => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyImageToClipboard = async (dataUrl: string): Promise<boolean> => {
  try {
    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Check if clipboard API is available
    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      return true;
    } else {
      // Fallback: try to copy as text (data URL)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(dataUrl);
        return true;
      }
      return false;
    }
  } catch (error) {
    console.error('Failed to copy image to clipboard:', error);
    return false;
  }
};

export const generateAndProcessQuoteImage = async (
  quote: Quote,
  options: ImageGenerationOptions = {}
): Promise<{
  dataUrl: string;
  download: (filename?: string) => void;
  copyToClipboard: () => Promise<boolean>;
}> => {
  const dataUrl = await generateQuoteImage(quote, options);
  
  return {
    dataUrl,
    download: (filename?: string) => {
      const defaultFilename = `quote-${quote.id}-${quote.author.replace(/\s+/g, '-').toLowerCase()}.${options.format || 'png'}`;
      downloadImage(dataUrl, filename || defaultFilename);
    },
    copyToClipboard: () => copyImageToClipboard(dataUrl)
  };
};