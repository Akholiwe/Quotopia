import React, { useState } from 'react';
import { Quote as QuoteIcon, Download, Copy, Check, AlertCircle } from 'lucide-react';
import { Quote } from '../types/Quote';
import { generateAndProcessQuoteImage } from '../utils/imageGenerator';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sizeClasses = {
    small: 'p-6',
    medium: 'p-6',
    large: 'p-8'
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

  const handleDownloadImage = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const { download } = await generateAndProcessQuoteImage(quote, {
        width: 800,
        height: 600,
        format: 'png'
      });
      download();
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setCopyStatus('idle');
    
    try {
      const { copyToClipboard } = await generateAndProcessQuoteImage(quote, {
        width: 800,
        height: 600,
        format: 'png'
      });
      
      const success = await copyToClipboard();
      setCopyStatus(success ? 'success' : 'error');
      
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy image:', error);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } finally {
      setIsGenerating(false);
    }
  };

  const getCopyIcon = () => {
    switch (copyStatus) {
      case 'success':
        return <Check className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Copy className="w-4 h-4" />;
    }
  };

  const getCopyButtonColor = () => {
    switch (copyStatus) {
      case 'success':
        return 'text-green-300 hover:text-green-200';
      case 'error':
        return 'text-red-300 hover:text-red-200';
      default:
        return `${colors.accent} hover:text-white`;
    }
  };

  return (
    <div
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
        overflow-hidden
        h-fit
        min-h-[280px]
        flex
        flex-col
      `}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${3000 + Math.random() * 2000}ms`
      }}
    >
      {/* Action buttons */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button
          onClick={handleDownloadImage}
          disabled={isGenerating}
          className={`
            p-2 rounded-full 
            bg-black/40 backdrop-blur-md 
            border border-white/30 
            ${colors.accent} hover:text-white
            transition-all duration-200
            hover:bg-black/60
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg
          `}
          title="Download as PNG"
        >
          <Download className={`w-4 h-4 ${isGenerating ? 'animate-pulse' : ''}`} />
        </button>
        
        <button
          onClick={handleCopyToClipboard}
          disabled={isGenerating}
          className={`
            p-2 rounded-full 
            bg-black/40 backdrop-blur-md 
            border border-white/30 
            ${getCopyButtonColor()}
            transition-all duration-200
            hover:bg-black/60
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg
          `}
          title={
            copyStatus === 'success' 
              ? 'Copied to clipboard!' 
              : copyStatus === 'error'
              ? 'Failed to copy'
              : 'Copy to clipboard'
          }
        >
          {getCopyIcon()}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <QuoteIcon 
          className={`w-6 h-6 ${colors.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300 mb-4`}
        />
        
        <blockquote className={`text-base leading-relaxed ${colors.text} mb-4 flex-1`}>
          "{quote.text}"
        </blockquote>
        
        <div className="mt-auto space-y-3">
          <cite className={`text-sm font-medium ${colors.accent} not-italic block`}>
            — {quote.author}
          </cite>
          
          {quote.character && (
            <div className={`text-xs ${colors.text} opacity-75`}>
              {quote.character}
            </div>
          )}
          
          <span className={`
            inline-block px-3 py-1 
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