import React, { useState, useEffect } from 'react';

const MANIFESTO_ITEMS = [
  {
    title: 'Mais vantagens.',
    balloon: 'Aqui no LeonixBank você tem benefícios exclusivos de verdade e taxas zero.',
  },
  {
    title: 'Mais praticidade.',
    balloon: 'Peça, acompanhe e pague tudo em poucos toques no app LeonixBank.',
  },
  {
    title: 'Mais transparência.',
    balloon: 'Sem letras miúdas: você sempre sabe quanto paga e por quê.',
  },
  {
    title: 'Mais valor em cada transação.',
    balloon: 'Cada compra vira cashback e LeonixCoins direto na sua conta.',
  },
];

export const ManifestoSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const targetText = MANIFESTO_ITEMS[currentIndex].title;
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex <= targetText.length) {
        setDisplayedText(targetText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  // Next item timer
  useEffect(() => {
    if (isTyping) return;

    const delayTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % MANIFESTO_ITEMS.length);
    }, 3200);

    return () => clearTimeout(delayTimeout);
  }, [isTyping, currentIndex]);

  const activeItem = MANIFESTO_ITEMS[currentIndex];

  return (
    <section
      id="manifesto"
      className="chapter chapter--pin"
      data-theme="black"
      data-beats="4"
      data-chapter="1"
      data-title="Manifesto"
      style={{
        backgroundColor: '#090d16',
        color: '#ffffff',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '6rem 1.5rem',
      }}
    >
      <div className="stage manifesto__stage w-full max-w-5xl mx-auto text-center relative">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#60a5fa] bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800">
            Compromisso LeonixBank
          </span>
        </div>

        <h2 className="manifesto__text mb-6">
          <span className="manifesto__typed text-[#38bdf8]">
            <span>{displayedText}</span>
            <i className="manifesto__cursor bg-[#38bdf8]" />
          </span>
        </h2>

        {/* Speech Balloon */}
        <div
          className="manifesto__balloon transition-all duration-500 ease-out"
          style={{
            opacity: 1,
            pointerEvents: 'auto',
            transform: 'translate(-50%, 0)',
            position: 'relative',
            top: 'auto',
            left: '50%',
            display: 'inline-block',
            margin: '1.5rem auto 2.5rem',
            maxWidth: '28rem',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            borderRadius: '1.25rem',
            padding: '1.2rem 1.6rem',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          <p className="text-base font-semibold leading-relaxed m-0 text-left text-slate-100">
            {activeItem.balloon}
          </p>
        </div>

        {/* Interactive statement pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
          {MANIFESTO_ITEMS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'bg-[#2563eb] text-white scale-105 shadow-md shadow-blue-500/25 border border-blue-400'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
              onClick={() => setCurrentIndex(idx)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
