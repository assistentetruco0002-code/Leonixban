import React, { useState } from 'react';

interface AppTourSectionProps {
  onOpenApply: () => void;
}

export const AppTourSection: React.FC<AppTourSectionProps> = ({ onOpenApply }) => {
  const [activeBeat, setActiveBeat] = useState(0);
  const [cardColor, setCardColor] = useState<'azul' | 'cinza'>('azul');
  const [isFlipped, setIsFlipped] = useState(false);
  const [parceladoValue, setParceladoValue] = useState(150);
  const [parceladoInstallments, setParceladoInstallments] = useState(6);
  const [copied, setCopied] = useState(false);
  const [walletFilter, setWalletFilter] = useState<'tudo' | 'entradas' | 'saidas'>('tudo');
  const [walletCategory, setWalletCategory] = useState('todos');

  // Calculate simulated installment
  const interestRate = 0.025;
  const monthlyPayment = (
    (parceladoValue * (1 + interestRate * parceladoInstallments)) /
    parceladoInstallments
  ).toFixed(2).replace('.', ',');

  const handleCopyCode = () => {
    navigator.clipboard.writeText('LEONIX-836').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const beats = [
    { id: 0, label: 'Cadastro e Identidade', title: 'Peça em minutos' },
    { id: 1, label: 'Escolha da Cor', title: 'Escolha a cor' },
    { id: 2, label: 'Leonix Parcelado', title: 'Leonix Parcelado' },
    { id: 3, label: 'Carteira Leonix', title: 'Carteira Leonix' },
    { id: 4, label: 'LeonixCoins e Cashback', title: 'LeonixCoins' },
    { id: 5, label: 'Indique e Ganhe', title: 'Indique e ganhe' },
  ];

  return (
    <section
      id="app"
      className={`chapter chapter--pin tour ${activeBeat === 1 ? 'is-cor' : ''}`}
      data-theme="white"
      data-beats="6"
      data-chapter="4"
      data-title="App tour"
      style={{
        backgroundColor: '#f8fafc',
        color: '#0f172a',
        padding: '5rem 0',
        position: 'relative',
      }}
    >
      <span id="coins" className="anchor-offset" data-beat-anchor="4" />

      {/* Beats Navigation Header Tab Bar */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
          {beats.map((beat) => (
            <button
              key={beat.id}
              type="button"
              className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeBeat === beat.id
                  ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              onClick={() => setActiveBeat(beat.id)}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  activeBeat === beat.id
                    ? 'bg-white text-[#2563eb] font-black'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {beat.id + 1}
              </span>
              {beat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="stage tour__stage max-w-6xl mx-auto px-6">
        {/* Left Column: Tour Copy Beats */}
        <div className="tour__copy" id="tour-copy">
          {/* BEAT 0: Peça em minutos */}
          <article className={`beat ${activeBeat === 0 ? 'is-active' : ''}`} data-beat="0">
            <p className="kicker text-[#2563eb] font-bold">Peça em minutos</p>
            <h2 className="display beat__title text-slate-900" id="b0">
              Do cadastro ao
              <br />
              cartão, sem fila.
            </h2>
            <p className="lead text-slate-600">
              Documento e selfie direto no app LeonixBank. Quando a identidade é confirmada,
              é só escolher a cor do cartão e confirmar o endereço.
            </p>
            <ol className="steps">
              <li className="is-done">
                <span className="bg-[#2563eb] text-white">
                  <svg className="i">
                    <use href="#i-check" />
                  </svg>
                </span>
                Cadastro
              </li>
              <li className="is-now">
                <span className="border-[#2563eb] text-[#2563eb]">2</span>
                Identidade
              </li>
              <li>
                <span>3</span>
                Escolha da cor
              </li>
              <li>
                <span>4</span>
                Cartão emitido
              </li>
            </ol>
            <div className="mt-8">
              <button
                type="button"
                className="btn btn--solid bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30"
                onClick={() => onOpenApply()}
              >
                Começar cadastro{' '}
                <svg className="i">
                  <use href="#i-arrow-right" />
                </svg>
              </button>
            </div>
          </article>

          {/* BEAT 1: Escolha a cor */}
          <article className={`beat ${activeBeat === 1 ? 'is-active' : ''}`} data-beat="1">
            <p className="kicker text-[#2563eb] font-bold">Escolha a cor</p>
            <h2 className="display beat__title text-slate-900" id="b1">
              Escolha
              <br />
              o seu estilo.
            </h2>
            <p className="lead text-slate-600">
              Azul Royal ou Cinza Titânio. Você decide, e seu cartão digital é ativado na hora.
            </p>
            <div className="swatches flex items-center gap-4 my-6" role="radiogroup" aria-label="Cor do cartão">
              <button
                className={`swatch cursor-pointer px-5 py-3 rounded-full border text-sm font-bold flex items-center gap-2 transition ${
                  cardColor === 'azul'
                    ? 'border-[#2563eb] bg-[#2563eb] text-white shadow-md'
                    : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
                }`}
                type="button"
                role="radio"
                aria-checked={cardColor === 'azul'}
                onClick={() => setCardColor('azul')}
              >
                <i className="w-4 h-4 rounded-full inline-block bg-[#1d4ed8] border border-white/40" />
                Azul Royal
              </button>

              <button
                className={`swatch cursor-pointer px-5 py-3 rounded-full border text-sm font-bold flex items-center gap-2 transition ${
                  cardColor === 'cinza'
                    ? 'border-slate-800 bg-slate-900 text-white shadow-md'
                    : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
                }`}
                type="button"
                role="radio"
                aria-checked={cardColor === 'cinza'}
                onClick={() => setCardColor('cinza')}
              >
                <i className="w-4 h-4 rounded-full inline-block bg-[#334155] border border-white/40" />
                Cinza Titânio
              </button>

              <button
                type="button"
                className="text-xs font-semibold text-slate-600 underline ml-2 hover:text-[#2563eb] cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {isFlipped ? 'Ver frente' : 'Girar cartão (verso)'}
              </button>
            </div>
            <p className="note flex items-center gap-2 text-sm text-slate-500">
              <svg className="i text-[#2563eb]">
                <use href="#i-lock" />
              </svg>
              Ambas as versões possuem os mesmos benefícios premium e taxa zero de anuidade.
            </p>
          </article>

          {/* BEAT 2: Leonix Parcelado */}
          <article className={`beat ${activeBeat === 2 ? 'is-active' : ''}`} data-beat="2">
            <p className="kicker text-[#2563eb] font-bold">Leonix Parcelado</p>
            <h2 className="display beat__title text-slate-900" id="b2">
              Precisou?
              <br />
              Parcele em até 12x.
            </h2>
            <p className="lead text-slate-600">
              O valor cai na sua Carteira Leonix na hora e as parcelas entram na fatura do seu cartão.
            </p>
            <form className="sim bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" id="sim" onSubmit={(e) => e.preventDefault()}>
              <label className="sim__label text-slate-700" htmlFor="sim-range">
                Quanto você precisa?
              </label>
              <output className="sim__value font-bold text-2xl text-[#2563eb]" id="sim-value">
                R$ {parceladoValue.toLocaleString('pt-BR')},00
              </output>
              <input
                className="sim__range w-full my-3"
                id="sim-range"
                type="range"
                min="25"
                max="300"
                step="5"
                value={parceladoValue}
                onChange={(e) => setParceladoValue(Number(e.target.value))}
              />
              <div className="sim__scale flex justify-between text-xs text-slate-500 mb-4">
                <span>R$ 25,00</span>
                <span>R$ 300,00</span>
              </div>
              <div className="sim__chips flex gap-2" role="radiogroup" aria-label="Número de parcelas">
                {[3, 6, 9, 12].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={parceladoInstallments === n}
                    className={`cursor-pointer px-4 py-2 rounded-lg font-bold text-sm transition ${
                      parceladoInstallments === n
                        ? 'bg-[#2563eb] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => setParceladoInstallments(n)}
                  >
                    {n}x
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <span className="text-xs text-slate-700">Parcelas estimadas:</span>
                <span className="text-sm font-bold text-blue-900">
                  {parceladoInstallments}x de R$ {monthlyPayment}
                </span>
              </div>
              <p className="sim__legal text-xs text-slate-400 mt-2">
                Simulação ilustrativa LeonixBank. Sujeito à análise de crédito.
              </p>
            </form>
          </article>

          {/* BEAT 3: Carteira Leonix */}
          <article className={`beat ${activeBeat === 3 ? 'is-active' : ''}`} data-beat="3">
            <p className="kicker text-[#2563eb] font-bold">Carteira Leonix</p>
            <h2 className="display beat__title text-slate-900" id="b3">
              Seu dinheiro,
              <br />
              em um só lugar.
            </h2>
            <ul className="feats space-y-4 my-6">
              <li className="flex gap-4 items-start">
                <span className="feat__ico text-[#1e9e4a] text-xl">
                  <svg className="i">
                    <use href="#i-pix" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Saque via Pix Instantâneo</h3>
                  <p className="text-sm text-slate-600">
                    Transfira da Carteira Leonix para qualquer banco a qualquer momento, sem taxas.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="feat__ico text-[#2563eb] text-xl">
                  <svg className="i">
                    <use href="#i-wallet" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Extrato detalhado</h3>
                  <p className="text-sm text-slate-600">
                    Acompanhe entradas, saídas, Pix, parcelamentos e cashback de forma intuitiva.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="feat__ico text-slate-600 text-xl">
                  <svg className="i">
                    <use href="#i-lock" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Saldo sempre transparente</h3>
                  <p className="text-sm text-slate-600">
                    Disponível, em processamento e reservado, com atualização em tempo real.
                  </p>
                </div>
              </li>
            </ul>
          </article>

          {/* BEAT 4: LeonixCoins */}
          <article className={`beat ${activeBeat === 4 ? 'is-active' : ''}`} data-beat="4">
            <p className="kicker text-[#2563eb] font-bold">LeonixCoins</p>
            <h2 className="display beat__title text-slate-900" id="b4">
              Cada compra
              <br />
              soma LeonixCoins.
            </h2>
            <p className="coins-count text-2xl font-black flex flex-col items-start gap-1 my-4">
              <span id="coins-num" className="text-[#2563eb] text-4xl">
                61.800
              </span>
              <small className="text-sm font-medium text-slate-500">
                LeonixCoins no seu saldo
              </small>
            </p>
            <ul className="earn grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6">
              <li className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col items-center text-xs font-bold text-center gap-1.5 shadow-sm">
                <span className="text-lg text-[#2563eb]">
                  <svg className="i">
                    <use href="#i-users" />
                  </svg>
                </span>
                Cadastro
              </li>
              <li className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col items-center text-xs font-bold text-center gap-1.5 shadow-sm">
                <span className="text-lg text-[#2563eb]">
                  <svg className="i">
                    <use href="#i-gift" />
                  </svg>
                </span>
                Indicações
              </li>
              <li className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col items-center text-xs font-bold text-center gap-1.5 shadow-sm">
                <span className="text-lg text-[#2563eb]">
                  <svg className="i">
                    <use href="#i-card" />
                  </svg>
                </span>
                Compras
              </li>
              <li className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col items-center text-xs font-bold text-center gap-1.5 shadow-sm">
                <span className="text-lg text-[#2563eb]">
                  <svg className="i">
                    <use href="#i-lock" />
                  </svg>
                </span>
                Cofre
              </li>
            </ul>
            <p className="note note--plain text-sm text-slate-600 bg-blue-50/70 p-3.5 rounded-xl border border-blue-200">
              Troque por cashback quando quiser: <b className="text-slate-900">5.000 LeonixCoins</b> viram <b className="text-[#2563eb]">R$ 2,00</b> de saldo na carteira.
            </p>
          </article>

          {/* BEAT 5: Indique e ganhe */}
          <article className={`beat ${activeBeat === 5 ? 'is-active' : ''}`} data-beat="5">
            <p className="kicker text-[#2563eb] font-bold">Indique e ganhe</p>
            <h2 className="display beat__title text-slate-900" id="b5">
              Convide amigos.
              <br />
              Somem juntos no LeonixBank.
            </h2>
            <div className="ticket flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl my-4 border border-slate-700 shadow-md">
              <div>
                <small className="text-xs text-slate-400 block">Seu código exclusivo</small>
                <strong id="ticket-code" className="text-2xl font-black tracking-wider text-[#38bdf8]">
                  LEONIX-836
                </strong>
              </div>
              <button
                className="btn btn--solid btn--sm cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                type="button"
                id="copy-code"
                onClick={handleCopyCode}
              >
                <svg className="i">
                  <use href="#i-copy" />
                </svg>
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <p className="reward text-lg font-bold text-slate-900 mb-1">
              <b className="text-emerald-600">R$ 10,00</b> + <b className="text-[#2563eb]">1.000 LeonixCoins</b>
            </p>
            <p className="lead lead--sm text-sm text-slate-600 mb-6">
              por indicação concluída, quando seu convidado ativar o cartão LeonixBank.
            </p>
            <ol className="flow grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 font-semibold shadow-sm">
                <span className="block font-bold text-slate-400 mb-0.5">1</span>
                Compartilhe
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 font-semibold shadow-sm">
                <span className="block font-bold text-slate-400 mb-0.5">2</span>
                Amigo se cadastra
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 font-semibold shadow-sm">
                <span className="block font-bold text-slate-400 mb-0.5">3</span>
                Ativa o cartão
              </li>
              <li className="is-last p-2.5 rounded-xl bg-blue-50 text-blue-900 font-bold border border-blue-300">
                <span className="block font-bold text-[#2563eb] mb-0.5">4</span>
                Você recebe
              </li>
            </ol>
          </article>
        </div>

        {/* Right Column: Dynamic Phone Screen / 3D Card Showcase */}
        <div className="tour__phone" id="tour-phone">
          {activeBeat === 1 ? (
            /* Beat 1 Card Showcase */
            <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl">
              <div
                className="card-perspective w-[300px] h-[190px] sm:w-[360px] sm:h-[225px] cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                title="Clique para virar o cartão"
              >
                <div className={`card-inner relative w-full h-full ${isFlipped ? 'is-flipped' : ''}`}>
                  {/* Front Face */}
                  <div className="card-face absolute inset-0">
                    <img
                      src={
                        cardColor === 'azul'
                          ? '/lp/textures/card-blue-front.svg'
                          : '/lp/textures/card-gray-front.svg'
                      }
                      alt="Cartão Leonix Frente"
                      className="w-full h-full object-contain rounded-2xl drop-shadow-2xl"
                    />
                  </div>

                  {/* Back Face */}
                  <div className="card-face card-back absolute inset-0">
                    <img
                      src={
                        cardColor === 'azul'
                          ? '/lp/textures/card-blue-back.svg'
                          : '/lp/textures/card-gray-back.svg'
                      }
                      alt="Cartão Leonix Verso"
                      className="w-full h-full object-contain rounded-2xl drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center">
                <span className="text-xs font-semibold text-slate-400 block mb-2">
                  Cor selecionada:{' '}
                  <b className="capitalize text-white">
                    LeonixBank {cardColor === 'azul' ? 'Azul Royal' : 'Cinza Titânio'}
                  </b>
                </span>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition cursor-pointer shadow-md"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <svg className="i mr-1">
                    <use href="#i-refresh" />
                  </svg>
                  {isFlipped ? 'Ver frente do cartão' : 'Girar cartão (ver verso)'}
                </button>
              </div>
            </div>
          ) : (
            /* Phone Simulator with screens */
            <div className="phone shadow-2xl mx-auto border-slate-800">
              <div className="phone__screen">
                <div className="phone__viewport relative">
                  {/* SCREEN 0: Identidade */}
                  <section className={`screen ${activeBeat === 0 ? 'is-on' : ''}`} data-screen="identidade">
                    <div className="a-head--y bg-[#0f172a] text-white">
                      <div className="a-status text-slate-300">
                        <span>14:31</span>
                        <span className="a-sys">
                          <span className="a-sig"><i /><i /><i /><i /></span>
                          <em>5G</em>
                          <span className="a-bat">61</span>
                        </span>
                      </div>
                      <div className="a-bar">
                        <svg className="i"><use href="#i-arrow-left" /></svg>
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded bg-[#2563eb] flex items-center justify-center p-0.5">
                            <svg viewBox="0 0 48 48" fill="none"><path d="M24 6L37 16L32 37L24 42L16 37L11 16L24 6Z" fill="white" /></svg>
                          </div>
                          <span className="font-extrabold text-xs text-white">Leonix<span className="text-[#38bdf8]">Bank</span></span>
                        </div>
                        <span className="a-sp" />
                        <svg className="i"><use href="#i-headset" /></svg>
                        <svg className="i"><use href="#i-bell" /></svg>
                        <span className="a-avatar bg-slate-700 text-slate-200"><svg className="i"><use href="#i-user" /></svg></span>
                      </div>
                    </div>
                    <div className="a-idt">
                      <div className="a-stepper"><b className="bg-[#2563eb]" /><s className="bg-[#2563eb]" /><b className="bg-[#2563eb]" /><s className="bg-[#2563eb]" /><b className="big bg-[#2563eb]" /><s className="g" /><b className="g" /></div>
                      <div className="a-seal bg-blue-100 text-[#2563eb]"><span><svg className="i"><use href="#i-check" /></svg></span></div>
                      <h4 className="text-slate-900">Identidade confirmada!</h4>
                      <p className="b text-slate-700">Parabéns, Carmen!</p>
                      <p className="sub text-slate-500">Recebemos seu documento e sua selfie.<br />Sua conta LeonixBank foi aprovada.</p>
                    </div>
                    <div className="a-card bg-slate-50 border border-slate-200" style={{ margin: '14px 20px 0', padding: '14px 15px 12px' }}>
                      <div className="a-limit">
                        <span className="a-round bg-blue-100 text-[#2563eb]"><svg className="i"><use href="#i-shield" /></svg></span>
                        <p className="text-slate-600">Seu limite pré-aprovado continua reservado para você:</p>
                      </div>
                      <strong className="a-amount text-slate-900">R$ 1.500,00</strong>
                      <ul className="a-check text-slate-600">
                        <li><span className="ok text-[#2563eb]"><svg className="i"><use href="#i-check" /></svg></span>Documento aprovado</li>
                        <li><span className="ok text-[#2563eb]"><svg className="i"><use href="#i-check" /></svg></span>Selfie validada</li>
                        <li><span className="ok text-[#2563eb]"><svg className="i"><use href="#i-check" /></svg></span>Identidade confirmada</li>
                      </ul>
                    </div>
                    <div className="a-card a-next cursor-pointer bg-white border border-slate-200" style={{ margin: '12px 20px 0' }} onClick={() => onOpenApply()}>
                      <span className="a-round a-round--y bg-[#2563eb] text-white"><svg className="i"><use href="#i-pin" /></svg></span>
                      <div>
                        <b>Próximo passo</b>
                        <p>Confirmar endereço de entrega do cartão.</p>
                      </div>
                      <svg className="i text-[#2563eb]"><use href="#i-chev" /></svg>
                    </div>
                    <button className="a-btn cursor-pointer bg-[#2563eb] text-white hover:bg-[#1d4ed8]" type="button" onClick={() => onOpenApply()}>
                      <svg className="i"><use href="#i-pin" /></svg>Confirmar endereço
                    </button>
                    <nav className="a-nav">
                      <span className="is-on text-[#2563eb]"><svg className="i"><use href="#i-home" /></svg>Início<b className="bg-[#2563eb]" /></span>
                      <span><svg className="i"><use href="#i-card" /></svg>Cartão<b /></span>
                      <span><svg className="i"><use href="#i-search" /></svg>Buscar<b /></span>
                      <span><svg className="i"><use href="#i-send" /></svg>Indicar<b /></span>
                      <span><svg className="i"><use href="#i-user" /></svg>Perfil<b /></span>
                    </nav>
                  </section>

                  {/* SCREEN 2: Leonix Parcelado */}
                  <section className={`screen ${activeBeat === 2 ? 'is-on' : ''}`} data-screen="parcelado">
                    <div className="a-status text-slate-300 bg-[#0f172a]">
                      <span>14:56</span>
                      <span className="a-sys">
                        <span className="a-sig"><i /><i /><i /><i /></span>
                        <em>5G</em>
                        <span className="a-bat">55</span>
                      </span>
                    </div>
                    <div className="a-title bg-[#0f172a] text-white">
                      <svg className="i"><use href="#i-arrow-left" /></svg>
                      <h4>Leonix Parcelado</h4>
                      <span className="a-ring"><svg className="i"><use href="#i-refresh" /></svg></span>
                      <span className="a-ring"><svg className="i"><use href="#i-help" /></svg></span>
                    </div>
                    <div className="a-pad">
                      <div className="a-yc bg-slate-900 text-white border border-slate-700">
                        <div className="top">
                          <div className="row">
                            <span className="text-slate-300">Valor disponível para Leonix Parcelado <svg className="i"><use href="#i-help" /></svg></span>
                            <svg className="i"><use href="#i-eye" /></svg>
                          </div>
                          <strong className="text-[#38bdf8]">R$ 400,00</strong>
                          <small className="text-slate-400">de R$ 400,00</small>
                        </div>
                        <div className="band bg-slate-800 text-slate-300">
                          <span>Mínimo por pedido: R$ 25,00</span>
                          <b className="text-white">Ver histórico</b>
                        </div>
                      </div>
                      <h5 className="a-h text-slate-900">1. Informe o valor desejado</h5>
                      <div className="a-input border border-slate-300 bg-white">
                        <div>
                          <span>R$</span>
                          <strong className="js-val text-[#2563eb]">{parceladoValue.toFixed(2).replace('.', ',')}</strong>
                        </div>
                        <em onClick={() => setParceladoValue(300)} className="cursor-pointer text-[#2563eb]">Usar máximo</em>
                      </div>
                      <p className="a-hint text-slate-500">Mín. R$ 25,00 · Máx. R$ 300,00</p>
                      <h5 className="a-h text-slate-900" style={{ marginTop: '14px' }}>2. Escolha o número de parcelas</h5>
                      <div className="a-chips js-chips">
                        {[3, 6, 9, 12].map((n) => (
                          <b
                            key={n}
                            className={`cursor-pointer ${parceladoInstallments === n ? 'is-on bg-[#2563eb] text-white' : ''}`}
                            onClick={() => setParceladoInstallments(n)}
                          >
                            {n}x
                          </b>
                        ))}
                      </div>
                      <p className="a-hint js-cap text-[#2563eb] font-bold" style={{ textAlign: 'center', marginTop: '8px' }}>
                        {parceladoInstallments}x de R$ {monthlyPayment}
                      </p>
                      <div className="a-row cursor-pointer text-slate-700">
                        <svg className="i text-[#2563eb]"><use href="#i-calc" /></svg>
                        <span>Simulação de parcelamento</span>
                        <svg className="i"><use href="#i-chev" /></svg>
                      </div>
                      <h5 className="a-h text-slate-900" style={{ marginTop: '14px' }}>3. Recebimento na Carteira Leonix</h5>
                      <div className="a-auto bg-blue-50 border border-blue-200 text-blue-950">
                        <svg className="i text-[#2563eb]"><use href="#i-wallet" /></svg>
                        <div>
                          <b>Crédito instantâneo</b>
                          <p>O saldo cai imediatamente na sua Carteira Leonix.</p>
                        </div>
                      </div>
                    </div>
                    <nav className="a-nav">
                      <span className="is-on text-[#2563eb]"><svg className="i"><use href="#i-home" /></svg>Início<b className="bg-[#2563eb]" /></span>
                      <span><svg className="i"><use href="#i-card" /></svg>Cartão<b /></span>
                      <span><svg className="i"><use href="#i-search" /></svg>Buscar<b /></span>
                      <span><svg className="i"><use href="#i-send" /></svg>Indicar<b /></span>
                      <span><svg className="i"><use href="#i-user" /></svg>Perfil<b /></span>
                    </nav>
                  </section>

                  {/* SCREEN 3: Carteira Leonix */}
                  <section className={`screen ${activeBeat === 3 ? 'is-on' : ''}`} data-screen="carteira">
                    <div className="a-wallet-top bg-[#0f172a] text-white">
                      <div className="a-status text-slate-300">
                        <span>14:57</span>
                        <span className="a-sys"><span className="a-sig"><i /><i /><i /><i /></span><em>5G</em><span className="a-bat">55</span></span>
                      </div>
                      <div className="t">
                        <svg className="i"><use href="#i-arrow-left" /></svg>
                        <h4>Carteira Leonix</h4>
                      </div>
                      <p className="text-blue-200">Seu dinheiro e cada movimentação, em um só lugar.</p>
                    </div>
                    <div className="a-balance bg-white border border-slate-200 shadow-sm">
                      <div className="c1">
                        <span className="lbl text-slate-500">Meus saldos <svg className="i"><use href="#i-eye" /></svg><svg className="i"><use href="#i-refresh" /></svg></span>
                        <small className="text-slate-400">Saldo disponível</small>
                        <strong className="text-slate-900">R$ 10,00</strong>
                      </div>
                      <div className="c2">
                        <span className="lbl text-slate-500">Em processamento <svg className="i"><use href="#i-info" /></svg></span>
                        <strong className="text-slate-700">R$ 0,00</strong>
                      </div>
                      <div className="c3">
                        <span className="lbl text-slate-500">Saldo reservado <svg className="i"><use href="#i-lock" /></svg></span>
                        <strong className="text-slate-700">R$ 25,00</strong>
                      </div>
                    </div>
                    <div className="a-sacar cursor-pointer bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition">
                      <svg className="i"><use href="#i-cash" /></svg>Sacar via Pix
                    </div>
                    <div className="a-ext">
                      <h5 className="a-h text-slate-900" style={{ fontSize: '14px', margin: '22px 0 10px' }}>Extrato</h5>
                      <div className="a-fil">
                        <b className={walletFilter === 'tudo' ? 'on1 bg-[#2563eb] text-white cursor-pointer' : 'cursor-pointer'} onClick={() => setWalletFilter('tudo')}>Tudo</b>
                        <b className={walletFilter === 'entradas' ? 'on1 bg-[#2563eb] text-white cursor-pointer' : 'cursor-pointer'} onClick={() => setWalletFilter('entradas')}>Entradas</b>
                        <b className={walletFilter === 'saidas' ? 'on1 bg-[#2563eb] text-white cursor-pointer' : 'cursor-pointer'} onClick={() => setWalletFilter('saidas')}>Saídas</b>
                      </div>
                      <div className="a-fil">
                        {['todos', 'pix', 'saque', 'pagamentos', 'cofre', 'cashback'].map((cat) => (
                          <b
                            key={cat}
                            className={`cursor-pointer capitalize ${walletCategory === cat ? 'on2 text-[#2563eb] border-[#2563eb]' : ''}`}
                            onClick={() => setWalletCategory(cat)}
                          >
                            {cat === 'todos' ? 'Todos' : cat === 'cofre' ? 'LeonixCofre' : cat}
                          </b>
                        ))}
                      </div>
                      <ul className="a-list text-slate-700">
                        <li>
                          <span className="ic bg-blue-100 text-[#2563eb]"><svg className="i"><use href="#i-gift" /></svg></span>
                          <span className="tx"><b>Indicação concluída</b><small>21 de set.</small></span>
                          <span className="v p text-[#1e9e4a]">+ R$ 10,00</span>
                        </li>
                        <li>
                          <span className="ic bg-slate-100 text-slate-600"><svg className="i"><use href="#i-wallet" /></svg></span>
                          <span className="tx"><b>Saldo reservado</b><small>21 de set.</small></span>
                          <span className="v n text-slate-600">- R$ 25,00</span>
                        </li>
                        <li>
                          <span className="ic bg-blue-100 text-[#2563eb]"><svg className="i"><use href="#i-wallet" /></svg></span>
                          <span className="tx"><b>Ajuste administrativo</b><small>21 de set.</small></span>
                          <span className="v p text-[#1e9e4a]">+ R$ 25,00</span>
                        </li>
                      </ul>
                    </div>
                    <nav className="a-nav">
                      <span className="is-on text-[#2563eb]"><svg className="i"><use href="#i-home" /></svg>Início<b className="bg-[#2563eb]" /></span>
                      <span><svg className="i"><use href="#i-card" /></svg>Cartão<b /></span>
                      <span><svg className="i"><use href="#i-search" /></svg>Buscar<b /></span>
                      <span><svg className="i"><use href="#i-send" /></svg>Indicar<b /></span>
                      <span><svg className="i"><use href="#i-user" /></svg>Perfil<b /></span>
                    </nav>
                  </section>

                  {/* SCREEN 4: LeonixCoins */}
                  <section className={`screen ${activeBeat === 4 ? 'is-on' : ''}`} data-screen="coins">
                    <div className="a-status text-slate-300 bg-[#0f172a]">
                      <span>14:57</span>
                      <span className="a-sys"><span className="a-sig"><i /><i /><i /><i /></span><em>5G</em><span className="a-bat">55</span></span>
                    </div>
                    <div className="a-title bg-[#0f172a] text-white">
                      <svg className="i"><use href="#i-arrow-left" /></svg>
                      <h4>LeonixCoins</h4>
                      <span className="a-ring"><svg className="i"><use href="#i-refresh" /></svg></span>
                    </div>
                    <div className="a-pad">
                      <div className="a-bal bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] text-white">
                        <div className="t">
                          <small className="text-blue-100">Seu saldo de recompensas</small>
                          <div className="n"><strong className="js-coins text-white">61.800</strong><svg className="i"><use href="#i-coins" /></svg></div>
                          <b className="text-white">LeonixCoins</b>
                        </div>
                        <div className="f text-blue-100">
                          <span>1.000 LeonixCoins = até R$ 1,00 de cashback</span>
                          <svg className="i"><use href="#i-info" /></svg>
                        </div>
                      </div>
                      <div className="a-acts text-slate-700">
                        <div className="cursor-pointer hover:bg-slate-100 rounded-lg p-1"><span><svg className="i text-[#2563eb]"><use href="#i-medal" /></svg></span>Ganhar<br />Coins</div>
                        <div className="cursor-pointer hover:bg-slate-100 rounded-lg p-1"><span><svg className="i text-[#2563eb]"><use href="#i-trophy" /></svg></span>Missões</div>
                        <div className="cursor-pointer hover:bg-slate-100 rounded-lg p-1"><span><svg className="i text-[#2563eb]"><use href="#i-refresh" /></svg></span>Trocar<br />Coins</div>
                      </div>
                      <div className="a-goal bg-slate-50 border border-slate-200">
                        <div className="r">
                          <div><small className="text-slate-500">Próxima conquista</small><b className="text-slate-900">Completar 10 indicações</b></div>
                          <em className="text-[#2563eb]">+5.000<br /><span style={{ font: "400 9px 'Plus Jakarta Sans'", color: '#64748b' }}>Coins</span></em>
                        </div>
                        <div className="frac text-slate-600">1/10</div>
                        <div className="a-bar-t bg-slate-200"><i className="js-bar bg-[#2563eb]" style={{ width: '10%' }} /></div>
                      </div>
                    </div>
                    <nav className="a-nav">
                      <span className="is-on text-[#2563eb]"><svg className="i"><use href="#i-home" /></svg>Início<b className="bg-[#2563eb]" /></span>
                      <span><svg className="i"><use href="#i-card" /></svg>Cartão<b /></span>
                      <span><svg className="i"><use href="#i-search" /></svg>Buscar<b /></span>
                      <span><svg className="i"><use href="#i-send" /></svg>Indicar<b /></span>
                      <span><svg className="i"><use href="#i-user" /></svg>Perfil<b /></span>
                    </nav>
                  </section>

                  {/* SCREEN 5: Indique */}
                  <section className={`screen ${activeBeat === 5 ? 'is-on' : ''}`} data-screen="indique">
                    <div className="a-status text-slate-300 bg-[#0f172a]">
                      <span>15:11</span>
                      <span className="a-sys"><span className="a-sig"><i /><i /><i /><i /></span><em>5G</em><span className="a-bat">55</span></span>
                    </div>
                    <div className="a-ind-h bg-[#0f172a] text-white">
                      <h4>Indique e ganhe</h4>
                      <p className="text-blue-200">Convide amigos para o LeonixBank e ganhe Cashback</p>
                    </div>
                    <div className="a-green bg-slate-900 text-white border border-slate-800">
                      <b className="text-slate-300">Seu código exclusivo Leonix</b>
                      <div className="code cursor-pointer" onClick={handleCopyCode}>
                        <strong className="js-code text-[#38bdf8]">LEONIX-836</strong>
                        <svg className="i text-[#38bdf8]"><use href="#i-copy" /></svg>
                      </div>
                      <small className="text-slate-400">Toque no código para copiar</small>
                      <div className="share cursor-pointer bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition" onClick={handleCopyCode}>
                        <svg className="i"><use href="#i-share" /></svg>Compartilhar convite
                      </div>
                    </div>
                    <div className="a-how text-slate-700">
                      <h5 className="text-slate-900">Como funciona</h5>
                      <ul>
                        <li><i className="bg-[#2563eb] text-white">1</i><span>Compartilhe seu código com seus amigos e contatos.</span></li>
                        <li><i className="bg-[#2563eb] text-white">2</i><span>Quando ele concluir o cadastro, sua recompensa de <b className="text-emerald-600">R$ 10,00</b> + <b className="text-[#2563eb]">1.000</b> LeonixCoins ficará em processamento.</span></li>
                        <li><i className="bg-[#2563eb] text-white">3</i><span>Ao emitir o cartão LeonixBank, o bônus é liberado na hora.</span></li>
                        <li><i className="bg-[#2563eb] text-white">4</i><span>Você recebe <b className="text-emerald-600">R$ 10,00</b> na Carteira Leonix mais <b className="text-[#2563eb]">1.000</b> LeonixCoins.</span></li>
                      </ul>
                    </div>
                    <div className="a-tot bg-slate-50 border border-slate-200">
                      <div><small className="text-slate-500">Total ganho com indicações</small><strong className="text-slate-900">R$ 10,00</strong></div>
                      <span className="rn bg-blue-100 text-[#2563eb]"><svg className="i"><use href="#i-wallet" /></svg></span>
                    </div>
                    {copied && (
                      <div className="a-toast a-toast--green bg-emerald-600 text-white">
                        <svg className="i"><use href="#i-check" /></svg>Código copiado
                      </div>
                    )}
                    <nav className="a-nav">
                      <span className="is-on text-[#2563eb]"><svg className="i"><use href="#i-home" /></svg>Início<b className="bg-[#2563eb]" /></span>
                      <span><svg className="i"><use href="#i-card" /></svg>Cartão<b /></span>
                      <span><svg className="i"><use href="#i-search" /></svg>Buscar<b /></span>
                      <span><svg className="i"><use href="#i-send" /></svg>Indicar<b /></span>
                      <span><svg className="i"><use href="#i-user" /></svg>Perfil<b /></span>
                    </nav>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="tour__legal legal text-center text-xs text-slate-400 mt-8">
        Telas do aplicativo LeonixBank com dados ilustrativos. Valores sujeitos à análise de crédito.
      </p>

      {/* Tour Bottom Dots in Blue & Gray */}
      <div className="tour__dots flex justify-center gap-2 mt-4" id="tour-dots" aria-hidden="true">
        {beats.map((b) => (
          <i
            key={b.id}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
              activeBeat === b.id ? 'bg-[#2563eb] scale-125' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            onClick={() => setActiveBeat(b.id)}
          />
        ))}
      </div>
    </section>
  );
};
