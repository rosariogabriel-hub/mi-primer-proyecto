-- Permite que solo usuarios autenticados (el panel /admin) lean los pedidos.
-- El rol "anon" sigue sin política ni grant de SELECT, así que el
-- formulario público sigue sin poder leer pedidos ajenos.
create policy "pedidos_select_autenticado"
on public.pedidos
for select
to authenticated
using (true);

grant select on public.pedidos to authenticated;
