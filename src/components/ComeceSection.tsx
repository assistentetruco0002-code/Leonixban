import React from 'react';

interface ComeceSectionProps {
  onOpenApply: () => void;
}

export const ComeceSection: React.FC<ComeceSectionProps> = ({ onOpenApply }) => {
  return (
    <section
      id="comece"
      className="chapter chapter--short"
      data-theme="yellow"
      data-chapter="6"
      data-title="Comece agora"
      style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="stage cta__stage">
        <span className="deco-plus deco-plus--c text-blue-500/20" aria-hidden="true">
          +
        </span>

        <div className="cta__copy">
          <p className="kicker text-[#60a5fa] font-bold tracking-wider">Aqui você é Leonix</p>
          <h2 className="display cta__title text-white">
            Comece a
            <br />
            somar hoje.
          </h2>
          <p className="lead text-slate-300">
            Abra sua conta digital no LeonixBank e peça o seu cartão sem burocracia.
          </p>

          <div className="cta__actions">
            <button
              type="button"
              className="btn btn--solid btn--lg magnetic cursor-pointer bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-xl shadow-blue-600/30 border border-blue-400/20"
              onClick={() => onOpenApply()}
            >
              Pedir meu cartão{' '}
              <svg className="i">
                <use href="#i-arrow-right" />
              </svg>
            </button>
          </div>

          <ul className="stores" aria-label="Aplicativo">
            <li>
              <a
                href="#comece"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenApply();
                }}
                className="bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition"
              >
                <span>App Store</span>
              </a>
            </li>
            <li>
              <a
                href="#comece"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenApply();
                }}
                className="bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition"
              >
                <span>Google Play</span>
              </a>
            </li>
          </ul>

          <p className="legal text-slate-400">
            Sujeito à análise de crédito simplificada. Consulte condições gerais LeonixBank.
          </p>
        </div>

        <div className="fallback-cards fallback-cards--cta" aria-hidden="true">
          <img
            src="/lp/textures/card-gray-front.svg"
            alt="Leonix Titanium Gray"
            data-fallback-card="black"
            className="drop-shadow-2xl"
          />
          <img
            src="/lp/textures/card-blue-front.svg"
            alt="Leonix Royal Blue"
            data-fallback-card="yellow"
            className="drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};
