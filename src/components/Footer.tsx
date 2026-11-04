import React from 'react';

interface FooterProps {
  onOpenLegal: (topic: string) => void;
  onNavigateSection: (id: string) => void;
  onOpenSupabase?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onNavigateSection, onOpenSupabase }) => {
  return (
    <footer className="footer bg-[#090d16] text-white border-t border-slate-800" id="rodape" data-theme="black">
      <div className="footer__grid">
        <div className="footer__brand">
          <img
            src="/lp/brand/logo-negativa.svg"
            alt="LeonixBank"
            width={200}
            height={60}
            className="h-12 w-auto"
          />
          <p className="footer__tag text-slate-400">Aqui você é Leonix.</p>
        </div>

        <div className="footer__col">
          <h3 className="text-white font-bold">Produto</h3>
          <a
            href="#vantagens"
            data-nav
            className="text-slate-400 hover:text-[#38bdf8] transition"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('vantagens');
            }}
          >
            Vantagens
          </a>
          <a
            href="#pague"
            data-nav
            className="text-slate-400 hover:text-[#38bdf8] transition"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('pague');
            }}
          >
            Pague com um toque
          </a>
          <a
            href="#app"
            data-nav
            className="text-slate-400 hover:text-[#38bdf8] transition"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('app');
            }}
          >
            Leonix Parcelado
          </a>
          <a
            href="#coins"
            data-nav
            className="text-slate-400 hover:text-[#38bdf8] transition"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('coins');
            }}
          >
            LeonixCoins
          </a>
          <a
            href="#app"
            data-nav
            className="text-slate-400 hover:text-[#38bdf8] transition"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('app');
            }}
          >
            Indique e ganhe
          </a>
        </div>

        <div className="footer__col">
          <h3 className="text-white font-bold">Legal</h3>
          <button
            type="button"
            className="text-left text-slate-400 hover:text-white transition cursor-pointer text-sm py-0.5"
            onClick={() => onOpenLegal('Termos de uso')}
          >
            Termos de uso
          </button>
          <button
            type="button"
            className="text-left text-slate-400 hover:text-white transition cursor-pointer text-sm py-0.5"
            onClick={() => onOpenLegal('Política de privacidade')}
          >
            Política de privacidade
          </button>
          <button
            type="button"
            className="text-left text-slate-400 hover:text-white transition cursor-pointer text-sm py-0.5"
            onClick={() => onOpenLegal('Termos do cartão')}
          >
            Termos do cartão Leonix
          </button>
          <button
            type="button"
            className="text-left text-slate-400 hover:text-white transition cursor-pointer text-sm py-0.5"
            onClick={() => onOpenLegal('Termos da Carteira+')}
          >
            Termos da Carteira Leonix
          </button>
          <button
            type="button"
            className="text-left text-slate-400 hover:text-white transition cursor-pointer text-sm py-0.5"
            onClick={() => onOpenLegal('Termos de LGPD')}
          >
            Termos de LGPD
          </button>
          <button
            type="button"
            className="text-left text-slate-400 hover:text-white transition cursor-pointer text-sm py-0.5"
            onClick={() => onOpenLegal('Termos de comunicações')}
          >
            Termos de comunicações
          </button>
          <button
            type="button"
            className="text-left text-slate-400 hover:text-white transition cursor-pointer text-sm py-0.5"
            onClick={() => onOpenLegal('Excluir conta')}
          >
            Excluir conta
          </button>
        </div>

        <div className="footer__col">
          <h3 className="text-white font-bold">Empresa</h3>
          <p className="text-slate-400">
            LeonixBank Instituição de Pagamento LTDA
            <br />
            CNPJ: 54.252.269/0001-94
            <br />
            Av. Portugal, 1148 – Condomínio Orion Business
            <br />
            Setor Marista – Goiânia/GO – CEP 74150-030
          </p>
          {onOpenSupabase && (
            <button
              type="button"
              className="mt-3 text-xs text-[#38bdf8] flex items-center gap-1.5 hover:underline cursor-pointer font-mono"
              onClick={onOpenSupabase}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Status Supabase (kkrfplrtnvptmerjnave)
            </button>
          )}
        </div>
      </div>

      <div className="footer__bottom border-t border-slate-800/80">
        <p className="text-slate-400">© 2026 LeonixBank. Sujeito à análise de crédito. Consulte condições.</p>
        <div className="footer__seals">
          <img
            className="footer__badge footer__badge--lgpd opacity-90 hover:opacity-100 transition"
            src="/lp/img/selos/selo-canal-lgpd-empresa-amiga-privacidade.png"
            alt="Selo Canal de Comunicação LGPD – Empresa Amiga da Privacidade"
            width={239}
            height={72}
            loading="lazy"
            decoding="async"
          />
          <img
            className="footer__badge footer__badge--gptw opacity-90 hover:opacity-100 transition"
            src="/lp/img/selos/selo-great-place-to-work-2026.png"
            alt="Selo Great Place to Work Certificada – Brasil, jan 2026 a jan 2027"
            width={171}
            height={290}
            loading="lazy"
            decoding="async"
          />
          <div className="footer__seal bg-slate-800/80 border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-2">
            <div className="text-left text-[11px] leading-tight text-slate-200">
              <span className="font-bold text-[#34d399] block flex items-center gap-1">
                <svg className="i w-3.5 h-3.5"><use href="#i-check" /></svg>
                RA Verificada
              </span>
              <span>ReclameAQUI</span>
            </div>
            <a
              className="footer__seal-link text-xs text-[#38bdf8] hover:underline"
              href="#rodape"
              onClick={(e) => e.preventDefault()}
              aria-label="Ver reputação no ReclameAQUI"
            >
              Verificar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
