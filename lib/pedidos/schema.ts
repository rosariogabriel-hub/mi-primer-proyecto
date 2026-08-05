import { z } from "zod";

export const pedidoSchema = z.object({
  nombre_cliente: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre completo.")
    .max(100, "El nombre es demasiado largo."),
  telefono: z
    .string()
    .trim()
    .min(6, "Ingresa un teléfono válido.")
    .max(20, "El teléfono es demasiado largo.")
    .regex(/^[0-9+()\-\s]+$/, "El teléfono solo puede contener números, espacios, +, - y ()."),
  items_pedido: z
    .string()
    .trim()
    .min(3, "Cuéntanos qué quieres pedir.")
    .max(500, "Por favor resume tu pedido en menos de 500 caracteres."),
});

export type PedidoInput = z.infer<typeof pedidoSchema>;

export const ESTADOS = ["nuevo", "en_proceso", "completado", "cancelado"] as const;

export const estadoSchema = z.enum(ESTADOS);

export type Estado = (typeof ESTADOS)[number];

export const ESTADO_LABELS: Record<Estado, string> = {
  nuevo: "Nuevo",
  en_proceso: "En proceso",
  completado: "Completado",
  cancelado: "Cancelado",
};

export type Pedido = {
  id: number;
  nombre_cliente: string;
  telefono: string;
  items_pedido: string;
  estado: Estado;
  fecha_creacion: string;
};
