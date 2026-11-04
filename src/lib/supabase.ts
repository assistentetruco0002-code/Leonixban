import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment or provided credentials
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://kkrfplrtnvptmerjnave.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcmZwbHJ0bnZwdG1lcmpuYXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4MDU2OTIsImV4cCI6MjEwOTM4MTY5Mn0.zTc0Mx0_yB69WmN6_oGpGv3A19BAL6VfhMk0wfoBdkQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface CardApplication {
  id?: string;
  created_at?: string;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  cor_cartao: 'azul' | 'cinza';
  limite_aprovado: number;
  status: 'em_analise' | 'aprovado' | 'emitido';
}

const LOCAL_STORAGE_KEY = 'leonix_card_applications';

export function getLocalApplications(): CardApplication[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalApplication(app: CardApplication): void {
  try {
    const existing = getLocalApplications();
    existing.unshift(app);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Erro ao salvar localmente:', err);
  }
}

/**
 * Envia uma proposta de cartão para o Supabase (tabela: card_applications).
 * Se a tabela ainda não tiver sido criada no Supabase pelo usuário,
 * armazena em backup local e informa as instruções.
 */
export async function submitCardApplication(
  data: Omit<CardApplication, 'id' | 'created_at' | 'status'>
): Promise<{ success: boolean; data?: CardApplication; fromSupabase: boolean; error?: string }> {
  const application: CardApplication = {
    ...data,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `app_${Date.now()}`,
    created_at: new Date().toISOString(),
    status: 'aprovado',
  };

  // Sempre faz backup local
  saveLocalApplication(application);

  try {
    const { data: inserted, error } = await supabase
      .from('card_applications')
      .insert([
        {
          nome: application.nome,
          cpf: application.cpf,
          email: application.email,
          celular: application.celular,
          cor_cartao: application.cor_cartao,
          limite_aprovado: application.limite_aprovado,
          status: application.status,
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert note (tabela card_applications pode necessitar do script SQL):', error.message);
      return {
        success: true,
        data: application,
        fromSupabase: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: inserted || application,
      fromSupabase: true,
    };
  } catch (err) {
    console.warn('Erro ao conectar ao Supabase:', err);
    return {
      success: true,
      data: application,
      fromSupabase: false,
      error: String(err),
    };
  }
}

/**
 * Consulta propostas pelo CPF no Supabase e no armazenamento local
 */
export async function findApplicationByCpf(cpfClean: string): Promise<CardApplication | null> {
  const normalized = cpfClean.replace(/\D/g, '');

  try {
    const { data, error } = await supabase
      .from('card_applications')
      .select('*')
      .eq('cpf', cpfClean)
      .order('created_at', { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0) {
      return data[0] as CardApplication;
    }
  } catch {
    // Falha silenciosa no Supabase, fallback para local
  }

  // Fallback local
  const localList = getLocalApplications();
  const found = localList.find(
    (item) => item.cpf.replace(/\D/g, '') === normalized || item.cpf === cpfClean
  );
  return found || null;
}

/**
 * Retorna o script SQL que pode ser executado no painel SQL do Supabase
 */
export const SUPABASE_SETUP_SQL = `-- Script SQL para criar a tabela no Supabase (SQL Editor):
create table if not exists public.card_applications (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nome text not null,
  cpf text not null,
  email text not null,
  celular text not null,
  cor_cartao text not null,
  limite_aprovado numeric default 1500.00,
  status text default 'aprovado'
);

-- Habilitar Row Level Security (RLS)
alter table public.card_applications enable row level security;

-- Políticas de acesso público (anon)
create policy "Permitir inserções públicas"
  on public.card_applications for insert
  with check (true);

create policy "Permitir leitura pública"
  on public.card_applications for select
  using (true);
`;
