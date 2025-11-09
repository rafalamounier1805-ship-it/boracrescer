-- === Bora... Crescer! — schema.sql ===
-- Tabelas de sessões e notas por área

create table if not exists public.sessions (
  id          bigserial primary key,
  user_name   text        not null,
  date        date        not null,
  geral       numeric     not null,
  emo         int         not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.session_areas (
  id          bigserial primary key,
  session_id  bigint     not null references public.sessions(id) on delete cascade,
  area        text       not null,
  score       numeric    not null
);

-- Índices úteis
create index if not exists sessions_date_idx on public.sessions(date);
create index if not exists sessions_user_idx on public.sessions(user_name);
create index if not exists session_areas_session_idx on public.session_areas(session_id);
create index if not exists session_areas_area_idx on public.session_areas(area);

-- Habilita RLS (recomendada no Supabase)
alter table public.sessions enable row level security;
alter table public.session_areas enable row level security;

-- Observação:
-- A chave SERVICE ROLE (que você usa no /api/save.js) ignora RLS por padrão.
-- Se um dia quiser permitir leitura pública (ANON) via REST, libere com as políticas abaixo.

-- ------- (Opcional) Políticas de leitura pública --------
-- create policy "read sessions anon"
--   on public.sessions for select
--   to anon
--   using (true);

-- create policy "read session_areas anon"
--   on public.session_areas for select
--   to anon
--   using (true);

-- Se quiser restringir por usuário (quando tiver auth), troque USING por uma condição, ex:
-- using (auth.jwt() ->> 'email' = user_name)