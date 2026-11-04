import React from 'react';

export const VantagensSection: React.FC = () => {
  return (
    <section
      id="vantagens"
      className="chapter chapter--short"
      data-theme="yellow"
      data-chapter="2"
      data-title="Vantagens"
      style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '5rem 0',
      }}
    >
      <div className="stage adv__stage max-w-6xl mx-auto px-6">
        <p className="kicker text-[#60a5fa] font-bold tracking-wider">Por que LeonixBank</p>
        <h2 className="display adv__title text-white">
          Vantagens de verdade,
          <br />
          sem letra miúda.
        </h2>

        <ul className="adv-grid">
          {/* Bento A: Benefícios exclusivos */}
          <li className="bento bento--a group hover:shadow-2xl transition duration-500 bg-[#1e293b] text-white border border-slate-700/60">
            <img
              className="bento__render group-hover:scale-105 transition duration-500"
              src="/lp/img/bento/presente.png"
              alt="Presente"
              aria-hidden="true"
            />
            <div className="bento__content">
              <h3 className="text-white">Benefícios exclusivos</h3>
              <p className="text-slate-300">Descontos, cashback e clube de vantagens para quem é Leonix.</p>
            </div>
          </li>

          {/* Bento B: +40 dias para pagar */}
          <li className="bento bento--b group hover:shadow-2xl transition duration-500 bg-[#1e293b] text-white border border-slate-700/60">
            <img
              className="bento__render group-hover:rotate-6 transition duration-500"
              src="/lp/img/bento/mais.png"
              alt="Mais"
              aria-hidden="true"
            />
            <div className="bento__content">
              <span className="bento__big text-[#38bdf8]">+40</span>
              <span className="bento__unit text-slate-300">dias para pagar</span>
            </div>
          </li>

          {/* Bento C: Atendimento humanizado */}
          <li className="bento bento--c group hover:shadow-2xl transition duration-500 bg-[#1e293b] text-white border border-slate-700/60">
            <img
              className="bento__render bento__render--c group-hover:scale-105 transition duration-500"
              src="/lp/img/bento/atendente.png"
              alt="Atendente"
              aria-hidden="true"
            />
            <div className="bento__content">
              <span className="bento__quote text-slate-200">
                "Precisei de ajuda às 22h de um domingo no app LeonixBank. Falei com gente de verdade em menos de 2 minutos."
              </span>
              <div className="bento__who">
                <span className="bento__avatar bg-blue-600/30 text-[#60a5fa]">
                  <svg className="i">
                    <use href="#i-user" />
                  </svg>
                </span>
                <div>
                  <b className="text-white">Atendimento humanizado</b>
                  <small className="text-slate-400">Gente de verdade, todo dia.</small>
                </div>
              </div>
            </div>
          </li>

          {/* Bento D: R$0 de anuidade */}
          <li className="bento bento--d group hover:shadow-2xl transition duration-500 bg-[#1e293b] text-white border border-slate-700/60">
            <img
              className="bento__render bento__render--d group-hover:rotate-[-6deg] group-hover:scale-105 transition duration-500 rounded-xl drop-shadow-xl"
              src="/lp/textures/card-blue-front.svg"
              alt="Cartão LeonixBank"
              aria-hidden="true"
            />
            <div className="bento__content">
              <span className="bento__big text-[#38bdf8]">R$0</span>
              <span className="bento__unit text-slate-300">de anuidade</span>
            </div>
          </li>

          {/* Bento E: Segurança tecnológica */}
          <li className="bento bento--e group hover:shadow-2xl transition duration-500 bg-[#1e293b] text-white border border-slate-700/60">
            <img
              className="bento__render group-hover:scale-105 transition duration-500"
              src="/lp/img/bento/seguranca.png"
              alt="Segurança"
              aria-hidden="true"
            />
            <div className="bento__content">
              <h3 className="text-white">Segurança tecnológica</h3>
              <p className="text-slate-300">Tecnologia bancária para proteger cada transação e o acesso à sua conta.</p>
            </div>
          </li>
        </ul>

        <p className="legal adv-legal text-slate-400">
          Prazo e condições sujeitos às regras do produto. Sujeito à análise de crédito LeonixBank.
        </p>
      </div>
    </section>
  );
};
