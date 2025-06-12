import React, { useState, useRef } from 'react';
import { Quote as QuoteIcon, Copy, Download, Check, Image } from 'lucide-react';
import { Quote } from '../types/Quote';
import html2canvas from 'html2canvas';

interface QuoteCardProps {
  quote: Quote;
  size?: 'small' | 'medium' | 'large';
  delay?: number;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ 
  quote, 
  size = 'medium',
  delay = 0 
}) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    small: 'p-6 max-w-sm',
    medium: 'p-8 max-w-md',
    large: 'p-10 max-w-lg'
  };

  const categoryColors = {
    inspirational: {
      bg: 'from-blue-500/20 to-indigo-600/20',
      border: 'border-blue-400/30',
      text: 'text-blue-100',
      accent: 'text-blue-300'
    },
    bizarre: {
      bg: 'from-orange-500/20 to-red-600/20',
      border: 'border-orange-400/30',
      text: 'text-orange-100',
      accent: 'text-orange-300'
    }
  };

  const colors = categoryColors[quote.category];

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const quoteText = `"${quote.text}" - ${quote.author}`;
    
    try {
      await navigator.clipboard.writeText(quoteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = quoteText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const quoteText = `"${quote.text}"\n\n— ${quote.author}\n\nCategory: ${quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}\n\nFrom Quotopia - Where inspiration meets the wonderfully bizarre`;
    
    const blob = new Blob([quoteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quote-${quote.id}-${quote.author.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImageDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardRef.current) return;

    setIsDownloading(true);
    
    try {
      // Create a temporary container with better styling for image capture
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '600px';
      tempContainer.style.padding = '40px';
      tempContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      tempContainer.style.borderRadius = '20px';
      tempContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      // Create the quote content
      tempContainer.innerHTML = `
        <div style="
          background: ${quote.category === 'inspirational' 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)' 
            : 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)'
          };
          backdrop-filter: blur(10px);
          border: 1px solid ${quote.category === 'inspirational' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(249, 115, 22, 0.3)'};
          border-radius: 16px;
          padding: 32px;
          color: white;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        ">
          <div style="
            font-size: 48px;
            color: ${quote.category === 'inspirational' ? '#93c5fd' : '#fdba74'};
            margin-bottom: 24px;
            opacity: 0.6;
          ">"</div>
          
          <blockquote style="
            font-size: 24px;
            line-height: 1.6;
            margin: 0 0 32px 0;
            color: ${quote.category === 'inspirational' ? '#dbeafe' : '#fed7aa'};
            font-weight: 400;
          ">
            ${quote.text}
          </blockquote>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <cite style="
              font-size: 18px;
              font-weight: 500;
              color: ${quote.category === 'inspirational' ? '#93c5fd' : '#fdba74'};
              font-style: normal;
            ">
              — ${quote.author}
            </cite>
            
            <span style="
              padding: 8px 16px;
              font-size: 12px;
              border-radius: 20px;
              background: ${quote.category === 'inspirational' 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)' 
                : 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)'
              };
              border: 1px solid ${quote.category === 'inspirational' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(249, 115, 22, 0.3)'};
              color: ${quote.category === 'inspirational' ? '#dbeafe' : '#fed7aa'};
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 1px;
            ">
              ${quote.category}
            </span>
          </div>
          
          <div style="
            margin-top: 24px;
            text-align: center;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
            font-weight: 300;
          ">
            Quotopia - Where inspiration meets the wonderfully bizarre
          </div>
        </div>
      `;
      
      document.body.appendChild(tempContainer);
      
      // Capture the image
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: null,
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        width: 600,
        height: tempContainer.scrollHeight
      });
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `quotopia-quote-${quote.id}-${quote.author.replace(/\s+/g, '-').toLowerCase()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`
        ${sizeClasses[size]}
        bg-gradient-to-br ${colors.bg}
        backdrop-blur-sm
        border ${colors.border}
        rounded-2xl
        shadow-2xl
        hover:shadow-3xl
        hover:scale-105
        transition-all
        duration-500
        ease-out
        cursor-pointer
        animate-float
        hover:backdrop-blur-md
        group
        relative
      `}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${3000 + Math.random() * 2000}ms`
      }}
    >
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleCopy}
          className={`
            p-2 rounded-full 
            ${colors.bg} 
            ${colors.border} 
            border 
            backdrop-blur-sm
            hover:scale-110 
            transition-all 
            duration-200
            ${copied ? 'bg-green-500/20 border-green-400/30' : ''}
          `}
          title="Copy quote"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-300" />
          ) : (
            <Copy className={`w-4 h-4 ${colors.accent}`} />
          )}
        </button>
        
        <button
          onClick={handleDownload}
          className={`
            p-2 rounded-full 
            ${colors.bg} 
            ${colors.border} 
            border 
            backdrop-blur-sm
            hover:scale-110 
            transition-all 
            duration-200
          `}
          title="Download quote as text"
        >
          <Download className={`w-4 h-4 ${colors.accent}`} />
        </button>

        <button
          onClick={handleImageDownload}
          disabled={isDownloading}
          className={`
            p-2 rounded-full 
            ${colors.bg} 
            ${colors.border} 
            border 
            backdrop-blur-sm
            hover:scale-110 
            transition-all 
            duration-200
            ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          title="Download quote as image"
        >
          <Image className={`w-4 h-4 ${colors.accent} ${isDownloading ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      <div className="relative">
        <QuoteIcon 
          className={`absolute -top-2 -left-2 w-8 h-8 ${colors.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
        />
        
        <blockquote className={`text-lg leading-relaxed ${colors.text} mb-6 pl-6`}>
          "{quote.text}"
        </blockquote>
        
        <div className="flex justify-between items-center">
          <cite className={`text-sm font-medium ${colors.accent} not-italic`}>
            — {quote.author}
          </cite>
          
          <span className={`
            px-3 py-1 
            text-xs 
            rounded-full 
            ${colors.bg} 
            ${colors.border} 
            border 
            ${colors.text} 
            font-medium
            uppercase
            tracking-wider
          `}>
            {quote.category}
          </span>
        </div>
      </div>
    </div>
  );
};