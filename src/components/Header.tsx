import React, { useState } from 'react';

interface HeaderProps {
  onOpenApply: () => void;
  onNavigateSection: (id: string) => void;
  onOpenSupabase: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApply,
  onNavigateSection,
  onOpenSupabase,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <>
      <header className="hud-top" id="hud-top">
        <a
          className="hud-badge"
          href="#hero"
          data-nav
          aria-label="LeonixBank, ir para o início"
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <img
            src="/lp/brand/logo-negativa.svg"
            alt="LeonixBank"
            width={160}
            height={48}
            className="h-10 w-auto"
          />
        </a>

        <nav className={`hud-nav ${menuOpen ? 'is-open' : ''}`} id="hud-nav" aria-label="Principal">
          <a href="#vantagens" data-nav onClick={(e) => handleNavClick(e, 'vantagens')}>
            Vantagens
          </a>
          <a href="#pague" data-nav onClick={(e) => handleNavClick(e, 'pague')}>
            Pague com um toque
          </a>
          <a href="#app" data-nav onClick={(e) => handleNavClick(e, 'app')}>
            App
          </a>
          <a href="#coins" data-nav onClick={(e) => handleNavClick(e, 'coins')}>
            LeonixCoins
          </a>
          <a href="#seguranca" data-nav onClick={(e) => handleNavClick(e, 'seguranca')}>
            Segurança
          </a>
          <button
            type="button"
            className="text-xs font-bold text-slate-300 hover:text-[#38bdf8] flex items-center gap-1.5 transition cursor-pointer py-1 px-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80"
            onClick={onOpenSupabase}
            title="Ver status de integração com o Supabase"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Supabase
          </button>
        </nav>

        <a
          className="hud-cta bg-[#2563eb] text-white hover:bg-[#1d4ed8] border border-blue-400/30 transition shadow-md"
          href="#comece"
          data-nav
          onClick={(e) => {
            e.preventDefault();
            onOpenApply();
          }}
        >
          Pedir meu cartão
        </a>

        <button
          className={`menu-toggle ${menuOpen ? 'is-active' : ''}`}
          id="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="hud-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i />
          <i />
          <i />
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0f172a]/95 backdrop-blur-md pt-24 px-6 pb-10 flex flex-col justify-between md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex flex-col gap-6 text-xl font-bold text-white">
            <a
              href="#vantagens"
              className="py-2 border-b border-slate-700/60 hover:text-[#60a5fa] transition"
              onClick={(e) => handleNavClick(e, 'vantagens')}
            >
              Vantagens
            </a>
            <a
              href="#pague"
              className="py-2 border-b border-slate-700/60 hover:text-[#60a5fa] transition"
              onClick={(e) => handleNavClick(e, 'pague')}
            >
              Pague com um toque
            </a>
            <a
              href="#app"
              className="py-2 border-b border-slate-700/60 hover:text-[#60a5fa] transition"
              onClick={(e) => handleNavClick(e, 'app')}
            >
              App
            </a>
            <a
              href="#coins"
              className="py-2 border-b border-slate-700/60 hover:text-[#60a5fa] transition"
              onClick={(e) => handleNavClick(e, 'coins')}
            >
              LeonixCoins
            </a>
            <a
              href="#seguranca"
              className="py-2 border-b border-slate-700/60 hover:text-[#60a5fa] transition"
              onClick={(e) => handleNavClick(e, 'seguranca')}
            >
              Segurança
            </a>
            <button
              type="button"
              className="text-left py-2 border-b border-slate-700/60 text-[#38bdf8] flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setMenuOpen(false);
                onOpenSupabase();
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Integração Supabase & Consultar Proposta
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <button
              type="button"
              className="w-full py-4 rounded-xl bg-[#2563eb] text-white font-bold text-lg shadow-lg hover:bg-[#1d4ed8] transition"
              onClick={() => {
                setMenuOpen(false);
                onOpenApply();
              }}
            >
              Pedir meu cartão
            </button>
            <a
              href="#comece"
              className="w-full py-3.5 rounded-xl border border-slate-600 text-slate-300 font-semibold text-center hover:bg-slate-800 transition"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                onOpenApply();
              }}
            >
              Baixar aplicativo
            </a>
          </div>
        </div>
      )}
    </>
  );
};
