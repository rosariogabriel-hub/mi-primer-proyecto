-- Tabla de pedidos recibidos desde el formulario de la landing page.
create table if not exists public.pedidos (
  id bigint generated always as identity primary key,
  nombre_cliente text not null check (char_length(nombre_cliente) between 1 and 100),
  telefono text not null check (char_length(telefono) between 1 and 20),
  items_pedido text not null check (char_length(items_pedido) between 1 and 500),
  canal_origen text not null default 'whatsapp_manual',
  estado text not null default 'nuevo' check (estado in ('nuevo', 'en_proceso', 'completado', 'cancelado')),
  fecha_creacion timestamptz not null default now()
);

alter table public.pedidos enable row level security;

-- Permite que cualquiera (formulario público, sin login) inserte un pedido nuevo.
create policy "pedidos_insert_publico"
on public.pedidos
for insert
to anon
with check (true);

-- RLS solo controla qué filas son visibles/insertables; Postgres además exige
-- el permiso base sobre la tabla. Sin este grant, anon recibe "permission
-- denied" aunque la política de arriba exista.
grant insert on public.pedidos to anon;

-- Sin política de SELECT/UPDATE/DELETE ni grants de esos permisos para "anon":
-- por defecto Postgres
-- deniega todo lo que no tenga una política explícita, así que nadie puede
-- leer, modificar ni borrar pedidos ajenos desde el cliente público.
