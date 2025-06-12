import React, { useState } from 'react';
import { Download, Copy, Check, FileText, Image } from 'lucide-react';
import { Quote } from '../types/Quote';
import html2canvas from 'html2canvas';

interface QuoteActionsProps {
  quotes: Quote[];
}

export const QuoteActions: React.FC<QuoteActionsProps> = ({ quotes }) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingCollage, setIsGeneratingCollage] = useState(false);

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

  const handleDownloadCollage = async () => {
    setIsGeneratingCollage(true);
    
    try {
      // Create a beautiful collage container
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '1200px';
      tempContainer.style.padding = '60px';
      tempContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
      tempContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      tempContainer.style.minHeight = '800px';
      
      // Get a selection of quotes (first 12 for a nice grid)
      const selectedQuotes = quotes.slice(0, 12);
      
      tempContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="
            font-size: 48px;
            font-weight: bold;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0 0 16px 0;
          ">Quotopia</h1>
          <p style="
            font-size: 20px;
            color: rgba(255, 255, 255, 0.8);
            margin: 0;
          ">Where inspiration meets the wonderfully bizarre</p>
        </div>
        
        <div style="
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        ">
          ${selectedQuotes.map(quote => `
            <div style="
              background: ${quote.category === 'inspirational' 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)' 
                : 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)'
              };
              backdrop-filter: blur(10px);
              border: 1px solid ${quote.category === 'inspirational' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(249, 115, 22, 0.3)'};
              border-radius: 12px;
              padding: 20px;
              color: white;
              height: 180px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            ">
              <blockquote style="
                font-size: 14px;
                line-height: 1.4;
                margin: 0;
                color: ${quote.category === 'inspirational' ? '#dbeafe' : '#fed7aa'};
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
              ">
                "${quote.text.length > 120 ? quote.text.substring(0, 120) + '...' : quote.text}"
              </blockquote>
              
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                <cite style="
                  font-size: 12px;
                  font-weight: 500;
                  color: ${quote.category === 'inspirational' ? '#93c5fd' : '#fdba74'};
                  font-style: normal;
                ">
                  — ${quote.author.length > 20 ? quote.author.substring(0, 20) + '...' : quote.author}
                </cite>
                
                <span style="
                  padding: 4px 8px;
                  font-size: 10px;
                  border-radius: 10px;
                  background: ${quote.category === 'inspirational' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(249, 115, 22, 0.3)'};
                  color: white;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                ">
                  ${quote.category}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 16px;
        ">
          <p style="margin: 0;">Complete collection: ${quotes.length} quotes</p>
          <p style="margin: 8px 0 0 0; font-size: 14px;">Generated from Quotopia</p>
        </div>
      `;
      
      document.body.appendChild(tempContainer);
      
      // Capture the image
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 1200,
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
          a.download = `quotopia-collection-collage-${quotes.length}-quotes.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('Error generating collage:', error);
    } finally {
      setIsGeneratingCollage(false);
    }
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

        {/* Download Collage Button */}
        <button
          onClick={handleDownloadCollage}
          disabled={isGeneratingCollage}
          className={`
            p-4 rounded-full 
            bg-gradient-to-r from-pink-500/20 to-rose-600/20
            backdrop-blur-sm
            border border-pink-400/30
            hover:scale-110 
            hover:shadow-2xl
            transition-all 
            duration-300
            group
            ${isGeneratingCollage ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          title="Download quote collection as image collage"
        >
          <Image className={`w-6 h-6 text-pink-300 group-hover:text-pink-200 ${isGeneratingCollage ? 'animate-pulse' : ''}`} />
        </button>
      </div>
    </div>
  );
};