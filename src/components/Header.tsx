import React from 'react';
import { Heart, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Heart className="w-12 h-12 text-pink-300 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
            Quotopia
          </h1>
          <Zap className="w-12 h-12 text-yellow-300 animate-bounce" />
        </div>
        
        <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
          Where inspiration meets the wonderfully bizarre
        </p>
        
        <div className="mt-8 flex justify-center gap-8 text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-sm uppercase tracking-wider">Inspirational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span className="text-sm uppercase tracking-wider">Bizarre</span>
          </div>
        </div>
      </div>
    </header>
  );
};