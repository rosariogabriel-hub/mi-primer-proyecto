"use client";

import { useState, type FormEvent } from "react";
import { crearPedido } from "../actions/pedidos";
import { pedidoSchema } from "@/lib/pedidos/schema";

const WHATSAPP_NUMBER = "18298729050";

export default function PedidoForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [items, setItems] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsed = pedidoSchema.safeParse({
      nombre_cliente: nombre,
      telefono,
      items_pedido: items,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa los datos ingresados.");
      return;
    }

    // Se abre una pestaña en blanco de forma síncrona, dentro del gesto del
    // usuario (el clic), para que el navegador no la bloquee como popup.
    // Recién después de guardar el pedido la navegamos a WhatsApp.
    const whatsappWindow = window.open("", "_blank");
    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }

    setIsSubmitting(true);
    const result = await crearPedido(parsed.data);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error);
      whatsappWindow?.close();
      return;
    }

    const mensaje = `Hola, soy ${parsed.data.nombre_cliente}. Quiero pedir: ${parsed.data.items_pedido}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    if (whatsappWindow) {
      whatsappWindow.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }

    setNombre("");
    setTelefono("");
    setItems("");
  }

  return (
    <section
      id="pedir"
      className="bg-neutral-950 px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-lg">
        <div className="mb-10 text-center">
          <span className="rounded-full border border-orange-300/30 bg-white/10 px-4 py-1.5 text-sm font-medium uppercase tracking-widest text-orange-200 backdrop-blur-sm">
            Haz tu pedido
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Cuéntanos qué se te antoja
          </h2>
          <p className="mt-3 text-neutral-300">
            Completa el formulario y te contactamos por WhatsApp para
            confirmar tu pedido.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nombre" className="text-sm font-medium text-neutral-200">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              maxLength={100}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-white placeholder-neutral-500 outline-none focus:border-orange-400"
              placeholder="Tu nombre"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefono" className="text-sm font-medium text-neutral-200">
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              maxLength={20}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-white placeholder-neutral-500 outline-none focus:border-orange-400"
              placeholder="+1 809 555 5555"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="items" className="text-sm font-medium text-neutral-200">
              ¿Qué quieres pedir?
            </label>
            <textarea
              id="items"
              name="items"
              required
              maxLength={500}
              rows={4}
              value={items}
              onChange={(e) => setItems(e.target.value)}
              className="resize-none rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-white placeholder-neutral-500 outline-none focus:border-orange-400"
              placeholder="2 burritos de pollo, 1 limonada..."
            />
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-950/50 transition hover:from-orange-400 hover:to-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Enviando..." : "Pedir por WhatsApp"}
          </button>
        </form>
      </div>
    </section>
  );
}
