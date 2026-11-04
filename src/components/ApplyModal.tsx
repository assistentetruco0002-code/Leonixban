import React, { useState } from 'react';
import { submitCardApplication } from '../lib/supabase';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSupabaseStatus?: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  onOpenSupabaseStatus,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [cor, setCor] = useState<'azul' | 'cinza'>('azul');
  const [analyzingStep, setAnalyzingStep] = useState(0);
  const [supabaseSynced, setSupabaseSynced] = useState(false);

  if (!isOpen) return null;

  const formatCpf = (val: string) => {
    return val
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const formatPhone = (val: string) => {
    return val
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{4})$/, '$1-$2')
      .slice(0, 15);
  };

  const handleAdvanceToAnalysis = async () => {
    setStep(3);
    setAnalyzingStep(1);

    setTimeout(() => {
      setAnalyzingStep(2);
    }, 800);

    // Call Supabase submission
    setTimeout(async () => {
      setAnalyzingStep(3);
      try {
        const result = await submitCardApplication({
          nome,
          cpf,
          email,
          celular,
          cor_cartao: cor,
          limite_aprovado: 1500,
        });
        setSupabaseSynced(result.success);
      } catch (err) {
        console.error('Erro ao enviar:', err);
      }
    }, 1600);

    setTimeout(() => {
      setAnalyzingStep(4);
    }, 2400);

    setTimeout(() => {
      setStep(4);
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-200">
        {/* Header in Blue & Gray */}
        <div className="bg-[#0f172a] px-6 py-5 flex items-center justify-between text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center p-1.5">
              <svg viewBox="0 0 48 48" fill="none"><path d="M24 6L37 16L32 37L24 42L16 37L11 16L24 6Z" fill="white" /></svg>
            </div>
            <span className="font-extrabold text-base tracking-tight">
              Leonix<span className="text-[#38bdf8]">Bank</span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-600/30 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/40">
              Abertura de Conta
            </span>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white font-bold transition cursor-pointer"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                Peça seu cartão LeonixBank
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Sem anuidade para sempre, sem burocracia e com integração em tempo real ao Supabase.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (nome && cpf) setStep(2);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carmen Silva"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    CPF
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(formatCpf(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Celular / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 90000-0000"
                      value={celular}
                      onChange={(e) => setCelular(formatPhone(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#2563eb] text-white font-bold text-base hover:bg-[#1d4ed8] transition shadow-lg shadow-blue-500/20 mt-4 cursor-pointer"
                >
                  Continuar para Escolha do Cartão
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                Escolha a cor do seu Leonix
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Escolha o acabamento que mais combina com seu perfil executivo.
              </p>

              <div className="flex justify-center mb-6">
                <img
                  src={
                    cor === 'azul'
                      ? '/lp/textures/card-blue-front.svg'
                      : '/lp/textures/card-gray-front.svg'
                  }
                  alt="Cartão selecionado"
                  className="w-64 rounded-xl drop-shadow-2xl transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  className={`p-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                    cor === 'azul'
                      ? 'border-[#2563eb] bg-blue-50 text-[#2563eb]'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                  onClick={() => setCor('azul')}
                >
                  <span className="w-4 h-4 rounded-full bg-[#1d4ed8] border border-white/40" />
                  Azul Royal
                </button>

                <button
                  type="button"
                  className={`p-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                    cor === 'cinza'
                      ? 'border-slate-800 bg-slate-900 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                  onClick={() => setCor('cinza')}
                >
                  <span className="w-4 h-4 rounded-full bg-[#334155] border border-white/40" />
                  Cinza Titânio
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="w-1/3 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition cursor-pointer"
                  onClick={() => setStep(1)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="w-2/3 py-3.5 rounded-xl bg-[#2563eb] text-white font-bold hover:bg-[#1d4ed8] transition cursor-pointer shadow-lg shadow-blue-500/20"
                  onClick={handleAdvanceToAnalysis}
                >
                  Confirmar e Solicitar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 text-center">
              <div className="w-16 h-16 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Conectando ao Supabase e analisando dados...
              </h4>
              <p className="text-sm text-slate-600 max-w-xs mx-auto mb-6">
                Estamos registrando sua proposta no banco de dados e preparando seu cartão.
              </p>

              <div className="space-y-3 max-w-xs mx-auto text-left text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      analyzingStep >= 1 ? 'bg-[#1e9e4a] text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    ✓
                  </span>
                  Verificação cadastral e de identidade
                </div>
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      analyzingStep >= 2 ? 'bg-[#1e9e4a] text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    ✓
                  </span>
                  Cálculo do limite de crédito
                </div>
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      analyzingStep >= 3 ? 'bg-[#1e9e4a] text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    ✓
                  </span>
                  Registro no Supabase (kkrfplrtnvptmerjnave)
                </div>
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      analyzingStep >= 4 ? 'bg-[#1e9e4a] text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    ✓
                  </span>
                  Emissão do cartão digital LeonixBank
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-[#2563eb] flex items-center justify-center text-3xl mx-auto mb-4 font-black">
                ✓
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">
                Parabéns, {nome || 'Cliente'}!
              </h3>
              <p className="text-[#2563eb] font-bold text-base mb-2">
                Seu limite pré-aprovado: R$ 1.500,00
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {supabaseSynced ? 'Proposta salva no Supabase' : 'Proposta sincronizada localmente'}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cartão emitido:</span>
                  <strong className="capitalize text-slate-900">
                    LeonixBank {cor === 'azul' ? 'Azul Royal' : 'Cinza Titânio'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Anuidade:</span>
                  <strong className="text-[#1e9e4a]">R$ 0,00 (Grátis para sempre)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tecnologia:</span>
                  <strong className="text-slate-900">NFC Contactless + Virtual</strong>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {onOpenSupabaseStatus && (
                  <button
                    type="button"
                    className="w-full py-3 rounded-xl border border-blue-300 text-[#2563eb] font-bold text-xs hover:bg-blue-50 transition cursor-pointer"
                    onClick={() => {
                      onClose();
                      onOpenSupabaseStatus();
                    }}
                  >
                    Ver proposta na Integração Supabase
                  </button>
                )}
                <button
                  type="button"
                  className="w-full py-3.5 rounded-xl bg-[#2563eb] text-white font-bold text-center hover:bg-[#1d4ed8] transition shadow-lg shadow-blue-500/20 cursor-pointer"
                  onClick={onClose}
                >
                  Concluir no app LeonixBank
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
