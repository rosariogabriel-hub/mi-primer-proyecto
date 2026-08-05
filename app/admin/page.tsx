import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/dal";
import { signOut } from "./actions";

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

      {!error && (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm text-neutral-200">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-neutral-400">
              <tr>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pedidos?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                    Aún no hay pedidos.
                  </td>
                </tr>
              )}
              {pedidos?.map((pedido) => (
                <tr key={pedido.id} className="border-t border-white/10">
                  <td className="px-4 py-3">{pedido.nombre_cliente}</td>
                  <td className="px-4 py-3">{pedido.telefono}</td>
                  <td className="max-w-xs px-4 py-3">{pedido.items_pedido}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-orange-500/20 px-2.5 py-1 text-xs font-medium text-orange-300">
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-400">
                    {new Date(pedido.fecha_creacion).toLocaleString("es-DO", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
