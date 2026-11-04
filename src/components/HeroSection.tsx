import React, { useState } from 'react';

interface HeroSectionProps {
  onOpenApply: () => void;
  onNavigateSection: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenApply, onNavigateSection }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<'inicio' | 'card' | 'buscar' | 'indicar' | 'perfil'>('inicio');
  const [promoStep, setPromoStep] = useState(0);

  return (
    <section
      id="hero"
      className="chapter chapter--short"
      data-theme="yellow"
      data-chapter="0"
      data-title="Hero"
      style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glows for Blue & Gray fintech ambiance */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-slate-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="stage hero__stage relative z-10">
        <div className="hero__copy">
          <p className="kicker text-[#60a5fa] font-bold tracking-wider" data-reveal>
            Cartão LeonixBank
          </p>
          <h1 className="display hero__title" aria-label="Aqui você é Leonix.">
            <span className="line">
              <span className="text-white">Aqui você</span>
            </span>
            <span className="line">
              <span className="text-[#3b82f6]">é Leonix.</span>
            </span>
          </h1>
          <p className="lead hero__lead text-slate-300" data-reveal>
            O banco digital que acredita em você e te ajuda a ir muito mais longe.
          </p>
          <div className="hero__actions" data-reveal>
            <a
              className="btn btn--solid bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 border border-blue-400/20"
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
            <a
              className="btn btn--ghost text-slate-200 border-slate-700 hover:bg-slate-800/60"
              href="#vantagens"
              data-nav
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('vantagens');
              }}
            >
              Ver vantagens{' '}
              <svg className="i">
                <use href="#i-arrow-down" />
              </svg>
            </a>
          </div>
          <p className="legal text-slate-400" data-reveal>
            Sujeito à análise de crédito simplificada. Consulte condições.
          </p>
        </div>

        {/* Floating Chips in Blue & Gray */}
        <ul className="hero__chips" aria-label="Destaques">
          <li
            className="chip chip--float bg-slate-900/90 text-white border border-slate-700/80 shadow-xl"
            data-reveal-chip
            style={{
              left: '52%',
              top: '78%',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <span className="chip__ico chip__ico--ok text-[#38bdf8]">
              <svg className="i">
                <use href="#i-check" />
              </svg>
            </span>
            Sem anuidade
          </li>
          <li
            className="chip chip--float chip--badge bg-blue-950/90 text-blue-200 border border-blue-800 shadow-xl"
            data-reveal-chip
            style={{
              left: '64%',
              top: '13%',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <span className="chip__ico chip__ico--ink text-[#60a5fa]">
              <svg className="i">
                <use href="#i-calendar" />
              </svg>
            </span>
            Até 40 dias para pagar
          </li>
        </ul>

        {/* Hero Interactive Phone */}
        <div className="hero__phone" aria-hidden="true">
          <div className="phone shadow-2xl border-slate-800">
            <div className="phone__screen">
              <div className="phone__viewport">
                <div className="screen is-on home select-none bg-slate-50">
                  {/* Phone Header in Navy/Blue */}
                  <div className="h-top bg-[#0f172a] text-white">
                    <div className="a-status text-slate-300">
                      <span>23:07</span>
                      <span className="a-sys">
                        <span className="a-sig">
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                        <em>5G</em>
                        <span className="a-bat">68</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#2563eb] flex items-center justify-center p-1">
                        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                          <path d="M24 6L37 16L32 37L24 42L16 37L11 16L24 6Z" fill="white" />
                        </svg>
                      </div>
                      <span className="font-extrabold text-sm text-white tracking-tight">
                        Leonix<span className="text-[#38bdf8]">Bank</span>
                      </span>
                    </div>

                    <svg className="i h-headset text-slate-300 cursor-pointer hover:text-white transition">
                      <use href="#i-headset" />
                    </svg>
                    <span className="h-bell cursor-pointer text-slate-300">
                      <svg className="i">
                        <use href="#i-bell" />
                      </svg>
                      <b className="h-badge bg-[#2563eb] text-white">13</b>
                    </span>
                    <span className="h-avatar bg-slate-700 text-slate-200">
                      <svg className="i">
                        <use href="#i-user" />
                      </svg>
                      <span className="h-cam bg-[#2563eb] text-white">
                        <svg className="i">
                          <use href="#i-camera" />
                        </svg>
                      </span>
                    </span>
                    <div className="h-hi">
                      <h4 className="text-white">Olá, Carmen!</h4>
                      <p className="text-blue-300">Aqui você é Leonix!</p>
                    </div>
                  </div>

                  {/* Phone Wallet Widget */}
                  <div className="h-wallet bg-white border border-slate-200 shadow-sm">
                    <div className="h-w-t text-slate-800">
                      Carteira Leonix{' '}
                      <button
                        type="button"
                        className="inline-flex items-center text-inherit cursor-pointer hover:scale-110 transition ml-1"
                        onClick={() => setShowBalance(!showBalance)}
                        title="Ocultar/Exibir saldo"
                      >
                        <svg className="i text-slate-500">
                          <use href="#i-eye" />
                        </svg>
                      </button>
                      <svg className="i text-slate-500 cursor-pointer hover:rotate-180 transition duration-500">
                        <use href="#i-refresh" />
                      </svg>
                    </div>
                    <small className="h-w-l text-slate-500">Saldo disponível</small>
                    <strong className="h-w-v text-slate-900">
                      {showBalance ? 'R$ 873,20' : '••••••'}{' '}
                      <svg className="i text-[#2563eb]">
                        <use href="#i-chev" />
                      </svg>
                    </strong>
                    <span className="h-w-div" style={{ left: '152px' }} />
                    <div className="h-w-c2">
                      <span className="lbl text-slate-500">
                        Em processamento{' '}
                        <svg className="i">
                          <use href="#i-info" />
                        </svg>
                      </span>
                      <strong className="text-slate-800">{showBalance ? 'R$ 0,00' : '••••••'}</strong>
                    </div>
                    <span className="h-w-div" style={{ left: '259px' }} />
                    <div className="h-w-c3">
                      <span className="lbl text-slate-500">
                        Saldo reservado{' '}
                        <svg className="i">
                          <use href="#i-lock" />
                        </svg>
                      </span>
                      <strong className="text-slate-800">{showBalance ? 'R$ 25,00' : '••••••'}</strong>
                    </div>
                  </div>

                  {/* Phone Promo Card */}
                  <div className="h-promo bg-gradient-to-br from-slate-900 to-[#1e293b] text-white border border-slate-700/50 shadow-md">
                    <h5 className="h-p-t text-white">Seu LeonixBank Card foi emitido!</h5>
                    <p className="h-p-p text-slate-300">
                      Acompanhe cada etapa até seu cartão chegar nas suas mãos.
                    </p>
                    <p className="h-p-l text-slate-400">Seu limite disponível:</p>
                    <strong className="h-p-v text-[#60a5fa]">
                      {showBalance ? 'R$ 1.500,00' : '••••••'}
                    </strong>
                    <img
                      className="h-p-card hover:scale-105 transition rounded-lg"
                      src="/lp/textures/card-blue-front.svg"
                      alt="Cartão LeonixBank"
                    />
                    <span
                      className="h-p-btn cursor-pointer active:scale-95 transition bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                      onClick={() => onOpenApply()}
                    >
                      Acompanhar Agora
                    </span>
                  </div>

                  {/* Phone Carousel Dots */}
                  <div className="h-dots">
                    <i
                      className={promoStep === 0 ? 'on cursor-pointer bg-[#2563eb]' : 'cursor-pointer'}
                      onClick={() => setPromoStep(0)}
                    />
                    <i
                      className={promoStep === 1 ? 'on cursor-pointer bg-[#2563eb]' : 'cursor-pointer'}
                      onClick={() => setPromoStep(1)}
                    />
                    <i
                      className={promoStep === 2 ? 'on cursor-pointer bg-[#2563eb]' : 'cursor-pointer'}
                      onClick={() => setPromoStep(2)}
                    />
                  </div>

                  {/* Quick Action Grid */}
                  <div className="h-grid">
                    <div
                      className="h-tile cursor-pointer hover:bg-slate-200/60 transition bg-white"
                      onClick={() => onNavigateSection('app')}
                    >
                      <span className="h-ico bg-blue-100 text-[#2563eb]">
                        <svg className="i">
                          <use href="#i-calendar" />
                        </svg>
                      </span>
                      <b>Leonix Parcelado</b>
                      <small>Crédito na Carteira em até 12x</small>
                    </div>
                    <div
                      className="h-tile cursor-pointer hover:bg-slate-200/60 transition bg-white"
                      onClick={() => onNavigateSection('app')}
                    >
                      <span className="h-ico bg-emerald-100 text-[#1e9e4a]">
                        <svg className="i">
                          <use href="#i-wallet" />
                        </svg>
                      </span>
                      <b>Saque Pix</b>
                      <small>Saque da Carteira via Pix</small>
                    </div>
                    <div
                      className="h-tile cursor-pointer hover:bg-slate-200/60 transition bg-white"
                      onClick={() => onNavigateSection('app')}
                    >
                      <span className="h-ico bg-slate-100 text-slate-700">
                        <svg className="i">
                          <use href="#i-doc" />
                        </svg>
                      </span>
                      <b>Extrato da Carteira</b>
                      <small>Veja todas as movimentações</small>
                    </div>
                    <div
                      className="h-tile cursor-pointer hover:bg-slate-200/60 transition bg-white"
                      onClick={() => onNavigateSection('coins')}
                    >
                      <span className="h-ico bg-blue-100 text-[#2563eb]">
                        <svg className="i">
                          <use href="#i-coins" />
                        </svg>
                      </span>
                      <b>LeonixCoins</b>
                      <small>Suas moedas e recompensas</small>
                    </div>
                    <div
                      className="h-tile cursor-pointer hover:bg-slate-200/60 transition bg-white"
                      onClick={() => onNavigateSection('coins')}
                    >
                      <span className="h-ico bg-slate-100 text-slate-700">
                        <svg className="i">
                          <use href="#i-refresh" />
                        </svg>
                      </span>
                      <b>Trocar LeonixCoins</b>
                      <small>Troque moedas por dinheiro</small>
                    </div>
                    <div className="h-tile is-off opacity-60 bg-white">
                      <span className="h-ico bg-slate-100 text-slate-500">
                        <svg className="i">
                          <use href="#i-vault" />
                        </svg>
                      </span>
                      <b>LeonixCofre</b>
                      <small>Em Breve</small>
                    </div>
                  </div>

                  {/* Banners */}
                  <div className="h-banners">
                    <div
                      className="h-ban cursor-pointer hover:brightness-105 transition bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white"
                      onClick={() => onNavigateSection('coins')}
                    >
                      <b>LeonixCoins</b>
                      <small className="text-blue-100">Veja seu saldo e cashback</small>
                    </div>
                    <div
                      className="h-ban cursor-pointer hover:brightness-105 transition bg-slate-800 text-white"
                      onClick={() => onNavigateSection('app')}
                    >
                      <span className="h-ban-tag text-[#38bdf8] font-bold">INDIQUE E GANHE</span>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <nav className="a-nav bg-white border-t border-slate-200 text-slate-600">
                    <span
                      className={`cursor-pointer ${activeTab === 'inicio' ? 'is-on text-[#2563eb]' : ''}`}
                      onClick={() => setActiveTab('inicio')}
                    >
                      <svg className="i">
                        <use href="#i-home" />
                      </svg>
                      Início
                      <b className="bg-[#2563eb]" />
                    </span>
                    <span
                      className={`cursor-pointer ${activeTab === 'card' ? 'is-on text-[#2563eb]' : ''}`}
                      onClick={() => setActiveTab('card')}
                    >
                      <svg className="i">
                        <use href="#i-card" />
                      </svg>
                      Cartão
                      <b className="bg-[#2563eb]" />
                    </span>
                    <span
                      className={`cursor-pointer ${activeTab === 'buscar' ? 'is-on text-[#2563eb]' : ''}`}
                      onClick={() => setActiveTab('buscar')}
                    >
                      <svg className="i">
                        <use href="#i-search" />
                      </svg>
                      Buscar
                      <b className="bg-[#2563eb]" />
                    </span>
                    <span
                      className={`cursor-pointer ${activeTab === 'indicar' ? 'is-on text-[#2563eb]' : ''}`}
                      onClick={() => setActiveTab('indicar')}
                    >
                      <svg className="i">
                        <use href="#i-send" />
                      </svg>
                      Indicar
                      <b className="bg-[#2563eb]" />
                    </span>
                    <span
                      className={`cursor-pointer ${activeTab === 'perfil' ? 'is-on text-[#2563eb]' : ''}`}
                      onClick={() => setActiveTab('perfil')}
                    >
                      <svg className="i">
                        <use href="#i-user" />
                      </svg>
                      Perfil
                      <b className="bg-[#2563eb]" />
                    </span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Pluses in Blue/Gray */}
        <span className="deco-plus deco-plus--a select-none text-blue-500/30" aria-hidden="true">
          +
        </span>
        <span className="deco-plus deco-plus--b select-none text-slate-500/20" aria-hidden="true">
          +
        </span>

        {/* Dual 3D Floating Cards in Blue & Titanium Gray */}
        <div className="fallback-cards" aria-hidden="true">
          <img
            src="/lp/textures/card-gray-front.svg"
            alt="LeonixBank Titanium Gray"
            data-fallback-card="black"
            className="hover:rotate-[-8deg] hover:scale-105 transition duration-500 drop-shadow-2xl"
          />
          <img
            src="/lp/textures/card-blue-front.svg"
            alt="LeonixBank Royal Blue"
            data-fallback-card="yellow"
            className="hover:rotate-[22deg] hover:scale-105 transition duration-500 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};
