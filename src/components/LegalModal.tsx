import React from 'react';

interface LegalModalProps {
  topic: string | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  const getContent = () => {
    switch (topic) {
      case 'Termos de uso':
        return (
          <>
            <p>
              Estes Termos de Uso regulam o acesso e a utilização dos serviços
              prestados pela LeonixBank Instituição de Pagamento LTDA, sociedade
              empresária inscrita no CNPJ sob o nº 54.252.269/0001-94, com sede
              em Goiânia/GO.
            </p>
            <h4 className="font-bold text-base mt-4 mb-2 text-slate-900">1. Objeto</h4>
            <p>
              O LeonixBank oferece serviços de abertura de conta de pagamento digital,
              emissão de cartão de crédito e débito na bandeira Mastercard,
              gestão de saldo digital (Carteira Leonix), e programa de fidelidade (LeonixCoins).
            </p>
            <h4 className="font-bold text-base mt-4 mb-2 text-slate-900">2. Cadastro e Elegibilidade</h4>
            <p>
              Para utilizar os serviços, o usuário declara ter capacidade civil plena,
              fornecer dados verídicos e manter suas credenciais de segurança em sigilo absoluto.
            </p>
            <h4 className="font-bold text-base mt-4 mb-2 text-slate-900">3. Análise de Crédito</h4>
            <p>
              A concessão de limite de crédito está sujeita à política interna de análise
              de crédito do LeonixBank e parceiros homologados.
            </p>
          </>
        );
      case 'Política de privacidade':
        return (
          <>
            <p>
              Esta Política de Privacidade descreve como o LeonixBank coleta, armazena,
              utiliza e protege seus dados pessoais em total conformidade com a Lei Geral
              de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
            <h4 className="font-bold text-base mt-4 mb-2 text-slate-900">1. Dados Coletados</h4>
            <p>
              Coletamos dados de identificação (nome, CPF, data de nascimento), dados de
              contato (e-mail, celular, endereço) e dados transacionais estritamente
              necessários para prevenção a fraudes e cumprimento de normas do Banco Central do Brasil.
            </p>
            <h4 className="font-bold text-base mt-4 mb-2 text-slate-900">2. Direitos do Titular</h4>
            <p>
              Você pode a qualquer momento solicitar a confirmação, o acesso, a correção
              ou a exclusão de seus dados pessoais através do canal oficial do DPO/Encarregado.
            </p>
          </>
        );
      case 'Termos do cartão':
        return (
          <>
            <p>
              O cartão LeonixBank é um cartão de crédito pós-pago, emitido sob a bandeira
              Mastercard, com tecnologia de chip EMV e pagamento por aproximação (NFC).
            </p>
            <h4 className="font-bold text-base mt-4 mb-2 text-slate-900">1. Isenção de Anuidade</h4>
            <p>
              O cartão conta com isenção total de anuidade e taxa de adesão para todos os clientes ativos.
            </p>
            <h4 className="font-bold text-base mt-4 mb-2 text-slate-900">2. Até 40 dias para pagar</h4>
            <p>
              O prazo de até 40 dias para pagamento varia conforme a data da compra e o dia
              do fechamento da sua fatura mensal.
            </p>
          </>
        );
      case 'Termos da Carteira+':
        return (
          <>
            <p>
              A Carteira Leonix é uma conta digital de pagamento pré-paga que permite recebimento
              de bônus, cashback, contratação de Leonix Parcelado e realização de saques e transferências via Pix.
            </p>
            <h4 className="font-bold text-base mt-4 mb-2 text-slate-900">1. Saldos e Disponibilidade</h4>
            <p>
              Os valores creditados em saldo disponível podem ser movimentados para qualquer
              instituição participante do Pix sem custos adicionais.
            </p>
          </>
        );
      case 'Termos de LGPD':
        return (
          <>
            <p>
              O LeonixBank mantém o selo de Empresa Amiga da Privacidade através do seu canal
              de comunicação LGPD.
            </p>
            <p className="mt-2">
              Para exercer seus direitos de titular ou falar com nosso Encarregado de Dados
              (DPO), entre em contato pelo e-mail: <b>dpo@leonixbank.com.br</b>.
            </p>
          </>
        );
      case 'Excluir conta':
        return (
          <>
            <p>
              Para solicitar o encerramento da sua conta e a exclusão dos seus dados,
              você pode utilizar a opção direta no menu Perfil do aplicativo LeonixBank
              ou entrar em contato com o suporte em <b>sac@leonixbank.com.br</b>.
            </p>
            <p className="mt-2 text-slate-500 text-xs">
              Certifique-se de que não haja faturas pendentes ou saldo remanescente na Carteira Leonix.
            </p>
          </>
        );
      default:
        return (
          <p>
            Informações regulatórias e termos aplicáveis aos produtos e serviços do LeonixBank.
            Para dúvidas adicionais, consulte nossa central de suporte 24h: 3003-0480.
          </p>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">{topic}</h3>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold cursor-pointer text-slate-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6 overflow-y-auto text-sm text-slate-700 leading-relaxed">
          {getContent()}
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-[#2563eb] text-white font-bold text-sm cursor-pointer hover:bg-[#1d4ed8] transition shadow-md shadow-blue-500/20"
            onClick={onClose}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
