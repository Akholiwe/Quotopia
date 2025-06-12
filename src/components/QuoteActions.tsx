import React, { useState } from 'react';
import { Download, Copy, Check, FileText } from 'lucide-react';
import { Quote } from '../types/Quote';

interface QuoteActionsProps {
  quotes: Quote[];
}

export const QuoteActions: React.FC<QuoteActionsProps> = ({ quotes }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    const allQuotes = quotes.map(quote => 
      `"${quote.text}" - ${quote.author} (${quote.category})`
    ).join('\n\n');
    
    try {
      await navigator.clipboard.writeText(allQuotes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = allQuotes;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadAll = () => {
    const inspirationalQuotes = quotes.filter(q => q.category === 'inspirational');
    const bizarreQuotes = quotes.filter(q => q.category === 'bizarre');
    
    const content = `QUOTOPIA - Complete Collection
Where inspiration meets the wonderfully bizarre

═══════════════════════════════════════════════════════════════════

INSPIRATIONAL QUOTES (${inspirationalQuotes.length} quotes)

${inspirationalQuotes.map((quote, index) => 
  `${index + 1}. "${quote.text}"\n   — ${quote.author}`
).join('\n\n')}

═══════════════════════════════════════════════════════════════════

BIZARRE QUOTES (${bizarreQuotes.length} quotes)

${bizarreQuotes.map((quote, index) => 
  `${index + 1}. "${quote.text}"\n   — ${quote.author}`
).join('\n\n')}

═══════════════════════════════════════════════════════════════════

Total: ${quotes.length} quotes
Generated from Quotopia
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotopia-complete-collection-${quotes.length}-quotes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const jsonContent = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotopia-quotes-${quotes.length}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col gap-3">
        {/* Copy All Button */}
        <button
          onClick={handleCopyAll}
          className={`
            p-4 rounded-full 
            bg-gradient-to-r from-purple-500/20 to-indigo-600/20
            backdrop-blur-sm
            border border-purple-400/30
            hover:scale-110 
            hover:shadow-2xl
            transition-all 
            duration-300
            group
            ${copied ? 'bg-green-500/20 border-green-400/30' : ''}
          `}
          title="Copy all quotes"
        >
          {copied ? (
            <Check className="w-6 h-6 text-green-300" />
          ) : (
            <Copy className="w-6 h-6 text-purple-300 group-hover:text-purple-200" />
          )}
        </button>

        {/* Download Text Button */}
        <button
          onClick={handleDownloadAll}
          className="
            p-4 rounded-full 
            bg-gradient-to-r from-blue-500/20 to-cyan-600/20
            backdrop-blur-sm
            border border-blue-400/30
            hover:scale-110 
            hover:shadow-2xl
            transition-all 
            duration-300
            group
          "
          title="Download all quotes as text"
        >
          <FileText className="w-6 h-6 text-blue-300 group-hover:text-blue-200" />
        </button>

        {/* Download JSON Button */}
        <button
          onClick={handleDownloadJSON}
          className="
            p-4 rounded-full 
            bg-gradient-to-r from-orange-500/20 to-red-600/20
            backdrop-blur-sm
            border border-orange-400/30
            hover:scale-110 
            hover:shadow-2xl
            transition-all 
            duration-300
            group
          "
          title="Download quotes as JSON"
        >
          <Download className="w-6 h-6 text-orange-300 group-hover:text-orange-200" />
        </button>
      </div>
    </div>
  );
};