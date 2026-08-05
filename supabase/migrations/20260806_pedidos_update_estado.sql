-- Permite que usuarios autenticados actualicen únicamente la columna
-- "estado" de los pedidos (el panel /admin). El resto de columnas y el
-- rol "anon" quedan protegidos exactamente igual que antes: sin este
-- grant específico de columna, un UPDATE a nombre_cliente/telefono/etc.
-- fallará con "permission denied" aunque la política de abajo lo permita.
create policy "pedidos_update_estado_autenticado"
on public.pedidos
for update
to authenticated
using (true)
with check (true);

grant update (estado) on public.pedidos to authenticated;
