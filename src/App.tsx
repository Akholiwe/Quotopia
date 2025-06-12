import React from 'react';
import { Header } from './components/Header';
import { QuoteGrid } from './components/QuoteGrid';
import { QuoteActions } from './components/QuoteActions';
import { quotes } from './data/quotes';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800">
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-900/20 via-transparent to-pink-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
      </div>

      {/* Floating Particles Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5000}ms`,
              animationDuration: `${3000 + Math.random() * 4000}ms`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <QuoteGrid quotes={quotes} />
      </div>

      {/* Quote Actions */}
      <QuoteActions quotes={quotes} />

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 text-white/50">
        <p className="text-sm">
          Curated quotes to inspire and amaze • Made with ❤️
        </p>
      </footer>
    </div>
  );
}

export default App;