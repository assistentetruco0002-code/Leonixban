import React, { useState } from 'react';

interface PagueSectionProps {
  onOpenApply: () => void;
}

export const PagueSection: React.FC<PagueSectionProps> = ({ onOpenApply }) => {
  const [posState, setPosState] = useState<'idle' | 'reading' | 'approved'>('idle');

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.setValueAtTime(1760, audioCtx.currentTime + 0.08); // A6
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // Audio not permitted or supported
    }
  };

  const handleSimulatePayment = () => {
    if (posState !== 'idle') return;
    setPosState('reading');

    setTimeout(() => {
      setPosState('approved');
      playBeep();
    }, 1100);
  };

  const handleReset = () => {
    setPosState('idle');
  };

  return (
    <section
      id="pague"
      className="chapter chapter--pin"
      data-theme="black"
      data-beats="3"
      data-chapter="3"
      data-title="Pague com um toque"
      style={{
        backgroundColor: '#090d16',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 0',
      }}
    >
      <div className="stage pague__stage max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="pague__copy" id="pague-copy">
          <p className="kicker text-[#60a5fa] font-bold tracking-wider">Pagamento por aproximação</p>
          <h2 className="display pague__title text-white">
            Cartão, pulseira, relógio.
            <br />
            Aproximou, pagou.
          </h2>
          <p className="lead pague__lead text-slate-300">
            Leve o LeonixBank no pulso ou no smartphone. Com tecnologia NFC, o pagamento acontece em segundos,
            sem precisar tirar o cartão físico da carteira.
          </p>

          <ul className="chips-row flex gap-3 my-6 list-none p-0">
            <li className="chip inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-white text-sm font-semibold border border-slate-700">
              <span className="chip__ico chip__ico--y text-[#38bdf8]">
                <svg className="i">
                  <use href="#i-nfc" />
                </svg>
              </span>
              NFC Contactless
            </li>
            <li className="chip inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-white text-sm font-semibold border border-slate-700">
              <span className="chip__ico chip__ico--ok text-[#34d399]">
                <svg className="i">
                  <use href="#i-check" />
                </svg>
              </span>
              Pagamento 100% sem contato
            </li>
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <a
              className="btn btn--solid magnetic pague__cta bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 border border-blue-400/20"
              href="#comece"
              data-nav
              onClick={(e) => {
                e.preventDefault();
                onOpenApply();
              }}
            >
              Pedir meu cartão{' '}
              <svg className="i">
                <use href="#i-arrow-right" />
              </svg>
            </a>

            <button
              type="button"
              className="px-5 py-3 rounded-full border border-slate-600 text-slate-200 font-medium hover:bg-slate-800 transition text-sm flex items-center gap-2 cursor-pointer"
              onClick={posState === 'approved' ? handleReset : handleSimulatePayment}
            >
              <svg className="i text-[#38bdf8]">
                <use href="#i-nfc" />
              </svg>
              {posState === 'approved'
                ? 'Testar novamente'
                : posState === 'reading'
                ? 'Lendo aproximação...'
                : 'Simular aproximação na maquininha'}
            </button>
          </div>
        </div>

        {/* Visual POS Area */}
        <div className="pague__visual relative flex items-center justify-center min-h-[460px]">
          {/* Animated NFC radiating rings in Electric Blue */}
          <div className="nfc" id="nfc" aria-hidden="true">
            <i className="nfc-ring border-[#3b82f6]" />
            <i className="nfc-ring border-[#3b82f6]" />
            <i className="nfc-ring border-[#3b82f6]" />
          </div>

          {/* Approaching LeonixBank Blue Card */}
          <div
            className={`absolute z-30 transition-all duration-700 pointer-events-none ${
              posState === 'reading' || posState === 'approved'
                ? 'scale-100 translate-y-[-10px] opacity-100'
                : 'scale-90 translate-y-[-60px] opacity-80'
            }`}
            style={{ width: '230px', top: '10%' }}
          >
            <img
              src="/lp/textures/card-blue-front.svg"
              alt="Cartão LeonixBank aproximando"
              className="w-full rounded-2xl shadow-2xl rotate-[-8deg] drop-shadow-2xl"
            />
          </div>

          {/* POS Terminal */}
          <div
            className={`pos ${posState === 'approved' ? 'is-ok' : ''} cursor-pointer group`}
            id="pos"
            aria-label="Simulador de maquininha"
            onClick={posState === 'approved' ? handleReset : handleSimulatePayment}
          >
            <img
              className="pos__body"
              src="/lp/img/maquininha.png"
              alt="Maquininha de cartão"
              width={1064}
              height={1064}
            />
            <div className="pos__screen" id="pos-screen">
              <span className="pos__value text-slate-900">R$ 89,90</span>
              <span className="pos__status" id="pos-status">
                {posState === 'approved' ? (
                  <>
                    <svg className="i text-[#1e9e4a]">
                      <use href="#i-check" />
                    </svg>
                    <em className="text-[#1e9e4a] font-bold">Aprovado!</em>
                  </>
                ) : posState === 'reading' ? (
                  <>
                    <svg className="i text-[#2563eb] animate-spin">
                      <use href="#i-refresh" />
                    </svg>
                    <em className="text-slate-800 font-semibold">Processando...</em>
                  </>
                ) : (
                  <>
                    <svg className="i text-slate-600">
                      <use href="#i-nfc" />
                    </svg>
                    <em className="text-slate-700">Aproxime</em>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
