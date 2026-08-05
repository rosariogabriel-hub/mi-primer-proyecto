import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/dal";
import { signOut } from "./actions";
import PedidosTable from "./components/PedidosTable";
import type { Pedido } from "@/lib/pedidos/schema";

export default async function AdminPage() {
  const user = await getAuthenticatedUser();

  const supabase = await createClient();
  const { data: pedidos, error } = await supabase
    .from("pedidos")
    .select("id, nombre_cliente, telefono, items_pedido, estado, fecha_creacion")
    .order("fecha_creacion", { ascending: false });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Pedidos</h1>
          <p className="text-sm text-neutral-400">{user.email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Cerrar sesión
          </button>
        </form>
      </div>

      {error && (
        <p className="text-red-400">No se pudieron cargar los pedidos.</p>
      )}

      {!error && <PedidosTable pedidos={(pedidos ?? []) as Pedido[]} />}
    </main>
  );
}
