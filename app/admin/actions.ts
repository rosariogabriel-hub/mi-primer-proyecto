"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/dal";
import { estadoSchema } from "@/lib/pedidos/schema";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Ingresa tu email.").email("Ingresa un email válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export type LoginState = { error: string | null };

export async function signIn(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: "Email o contraseña incorrectos." };
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

type UpdateEstadoResult = { success: true } | { success: false; error: string };

export async function actualizarEstadoPedido(
  id: number,
  estado: string
): Promise<UpdateEstadoResult> {
  // El proxy ya protege /admin, pero un Server Action se invoca como su
  // propio endpoint POST, así que se revalida la sesión aquí también.
  await getAuthenticatedUser();

  const parsedEstado = estadoSchema.safeParse(estado);
  const parsedId = z.number().int().positive().safeParse(id);

  if (!parsedEstado.success || !parsedId.success) {
    return { success: false, error: "Datos inválidos." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("pedidos")
    .update({ estado: parsedEstado.data })
    .eq("id", parsedId.data);

  if (error) {
    console.error("Error al actualizar estado del pedido:", error.message);
    return { success: false, error: "No se pudo actualizar el estado." };
  }

  return { success: true };
}
