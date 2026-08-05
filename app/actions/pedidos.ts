"use server";

import { createClient } from "@/lib/supabase/server";
import { pedidoSchema } from "@/lib/pedidos/schema";

type CrearPedidoResult =
  | { success: true }
  | { success: false; error: string };

export async function crearPedido(
  input: unknown
): Promise<CrearPedidoResult> {
  const parsed = pedidoSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Datos inválidos.",
    };
  }

  const { nombre_cliente, telefono, items_pedido } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.from("pedidos").insert({
    nombre_cliente,
    telefono,
    items_pedido,
  });

  if (error) {
    console.error("Error al guardar pedido:", error.message);
    return {
      success: false,
      error: "No pudimos guardar tu pedido. Intenta de nuevo.",
    };
  }

  return { success: true };
}
