import React from 'react';
import { QuoteCard } from './QuoteCard';
import { Quote } from '../types/Quote';

interface QuoteGridProps {
  quotes: Quote[];
}

export const QuoteGrid: React.FC<QuoteGridProps> = ({ quotes }) => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {quotes.map((quote, index) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            size="medium"
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};