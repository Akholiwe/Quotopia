import React, { useState } from 'react';
import { Quote as QuoteIcon, Copy, Download, Check } from 'lucide-react';
import { Quote } from '../types/Quote';

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
          title="Download quote"
        >
          <Download className={`w-4 h-4 ${colors.accent}`} />
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