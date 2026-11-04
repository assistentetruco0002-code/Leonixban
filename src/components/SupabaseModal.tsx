import React, { useState, useEffect } from 'react';
import {
  SUPABASE_URL,
  SUPABASE_SETUP_SQL,
  findApplicationByCpf,
  getLocalApplications,
  CardApplication,
} from '../lib/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'consultar' | 'sql' | 'propostas'>('consultar');
  const [cpfQuery, setCpfQuery] = useState('');
  const [foundApp, setFoundApp] = useState<CardApplication | null>(null);
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);
  const [localApps, setLocalApps] = useState<CardApplication[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLocalApps(getLocalApplications());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpfQuery.trim()) return;
    setSearching(true);
    setSearched(false);
    try {
      const res = await findApplicationByCpf(cpfQuery.trim());
      setFoundApp(res);
      setSearched(true);
    } finally {
      setSearching(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL).catch(() => {});
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white text-slate-900 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
              ⚡
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                Integração Supabase
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 font-mono">
                  Conectado
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono truncate max-w-xs">
                {SUPABASE_URL}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white font-bold transition cursor-pointer"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
          <button
            type="button"
            className={`flex-1 py-3 px-4 text-center border-b-2 transition cursor-pointer ${
              tab === 'consultar'
                ? 'border-[#2563eb] text-[#2563eb] bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
            onClick={() => setTab('consultar')}
          >
            Consultar Proposta por CPF
          </button>
          <button
            type="button"
            className={`flex-1 py-3 px-4 text-center border-b-2 transition cursor-pointer ${
              tab === 'propostas'
                ? 'border-[#2563eb] text-[#2563eb] bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
            onClick={() => setTab('propostas')}
          >
            Propostas Registradas ({localApps.length})
          </button>
          <button
            type="button"
            className={`flex-1 py-3 px-4 text-center border-b-2 transition cursor-pointer ${
              tab === 'sql'
                ? 'border-[#2563eb] text-[#2563eb] bg-white'
                : 'border-transparent hover:text-slate-900'
            }`}
            onClick={() => setTab('sql')}
          >
            Script SQL (Opcional)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'consultar' && (
            <div>
              <p className="text-sm text-slate-600 mb-4">
                Digite o CPF cadastrado para verificar a situação da sua proposta e limite aprovado no LeonixBank:
              </p>

              <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Digite o CPF (ex: 123.456.789-00)"
                  value={cpfQuery}
                  onChange={(e) => setCpfQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-500/20 text-sm"
                />
                <button
                  type="submit"
                  disabled={searching}
                  className="px-5 py-3 rounded-xl bg-[#2563eb] text-white font-bold text-sm hover:bg-[#1d4ed8] transition cursor-pointer shadow-md shadow-blue-500/20"
                >
                  {searching ? 'Buscando...' : 'Consultar'}
                </button>
              </form>

              {searched && (
                <div>
                  {foundApp ? (
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Proposta Aprovada
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          ID: {foundApp.id?.slice(0, 8)}...
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 mb-1">
                        {foundApp.nome}
                      </h4>
                      <p className="text-xs text-slate-600 mb-4">
                        CPF: {foundApp.cpf} · {foundApp.email}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white border border-emerald-100">
                          <span className="text-slate-500 block mb-0.5">Limite Pré-Aprovado</span>
                          <strong className="text-base text-emerald-700">
                            R$ {foundApp.limite_aprovado.toLocaleString('pt-BR')},00
                          </strong>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-emerald-100">
                          <span className="text-slate-500 block mb-0.5">Cor Selecionada</span>
                          <strong className="text-base text-slate-900 capitalize">
                            Cartão {foundApp.cor_cartao === 'azul' ? 'Azul Royal' : 'Cinza Titânio'}
                          </strong>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                      <p className="text-sm font-semibold text-slate-700 mb-1">
                        Nenhuma proposta encontrada para o CPF informado.
                      </p>
                      <p className="text-xs text-slate-500">
                        Certifique-se de preencher o formulário em "Pedir meu cartão" para cadastrar sua proposta.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {tab === 'propostas' && (
            <div>
              <p className="text-sm text-slate-600 mb-4">
                Propostas submetidas no aplicativo e sincronizadas com a base de dados:
              </p>

              {localApps.length === 0 ? (
                <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                  Nenhuma proposta enviada ainda. Clique em "Pedir meu cartão" para testar o envio em tempo real!
                </div>
              ) : (
                <div className="space-y-3">
                  {localApps.map((app, idx) => (
                    <div
                      key={app.id || idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#2563eb]/40 transition shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <strong className="text-slate-900 text-sm font-bold">
                            {app.nome}
                          </strong>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          CPF: {app.cpf} · {app.celular} · Cartão {app.cor_cartao}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block">Limite</span>
                        <strong className="text-sm text-[#2563eb] font-bold">
                          R$ {app.limite_aprovado.toLocaleString('pt-BR')},00
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'sql' && (
            <div>
              <p className="text-xs text-slate-600 mb-3">
                Caso deseje persistir os dados diretamente na tabela PostgreSQL do Supabase,
                execute o script abaixo no <b>SQL Editor</b> do seu painel Supabase:
              </p>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800 max-h-56">
                  {SUPABASE_SETUP_SQL}
                </pre>
                <button
                  type="button"
                  className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition cursor-pointer"
                  onClick={handleCopySql}
                >
                  {sqlCopied ? 'Copiado!' : 'Copiar SQL'}
                </button>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                <b>Nota:</b> O sistema armazena automaticamente as propostas em cache local e tenta o envio seguro para a API REST do Supabase em cada solicitação.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Supabase Project: <code className="font-mono text-slate-700">kkrfplrtnvptmerjnave</code>
          </span>
          <button
            type="button"
            className="px-5 py-2 rounded-xl bg-[#2563eb] text-white font-bold text-sm cursor-pointer hover:bg-[#1d4ed8] transition"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
