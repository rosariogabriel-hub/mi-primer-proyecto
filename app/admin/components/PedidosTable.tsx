"use client";

import { useState } from "react";
import { actualizarEstadoPedido } from "../actions";
import { ESTADOS, ESTADO_LABELS, type Estado, type Pedido } from "@/lib/pedidos/schema";

export default function PedidosTable({ pedidos: initialPedidos }: { pedidos: Pedido[] }) {
  const [pedidos, setPedidos] = useState(initialPedidos);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);

  async function handleEstadoChange(id: number, nuevoEstado: Estado) {
    const anterior = pedidos.find((p) => p.id === id)?.estado;

    setErrorId(null);
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
    setUpdatingId(id);

    const result = await actualizarEstadoPedido(id, nuevoEstado);

    setUpdatingId(null);

    if (!result.success) {
      setPedidos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado: anterior ?? p.estado } : p))
      );
      setErrorId(id);
    }
  }

  if (pedidos.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 px-4 py-6 text-center text-neutral-500">
        Aún no hay pedidos.
      </div>
    );
  }

  return (
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
          {pedidos.map((pedido) => (
            <tr key={pedido.id} className="border-t border-white/10">
              <td className="px-4 py-3">{pedido.nombre_cliente}</td>
              <td className="px-4 py-3">{pedido.telefono}</td>
              <td className="max-w-xs px-4 py-3">{pedido.items_pedido}</td>
              <td className="px-4 py-3">
                <select
                  value={pedido.estado}
                  disabled={updatingId === pedido.id}
                  onChange={(e) =>
                    handleEstadoChange(pedido.id, e.target.value as Estado)
                  }
                  className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-xs font-medium text-orange-300 outline-none focus:border-orange-400 disabled:opacity-50"
                >
                  {ESTADOS.map((estado) => (
                    <option key={estado} value={estado} className="bg-neutral-900 text-white">
                      {ESTADO_LABELS[estado]}
                    </option>
                  ))}
                </select>
                {errorId === pedido.id && (
                  <p className="mt-1 text-xs text-red-400">No se pudo actualizar.</p>
                )}
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
  );
}
