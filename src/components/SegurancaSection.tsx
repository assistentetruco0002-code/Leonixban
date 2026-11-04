import React from 'react';

export const SegurancaSection: React.FC = () => {
  return (
    <section
      id="seguranca"
      className="chapter chapter--short"
      data-theme="black"
      data-chapter="5"
      data-title="Segurança e atendimento"
      style={{
        backgroundColor: '#090d16',
        color: '#ffffff',
        padding: '5rem 0',
      }}
    >
      <div className="stage sec__stage max-w-6xl mx-auto px-6">
        <p className="kicker text-[#60a5fa] font-bold tracking-wider">Segurança e atendimento</p>
        <h2 className="display sec__title text-white">
          Tecnologia que protege.
          <br />
          Gente que atende.
        </h2>

        <ul className="cards3 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 list-none p-0">
          <li className="card3 p-8 rounded-3xl bg-[#131c2e] border border-slate-700/60 hover:border-blue-500/50 transition duration-300">
            <span className="card3__ico text-[#38bdf8] text-3xl mb-4 block">
              <svg className="i">
                <use href="#i-shield" />
              </svg>
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Segurança tecnológica</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Criptografia militar de ponta a ponta e inteligência preventiva para proteger cada transação bancária.
            </p>
          </li>

          <li className="card3 p-8 rounded-3xl bg-[#131c2e] border border-slate-700/60 hover:border-blue-500/50 transition duration-300">
            <span className="card3__ico text-[#38bdf8] text-3xl mb-4 block">
              <svg className="i">
                <use href="#i-headset" />
              </svg>
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Atendimento humanizado</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Equipe de especialistas prontos para te ajudar diretamente pelo app LeonixBank, 24 horas por dia.
            </p>
          </li>

          <li className="card3 p-8 rounded-3xl bg-[#131c2e] border border-slate-700/60 hover:border-blue-500/50 transition duration-300">
            <span className="card3__ico text-[#38bdf8] text-3xl mb-4 block">
              <svg className="i">
                <use href="#i-bell" />
              </svg>
            </span>
            <h3 className="text-xl font-bold text-white mb-2">Aviso a cada passo</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Notificações instantâneas no seu celular a cada compra, Pix recebido ou atualização do envio do cartão.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
