import React from 'react';
import { QuoteCard } from './QuoteCard';
import { Quote } from '../types/Quote';

interface QuoteGridProps {
  quotes: Quote[];
}

export const QuoteGrid: React.FC<QuoteGridProps> = ({ quotes }) => {
  const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
  
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
        {quotes.map((quote, index) => (
          <div key={quote.id} className="break-inside-avoid">
            <QuoteCard
              quote={quote}
              size={sizes[index % 3]}
              delay={index * 200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};