import React from 'react';
import { Quote as QuoteIcon } from 'lucide-react';
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
      `}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${3000 + Math.random() * 2000}ms`
      }}
    >
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